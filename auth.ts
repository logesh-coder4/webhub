// 'use server'
import NextAuth, { CredentialsSignin,type DefaultSession } from "next-auth"
import Credentials from 'next-auth/providers/credentials'
import { checkIsUser } from "./lib/passkey"
import { verifyPassword } from "./lib/passkey"

// declare module "next-auth" {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       address: string
//       /**
//        * By default, TypeScript merges new interface properties and overwrites existing ones.
//        * In this case, the default session user properties will be overwritten,
//        * with the new ones defined above. To keep the default session user properties,
//        * you need to add them back into the newly declared interface.
//        */
//     } & DefaultSession["user"]
//   }
// }
 
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
                throw new  Error("user doen not exist");
            }
            if (!user.password) {
                throw new  Error('Invalid data')
            }
            const isMatched=await verifyPassword(password,user.password)
            if (!isMatched) {
                throw new Error("the provided password was wrong");
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