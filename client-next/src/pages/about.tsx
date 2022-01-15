import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/About.module.scss";

const About = () => {
  const { t } = useTranslation("about");

  return (
    <div className={style.container}>
      <h1>{t("title")}</h1>
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
