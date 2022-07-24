import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ConstructionIcon from "@mui/icons-material/Construction";

import style from "@/styles/pages/resume.module.scss";

const Resume = () => {
  const { t } = useTranslation("resume");

  return (
    <div className={style.resume}>
      <ConstructionIcon />
      <h2>{t("title")}</h2>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "resume",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Resume;
