import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ConstructionIcon from "@mui/icons-material/Construction";

import style from "@/styles/pages/about.module.scss";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div className={style.container}>
      <ConstructionIcon />
      <h2>{t("title")}</h2>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default About;
