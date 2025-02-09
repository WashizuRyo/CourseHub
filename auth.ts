import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import type { JWT, JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt'
import Google from 'next-auth/providers/google'

const jwtBase64 = {
  async encode(params: JWTEncodeParams<JWT>): Promise<string> {
    return btoa(JSON.stringify(params.token))
  },
  async decode(params: JWTDecodeParams): Promise<JWT | null> {
    if (!params.token) return {}
    return JSON.parse(atob(params.token))
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  ...(process.env.APP_ENV === 'test' ? { jwt: jwtBase64 } : {}),
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})
