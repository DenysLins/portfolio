import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import Link from "next/link";

import style from "@/styles/components/sweepstakes.forgot.module.scss";
import { forgotSweepstakesFrontValidationSchema } from "src/utils/validations";
import { DEFAULT_TIMEOUT } from "@/utils/constants";

const SweepstakesForgot = () => {
  const { t } = useTranslation("sweepstakes");
  const [emailNotFound, setEmailNotFound] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [error, setError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      axios
        .post("/api/sweepstakes/forgot", values)
        .then(() => {
          handleEmailSentAlert();
        })
        .catch((e) => {
          if (e.response.status === 404) {
            handleEmailNotFoundAlert();
          } else {
            handleErrorAlert();
          }
        });
    },
  });

  const handleEmailNotFoundAlert = () => {
    setEmailSent(false);
    setError(false);
    setEmailNotFound(true);
    setTimeout(() => {
      setEmailNotFound(false);
    }, DEFAULT_TIMEOUT);
  };

  const handleEmailSentAlert = () => {
    setEmailNotFound(false);
    setError(false);
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, DEFAULT_TIMEOUT);
  };

  const handleErrorAlert = () => {
    setEmailSent(false);
    setEmailNotFound(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, DEFAULT_TIMEOUT);
  };

  return (
    <div className={style.form}>
      <form onSubmit={formik.handleSubmit}>
        <Collapse in={error}>
          <Alert
            className={style.alert}
            severity="error"
            onClose={() => setError(false)}
          >
            {t("generic_error")}
          </Alert>
        </Collapse>
        <Collapse in={emailNotFound}>
          <Alert
            className={style.alert}
            severity="warning"
            onClose={() => setEmailNotFound(false)}
          >
            {t("email_not_found")}
          </Alert>
        </Collapse>
        <Collapse in={emailSent}>
          <Alert
            className={style.alert}
            severity="success"
            onClose={() => setEmailSent(false)}
          >
            {t("email_sent")}
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
        </div>
        <Button
          className={style.Button}
          variant="contained"
          fullWidth
          type="submit"
          color="warning"
        >
          {t("send_password")}
        </Button>
      </form>
      <div className={style.login}>
        <Link href={"/projects/sweepstakes/auth/signup"}>
          <span className={style.register}>{t("not_registered")}</span>
        </Link>
      </div>
    </div>
  );
};

export default SweepstakesForgot;
