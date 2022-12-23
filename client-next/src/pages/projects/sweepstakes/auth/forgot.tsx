import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SweepstakesContainer } from "@/styles/components/sweepstakes.styles";
import SweepstakesForgot from "@/components/Sweepstakes/Forgot";

const ProjectSweepstakesForgot = () => {
  return (
    <SweepstakesContainer>
      <SweepstakesForgot />
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

export default ProjectSweepstakesForgot;
