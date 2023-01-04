import dbConnect from '@/lib/mongodb';
import User from '@/models/sweepstakes/User';
import { validate } from '@/utils/middlewares';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        await dbConnect();
        const user = await User.findOne({
          email,
        }).exec();
        if (user) {
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            return {
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            };
          } else {
            throw new Error('Invalid password');
          }
        } else {
          throw new Error('User not found');
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      token.userRole = JSON.parse(process.env.ADMIN_EMAILS).includes(
        token.email
      )
        ? 'admin'
        : 'user';
      return token;
    },
    async session({ session, token }) {
      session.user.userRole = token.userRole;
      return session;
    },
  },
};

export default validate(NextAuth(authOptions));
