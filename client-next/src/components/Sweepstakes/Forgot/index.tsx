import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import * as React from "react";

import styles from "@/styles/components/sweepstakes.module.scss";
import { DEFAULT_TIMEOUT } from "@/utils/constants";
import styled from "@emotion/styled";
import { forgotSweepstakesFrontValidationSchema } from "src/utils/validations";

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

  const EmailTextField = styled(TextField)({
    width: "100%",
  });

  return (
    <div className={styles.form}>
      <form onSubmit={formik.handleSubmit}>
        <Collapse in={error}>
          <Alert
            className={styles.alert}
            severity="error"
            onClose={() => setError(false)}
          >
            {t("generic_error")}
          </Alert>
        </Collapse>
        <Collapse in={emailNotFound}>
          <Alert
            className={styles.alert}
            severity="warning"
            onClose={() => setEmailNotFound(false)}
          >
            {t("email_not_found")}
          </Alert>
        </Collapse>
        <Collapse in={emailSent}>
          <Alert
            className={styles.alert}
            severity="success"
            onClose={() => setEmailSent(false)}
          >
            {t("email_sent")}
          </Alert>
        </Collapse>
        <EmailTextField
          className={styles.email}
          margin="dense"
          id="email"
          name="email"
          label={t("email_placeholder")}
          placeholder="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          className={styles.button}
          variant="contained"
          fullWidth
          type="submit"
          color="warning"
        >
          {t("send_password")}
        </Button>
      </form>
      <div className={styles.login}>
        <Link href={"/projects/sweepstakes/auth/logon"}>
          <span className={styles.register}>{t("not_registered")}</span>
        </Link>
      </div>
    </div>
  );
};

export default SweepstakesForgot;
