import { validate } from '@/utils/middlewares';
import axios from 'axios';

const FREE_CURRENCY_API_URL = process.env.FREE_CURRENCY_API_URL;

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const {
      hours,
      minutes,
      seconds,
      valuePerHour,
      originalCurrency,
      finalCurrency,
    } = req.body;
    const url = `${FREE_CURRENCY_API_URL}/latest?apikey=${process.env.FREE_CURRENCY_API_KEY}&currencies=${finalCurrency}&base_currency=${originalCurrency}`;
    await axios
      .get(url)
      .then(({ data }) => {
        const valueInFinalCurrency =
          valuePerHour * data.data[`${finalCurrency}`];
        const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        let totalValueInFinalCurrency =
          (valueInFinalCurrency * totalTimeInSeconds) / 3600;
        totalValueInFinalCurrency = Number(
          totalValueInFinalCurrency.toFixed(2)
        );
        let totalValueInOriginalCurrency =
          (valuePerHour * totalTimeInSeconds) / 3600;
        totalValueInOriginalCurrency = Number(
          totalValueInOriginalCurrency.toFixed(2)
        );
        res
          .status(200)
          .json({ totalValueInFinalCurrency, totalValueInOriginalCurrency });
      })
      .catch(({ err }) => {
        res.status(400).json({ err });
      });
  }
};

export default validate(handler);
