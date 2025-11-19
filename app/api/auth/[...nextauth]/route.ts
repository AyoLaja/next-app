import NextAuth, { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Credentials provider
    // This is used to login with email and password
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // If the email or password is not provided, return an error
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find the user by email
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If the user is not found, return an error
        if (!existingUser) {
          return null;
        }

        // Compare the password with the hashed password
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          existingUser?.hashedPassword as string
        );

        // If the passwords do not match, return an error
        if (!passwordsMatch) {
          return null;
        }

        // If the passwords match, return the user
        return existingUser;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
