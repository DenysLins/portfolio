import axios from "axios";

const FREE_CURRENCY_API_URL = "https://freecurrencyapi.net/api/v2/latest";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const url = `${FREE_CURRENCY_API_URL}?apikey=${process.env.FREE_CURRENCY_API_KEY}`;

    await axios
      .get(url)
      .then(({ data }) => {
        let currenciesAsString = [...Object.keys(data.data), "USD"].sort();
        const currenciesAsObject = currenciesAsString.map((item) => {
          return {
            value: item,
          };
        });
        res.status(200).json(currenciesAsObject);
      })
      .catch(({ err }) => {
        res.status(400).json({ err });
      });
  } else if (req.method === "POST") {
    const { totalTime, valuePerHour, originalCurrency, finalCurrency } =
      req.body;
    const url = `${FREE_CURRENCY_API_URL}?apikey=${process.env.FREE_CURRENCY_API_KEY}&base_currency=${originalCurrency}`;

    await axios
      .get(url)
      .then(({ data }) => {
        const value = valuePerHour * data.data[`${finalCurrency}`];
        const totalTimeInSeconds =
          totalTime.split(":").length === 3
            ? totalTime.split(":").reduce((acc, item) => {
                return acc * 60 + Number(item);
              }, 0)
            : totalTime.split(":").reduce((acc, item) => {
                return acc * 3600 + Number(item);
              }, 0);
        let totalValue = (value * totalTimeInSeconds) / 3600;
        totalValue = Number(totalValue.toFixed(2));
        res.status(200).json({ totalValue });
      })
      .catch(({ err }) => {
        res.status(400).json({ err });
      });
  }
};

export default handler;
