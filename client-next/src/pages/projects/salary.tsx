import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/pages/projects/salary.module.scss";
const Projects = () => {
  const { t } = useTranslation("salary");

  return (
    <div className={style.container}>
      <div className={style.salary}>{t("1")}</div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "salary",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Projects;
