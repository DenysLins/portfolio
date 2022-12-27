import styles from "@/styles/components/sweepstakes.module.scss";
import { createSweepstakesFrontValidationSchema } from "@/utils/validations";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SweepstakesListForm = styled("div")({
  margin: "1rem",
  "@media only screen and (min-width: 900px)": {
    width: "800px",
  },
});

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

function SweepstakesAdmin() {
  const { t } = useTranslation("sweepstakes");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sweepstakesList, setSweepstakesList] = useState([]);
  const [championships, setChampionships] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      championship: "",
    },
    validationSchema: createSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      const c = championships.find(
        (c) => c.campeonato_id === values.championship
      );
      const payload = {
        name: values.name,
        championship: c.edicao_atual.nome_popular,
        championshipId: values.championship,
        logo: c.logo,
      };
      axios
        .post("/api/sweepstakes", payload)
        .then(() => {
          setOpen(false);
          formik.setValues({ name: "", championship: "" });
          formik.setTouched({ name: false, championship: false });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  useEffect(() => {
    axios
      .get("/api/sweepstakes")
      .then((res) => {
        setSweepstakesList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [open]);

  useEffect(() => {
    axios
      .get("/api/sweepstakes/championships")
      .then((res) => {
        setChampionships(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    formik.setValues({ name: "", championship: "" });
    formik.setTouched({ name: false, championship: false });
  };

  const handleCardClick = (event, card) => {
    event.stopPropagation();
    router.push(`/projects/sweepstakes/${card._id}`);
  };

  const handleDelete = (event, card) => {
    event.stopPropagation();
    axios
      .delete(`/api/sweepstakes/${card._id}`)
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

  return (
    <>
      <SweepstakesListHeader>
        <SweepstakesListTitle>{t("sweepstakes")}</SweepstakesListTitle>
        <IconButton
          aria-label="add"
          color="primary"
          onClick={() => setOpen(true)}
          size="large"
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </SweepstakesListHeader>
      <SweepstakesListCardContainer>
        {sweepstakesList.map((s) => {
          return (
            <SweepstakesCard key={s._id} onClick={(e) => handleCardClick(e, s)}>
              <IconButton
                aria-label="delete"
                color="error"
                size="large"
                sx={{
                  position: "absolute",
                  bottom: "0.3rem",
                  right: "0.3rem",
                  zIndex: "1000",
                }}
                onClick={(e) => handleDelete(e, s)}
              >
                <DeleteIcon />
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
      <Dialog onClose={handleClose} open={open} maxWidth={"xl"}>
        <SweepstakesListForm>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              className={styles.textfield}
              margin="dense"
              id="name"
              name="name"
              label={t("sweepstake_name")}
              placeholder={t("sweepstake_name")}
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              className={styles.textfield}
              margin="dense"
              id="championship"
              select
              name="championship"
              label={t("sweepstake_championship")}
              placeholder={t("sweepstake_championship")}
              type="text"
              value={formik.values.championship}
              onChange={formik.handleChange}
              error={
                formik.touched.championship &&
                Boolean(formik.errors.championship)
              }
              helperText={
                formik.touched.championship && formik.errors.championship
              }
            >
              <MenuItem key={""} value={""}>
                {t("sweepstake_selection")}
              </MenuItem>
              {championships.map((c) => {
                return (
                  <MenuItem
                    key={c.campeonato_id}
                    value={c.campeonato_id}
                    sx={{ maxWidth: "390px" }}
                  >
                    <Typography variant="inherit" noWrap>
                      {c.edicao_atual.nome_popular}
                    </Typography>
                  </MenuItem>
                );
              })}
            </TextField>
            <Button
              className={styles.button}
              variant="contained"
              fullWidth
              type="submit"
              color="primary"
            >
              {t("sweepstake_create")}
            </Button>
          </form>
        </SweepstakesListForm>
      </Dialog>
    </>
  );
}

export default SweepstakesAdmin;
