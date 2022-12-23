import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SweepstakesContainer } from "@/styles/components/sweepstakes.styles";
import SweepstakesAdmin from "@/components/Sweepstakes/Admin";

const ProjectSweepstakesAdmin = () => {
  return (
    <SweepstakesContainer>
      <SweepstakesAdmin />
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

export default ProjectSweepstakesAdmin;
