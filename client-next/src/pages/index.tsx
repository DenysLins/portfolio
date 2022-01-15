import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, Container } from "@mui/material";

import style from "@/styles/Home.module.scss";

const Home = () => {
  const { t } = useTranslation("common");

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
        <span className={style.name__xl}>{t("name")}</span>
        <span className={style.title__xl}>{t("title")}</span>
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
