import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/sweepstakes.module.scss";
import SweepstakesLogin from "@/components/Sweepstakes/Login";
const ProjectSweepstakesLogin = () => {
  return (
    <div className={style.container}>
      <SweepstakesLogin />
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

export default ProjectSweepstakesLogin;
