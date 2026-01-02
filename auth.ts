// 'use server'
import NextAuth, { CredentialsSignin,type DefaultSession } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { checkIsUser } from "./lib/passkey"
import { verifyPassword } from "./lib/passkey"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials:{
      email:{
        required:true,
        type:"email",
        label:"Email"
      },
      password:{
        required:true,
        type:"password",
        label:"Password"
      },
    },
    authorize:async(credentials)=>{
        try {
            const email=credentials.email as string|undefined
            const password=credentials.password as string|undefined
            if (!email || !password) {
                throw new CredentialsSignin("Provide both email and password")
            }
            const user=await checkIsUser(email)
            if (!user) {
                throw new  Error("No account is associated with this email address,Please sugnup first");
            }
            if (!user.password) {
                throw new  Error('Please enter your password and continue')
            }
            if (!user.isActive) {
                throw new Error("Your account is not verified yet.Please verify your rmail to continue.")
            }
            const isMatched=await verifyPassword(password,user.password)
            if (!isMatched) {
                throw new Error("The email or password you entered is incorrect.Please try again");
            }
            const userData={
                id:user.id,
                username:user.username,
                email:user.email,
                isSuperUser:user.isSuperUser,
                isAdmin:user.isAdmin,
            }
            return userData
        } catch (error) {
            throw new Error(error?.message)
        }
    },
  })],
  pages:{
    signIn:'/login',
  },
  callbacks:{
    async session(sessions) {
        const {token,session}=sessions
        if (token) {
            session.user.id=token.sub as string
            session.user.name=token.name
            session.user.isSuperUser=token.isSuperUser
            session.user.isAdmin=token.isAdmin
        }
        return session
    },
    jwt(jwt) {
        const {user,token}=jwt
        if (user) {
            token.name=user.username
            token.isSuperUser=user.isSuperUser
            token.isAdmin=user.isAdmin
        }
        return token
    },
  }
})