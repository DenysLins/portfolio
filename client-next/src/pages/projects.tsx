import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/about.module.scss";

const Projects = () => {
  const { t } = useTranslation("projects");

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
        "projects",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Projects;
