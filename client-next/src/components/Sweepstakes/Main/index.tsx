import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SweepstakesListHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "1rem 0",
});

const SweepstakesListTitle = styled("span")({
  fontSize: "1.5rem",
});

const SweepstakesListCardContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  flexDirection: "column",
  width: "100%",
  maxHeight: "100%",
  overflow: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },

  "@media only screen and (min-width: 900px)": {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
});

const SweepstakesCard = styled(Card)({
  minHeight: "250px",
  width: "300px",
  marginBottom: "1rem",
  position: "relative",
  cursor: "pointer",
});

function SweepstakesMain() {
  const { t } = useTranslation("sweepstakes");
  const { data: session } = useSession();
  const sessionEmail = session.user.email;
  const router = useRouter();
  const [sweepstakesList, setSweepstakesList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/sweepstakes")
      .then((res) => {
        setSweepstakesList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleCardClick = (event, card) => {
    event.stopPropagation();
    if (
      card.users.find((u) => u.email === sessionEmail)?.status === "ALLOWED"
    ) {
      router.push(`/projects/sweepstakes/${card._id}`);
    }
  };

  const handleAdd = (event, card) => {
    event.stopPropagation();
    const payload = {
      email: sessionEmail,
    };
    axios
      .post(`/api/sweepstakes/${card._id}/users`, payload)
      .then(() => {
        axios
          .get("/api/sweepstakes")
          .then((res) => {
            setSweepstakesList(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const checkButtonDisabled = (card) => {
    if (card.users.flatMap((u) => u.email).includes(sessionEmail)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <SweepstakesListHeader>
        <SweepstakesListTitle>{t("sweepstakes")}</SweepstakesListTitle>
      </SweepstakesListHeader>
      <SweepstakesListCardContainer>
        {sweepstakesList.map((s) => {
          return (
            <SweepstakesCard key={s._id} onClick={(e) => handleCardClick(e, s)}>
              <IconButton
                aria-label="add"
                color="primary"
                size="large"
                sx={{
                  position: "absolute",
                  bottom: "0.3rem",
                  right: "0.3rem",
                  zIndex: "1000",
                }}
                onClick={(e) => handleAdd(e, s)}
                disabled={checkButtonDisabled(s)}
              >
                <AddCircleIcon />
              </IconButton>
              <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={s.logo}
                title={s.championship}
              />
              <CardContent>
                <Typography
                  variant="inherit"
                  noWrap
                  sx={{ fontSize: "1.5rem", margin: "1rem 0" }}
                >
                  {s.name}
                </Typography>
                <Typography variant="inherit" noWrap sx={{ maxWidth: "230px" }}>
                  {s.championship}
                </Typography>
              </CardContent>
            </SweepstakesCard>
          );
        })}
      </SweepstakesListCardContainer>
    </>
  );
}

export default SweepstakesMain;
