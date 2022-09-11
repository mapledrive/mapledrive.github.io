import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from 'features/currency/currencySlice';
import 'features/currency/currency.css';

// https://codesandbox.io/s/5tgjw?file=/src/App.js:380-3665

// exchange rate calculator
// 1. As a user, I should be able to type in salary to any field
// The app will calculate equivalent in other currencies
// 2. When the year gross salary is entered to the input
// the net salary is calculated both for the year and month
// 3. The app uses latest conversion rates from API.
// 4. The equivalents are calculated on the fly as you type

const MAX = 100;

function Currencypage() {
  const [cadValue, setCadValue] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [rubValue, setRubValue] = useState(0);
  const [rubNetValue, setRubNetValue] = useState(0);
  const [rubMonthValue, setRubMonthValue] = useState(0);
  const [rubNetMonthValue, setRubNetMonthValue] = useState(0);
  const [result, setResult] = useState(1);
  const [unit, setUnit] = useState('BTC');

  const [value, setValue] = useState(0);

  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / MAX}% 100%` };
  };

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
    setRubNetValue(financial(rubr * 0.87));
    setRubMonthValue(financial(rubr / 12));
    setRubNetMonthValue(financial((rubr / 12) * 0.87));
    setUnit(unit);
  };

  const handleUsd = e => {
    let received = e.target.value;
    setUsdValue(received);
    let cadr = financial((cad.value / usd.value) * received);
    let rubr = financial((rub.value / usd.value) * received);
    setRubMonthValue(financial(rubr / 12));
    setRubNetMonthValue(financial((rubr / 12) * 0.87));
    let unit = usd.unit;
    setCadValue(cadr);
    setRubValue(rubr);
    setRubNetValue(financial(rubr * 0.87));
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
            max={100000}
          />
          <CurrencyInput
            label={'CAD year after tax'}
            handler={handleCad}
            currencyvalue={cadValue}
            max={100000}
          />
          <CurrencyInput
            label={'CAD month before tax'}
            handler={handleCad}
            currencyvalue={cadValue}
            max={100000}
          />
          <CurrencyInput
            label={'CAD month after tax'}
            handler={handleCad}
            currencyvalue={cadValue}
            max={100000}
          />
        </div>
        <div className='calccolumn'>
          <CurrencyInput
            label={'USD year before tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
            max={100000}
          />
          <CurrencyInput
            label={'USD year after tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
            max={100000}
          />
          <CurrencyInput
            label={'USD month before tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
            max={100000}
          />
          <CurrencyInput
            label={'USD month after tax'}
            handler={handleUsd}
            currencyvalue={usdValue}
            max={100000}
          />
        </div>
        <div className='calccolumn'>
          <CurrencyInput
            label={'RUB year before tax'}
            handler={handleRub}
            currencyvalue={rubValue}
            max={6100000}
          />
          <CurrencyInput
            label={'RUB year after tax'}
            handler={handleRub}
            currencyvalue={rubNetValue}
            max={6100000}
          />
          <CurrencyInput
            label={'RUB month before tax'}
            handler={handleRub}
            currencyvalue={rubMonthValue}
            max={6100000}
          />
          <CurrencyInput
            label={'RUB month after tax'}
            handler={handleRub}
            currencyvalue={rubNetMonthValue}
            max={6100000}
          />
        </div>
        <div className='calccolumn'></div>
      </div>
    </section>
  );
}

export { Currencypage };

function financial(x) {
  return Number.parseFloat(x).toFixed();
}

const CurrencyInput = ({ label, handler, currencyvalue, max = 100 }) => {
  const [value, setValue] = useState(0);

  const getBackgroundSize = () => {
    return { backgroundSize: `${(value * 100) / max}% 100%` };
  };

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
        <div className='slider-axis-4-0-5'>
          <input
            type='range'
            min='0'
            max={max}
            onChange={handler}
            style={getBackgroundSize()}
            value={currencyvalue}
          />
        </div>
      </div>
    </div>
  );
};
