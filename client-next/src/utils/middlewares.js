import {
  captchaValidationSchema,
  createSweepstakesValidationSchema,
  forgotSweepstakesValidationSchema,
  loginSweepstakesValidationSchema,
  logonSweepstakesValidationSchema,
  salaryBackValidationSchema,
} from './validations';

export const validate = (handler) => {
  return async (req, res) => {
    if (
      ['POST'].includes(req.method) &&
      req.url.includes('/api/salary/captcha')
    ) {
      try {
        await captchaValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (
      ['POST', 'PUT'].includes(req.method) &&
      req.url.includes('/api/salary')
    ) {
      try {
        await salaryBackValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (
      ['POST', 'PUT'].includes(req.method) &&
      req.url.includes('/api/sweepstakes/auth/login')
    ) {
      try {
        await loginSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (
      ['POST', 'PUT'].includes(req.method) &&
      req.url.includes('/api/sweepstakes/auth/logon')
    ) {
      try {
        await logonSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (
      ['POST', 'PUT'].includes(req.method) &&
      req.url.includes('/api/sweepstakes/auth/forgot')
    ) {
      try {
        await forgotSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else if (
      ['POST', 'PUT'].includes(req.method) &&
      req.url === '/api/sweepstakes'
    ) {
      try {
        await createSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    await handler(req, res);
  };
};
