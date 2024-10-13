import { prisma } from '@/app/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const shouldAddCredentials = process.env.NODE_ENV === 'development';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    ...(shouldAddCredentials
      ? [
          Credentials({
            id: 'password',
            name: 'Password',
            credentials: {
              password: { label: 'Password', type: 'password' },
            },
            authorize: (credentials) => {
              if (credentials.password === 'password') {
                return {
                  email: 'bob@alice.com',
                  name: 'Bob Alice',
                  image:
                    'https://avatars.githubusercontent.com/u/67470890?s=200&v=4',
                };
              }
              return null;
            },
          }),
        ]
      : []),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
