import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";

const NavStyled = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
  width: "100%",
});

const SpanStyled = styled("span")({
  margin: "0 1rem",
});

const SweepstakesNav = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("salary");
  console.log(session);
  return (
    <NavStyled>
      <Image
        alt="Vercel logo"
        src={session.user.image}
        width={32}
        height={32}
        style={{
          height: "auto",
          borderRadius: "50%",
          border: "1px solid white",
        }}
      />
      <SpanStyled>{session.user.name}</SpanStyled>
      <Button variant="contained" color="error" onClick={() => signOut()}>
        {t("logout")}
      </Button>
    </NavStyled>
  );
};

export default SweepstakesNav;
