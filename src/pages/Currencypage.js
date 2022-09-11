import { useEffect, useState } from 'react';
import 'features/currency/currency.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from 'features/currency/currencySlice';

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
      <div className='sectionTitle'>
        Currency Converter
        {` ${Number(result.toFixed()).toLocaleString('en')} ${unit}`}
      </div>
      <div className='calcwrapper'>
        <div className='calccolumn'>
          <CurrencyInput
            label={'CAD year before tax'}
            handler={handleCad}
            currencyvalue={cadValue}
          />
          <CurrencyInput
            label={'CAD year after tax'}
            handler={handleCad}
            currencyvalue={cadValue}
          />
          <CurrencyInput
            label={'CAD month before tax'}
            handler={handleCad}
            currencyvalue={cadValue}
          />
          <CurrencyInput
            label={'CAD month after tax'}
            handler={handleCad}
            currencyvalue={cadValue}
          />
        </div>
        <div className='calccolumn'>
          <CurrencyInput
            label={'USD year before tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
          />
          <CurrencyInput
            label={'USD year after tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
          />
          <CurrencyInput
            label={'USD month before tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
          />
          <CurrencyInput
            label={'USD month after tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
          />
        </div>
        <div className='calccolumn'>
          <CurrencyInput
            label={'RUB year before tax'}
            handler={handleRub}
            currencyvalue={rubValue}
          />
          <CurrencyInput
            label={'RUB year after tax'}
            handler={handleRub}
            currencyvalue={rubValue}
          />
          <CurrencyInput
            label={'RUB month before tax'}
            handler={handleRub}
            currencyvalue={rubValue}
          />
          <CurrencyInput
            label={'RUB month after tax'}
            handler={handleRub}
            currencyvalue={rubValue}
          />
        </div>
        <div className='calccolumn'>1</div>
      </div>
    </section>
  );
}

export { Currencypage };

function financial(x) {
  return Number.parseFloat(x).toFixed();
}

const CurrencyInput = ({ label, handler, currencyvalue }) => {
  return (
    <div className='slider-input-root-4-0-5'>
      <div className='dc-input-6-1-2'>
        <div className='dc-input__input-container-6-1-2'>
          <input
            className='dc-input__input-6-1-2'
            step='1'
            onChange={handler}
            value={currencyvalue}
          />
          <label className='dc-input__label-6-1-2'>{label}</label>
        </div>
      </div>
      <div className='slider-root-4-0-5'>
        <div className='slider-axis-4-0-5'></div>
      </div>
    </div>
  );
};
