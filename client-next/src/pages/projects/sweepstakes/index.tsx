import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";
import CircularProgress from "@mui/material/CircularProgress";

import style from "@/styles/pages/projects/sweepstakes.module.scss";
import SweepstakesMain from "@/components/Sweepstakes/Main";
import { useRouter } from "next/router";

const ProjectSweepstakesMain = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <div className={style.container}>
        <CircularProgress color="inherit" />
      </div>
    );
  } else {
    if (session) {
      return (
        <div className={style.container}>
          <SweepstakesMain />
        </div>
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
