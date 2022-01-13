import React from "react";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Box, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import style from "@/styles/Home.module.scss";

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
        <span className={style.name__xl}>{t("name")}</span>
        <span className={style.title__xl}>{t("title")}</span>
      </Box>
      <Box className={style.flags}>
        <Link href="/" locale={(router.locale = "pt")} passHref>
          <Image
            className={style.flag}
            src="img/brazil-flag-waving-xs.png"
            alt="brazil-flag"
          />
        </Link>
        <Link href="/" locale={(router.locale = "en")} passHref>
          <Image
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
