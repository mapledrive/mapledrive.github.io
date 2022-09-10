import React, { useEffect, useState, useCallback } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency, changeCad } from 'features/currency/currencySlice';

// https://codesandbox.io/s/5tgjw?file=/src/App.js:380-3665
// https://api.coingecko.com/api/v3/exchange_rates

// exchange rate calculator
// 1. As a user, I should be able to type in a number
// 2. As a user I should be able to pick a "from" currency from a dropdown
// 3. I should be able to pick a "to" currency
// 4. I should see the converted result!!

function Currencypage() {
  const [cadValue, setCadValue] = useState(1);
  const [usdValue, setUsdValue] = useState(1);
  const [rubValue, setRubValue] = useState(1);

  const [inputValue, setInputValue] = useState(1);

  const [result, setResult] = useState(1);
  const [unit, setUnit] = useState('BTC');

  const cad = useSelector(state => state.currency.cad);
  const usd = useSelector(state => state.currency.usd);
  const rub = useSelector(state => state.currency.rub);
  // const isLoading = useSelector(state => state.currency.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const handleCad = e => {
    let received = e.target.value;
    setCadValue(received);
    let usdr = financial((usd.value / cad.value) * received);
    let rubr = financial((rub.value / cad.value) * received);
    let unit = cad.unit;
    setUsdValue(usdr);
    setRubValue(rubr);
    setUnit(unit);
  };

  const handleUsd = e => {
    let received = e.target.value;
    setUsdValue(received);
    let cadr = financial((cad.value / usd.value) * received);
    let rubr = financial((rub.value / usd.value) * received);
    let unit = usd.unit;
    setCadValue(cadr);
    setRubValue(rubr);
    setUnit(unit);
  };

  const handleRub = e => {
    let received = e.target.value;
    setRubValue(received);
    let usdr = financial((usd.value / rub.value) * received);
    let cadr = financial((cad.value / rub.value) * received);
    let unit = rub.unit;
    setUsdValue(usdr);
    setCadValue(cadr);
    setUnit(unit);
  };

  return (
    <section>
      <div className='sectionTitle'>Currency Converter</div>
      <div className='calcwrapper'>
        <div className='calccolumn'>
          <label className='labelContent' htmlFor='cadyear'>
            CAD year before tax
          </label>
          <input
            id='cadyear'
            className='currency-input'
            type='number'
            onChange={handleCad}
            value={cadValue}
          />
          <label className='labelContent' htmlFor='cadyearaftertax'>
            CAD year after tax
          </label>
          <input
            id='cadyearaftertax'
            className='currency-input'
            type='number'
            onChange={handleCad}
            value={cadValue}
          />
          <label className='labelContent' htmlFor='cadyearaftertax'>
            CAD month before tax
          </label>
          <input
            id='cadyearaftertax'
            className='currency-input'
            type='number'
            onChange={handleCad}
            value={cadValue}
          />
          <label className='labelContent' htmlFor='cadyearaftertax'>
            CAD month after tax
          </label>
          <input
            id='cadyearaftertax'
            className='currency-input'
            type='number'
            onChange={handleCad}
            value={cadValue}
          />
        </div>
        <div className='calccolumn'>
          <label className='labelContent' htmlFor='usdyear'>
            USD year before tax
          </label>
          <input
            id='usdyear'
            className='currency-input'
            type='number'
            onChange={handleUsd}
            value={usdValue}
          />
          <label className='labelContent' htmlFor='btcyearaftertax'>
            USD year after tax
          </label>
          <input
            id='btcyearaftertax'
            className='currency-input'
            type='number'
            onChange={handleUsd}
            value={usdValue}
          />
          <label className='labelContent' htmlFor='btcyearaftertax'>
            USD month before tax
          </label>
          <input
            id='btcmonthaftertax'
            className='currency-input'
            type='number'
            onChange={handleUsd}
            value={usdValue}
          />
          <label className='labelContent' htmlFor='btcyearaftertax'>
            USD month after tax
          </label>
          <input
            id='btcmonthaftertax'
            className='currency-input'
            type='number'
            onChange={handleUsd}
            value={usdValue}
          />
        </div>
        <div className='calccolumn'>
          <label className='labelContent' htmlFor='rubyear'>
            RUB year before tax
          </label>
          <input
            id='rubyear'
            className='currency-input'
            type='number'
            onChange={handleRub}
            value={rubValue}
          />
          <label className='labelContent' htmlFor='btcyearaftertax'>
            RUB year after tax
          </label>
          <input
            id='btcyearaftertax'
            className='currency-input'
            type='number'
            onChange={handleRub}
            value={rubValue}
          />
          <label className='labelContent' htmlFor='btcyearaftertax'>
            RUB month before tax
          </label>
          <input
            id='btcmonthaftertax'
            className='currency-input'
            type='number'
            onChange={handleRub}
            value={rubValue}
          />
          <label className='labelContent' htmlFor='btcyearaftertax'>
            RUB month after tax
          </label>
          <input
            id='btcmonthaftertax'
            className='currency-input'
            type='number'
            onChange={handleRub}
            value={rubValue}
          />
        </div>
        <div className='calccolumn'>1</div>
      </div>
      <div className='calculator'>
        <div className='sectionTitle'>
          {`${Number(result.toFixed()).toLocaleString('en')} ${unit}`}
        </div>
        <div className='container'>
          <label htmlFor='value__input'>
            <input
              className='input'
              id='value__input'
              type='number'
              onChange={e => setInputValue(e.target.value)}
              value={rub}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export { Currencypage };

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}
