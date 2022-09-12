import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from 'features/currency/currencySlice';
import { financial } from 'utils/financial';
import 'features/currency/currency.css';

// https://codesandbox.io/s/5tgjw?file=/src/App.js:380-3665

// exchange rate calculator
// 1. As a user, I should be able to type in salary to any field
// The app will calculate equivalent in other currencies
// 2. When the year gross salary is entered to the input
// the net salary is calculated both for the year and month
// 3. The app uses latest conversion rates from API.
// 4. The equivalents are calculated on the fly as you type

function Currencypage() {
  const [cadValue, setCadValue] = useState(0);
  const [cadNetValue, setCadNetValue] = useState(0);
  const [cadMonthValue, setCadMonthValue] = useState(0);
  const [cadNetMonthValue, setCadNetMonthValue] = useState(0);
  const [usdValue, setUsdValue] = useState(0);
  const [usdNetValue, setUsdNetValue] = useState(0);
  const [usdMonthValue, setUsdMonthValue] = useState(0);
  const [usdNetMonthValue, setUsdNetMonthValue] = useState(0);
  const [rubValue, setRubValue] = useState(0);
  const [rubNetValue, setRubNetValue] = useState(0);
  const [rubMonthValue, setRubMonthValue] = useState(0);
  const [rubNetMonthValue, setRubNetMonthValue] = useState(0);

  const cad = useSelector(state => state.currency.cad);
  const usd = useSelector(state => state.currency.usd);
  const rub = useSelector(state => state.currency.rub);
  // const isLoading = useSelector(state => state.currency.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const handleGeneric = e => {
    const received = e.target.value;
    const id = e.target.id;
    let c = 0;
    let cn = 0;
    let cm = 0;
    let cnm = 0;
    let u = 0;
    let un = 0;
    let um = 0;
    let unm = 0;
    let r = 0;
    let rn = 0;
    let rm = 0;
    let rnm = 0;
    if (id === 'cadyearbeforetax') {
      c = received;
      cn = financial(received * 0.7455); // Ontario 80000-59640
      cm = financial(received / 12);
      cnm = financial((received / 12) * 0.7455);
      u = financial((usd.value / cad.value) * received);
      un = financial((usd.value / cad.value) * received * 0.75);
      um = financial(((usd.value / cad.value) * received) / 12);
      unm = financial((((usd.value / cad.value) * received) / 12) * 0.75);
      r = financial((rub.value / cad.value) * received);
      rn = financial((rub.value / cad.value) * received * 0.87);
      rm = financial(((rub.value / cad.value) * received) / 12);
      rnm = financial((((rub.value / cad.value) * received) / 12) * 0.87);
    }
    if (id === 'cadyearaftertax') {
      c = financial(received / 0.7455);
      cn = received;
      cm = financial(received / 12 / 0.7455);
      cnm = financial(received / 12);
      u = financial(((usd.value / cad.value) * received) / 0.7455);
      un = financial((((usd.value / cad.value) * received) / 0.7455) * 0.75);
      um = financial(((usd.value / cad.value) * received) / 12);
      unm = financial((((usd.value / cad.value) * received) / 12) * 0.75);
      r = financial((rub.value / cad.value) * received);
      rn = financial((rub.value / cad.value) * received * 0.87);
      rm = financial(((rub.value / cad.value) * received) / 12);
      rnm = financial((((rub.value / cad.value) * received) / 12) * 0.87);
    }
    if (id === 'cadmonthbeforetax') {
      c = financial(received * 12);
      cn = financial(received * 12 * 0.7455);
      cm = received;
      cnm = financial(received * 0.7455);
      u = financial((usd.value / cad.value) * received * 12);
      un = financial((usd.value / cad.value) * received * 0.75 * 12);
      um = financial((usd.value / cad.value) * received);
      unm = financial((usd.value / cad.value) * received * 0.75);
      r = financial((rub.value / cad.value) * received * 12);
      rn = financial((rub.value / cad.value) * received * 0.87 * 12);
      rm = financial((rub.value / cad.value) * received);
      rnm = financial((rub.value / cad.value) * received * 0.87);
    }
    if (id === 'cadmonthaftertax') {
      c = financial((received * 12) / 0.7455);
      cn = received * 12;
      cm = financial(received / 0.7455);
      cnm = received;
      u = financial((((usd.value / cad.value) * received) / 0.7455) * 12);
      un = financial((usd.value / cad.value / 0.7455) * received * 0.75 * 12);
      um = financial((usd.value / cad.value) * received);
      unm = financial((usd.value / cad.value) * received * 0.75);
      r = financial((rub.value / cad.value) * received * 12);
      rn = financial((rub.value / cad.value) * received * 0.87 * 12);
      rm = financial((rub.value / cad.value) * received);
      rnm = financial((rub.value / cad.value) * received * 0.87);
    }
    if (id === 'usdyearbeforetax') {
      u = received;
      un = financial(received * 0.75);
      um = financial(received / 12);
      unm = financial((received / 12) * 0.75);
      let cadr = financial((cad.value / usd.value) * received);
      let rubr = financial((rub.value / usd.value) * received);
      c = cadr;
      cn = financial(cadr * 0.75);
      cm = financial(cadr / 12);
      cnm = financial((cadr / 12) * 0.75);
      r = rubr;
      rn = financial(rubr * 0.87);
      rm = financial(rubr / 12);
      rnm = financial((rubr / 12) * 0.87);
    }
    if (id === 'usdyearaftertax') {
      u = financial(received / 0.75);
      un = received;
      um = financial(received / 12 / 0.75);
      unm = financial(received / 12);
      let cadr = financial((cad.value / usd.value) * received);
      let rubr = financial((rub.value / usd.value) * received);
      c = financial(cadr / 0.75);
      cn = cadr;
      cm = financial(cadr / 0.75 / 12);
      cnm = financial(cadr / 12);
      r = financial(rubr / 0.87);
      rn = rubr;
      rm = financial(rubr / 0.87 / 12);
      rnm = financial(rubr / 12);
    }
    if (id === 'usdmonthbeforetax') {
      u = financial(received * 12);
      un = financial(received * 12 * 0.75);
      um = received;
      unm = financial(received * 0.75);

      let cadr = financial((cad.value / usd.value) * received);
      let rubr = financial((rub.value / usd.value) * received);
      c = financial(cadr * 12);
      cn = financial(cadr * 0.75 * 12);
      cm = cadr;
      cnm = financial(cadr * 0.75);
      r = rubr * 12;
      rn = financial(rubr * 0.87 * 12);
      rm = financial(rubr);
      rnm = financial(rubr * 0.87);
    }
    if (id === 'usdmonthaftertax') {
      u = financial((received * 12) / 0.75);
      un = received * 12;
      um = financial(received / 0.75);
      unm = received;
      let cadr = financial((cad.value / usd.value) * received);
      let rubr = financial((rub.value / usd.value) * received);
      c = financial((cadr / 0.75) * 12);
      cn = cadr * 12;
      cm = financial(cadr / 0.75);
      cnm = cadr;
      r = financial((rubr / 0.87) * 12);
      rn = rubr * 12;
      rm = financial(rubr / 0.87);
      rnm = rubr;
    }
    if (id === 'rubyearbeforetax') {
      r = received;
      rn = financial(received * 0.87);
      rm = financial(received / 12);
      rnm = financial((received / 12) * 0.87);
      u = financial((usd.value / rub.value) * received);
      un = financial((usd.value / rub.value) * received * 0.75);
      um = financial(financial((usd.value / rub.value) * received) / 12);
      unm = financial((((usd.value / rub.value) * received) / 12) * 0.75);
      c = financial((cad.value / rub.value) * received);
      cn = financial((cad.value / rub.value) * received * 0.7455);
      cm = financial(((cad.value / rub.value) * received) / 12);
      cnm = financial((((cad.value / rub.value) * received) / 12) * 0.7455);
    }
    if (id === 'rubyearaftertax') {
      r = financial(received / 0.87);
      rn = received;
      rm = financial(received / 12 / 0.87);
      rnm = financial(received / 12);
      u = financial(((usd.value / rub.value) * received) / 0.87);
      un = financial((usd.value / rub.value) * received);
      um = financial(((usd.value / rub.value) * received) / 0.87 / 12);
      unm = financial(((usd.value / rub.value) * received) / 12);
      c = financial(((cad.value / rub.value) * received) / 0.87);
      cn = financial((cad.value / rub.value) * received);
      cm = financial(((cad.value / rub.value) * received) / 12 / 0.87);
      cnm = financial(((cad.value / rub.value) * received) / 12);
    }
    if (id === 'rubmonthbeforetax') {
      r = financial(received * 12);
      rn = financial(received * 12 * 0.87);
      rm = received;
      rnm = financial(received * 0.87);
      u = financial((usd.value / rub.value) * received * 12);
      un = financial((usd.value / rub.value) * received * 0.75 * 12);
      um = financial(financial((usd.value / rub.value) * received));
      unm = financial((usd.value / rub.value) * received * 0.75);
      c = financial((cad.value / rub.value) * received * 12);
      cn = financial((cad.value / rub.value) * received * 0.7455 * 12);
      cm = financial((cad.value / rub.value) * received);
      cnm = financial((cad.value / rub.value) * received * 0.7455);
    }
    if (id === 'rubmonthaftertax') {
      r = financial((received * 12) / 0.87);
      rn = received * 12;
      rm = financial(received / 0.87);
      rnm = received;
      u = financial((((usd.value / rub.value) * received) / 0.87) * 12);
      un = financial((usd.value / rub.value) * received * 12);
      um = financial(((usd.value / rub.value) * received) / 0.87);
      unm = financial((usd.value / rub.value) * received);
      c = financial((((cad.value / rub.value) * received) / 0.87) * 12);
      cn = financial((cad.value / rub.value) * received * 12);
      cm = financial(((cad.value / rub.value) * received) / 0.87);
      cnm = financial((cad.value / rub.value) * received);
    }

    valueSetter(c, cn, cm, cnm, u, un, um, unm, r, rn, rm, rnm);
  };

  const valueSetter = (c, cn, cm, cnm, u, un, um, unm, r, rn, rm, rnm) => {
    setCadValue(c);
    setCadNetValue(cn);
    setCadMonthValue(cm);
    setCadNetMonthValue(cnm);
    setUsdValue(u);
    setUsdNetValue(un);
    setUsdMonthValue(um);
    setUsdNetMonthValue(unm);
    setRubValue(r);
    setRubNetValue(rn);
    setRubMonthValue(rm);
    setRubNetMonthValue(rnm);
  };

  return (
    <section>
      <div className='sectionTitle'>Currency Converter</div>
      <div className='calcwrapper'>
        <div className='calccolumn'>
          <CurrencyInput
            id={'cadyearbeforetax'}
            label={'CAD year before tax'}
            handler={handleGeneric}
            currencyvalue={cadValue}
            max={100000}
          />
          <CurrencyInput
            id={'cadyearaftertax'}
            label={'CAD year after tax'}
            handler={handleGeneric}
            currencyvalue={cadNetValue}
            max={100000}
          />
          <CurrencyInput
            id={'cadmonthbeforetax'}
            label={'CAD month before tax'}
            handler={handleGeneric}
            currencyvalue={cadMonthValue}
            max={100000}
          />
          <CurrencyInput
            id={'cadmonthaftertax'}
            label={'CAD month after tax'}
            handler={handleGeneric}
            currencyvalue={cadNetMonthValue}
            max={100000}
          />
        </div>
        <div className='calccolumn'>
          <CurrencyInput
            id={'usdyearbeforetax'}
            label={'USD year before tax'}
            handler={handleGeneric}
            currencyvalue={usdValue}
            max={100000}
          />
          <CurrencyInput
            id={'usdyearaftertax'}
            label={'USD year after tax'}
            handler={handleGeneric}
            currencyvalue={usdNetValue}
            max={100000}
          />
          <CurrencyInput
            id={'usdmonthbeforetax'}
            label={'USD month before tax'}
            handler={handleGeneric}
            currencyvalue={usdMonthValue}
            max={100000}
          />
          <CurrencyInput
            id={'usdmonthaftertax'}
            label={'USD month after tax'}
            handler={handleGeneric}
            currencyvalue={usdNetMonthValue}
            max={100000}
          />
        </div>
        <div className='calccolumn'>
          <CurrencyInput
            id={'rubyearbeforetax'}
            label={'RUB year before tax'}
            handler={handleGeneric}
            currencyvalue={rubValue}
            max={6000000}
          />
          <CurrencyInput
            id={'rubyearaftertax'}
            label={'RUB year after tax'}
            handler={handleGeneric}
            currencyvalue={rubNetValue}
            max={6000000}
          />
          <CurrencyInput
            id={'rubmonthbeforetax'}
            label={'RUB month before tax'}
            handler={handleGeneric}
            currencyvalue={rubMonthValue}
            max={6000000}
          />
          <CurrencyInput
            id={'rubmonthaftertax'}
            label={'RUB month after tax'}
            handler={handleGeneric}
            currencyvalue={rubNetMonthValue}
            max={6000000}
          />
        </div>
        <div className='calccolumn'></div>
      </div>
    </section>
  );
}

export { Currencypage };

const CurrencyInput = ({ label, handler, currencyvalue, max, id = 123 }) => {
  const getBackgroundSize = () => {
    return { backgroundSize: `${(currencyvalue * 100) / max}% 100%` };
  };

  return (
    <div className='slider-input-root-4-0-5'>
      <div className='dc-input-6-1-2'>
        <div className='dc-input__input-container-6-1-2'>
          <input
            className='dc-input__input-6-1-2'
            id={id}
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
            id={id}
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

CurrencyInput.defaultProps = {
  max: 100000,
  handler: () => {},
};
