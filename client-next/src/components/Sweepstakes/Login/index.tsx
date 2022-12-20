import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import axios from "axios";

import style from "@/styles/components/sweepstakes.login.module.scss";
import { loginSweepstakesFrontValidationSchema } from "src/utils/validations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

const SweepstakesLogin = () => {
  const { t } = useTranslation("sweepstakes");
  const [loading, setLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSweepstakesFrontValidationSchema(t),
    onSubmit: (values) => {
      setLoading(true);
      axios.post("/api/sweepstakes/login", values).then((res) => {
        setLoading(false);
      });
    },
  });

  return (
    <div className={style.form}>
      <form onSubmit={formik.handleSubmit}>
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
