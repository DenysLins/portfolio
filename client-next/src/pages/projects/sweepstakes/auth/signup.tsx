import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "@/styles/components/sweepstakes.module.scss";
import SweepstakesSignUp from "@/components/Sweepstakes/Signup";

const ProjectSweepstakesSignUp = () => {
  return (
    <div className={styles.container}>
      <SweepstakesSignUp />
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

export default ProjectSweepstakesSignUp;
