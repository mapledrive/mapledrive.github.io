import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

function UseCallbackPage() {
  const [inputValue, setInputValue] = useState(1);
  const [currencyList, setCurrencyList] = useState([]);
  const [result, setResult] = useState(1);
  const [unit, setUnit] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('Bitcoin');
  const [fromCurrency, setFromCurrency] = useState('Bitcoin');

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/exchange_rates'
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Error: ${response.status}`);
      }

      const responseData = await response.json();
      const objectValues = Object.values(responseData.rates);
      setCurrencyList(objectValues);
      setFromCurrency(objectValues[0].name);
      setToCurrency(objectValues[0].name);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const callback = useCallback(() => {
    const calculate = () => {
      const obj1 = currencyList.find(cur => cur.name === fromCurrency);
      let xToBTC = obj1.value;
      let BTCtoX = 1 / xToBTC;
      let obj2 = currencyList.find(cur => cur.name === toCurrency);
      let yToBTC = obj2.value;
      let calc = BTCtoX * yToBTC * inputValue;
      let unit = obj2.unit;
      let result = { calc, unit };
      return result;
    };
    return calculate();
  }, [currencyList, fromCurrency, toCurrency, inputValue]);

  useEffect(() => {
    if (currencyList.length !== 0) {
      const { calc, unit } = callback();
      setUnit(unit);
      setResult(calc);
    }
  }, [callback, currencyList.length]);

  return (
    <App>
      <h1>Currency Converter</h1>
      <div className='result'>
        <p>{`${Number(result.toFixed(2)).toLocaleString('en')} ${unit}`}</p>
      </div>
      <div className='container'>
        <label htmlFor='value__input'>
          <input
            className='input'
            id='value__input'
            type='number'
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
          />
        </label>
        <label htmlFor='fromCurrency'>
          From:
          <select
            id='fromCurrency'
            className='input'
            aria-label='select From Currency'
            onChange={e => setFromCurrency(e.target.value)}
          >
            {currencyList &&
              currencyList.map(currency => (
                <option key={currency.name} value={currency.name}>
                  {currency.name}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor='toCurrency'>
          To:
          <select
            id='toCurrency'
            className='input'
            aria-label='select To Currency'
            onChange={e => setToCurrency(e.target.value)}
          >
            {currencyList &&
              currencyList.map(currency => (
                <option key={currency.name} value={currency.name}>
                  {currency.name}
                </option>
              ))}
          </select>
        </label>
      </div>
    </App>
  );
}

export { UseCallbackPage };

export const App = styled.div`
  font-family: 'roboto', sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    margin-bottom: 1rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }

  .input {
    cursor: pointer;
    border: 1px solid #5f6368;
    border-radius: 6px;
    padding: 0 0 0 12px;
    height: 36px;
    margin-left: 1rem;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  label:last-child {
    grid-column: 2;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  .result {
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 2rem;
  }
`;
