import * as React from "react";
import { useSession, signOut } from "next-auth/react";

const SweepstakesMain = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <h1>Main</h1>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default SweepstakesMain;
