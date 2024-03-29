import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

import style from "@/styles/components/salary.module.scss";

const currencies = [
  { value: "USD", id: 1 },
  { value: "BRL", id: 2 },
];

const Salary = () => {
  const { t, i18n } = useTranslation("salary");
  const [totalSalaryInFinalCurrency, setTotalSalaryInFinalCurrency] =
    React.useState("");
  const [totalSalaryInOriginalCurrency, setTotalSalaryInOriginalCurrency] =
    React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [previousValue, setPreviousValue] = React.useState(-1);
  const [mask, setMask] = React.useState("99:99:99");

  const validationSchema = yup.object({
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

  const formik = useFormik({
    initialValues: {
      totalTime: "",
      valuePerHour: "",
      originalCurrency: "USD",
      finalCurrency: "BRL",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newValues = {
        ...values,
        valuePerHour: values.valuePerHour.replace(",", "."),
      };
      setLoading(true);
      axios.post("/api/salary/currencies", newValues).then((res) => {
        const totalFinalCurrency =
          i18n.language === "pt"
            ? Intl.NumberFormat("pt-BR").format(
                res.data.totalValueInFinalCurrency
              )
            : Intl.NumberFormat("en-US").format(
                res.data.totalValueInFinalCurrency
              );
        setLoading(false);
        setTotalSalaryInFinalCurrency(totalFinalCurrency);

        const totalOriginalCurrency =
          i18n.language === "pt"
            ? Intl.NumberFormat("en-US").format(
                res.data.totalValueInOriginalCurrency
              )
            : Intl.NumberFormat("pt-BR").format(
                res.data.totalValueInOriginalCurrency
              );
        setTotalSalaryInOriginalCurrency(totalOriginalCurrency);
      });
    },
  });

  const handleOnChange = (e) => {
    const regex = /[_]/g;
    const value = e.target.value;
    let numberOfUnderline = value.match(regex) ? value.match(regex)?.length : 0;

    if (numberOfUnderline === 0 && previousValue === numberOfUnderline) {
      setMask("999:99:99");
    }
    if (numberOfUnderline === 1 && value.length === 9) {
      setMask("99:99:99");
    }

    setPreviousValue(numberOfUnderline);
  };

  return (
    <div className={style.form}>
      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div>
          <InputMask
            mask={mask}
            value={formik.values.totalTime}
            onChange={formik.handleChange}
          >
            {() => (
              <TextField
                className={style.TextField}
                margin="dense"
                id="totalTime"
                name="totalTime"
                label={t("time")}
                placeholder="hh:mm:ss"
                error={
                  formik.touched.totalTime && Boolean(formik.errors.totalTime)
                }
                helperText={formik.touched.totalTime && formik.errors.totalTime}
              />
            )}
          </InputMask>
          <TextField
            className={style.TextField}
            margin="dense"
            id="valuePerHour"
            name="valuePerHour"
            label={t("value")}
            placeholder={t("value_placeholder")}
            value={formik.values.valuePerHour}
            onChange={formik.handleChange}
            error={
              formik.touched.valuePerHour && Boolean(formik.errors.valuePerHour)
            }
            helperText={
              formik.touched.valuePerHour && formik.errors.valuePerHour
            }
          />
        </div>
        <div>
          <TextField
            className={style.TextField}
            select
            margin="dense"
            id="originalCurrency"
            name="originalCurrency"
            label={t("from")}
            value={formik.values.originalCurrency}
            onChange={formik.handleChange}
            error={
              formik.touched.originalCurrency &&
              Boolean(formik.errors.originalCurrency)
            }
            helperText={
              formik.touched.originalCurrency && formik.errors.originalCurrency
            }
          >
            {currencies.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            className={style.TextField}
            select
            margin="dense"
            id="finalCurrency"
            name="finalCurrency"
            label={t("to")}
            value={formik.values.finalCurrency}
            onChange={formik.handleChange}
            error={
              formik.touched.finalCurrency &&
              Boolean(formik.errors.finalCurrency)
            }
            helperText={
              formik.touched.finalCurrency && formik.errors.finalCurrency
            }
          >
            {currencies.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <Button
          className={style.Button}
          variant="contained"
          fullWidth
          type="submit"
        >
          {t("submit")}
        </Button>
      </form>
      <div className={style.result}>
        {totalSalaryInFinalCurrency ? (
          <div className={style.totalSalary}>
            {formik.values.finalCurrency === "BRL" ? "$ " : "R$ "}
            {totalSalaryInOriginalCurrency}
            {" = "}
            {formik.values.finalCurrency === "BRL" ? "R$ " : "$ "}
            {totalSalaryInFinalCurrency}
          </div>
        ) : (
          loading && (
            <Skeleton sx={{ bgcolor: "grey.800" }}>
              <div className={style.totalSalary}>$ 1.000,00 = R$ 10,000.00</div>
            </Skeleton>
          )
        )}
      </div>
    </div>
  );
};

export default Salary;
