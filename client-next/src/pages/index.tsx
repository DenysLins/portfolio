import React from "react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import style from "@/styles/Home.module.scss";
import { Box, Container } from "@mui/material";
import Link from "next/link";

const Home = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <Container maxWidth="xl" disableGutters>
      <Box className={style.box} sx={{ display: { xs: "flex", md: "none" } }}>
        <span className={style.name}>{t("name")}</span>
        <span className={style.title}>{t("title")}</span>
      </Box>
      <Box
        className={style.box}
        sx={{ display: { xs: "none", md: "flex" }, fontSize: "8px" }}
      >
        <span className={style.name__md}>{t("name")}</span>
        <span className={style.title__md}>{t("title")}</span>
      </Box>
      <Box className={style.flags}>
        <Link href="/" locale={(router.locale = "pt")}>
          <img
            className={style.flag}
            src="img/brazil-flag-waving-xs.png"
            alt="brazil-flag"
          />
        </Link>
        <Link href="/" locale={(router.locale = "en")}>
          <img
            className={style.flag}
            src="img/united-states-of-america-flag-waving-xs.png"
            alt="united-states-of-america-flag"
          />
        </Link>
      </Box>
    </Container>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "footer",
        "navigation",
      ])),
    },
  };
}

export default Home;
