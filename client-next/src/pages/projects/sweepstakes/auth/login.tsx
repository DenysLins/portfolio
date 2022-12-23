import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SweepstakesContainer } from "@/styles/components/sweepstakes.styles";
import SweepstakesLogin from "@/components/Sweepstakes/Login";
const ProjectSweepstakesLogin = () => {
  return (
    <SweepstakesContainer>
      <SweepstakesLogin />
    </SweepstakesContainer>
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
