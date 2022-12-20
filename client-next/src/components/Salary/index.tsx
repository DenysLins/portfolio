import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

import style from "@/styles/components/salary.module.scss";
import { salaryFrontValidationSchema } from "src/utils/validations";
import { currencies } from "src/utils/constants";

const Salary = () => {
  const { t, i18n } = useTranslation("salary");
  const [totalSalaryInFinalCurrency, setTotalSalaryInFinalCurrency] =
    React.useState("");
  const [totalSalaryInOriginalCurrency, setTotalSalaryInOriginalCurrency] =
    React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [previousValue, setPreviousValue] = React.useState(-1);
  const [timeMask, setTimeMask] = React.useState("99:99:99");
  const valueMask = i18n.language === "en" ? "99.99" : "99,99";

  const formik = useFormik({
    initialValues: {
      totalTime: "",
      valuePerHour: "",
      originalCurrency: "USD",
      finalCurrency: "BRL",
    },
    validationSchema: salaryFrontValidationSchema(t),
    onSubmit: (values) => {
      const newValues = {
        ...values,
        valuePerHour: values.valuePerHour.replace(",", "."),
      };
      setLoading(true);
      axios.post("/api/salary", newValues).then((res) => {
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
    const target = e.target;
    const value = target.value;
    let numberOfUnderline = value.match(regex) ? value.match(regex)?.length : 0;

    if (
      target.id === "totalTime" &&
      numberOfUnderline === 0 &&
      previousValue === numberOfUnderline
    ) {
      setTimeMask("999:99:99");
    }
    if (
      target.id === "totalTime" &&
      numberOfUnderline === 1 &&
      value.length === 9
    ) {
      setTimeMask("99:99:99");
    }

    setPreviousValue(numberOfUnderline);
  };

  return (
    <div className={style.form}>
      <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
        <div>
          <InputMask
            mask={timeMask}
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
                placeholder="hh:mm:ss - hhh:mm:ss"
                error={
                  formik.touched.totalTime && Boolean(formik.errors.totalTime)
                }
                helperText={formik.touched.totalTime && formik.errors.totalTime}
              />
            )}
          </InputMask>
          <InputMask
            mask={valueMask}
            value={formik.values.valuePerHour}
            onChange={formik.handleChange}
          >
            {() => (
              <TextField
                className={style.TextField}
                margin="dense"
                id="valuePerHour"
                name="valuePerHour"
                label={t("value")}
                placeholder={t("value_placeholder")}
                error={
                  formik.touched.valuePerHour &&
                  Boolean(formik.errors.valuePerHour)
                }
                helperText={
                  formik.touched.valuePerHour && formik.errors.valuePerHour
                }
              />
            )}
          </InputMask>
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
