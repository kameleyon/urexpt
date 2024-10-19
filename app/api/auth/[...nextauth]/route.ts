import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { compare, hash } from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isNewUser: { label: "Is New User", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        try {
          const { db } = await connectToDatabase()
          const user = await db.collection("users").findOne({ email: credentials.email })

          if (credentials.isNewUser === "true") {
            if (user) {
              throw new Error("User already exists")
            }
            const hashedPassword = await hash(credentials.password, 10)
            const newUser = await db.collection("users").insertOne({
              email: credentials.email,
              password: hashedPassword,
            })
            return {
              id: newUser.insertedId.toString(),
              email: credentials.email,
            }
          } else {
            if (!user) {
              throw new Error("User not found")
            }
            const isPasswordValid = await compare(credentials.password, user.password)
            if (!isPasswordValid) {
              throw new Error("Invalid password")
            }
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name
            }
          }
        } catch (error) {
          console.error("NextAuth authorize error:", error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }