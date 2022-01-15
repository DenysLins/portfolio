import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/About.module.scss";

const Blogs = () => {
  const { t } = useTranslation("blog");

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
        "blog",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Blogs;
