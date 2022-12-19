import * as React from "react";
import { useTranslation } from "next-i18next";

import style from "@/styles/components/sweepstakes.module.scss";

const Sweepstakes = () => {
  const { t } = useTranslation("sweepstakes");

  return <h1>{t("sweepstakes")}</h1>;
};

export default Sweepstakes;
