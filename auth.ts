import NextAuth from "next-auth"
import { ZodError } from "zod"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { saltAndHashPassword } from "@/utils/password"
import { PrismaClient } from "@prisma/client"
import { signInSchema } from "./lib/zod"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null

          const { email, password } = await signInSchema.parseAsync(credentials)
 
          // logic to salt and hash password
          const pwHash = saltAndHashPassword(credentials.password)
  
          // logic to verify if user exists
          user = await getUserFromDb(credentials.email, pwHash)
  
          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }
 
          // return user object with the their profile data
          return user
        } catch (error) {
          if (error instanceof ZodError) {
             // Return `null` to indicate that the credentials are invalid
             return null
          }
        }
      },
    }),
  ],
})