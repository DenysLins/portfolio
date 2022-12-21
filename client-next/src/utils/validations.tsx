import * as yup from "yup";
import { currencies } from "./constants";

const currenciesList = currencies.map((c) => c.value);

export const salaryFrontValidationSchema = (t) => {
  return yup.object({
    totalTime: yup
      .string()
      .required(t("total_time"))
      .matches(/^(([0-9]{1,3}:[0-9]{2}:[0-9]{2}$))/, t("time_validation")),
    valuePerHour: yup
      .string()
      .required(t("value_per_hour"))
      .matches(new RegExp(t("regex")), t("value_validation")),
    originalCurrency: yup.string().required(t("original_currency")),
    finalCurrency: yup
      .string()
      .notOneOf([yup.ref("originalCurrency"), null], t("diff_currency"))
      .required(t("final_currency")),
  });
};

export const salaryBackValidationSchema = () => {
  return yup.object({
    totalTime: yup
      .string()
      .required("Total time is required")
      .matches(
        /^(([0-9]{1,3}:[0-9]{2}:[0-9]{2}$))/,
        "Time must be in the format hh:mm:ss or hhh:mn:ss"
      ),
    valuePerHour: yup
      .string()
      .required("Value per hour is required")
      .matches(
        /^(([0-9]{1,3}$)|([0-9]{1,3}[.][0-9]{1,2}$))/,
        "Value must be in the format 99.99 or 999.00"
      ),
    originalCurrency: yup
      .string()
      .required("Original currency is required")
      .oneOf(currenciesList),
    finalCurrency: yup
      .string()
      .notOneOf(
        [yup.ref("originalCurrency"), null],
        "Original and final currency must be different"
      )
      .required("Final currency is required")
      .oneOf(currenciesList),
  });
};

const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const loginSweepstakesFrontValidationSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .required(t("email_required"))
      .max(255, t("max_length"))
      .matches(emailRegex, t("email_validation")),
    password: yup
      .string()
      .required(t("password_required"))
      .max(255, t("max_length"))
      .matches(passwordRegex, t("password_validation")),
  });
};

export const loginSweepstakesValidationSchema = () => {
  return yup.object({
    email: yup
      .string()
      .required("Email is required")
      .max(255, "Maximum character allowed is 255")
      .matches(emailRegex, "Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .max(255, "Maximum character allowed is 255")
      .matches(
        passwordRegex,
        "Password must have 8 or more characters, uppercases, lowercases and numbers"
      ),
  });
};

export const forgotSweepstakesFrontValidationSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .required(t("email_required"))
      .max(255, t("max_length"))
      .matches(emailRegex, t("email_validation")),
  });
};

export const forgotSweepstakesValidationSchema = () => {
  return yup.object({
    email: yup
      .string()
      .required("Email is required")
      .max(255, "Maximum character allowed is 255")
      .matches(emailRegex, "Invalid email"),
  });
};
