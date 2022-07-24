import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import style from "@/styles/pages/contact.module.scss";

const Contact = () => {
  const { t } = useTranslation("contact");

  return (
    <div className={style.container}>
      <div className={style.contact}>
        <EmailIcon />
        <a
          target="_blank"
          href={`mailto:denyslins@gmail.com?subject=${t("subject")}`}
          rel="noopener noreferrer"
        >
          {t("email")}
        </a>
      </div>
      <div className={style.contact}>
        <TwitterIcon />
        <a
          target="_blank"
          href="https://twitter.com/Denys_Lins"
          rel="noopener noreferrer"
        >
          {t("twitter")}
        </a>
      </div>
      <div className={style.contact}>
        <LinkedInIcon />
        <a
          target="_blank"
          href="https://www.linkedin.com/in/denyslins"
          rel="noopener noreferrer"
        >
          {t("linkedin")}
        </a>
      </div>
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
