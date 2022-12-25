import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { useRouter } from "next/router";

const NavStyled = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  width: "100%",
  margin: "1rem 0",
});

const SweepstakesAdminNav = () => {
  const router = useRouter();

  return (
    <NavStyled>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          router.push("/projects/sweepstakes/admin");
        }}
      >
        Admin
      </Button>
    </NavStyled>
  );
};

export default SweepstakesAdminNav;
