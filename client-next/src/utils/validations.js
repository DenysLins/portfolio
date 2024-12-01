import * as yup from 'yup';
import { currencies } from './constants';

const currenciesList = currencies.map((c) => c.value);

export const captchaValidationSchema = () => {
  return yup.object({
    token: yup.string().required('Token is required'),
  });
};

export const salaryFrontValidationSchema = (t) => {
  return yup.object({
    hours: yup
      .number(t('hours_number'))
      .typeError(t('hours_number'))
      .integer(t('hours_integer'))
      .required(t('hours_required'))
      .positive(t('hours_positive'))
      .min(1, t('hours_min'))
      .max(999, t('hours_max')),
    minutes: yup
      .number(t('minutes_number'))
      .typeError(t('minutes_number'))
      .integer(t('minutes_integer'))
      .positive(t('minutes_positive'))
      .min(0, t('minutes_min'))
      .max(59, t('minutes_max')),
    seconds: yup
      .number(t('seconds_number'))
      .typeError(t('seconds_number'))
      .integer(t('seconds_integer'))
      .positive(t('seconds_positive'))
      .min(0, t('seconds_min'))
      .max(59, t('seconds_max')),
    valuePerHour: yup
      .string()
      .required(t('value_per_hour'))
      .matches(new RegExp(t('regex')), t('value_validation')),
    originalCurrency: yup.string().required(t('original_currency')),
    finalCurrency: yup
      .string()
      .notOneOf([yup.ref('originalCurrency'), null], t('diff_currency'))
      .required(t('final_currency')),
  });
};

export const salaryBackValidationSchema = () => {
  return yup.object({
    hours: yup
      .number()
      .integer('Hours must be an integer')
      .required('Hours is required')
      .positive('Hours must be positive')
      .min(1, 'Hours must be at least 1')
      .max(999, 'Hours must be at most 999'),
    minutes: yup
      .number()
      .integer('Minutes must be an integer')
      .positive('Minutes must be positive')
      .min(0, 'Minutes must be at least 0')
      .max(59, 'Minutes must be at most 59'),
    seconds: yup
      .number()
      .integer('Seconds must be an integer')
      .positive('Seconds must be positive')
      .min(0, 'Seconds must be at least 0')
      .max(59, 'Seconds must be at most 59'),
    valuePerHour: yup
      .string()
      .required('Value per hour is required')
      .matches(
        /^(([0-9]{1,3}$)|([0-9]{1,3}[.][0-9]{1,2}$))/,
        'Value must be in the format 99.99 or 999.00'
      ),
    originalCurrency: yup
      .string()
      .required('Original currency is required')
      .oneOf(currenciesList),
    finalCurrency: yup
      .string()
      .notOneOf(
        [yup.ref('originalCurrency'), null],
        'Original and final currency must be different'
      )
      .required('Final currency is required')
      .oneOf(currenciesList),
  });
};

const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const logonSweepstakesFrontValidationSchema = (t) => {
  return yup.object({
    first: yup.string().required(t('first_required')).max(127, t('max_length')),
    last: yup.string().required(t('last_required')).max(127, t('max_length')),
    email: yup
      .string()
      .required(t('email_required'))
      .max(127, t('max_length'))
      .matches(emailRegex, t('email_validation')),
    password: yup
      .string()
      .required(t('password_required'))
      .max(127, t('max_length'))
      .matches(passwordRegex, t('password_validation')),
  });
};

export const logonSweepstakesValidationSchema = () => {
  return yup.object({
    first: yup
      .string()
      .required('First name is required')
      .max(127, 'Maximum characters allowed are 127'),
    last: yup
      .string()
      .required('First name is required')
      .max(127, 'Maximum characters allowed are 127'),
    email: yup
      .string()
      .required('Email is required')
      .max(127, 'Maximum characters allowed are 127')
      .matches(emailRegex, 'Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .max(127, 'Maximum characters allowed are 127')
      .matches(
        passwordRegex,
        'Password must have 8 or more characters, uppercases, lowercases and numbers'
      ),
  });
};

export const loginSweepstakesFrontValidationSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .required(t('email_required'))
      .max(127, t('max_length'))
      .matches(emailRegex, t('email_validation')),
    password: yup
      .string()
      .required(t('password_required'))
      .max(127, t('max_length'))
      .matches(passwordRegex, t('password_validation')),
  });
};

export const loginSweepstakesValidationSchema = () => {
  return yup.object({
    email: yup
      .string()
      .required('Email is required')
      .max(127, 'Maximum characters allowed are 127')
      .matches(emailRegex, 'Invalid email'),
    password: yup
      .string()
      .required('Password is required')
      .max(127, 'Maximum characters allowed are 127')
      .matches(
        passwordRegex,
        'Password must have 8 or more characters, uppercases, lowercases and numbers'
      ),
  });
};

export const forgotSweepstakesFrontValidationSchema = (t) => {
  return yup.object({
    email: yup
      .string()
      .required(t('email_required'))
      .max(127, t('max_length'))
      .matches(emailRegex, t('email_validation')),
  });
};

export const forgotSweepstakesValidationSchema = () => {
  return yup.object({
    email: yup
      .string()
      .required('Email is required')
      .max(127, 'Maximum characters allowed are 127')
      .matches(emailRegex, 'Invalid email'),
  });
};

export const createSweepstakesFrontValidationSchema = (t) => {
  return yup.object({
    name: yup.string().required(t('name_required')).max(127, t('max_length')),
    championship: yup
      .string()
      .required(t('championship_required'))
      .max(127, t('max_length')),
  });
};

export const createSweepstakesValidationSchema = () => {
  return yup.object({
    name: yup
      .string()
      .required('name is required')
      .max(127, 'Maximum characters allowed are 127'),
    championship: yup
      .string()
      .required('championship is required')
      .max(127, 'Maximum characters allowed are 127'),
    championshipId: yup.number().required('championshipId is required'),
    logo: yup
      .string()
      .required('logo is required')
      .max(255, 'Maximum characters allowed are 255'),
  });
};
