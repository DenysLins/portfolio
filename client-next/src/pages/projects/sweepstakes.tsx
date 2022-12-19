import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/sweepstakes.module.scss";
import Sweepstakes from "@/components/Sweepstakes";
const ProjectSweepstakes = () => {
  return (
    <div className={style.container}>
      <Sweepstakes />
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

export default ProjectSweepstakes;
