import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/sweepstakes.module.scss";
import SweepstakesMain from "@/components/Sweepstakes/Main";
const ProjectSweepstakesMain = () => {
  return (
    <div className={style.container}>
      <SweepstakesMain />
    </div>
  );
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
