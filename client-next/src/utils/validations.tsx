import * as yup from "yup";

const currencies = ["USD", "BRL"];

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
        new RegExp("^(([0-9]{1,3}$)|([0-9]{1,3}[.][0-9]{1,2}$))"),
        "Value must be in the format 99.99 or 999.00"
      ),
    originalCurrency: yup
      .string()
      .required("Original currency is required")
      .oneOf(currencies),
    finalCurrency: yup
      .string()
      .notOneOf(
        [yup.ref("originalCurrency"), null],
        "Original and final currency must be different"
      )
      .required("Final currency is required")
      .oneOf(currencies),
  });
};
