import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styled } from "@mui/system";

const BoxContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  "& span:first-child": {
    fontSize: "3rem",
  },
  "& span:nth-child(2)": {
    fontSize: "1.5rem",
  },
  "@media (min-width: 900px)": {
    "& span:first-child": {
      fontSize: "9rem",
    },
    "& span:nth-child(2)": {
      fontSize: "3rem",
    },
  },
});

const Home = () => {
  const { t } = useTranslation("common");
  return (
    <BoxContainer>
      <span>{t("name")}</span>
      <span>{t("title")}</span>
    </BoxContainer>
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
