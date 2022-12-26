import styles from "@/styles/components/sweepstakes.module.scss";
import { createSweepstakesFrontValidationSchema } from "@/utils/validations";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
const Form = styled("div")({
  margin: "1rem",
});

const SweepstakesListHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  margin: "1rem 0",
});

const Title = styled("span")({
  fontSize: "1.5rem",
});

const SweepstakesCardContainer = styled("div")({
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
  minWidth: "300px",
  marginBottom: "1rem",
});

function SweepstakesAdmin() {
  const { t } = useTranslation("sweepstakes");
  const [open, setOpen] = useState(false);
  const [sweepstakesList, setSweepstakesList] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      championship: "",
    },
    validationSchema: createSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      axios
        .post("/api/sweepstakes", values)
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

  const handleClose = () => {
    setOpen(false);
    formik.setValues({ name: "", championship: "" });
    formik.setTouched({ name: false, championship: false });
  };

  const handleCardClick = (e) => {
    console.log(e);
  };

  return (
    <>
      <SweepstakesListHeader>
        <Title>{t("sweepstakes")}</Title>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => setOpen(true)}
          size="large"
        >
          <AddBoxIcon fontSize="large" />
        </IconButton>
      </SweepstakesListHeader>
      <SweepstakesCardContainer>
        {sweepstakesList.map((s) => {
          return (
            <SweepstakesCard key={s._id} onClick={() => handleCardClick(s._id)}>
              <CardContent>
                <h1>{s.name}</h1>
                <h2>{s.championship}</h2>
              </CardContent>
            </SweepstakesCard>
          );
        })}
      </SweepstakesCardContainer>
      <Dialog onClose={handleClose} open={open}>
        <Form>
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
            />
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
        </Form>
      </Dialog>
    </>
  );
}

export default SweepstakesAdmin;
