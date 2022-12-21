import * as React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";

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
  const router = useRouter();
  const [userUnauthorized, setUserUnauthorized] = React.useState(false);
  const [userNotFound, setUserNotFound] = React.useState(false);
  const [error, setError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      }).then((res) => {
        if (res.error) {
          if (res.error.toString().includes("401")) {
            handleUserUnauthorized();
          } else if (res.error.toString().includes("404")) {
            handleUserNotFound();
          } else {
            handleErrorAlert();
          }
        } else {
          router.push("/projects/sweepstakes");
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

  const handleErrorAlert = () => {
    setUserUnauthorized(false);
    setUserNotFound(false);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, DEFAULT_TIMEOUT);
  };

  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "http://localhost:3000/projects/sweepstakes",
    });
  };

  return (
    <>
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

        <Button
          className={style.Button}
          variant="outlined"
          fullWidth
          type="submit"
          color="primary"
          onClick={handleGoogleSignIn}
        >
          Google
        </Button>

        <div className={style.login}>
          <Link href={"/projects/sweepstakes/auth/signup"}>
            <span className={style.register}>{t("not_registered")}</span>
          </Link>
          <Link href={"/projects/sweepstakes/auth/forgot"}>
            <span className={style.forgot}>{t("forgot_password")}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SweepstakesLogin;
