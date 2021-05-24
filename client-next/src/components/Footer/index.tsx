import React from "react";
import { useTranslation } from 'next-i18next'

import style from "../../styles/Footer.module.css";


const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <footer>
        <div className={style.footer}>
          <a className={style.a}
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("next")}
          </a>
          <a className={style.a}
            href="https://app.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("netlify")}
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
