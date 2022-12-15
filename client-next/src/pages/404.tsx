import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Box, Container } from "@mui/material";

import style from "@/styles/pages/404.module.scss";

const FourOhFour = () => {
  const { t } = useTranslation("common");

  return (
    <Container maxWidth="xl" disableGutters>
      <Box className={style.box} sx={{ display: { xs: "flex", md: "none" } }}>
        <span className={style.info}>{t("not_found")}</span>
      </Box>
      <Box
        className={style.box}
        sx={{ display: { xs: "none", md: "flex" }, fontSize: "8px" }}
      >
        <span className={style.info__xl}>{t("not_found")}</span>
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

export default FourOhFour;
