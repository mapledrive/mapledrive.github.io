import axios from 'axios';

export const fetchCurrencyApi = async () => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/exchange_rates`
  );
  return response.data.rates;
};
