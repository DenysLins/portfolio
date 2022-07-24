import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import style from "@/styles/pages/projects.module.scss";
const Projects = () => {
  const { t } = useTranslation("projects");

  return (
    <div className={style.projects}>
      <div className={style.project}>
        <h2>
          <Link href={"/projects/salary"}>
            <a>1. {t("1")}</a>
          </Link>
        </h2>
      </div>
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
