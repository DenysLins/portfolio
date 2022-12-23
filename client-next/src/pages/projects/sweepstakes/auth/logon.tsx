import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "@/styles/components/sweepstakes.module.scss";
import SweepstakesLogon from "@/components/Sweepstakes/Logon";

const ProjectSweepstakesLogon = () => {
  return (
    <div className={styles.container}>
      <SweepstakesLogon />
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

export default ProjectSweepstakesLogon;
