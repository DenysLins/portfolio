import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { styled } from "@mui/system";

const FourOhFourContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  "& span": {
    fontSize: "1.5rem",
  },
  "@media (min-width: 900px)": {
    "& span": {
      fontSize: "3rem",
    },
  },
});

const FourOhFour = () => {
  const { t } = useTranslation("common");
  return (
    <FourOhFourContainer>
      <span>{t("not_found")}</span>
    </FourOhFourContainer>
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
