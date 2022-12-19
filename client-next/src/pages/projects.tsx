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
        <ul>
          <li>
            <Link href={"/projects/salary"}>1. {t("1")}</Link>
          </li>
          <li>
            <Link href={"/projects/sweepstakes"}>2. {t("2")}</Link>
          </li>
        </ul>
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
