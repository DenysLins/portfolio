import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/about.module.scss";

const Contact = () => {
  const { t } = useTranslation("contact");

  return (
    <div className={style.container}>
      <h1>{t("email")}</h1>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "contact",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Contact;
