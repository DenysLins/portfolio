import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { validate } from "src/utils/middlewares";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const res = await axios.post(
          `${req.headers.origin}/api/sweepstakes/login`,
          payload
        );
        const user = await res.data;
        if (res.status === 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(r) {
      console.log(r);
      r.token.userRole =
        r.token.email === process.env.ADMIN_EMAIL ? "admin" : "user";
      return r.token;
    },
  },
};

export default validate(NextAuth(authOptions));
