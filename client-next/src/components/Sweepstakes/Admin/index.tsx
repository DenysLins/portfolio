import { signOut } from "next-auth/react";

function SweepstakesAdmin() {
  return (
    <>
      <h1>This page is protected by Middleware</h1>
      <p>Only admin users can see this page.</p>
      <p>
        To learn more about the NextAuth middleware see&nbsp;
        <a href="https://docs-git-misc-docs-nextauthjs.vercel.app/configuration/nextjs#middleware">
          the docs
        </a>
        .
      </p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

export default SweepstakesAdmin;
