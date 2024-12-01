import { Turnstile } from '@marsidev/react-turnstile';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import InputMask from 'react-input-mask';

import styles from '@/styles/components/salary.module.scss';
import { currencies } from 'src/utils/constants';
import { salaryFrontValidationSchema } from 'src/utils/validations';

const Salary = () => {
  const ref = React.useRef();
  const { t, i18n } = useTranslation('salary');
  const [totalSalaryInFinalCurrency, setTotalSalaryInFinalCurrency] =
    React.useState('');
  const [totalSalaryInOriginalCurrency, setTotalSalaryInOriginalCurrency] =
    React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [isValidCaptcha, setIsValidCaptcha] = React.useState(false);
  const [token, setToken] = React.useState('');
  const valueMask = i18n.language === 'en' ? '99.99' : '99,99';

  React.useEffect(() => {
    if (token) {
      axios
        .post('/api/salary/captcha', { token })
        .then((res) => {
          setIsValidCaptcha(true);
        })
        .catch((err) => {
          console.error(err);
          setIsValidCaptcha(false);
        });
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      hours: '',
      minutes: '',
      seconds: '',
      valuePerHour: '',
      originalCurrency: 'USD',
      finalCurrency: 'BRL',
    },
    validationSchema: salaryFrontValidationSchema(t),
    onSubmit: (values) => {
      const newValues = {
        ...values,
        hours: values.hours ? Number(values.hours) : 0,
        minutes: values.minutes ? Number(values.minutes) : 0,
        seconds: values.seconds ? Number(values.seconds) : 0,
        valuePerHour: Number(values.valuePerHour.replace(',', '.')),
      };
      setLoading(true);
      axios
        .post('/api/salary', newValues)
        .then((res) => {
          const totalFinalCurrency =
            i18n.language === 'pt'
              ? Intl.NumberFormat('pt-BR').format(
                  res.data.totalValueInFinalCurrency
                )
              : Intl.NumberFormat('en-US').format(
                  res.data.totalValueInFinalCurrency
                );
          setLoading(false);
          setTotalSalaryInFinalCurrency(totalFinalCurrency);

          const totalOriginalCurrency =
            i18n.language === 'pt'
              ? Intl.NumberFormat('en-US').format(
                  res.data.totalValueInOriginalCurrency
                )
              : Intl.NumberFormat('pt-BR').format(
                  res.data.totalValueInOriginalCurrency
                );
          setTotalSalaryInOriginalCurrency(totalOriginalCurrency);
          ref.current?.reset();
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    },
  });

  return (
    <div className={styles.form}>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.values}>
          <TextField
            className={styles['text-field']}
            margin="dense"
            id="hours"
            name="hours"
            label={t('hours')}
            placeholder="1 - 999"
            value={formik.values.hours}
            onChange={formik.handleChange}
            error={formik.touched.hours && Boolean(formik.errors.hours)}
            helperText={formik.touched.hours && formik.errors.hours}
          />
          <TextField
            className={styles['text-field']}
            margin="dense"
            id="minutes"
            name="minutes"
            label={t('minutes')}
            placeholder="0 - 59"
            value={formik.values.minutes}
            onChange={formik.handleChange}
            error={formik.touched.minutes && Boolean(formik.errors.minutes)}
            helperText={formik.touched.minutes && formik.errors.minutes}
          />
          <TextField
            className={styles['text-field']}
            margin="dense"
            id="seconds"
            name="seconds"
            label={t('seconds')}
            placeholder="0 - 59"
            value={formik.values.seconds}
            onChange={formik.handleChange}
            error={formik.touched.seconds && Boolean(formik.errors.seconds)}
            helperText={formik.touched.seconds && formik.errors.seconds}
          />
          <InputMask
            mask={valueMask}
            value={formik.values.valuePerHour}
            onChange={formik.handleChange}
          >
            {() => (
              <TextField
                className={styles['text-field']}
                margin="dense"
                id="valuePerHour"
                name="valuePerHour"
                label={t('value')}
                placeholder={t('value_placeholder')}
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
        <div className={styles.currencies}>
          <TextField
            className={styles['text-field']}
            select
            margin="dense"
            id="originalCurrency"
            name="originalCurrency"
            label={t('from')}
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
            className={styles['text-field']}
            select
            margin="dense"
            id="finalCurrency"
            name="finalCurrency"
            label={t('to')}
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
          className={styles.button}
          variant="contained"
          fullWidth
          type="submit"
          disabled={!isValidCaptcha}
        >
          {t('submit')}
        </Button>
      </form>
      <div className={styles.result}>
        {totalSalaryInFinalCurrency ? (
          <div className={styles['total-salary']}>
            {formik.values.finalCurrency === 'BRL' ? '$ ' : 'R$ '}
            {totalSalaryInOriginalCurrency}
            {' = '}
            {formik.values.finalCurrency === 'BRL' ? 'R$ ' : '$ '}
            {totalSalaryInFinalCurrency}
          </div>
        ) : (
          loading && (
            <Skeleton sx={{ bgcolor: 'grey.800' }}>
              <div className={styles['total-salary']}>
                $ 1.000,00 = R$ 10,000.00
              </div>
            </Skeleton>
          )
        )}
      </div>
      <div className={styles.captcha}>
        <Turnstile
          ref={ref}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onSuccess={setToken}
        />
      </div>
    </div>
  );
};

export default Salary;
