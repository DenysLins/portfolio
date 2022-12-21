import {
  loginSweepstakesValidationSchema,
  salaryBackValidationSchema,
  forgotSweepstakesValidationSchema,
} from "./validations";

export const validate = (handler) => {
  return async (req, res) => {
    if (["POST", "PUT"].includes(req.method) && req.url.includes("salary")) {
      try {
        await salaryBackValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    if (
      ["POST", "PUT"].includes(req.method) &&
      req.url.includes("sweepstakes/login")
    ) {
      try {
        await loginSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    if (
      ["POST", "PUT"].includes(req.method) &&
      req.url.includes("sweepstakes/signup")
    ) {
      try {
        await loginSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    if (
      ["POST", "PUT"].includes(req.method) &&
      req.url.includes("sweepstakes/forgot")
    ) {
      try {
        await forgotSweepstakesValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handler(req, res);
  };
};
