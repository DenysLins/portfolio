import * as React from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import axios from "axios";

import style from "@/styles/components/salary.module.scss";

const Salary = () => {
  const { t } = useTranslation("salary");
  const [currencies, setCurrencies] = React.useState([]);
  const [totalSalary, setTotalSalary] = React.useState("");

  useEffect(() => {
    axios.get("/api/salary/currencies").then((res) => {
      setCurrencies(res.data);
      formik.setFieldValue("originalCurrency", "USD");
      formik.setFieldValue("finalCurrency", "BRL");
    });
  }, []);

  const validationSchema = yup.object({
    totalTime: yup.string().required(t("total_time")).nullable(),
    valuePerHour: yup.string().required(t("value_per_hour")).nullable(),
    originalCurrency: yup.string().required(t("original_currency")).nullable(),
    finalCurrency: yup.string().required(t("final_currency")).nullable(),
  });

  const formik = useFormik({
    initialValues: {
      totalTime: "",
      valuePerHour: "",
      originalCurrency: "",
      finalCurrency: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post("/api/salary/currencies", values).then((res) => {
        setTotalSalary(res.data.totalValue);
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
            id="totalTime"
            name="totalTime"
            label={t("time")}
            placeholder="hh:mm:ss"
            value={formik.values.totalTime}
            onChange={formik.handleChange}
            error={formik.touched.totalTime && Boolean(formik.errors.totalTime)}
            helperText={formik.touched.totalTime && formik.errors.totalTime}
          />
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
              <MenuItem key={option.value} value={option.value}>
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
              <MenuItem key={option.value} value={option.value}>
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
          Submit
        </Button>
        <div>
          {totalSalary && (
            <div className={style.totalSalary}>{totalSalary}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Salary;
