import { validate } from '@/utils/middlewares';
import axios from 'axios';

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

const handler = async (req, res) => {
  console.log(req);
  if (req.method === 'POST') {
    const { token } = req.body;
    const captchaApiUrl =
      'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    let formData = new FormData();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', token);

    await axios
      .post(captchaApiUrl, formData, {
        headers: "content-type': 'application/x-www-form-currencyApiUrlencoded",
      })
      .then(({ data }) => {
        console.log(data);
        res.status(200).json(data);
      })
      .catch(({ err }) => {
        console.log(err);
        res.status(400).json({ err });
      });
  }
};

export default validate(handler);
