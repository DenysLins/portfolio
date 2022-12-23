import axios from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import * as React from "react";

import styles from "@/styles/components/sweepstakes.module.scss";
import { DEFAULT_TIMEOUT } from "@/utils/constants";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { loginSweepstakesFrontValidationSchema } from "src/utils/validations";

const SweepstakesSignUp = () => {
  const { t } = useTranslation("sweepstakes");
  const router = useRouter();
  const [userRegistered, setUserRegistered] = React.useState(false);
  const [error, setError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      axios
        .post("/api/sweepstakes/signup", values)
        .then(() => {
          signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          }).then((res) => {
            if (res.error) {
              handleErrorAlert();
            } else {
              router.push("/projects/sweepstakes");
            }
          });
        })
        .catch((e) => {
          if (e.response.status === 409) {
            handleUserRegistered();
          } else {
            handleErrorAlert();
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

  const handleErrorAlert = () => {
    setUserRegistered(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, DEFAULT_TIMEOUT);
  };

  return (
    <>
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
          <Collapse in={userRegistered}>
            <Alert
              className={styles.alert}
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
              className={styles.textfield}
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
              className={styles.textfield}
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
            className={styles.button}
            variant="contained"
            fullWidth
            type="submit"
            color="success"
          >
            {t("register")}
          </Button>
        </form>
        <div className={styles.login}>
          <Link href={"/projects/sweepstakes/auth/login"}>
            <span className={styles.register}>{t("already_registered")}</span>
          </Link>
          <Link href={"/projects/sweepstakes/auth/forgot"}>
            <span className={styles.forgot}>{t("forgot_password")}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SweepstakesSignUp;
