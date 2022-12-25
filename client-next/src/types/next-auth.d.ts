import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      userRole: string
    } & DefaultSession["user"]
  }
}
