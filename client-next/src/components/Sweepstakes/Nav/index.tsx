import { styled } from "@mui/system";
import { signOut, useSession } from "next-auth/react";

const NavStyled = styled("div")({
  padding: 8,
  position: "absolute",
  right: "30px",
  "& span": {
    marginRight: "20px",
  },
});

const SweepstakesNav = () => {
  const { data: session } = useSession();

  return (
    <NavStyled>
      <span>{session.user.email}</span>
      <button onClick={() => signOut()}>Sign out</button>
    </NavStyled>
  );
};

export default SweepstakesNav;
