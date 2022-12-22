import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/sweepstakes.module.scss";
import SweepstakesAdmin from "@/components/Sweepstakes/Admin";
const ProjectSweepstakesAdmin = () => {
  return (
    <div className={style.container}>
      <SweepstakesAdmin />
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

export default ProjectSweepstakesAdmin;
