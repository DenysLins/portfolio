import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import axios from "axios";

import style from "@/styles/components/sweepstakes.signup.module.scss";
import { loginSweepstakesFrontValidationSchema } from "src/utils/validations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { DEFAULT_TIMEOUT } from "@/utils/constants";

const SweepstakesSignUp = () => {
  const { t } = useTranslation("sweepstakes");
  const [userRegistered, setUserRegistered] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      axios
        .post("/api/sweepstakes/signup", values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          if (e.response.status === 409) {
            handleUserRegistered();
          }
        });
    },
  });

  const handleUserRegistered = () => {
    setUserRegistered(true);
    setTimeout(() => {
      setUserRegistered(false);
    }, DEFAULT_TIMEOUT);
  };

  return (
    <>
      <div className={style.form}>
        <form onSubmit={formik.handleSubmit}>
          <Collapse in={userRegistered}>
            <Alert
              className={style.alert}
              severity="warning"
              onClose={() => {
                setUserRegistered(false);
              }}
            >
              {t("email_already_registered")}
            </Alert>
          </Collapse>
          <div>
            <TextField
              className={style.TextField}
              margin="dense"
              id="email"
              name="email"
              label={t("email_placeholder")}
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              className={style.TextField}
              margin="dense"
              id="password"
              name="password"
              label={t("password_placeholder")}
              placeholder={t("password_placeholder")}
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <Button
            className={style.Button}
            variant="contained"
            fullWidth
            type="submit"
            color="success"
          >
            {t("register")}
          </Button>
        </form>
        <div className={style.login}>
          <Link href={"/projects/sweepstakes/login"}>
            <span className={style.register}>{t("already_registered")}</span>
          </Link>
          <Link href={"/projects/sweepstakes/forgot"}>
            <span className={style.forgot}>{t("forgot_password")}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SweepstakesSignUp;
