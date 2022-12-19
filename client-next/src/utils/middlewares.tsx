import { salaryBackValidationSchema } from "./validations";

export const validate = (handler) => {
  return async (req, res) => {
    if (["POST", "PUT"].includes(req.method)) {
      try {
        await salaryBackValidationSchema().validate(req.body);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    await handler(req, res);
  };
};
