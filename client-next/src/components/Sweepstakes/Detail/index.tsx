import { styled } from "@mui/system";
import { useTranslation } from "next-i18next";

const SweepstakesListHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "1rem 0",
});

const SweepstakesListTitle = styled("span")({
  fontSize: "1.5rem",
});

function SweepstakesDetail({ sweepstake }) {
  const { t } = useTranslation("sweepstakes");

  return (
    <>
      <SweepstakesListHeader>
        <SweepstakesListTitle>{t("sweepstakes")}</SweepstakesListTitle>
      </SweepstakesListHeader>
      <h1>{sweepstake?.name}</h1>
    </>
  );
}

export default SweepstakesDetail;
