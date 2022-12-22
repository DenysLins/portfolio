import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const SweepstakesMain = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <h1>Main</h1>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <button onClick={() => router.push("/projects/sweepstakes/admin")}>
        Admin
      </button>
    </>
  );
};

export default SweepstakesMain;
