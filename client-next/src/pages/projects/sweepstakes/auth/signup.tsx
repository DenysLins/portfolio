import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SweepstakesContainer } from "@/styles/components/sweepstakes.styles";
import SweepstakesSignUp from "@/components/Sweepstakes/Signup";

const ProjectSweepstakesSignUp = () => {
  return (
    <SweepstakesContainer>
      <SweepstakesSignUp />
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

export default ProjectSweepstakesSignUp;
