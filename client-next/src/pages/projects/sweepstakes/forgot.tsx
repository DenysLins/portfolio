import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/sweepstakes.module.scss";
import SweepstakesForgot from "@/components/Sweepstakes/Forgot";
const ProjectSweepstakesForgot = () => {
  return (
    <div className={style.container}>
      <SweepstakesForgot />
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

export default ProjectSweepstakesForgot;
