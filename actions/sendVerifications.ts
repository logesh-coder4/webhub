'use server'
import { db } from '@/lib/db'
import { transporter } from '@/lib/mail'
import crypto from 'crypto'
import { redirect } from 'next/navigation'

export async function sendVerificationMail(userId:number,email:string) {
    const token=crypto.randomBytes(32).toString("hex")
    const data=await db.verificationToken.create({
        data:{
            token:token,
            userId:userId,
            expiresAt:new Date(Date.now()+1000*60*60)
        },
        include:{
            user:{
                select:{username:true}
            }
        }
    })
    const verifyUrl=`${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
    const mail=`Hi ${data.user.username},
        Thank you for registering with us.
        Please verify your email address to activate your account.

        Click the button below to confirm your email:
        <a href="${verifyUrl}">Verify</a>

        If you did not create this account, please ignore this email.

        — Team WebHub`

    await transporter.sendMail({
        to:email,
        subject:"Confirm your account",
        html:mail
    })
}

export async function verifyToken(token:string) {
    const record=await db.verificationToken.findUnique({
        where:{token}
    })

    if (!record||record.expiresAt<new Date()) {
        redirect('/')
    }
    await db.user.update({
        where:{id:record.userId},
        data:{isActive:true}
    })
    redirect('/login')
}


export const sendResetMail=async (email:string) => {
    try {
        if (!email) {
            throw new Error("Provide a valid email address")
        }
        const token=crypto.randomBytes(32).toString("hex")
        const isUser=await db.user.findFirst({
            where:{
                email:email
            }
        })
        if (!isUser) {
            throw new Error("If an acount exists with this email ,you will receive a password reset link shortly")
        }
        const user=await db.user.update({
            where:{email:email},
            data:{
                resetToken:token,
                resetTokenExpires:new Date(Date.now()+15*60*1000)
            }
        })
        const resetPasswordLink=`${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
        const mail=`
            We received a request to reset your password.

            Click the link below to create a new password:
            <a href="${resetPasswordLink}">Reset Password</a>

            This link will expire in 15 minutes for security reasons.

            If you did not request a password reset, please ignore this email. Your account remains secure.
        `
        await transporter.sendMail({
            to:user.email,
            subject:"Reset Your Password",
            html:mail
        })
    } catch (error) {
        throw new Error(error.message)
    }
}