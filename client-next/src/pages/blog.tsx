import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ConstructionIcon from "@mui/icons-material/Construction";

import style from "@/styles/blog.module.scss";

const Blogs = () => {
  const { t } = useTranslation("blog");

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
        "blog",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Blogs;
