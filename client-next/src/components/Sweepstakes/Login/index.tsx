import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import axios from "axios";

import style from "@/styles/components/sweepstakes.login.module.scss";
import { loginSweepstakesFrontValidationSchema } from "src/utils/validations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { DEFAULT_TIMEOUT } from "@/utils/constants";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

const SweepstakesLogin = () => {
  const { t } = useTranslation("sweepstakes");
  const [userUnauthorized, setUserUnauthorized] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      axios
        .post("/api/sweepstakes/login", values)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            handleUserUnauthorized();
          }
          if (e.response.status === 404) {
            handleUserNotFound();
          }
        });
    },
  });

  const handleUserUnauthorized = () => {
    setUserUnauthorized(true);
    setUserNotFound(false);
    setTimeout(() => {
      setUserUnauthorized(false);
    }, DEFAULT_TIMEOUT);
  };

  const handleUserNotFound = () => {
    setUserNotFound(true);
    setUserUnauthorized(false);
    setTimeout(() => {
      setUserNotFound(false);
    }, DEFAULT_TIMEOUT);
  };

  return (
    <div className={style.form}>
      <form onSubmit={formik.handleSubmit}>
        <Collapse in={userUnauthorized}>
          <Alert
            className={style.alert}
            severity="warning"
            onClose={() => setUserUnauthorized(false)}
          >
            {t("wrong_password")}
          </Alert>
        </Collapse>
        <Collapse in={userNotFound}>
          <Alert
            className={style.alert}
            severity="warning"
            onClose={() => setUserNotFound(false)}
          >
            {t("email_not_found")}
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
          color="primary"
        >
          {t("login")}
        </Button>
      </form>

      <div className={style.login}>
        <Link href={"/projects/sweepstakes/signup"}>
          <span className={style.register}>{t("not_registered")}</span>
        </Link>
        <Link href={"/projects/sweepstakes/forgot"}>
          <span className={style.forgot}>{t("forgot_password")}</span>
        </Link>
      </div>
    </div>
  );
};

export default SweepstakesLogin;
