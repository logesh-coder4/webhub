import { verifyToken } from "@/actions/sendVerifications"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"


const VerifyUser = async({searchParams}:{searchParams:Promise<{token:string}>}) => {
    const {token}=await searchParams
    if (!token) {
        redirect('/login')
    }
    await verifyToken(token)
    return (
        <div>VerifyUser</div>
    )
}

export default VerifyUser