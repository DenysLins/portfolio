import React from "react";
import { useTranslation } from "next-i18next";

import style from "@/styles/Footer.module.scss";

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <>
      <footer>
        <div className={style.footer}>
          <a
            className={style.a}
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("next")}
          </a>
          <a
            className={style.a}
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("vercel")}
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
