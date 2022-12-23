import React from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";

import { SweepstakesContainer } from "@/styles/components/sweepstakes.styles";
import SweepstakesMain from "@/components/Sweepstakes/Main";
import SweepstakesNav from "../../../components/Sweepstakes/Nav/index";

const SweepstakesContainerSession = styled("div")({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  height: "100vh",
  width: "100vw",
  padding: "6rem 3rem",
  position: "relative",
});

const ProjectSweepstakesMain = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <SweepstakesContainer>
        <CircularProgress color="inherit" />
      </SweepstakesContainer>
    );
  } else {
    if (session) {
      return (
        <SweepstakesContainerSession>
          <SweepstakesNav />
          <SweepstakesMain />
        </SweepstakesContainerSession>
      );
    } else {
      router.push("/projects/sweepstakes/auth/login");
    }
  }
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "sweepstakes",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default ProjectSweepstakesMain;
