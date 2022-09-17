import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from 'features/currency/currencySlice';
import { financial } from 'utils/financial';
import 'features/currency/currency.css';
import Spinner from 'components/Spinner';
import {
  StyledSection,
  SectionTitle,
  SectionContent,
  Holder,
  StyledCalcWrapper,
  SideCalc,
  StyledLabel,
  SliderInputRoot405,
} from 'style';
import styled from 'styled-components';

const initialState = {
  rub: 0,
  rubtaxed: 0,
  rubmonth: 0,
  rubmonthtaxed: 0,
  usd: 0,
  usdtaxed: 0,
  usdmonth: 0,
  usdmonthtaxed: 0,
  cad: 0,
  cadtaxed: 0,
  cadmonth: 0,
  cadmonthtaxed: 0,
};

function reducer(state, action) {
  const value = action.payload.value; // введенное число из инпута
  const USDRUB = action.payload.USDRUB;
  const CADRUB = action.payload.CADRUB;
  switch (action.type) {
    case 'onrubchange':
      return {
        ...state,
        rub: financial(value),
        rubtaxed: financial(value * 0.87),
        rubmonth: financial(value / 12),
        rubmonthtaxed: financial((value * 0.87) / 12),
        usd: financial(value / USDRUB),
        usdtaxed: financial((value / USDRUB) * 0.75),
        usdmonth: financial(value / USDRUB / 12),
        usdmonthtaxed: financial(((value / USDRUB) * 0.75) / 12),
        cad: financial(value / CADRUB),
        cadtaxed: financial((value / CADRUB) * 0.7455),
        cadmonth: financial(value / CADRUB / 12),
        cadmonthtaxed: financial(((value / CADRUB) * 0.7455) / 12),
      };
    case 'onrubtaxedchange':
      return {
        ...state,
        rub: financial(value / 0.87),
        rubtaxed: value,
        rubmonth: financial(value / 12 / 0.87),
        rubmonthtaxed: financial(value / 12),
        usd: financial(value / USDRUB / 0.87),
        usdtaxed: financial(((value / USDRUB) * 0.75) / 0.87),
        usdmonth: financial(value / USDRUB / 12 / 0.87),
        usdmonthtaxed: financial(((value / USDRUB) * 0.75) / 12 / 0.87),
        cad: financial(value / CADRUB / 0.87),
        cadtaxed: financial(((value / CADRUB) * 0.7455) / 0.87),
        cadmonth: financial(value / CADRUB / 12 / 0.87),
        cadmonthtaxed: financial(((value / CADRUB) * 0.7455) / 12 / 0.87),
      };
    case 'onrubmonthchange':
      return {
        ...state,
        rub: value * 12,
        rubtaxed: financial(value * 0.87 * 12),
        rubmonth: value,
        rubmonthtaxed: financial(value * 0.87),
        usd: financial((value / USDRUB) * 12),
        usdtaxed: financial((value / USDRUB) * 0.75 * 12),
        usdmonth: financial(value / USDRUB),
        usdmonthtaxed: financial((value / USDRUB) * 0.75),
        cad: financial((value / CADRUB) * 12),
        cadtaxed: financial((value / CADRUB) * 0.7455 * 12),
        cadmonth: financial(value / CADRUB),
        cadmonthtaxed: financial((value / CADRUB) * 0.7455),
      };
    case 'onrubmonthtaxedchange':
      return {
        ...state,
        rub: financial((value / 0.87) * 12),
        rubtaxed: value * 12,
        rubmonth: financial(value / 0.87),
        rubmonthtaxed: value,
        usd: financial((value / USDRUB / 0.87) * 12),
        usdtaxed: financial((((value / USDRUB) * 0.75) / 0.87) * 12),
        usdmonth: financial((value / USDRUB / 12 / 0.87) * 12),
        usdmonthtaxed: financial(((value / USDRUB) * 0.75) / 0.87),
        cad: financial((value / CADRUB / 0.87) * 12),
        cadtaxed: financial((((value / CADRUB) * 0.7455) / 0.87) * 12),
        cadmonth: financial(value / CADRUB / 0.87),
        cadmonthtaxed: financial(((value / CADRUB) * 0.7455) / 0.87),
      };
    case 'onusdchange':
      return {
        ...state,
        rub: financial(value * USDRUB),
        rubtaxed: financial(value * USDRUB * 0.87),
        rubmonth: financial((value * USDRUB) / 12),
        rubmonthtaxed: financial(((value * USDRUB) / 12) * 0.87),
        usd: value,
        usdtaxed: financial(value * 0.75),
        usdmonth: financial(value / 12),
        usdmonthtaxed: financial((value * 0.75) / 12),
        cad: financial(value * (USDRUB / CADRUB)),
        cadtaxed: financial(value * (USDRUB / CADRUB) * 0.7455),
        cadmonth: financial((value * (USDRUB / CADRUB)) / 12),
        cadmonthtaxed: financial((value * (USDRUB / CADRUB) * 0.7455) / 12),
      };
    case 'onusdtaxedchange':
      return {
        ...state,
        rub: financial((value * USDRUB) / 0.75),
        rubtaxed: financial((value * USDRUB * 0.87) / 0.75),
        rubmonth: financial((value * USDRUB) / 12 / 0.75),
        rubmonthtaxed: financial((((value * USDRUB) / 12) * 0.87) / 0.75),
        usd: financial(value / 0.75),
        usdtaxed: value,
        usdmonth: financial(value / 12 / 0.75),
        usdmonthtaxed: financial(value / 12),
        cad: financial(value * (USDRUB / CADRUB / 0.75)),
        cadtaxed: financial(value * (USDRUB / CADRUB / 0.75) * 0.7455),
        cadmonth: financial((value * (USDRUB / CADRUB / 0.75)) / 12),
        cadmonthtaxed: financial(
          (((value * (USDRUB / CADRUB)) / 0.75) * 0.7455) / 12
        ),
      };
    case 'onusdmonthchange':
      return {
        ...state,
        rub: financial(value * USDRUB * 12),
        rubtaxed: financial(value * USDRUB * 0.87 * 12),
        rubmonth: financial(value * USDRUB),
        rubmonthtaxed: financial(value * USDRUB * 0.87),
        usd: financial(value * 12),
        usdtaxed: financial(value * 0.75 * 12),
        usdmonth: value,
        usdmonthtaxed: financial(value * 0.75),
        cad: financial(value * ((USDRUB / CADRUB) * 12)),
        cadtaxed: financial(value * (USDRUB / CADRUB) * 0.7455 * 12),
        cadmonth: financial(value * (USDRUB / CADRUB)),
        cadmonthtaxed: financial(value * (USDRUB / CADRUB) * 0.7455),
      };
    case 'onusdmonthtaxedchange':
      return {
        ...state,
        rub: financial(((value * USDRUB) / 0.75) * 12),
        rubtaxed: financial(((value * USDRUB * 0.87) / 0.75) * 12),
        rubmonth: financial((value * USDRUB) / 0.75),
        rubmonthtaxed: financial((value * USDRUB * 0.87) / 0.75),
        usd: financial((value / 0.75) * 12),
        usdtaxed: value * 12,
        usdmonth: financial(value / 0.75),
        usdmonthtaxed: value,
        cad: financial(value * (USDRUB / CADRUB / 0.75) * 12),
        cadtaxed: financial(value * (USDRUB / CADRUB / 0.75) * 0.7455 * 12),
        cadmonth: financial(value * (USDRUB / CADRUB / 0.75)),
        cadmonthtaxed: financial(((value * USDRUB) / CADRUB / 0.75) * 0.7455),
      };
    case 'oncadchange':
      return {
        ...state,
        rub: financial(CADRUB * value),
        rubtaxed: financial(CADRUB * value * 0.87),
        rubmonth: financial((CADRUB * value) / 12),
        rubmonthtaxed: financial((CADRUB * value * 0.87) / 12),
        usd: financial((value * USDRUB) / CADRUB),
        usdtaxed: financial(((value * USDRUB) / CADRUB) * 0.75),
        usdmonth: financial((value * USDRUB) / CADRUB / 12),
        usdmonthtaxed: financial((((value * USDRUB) / CADRUB) * 0.75) / 12),
        cad: value,
        cadtaxed: financial(value * 0.7455),
        cadmonth: financial(value / 12),
        cadmonthtaxed: financial((value * 0.7455) / 12),
      };
    case 'oncadtaxedchange':
      return {
        ...state,
        rub: financial((CADRUB * value) / 0.7455),
        rubtaxed: financial((CADRUB * value * 0.87) / 0.7455),
        rubmonth: financial((CADRUB * value) / 12 / 0.7455),
        rubmonthtaxed: financial((CADRUB * value * 0.87) / 12 / 0.7455),
        usd: financial((value * USDRUB) / CADRUB / 0.7455),
        usdtaxed: financial((((value * USDRUB) / CADRUB) * 0.75) / 0.7455),
        usdmonth: financial((value * USDRUB) / CADRUB / 12 / 0.7455),
        usdmonthtaxed: financial(
          (((value * USDRUB) / CADRUB) * 0.75) / 0.7455 / 12
        ),
        cad: financial(value / 0.7455),
        cadtaxed: value,
        cadmonth: financial(value / 12 / 0.7455),
        cadmonthtaxed: financial(value / 12),
      };
    case 'oncadmonthchange':
      return {
        ...state,
        rub: financial(CADRUB * value * 12),
        rubtaxed: financial(CADRUB * value * 0.87 * 12),
        rubmonth: financial(CADRUB * value),
        rubmonthtaxed: financial(CADRUB * value * 0.87),
        usd: financial(((value * USDRUB) / CADRUB) * 12),
        usdtaxed: financial(((value * USDRUB) / CADRUB) * 0.75 * 12),
        usdmonth: financial((value * USDRUB) / CADRUB),
        usdmonthtaxed: financial(((value * USDRUB) / CADRUB) * 0.75),
        cad: value * 12,
        cadtaxed: financial(value * 0.7455 * 12),
        cadmonth: value,
        cadmonthtaxed: financial(value * 0.7455),
      };
    case 'oncadmonthtaxedchange':
      return {
        ...state,
        rub: financial(((CADRUB * value) / 0.7455) * 12),
        rubtaxed: financial(((CADRUB * value * 0.87) / 0.7455) * 12),
        rubmonth: financial((CADRUB * value) / 0.7455),
        rubmonthtaxed: financial((CADRUB * value * 0.87) / 0.7455),
        usd: financial(((value * USDRUB) / CADRUB / 0.7455) * 12),
        usdtaxed: financial((((value * USDRUB) / CADRUB) * 0.75 * 12) / 0.7455),
        usdmonth: financial((value * USDRUB) / CADRUB / 0.7455),
        usdmonthtaxed: financial((((value * USDRUB) / CADRUB) * 0.75) / 0.7455),
        cad: financial((value / 0.7455) * 12),
        cadtaxed: value * 12,
        cadmonth: financial(value / 0.7455),
        cadmonthtaxed: value,
      };
    default:
      return state;
  }
}

// https://codesandbox.io/s/5tgjw?file=/src/App.js:380-3665

// exchange rate calculator
// 1. As a user, I should be able to type in salary to any field
// The app will calculate equivalent in other currencies
// 2. When the year gross salary is entered to the input
// the net salary is calculated both for the year and month
// 3. The app uses latest conversion rates from API.
// 4. The equivalents are calculated on the fly as you type

function Currencypage() {
  const [state, dispatcher] = useReducer(reducer, initialState);

  const rub = useSelector(state => state.currency.rub);
  const usd = useSelector(state => state.currency.usd);
  const cad = useSelector(state => state.currency.cad);

  const isLoading = useSelector(state => state.currency.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  var USDRUB = rub.value / usd.value; // курс доллара к рублю
  var CADRUB = rub.value / cad.value; // курс канад.доллара к рублю

  const handleGeneric = e => {
    const received = e.target.value;
    const id = e.target.id;
    if (id === '1') {
      dispatcher({
        type: 'onrubchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '2') {
      dispatcher({
        type: 'onrubtaxedchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '3') {
      dispatcher({
        type: 'onrubmonthchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '4') {
      dispatcher({
        type: 'onrubmonthtaxedchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '5') {
      dispatcher({
        type: 'onusdchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '6') {
      dispatcher({
        type: 'onusdtaxedchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '7') {
      dispatcher({
        type: 'onusdmonthchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '8') {
      dispatcher({
        type: 'onusdmonthtaxedchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '9') {
      dispatcher({
        type: 'oncadchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '10') {
      dispatcher({
        type: 'oncadtaxedchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '11') {
      dispatcher({
        type: 'oncadmonthchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
    if (id === '12') {
      dispatcher({
        type: 'oncadmonthtaxedchange',
        payload: { value: received, USDRUB: USDRUB, CADRUB: CADRUB },
      });
    }
  };

  return (
    <StyledSection>
      <SectionTitle>Income Tax Converter</SectionTitle>
      <Holder>
        <StyledCalcWrapper isLoading={isLoading}>
          <SectionContent>
            Find out how much your salary is after tax in Russia
          </SectionContent>
          <CurrencyInput
            id={1}
            label={'RUB year before tax'}
            handler={handleGeneric}
            currencyvalue={state.rub}
            max={6000000}
          />
          <CurrencyInput
            id={2}
            label={'RUB year after tax'}
            handler={handleGeneric}
            currencyvalue={state.rubtaxed}
            max={6000000}
          />
          <CurrencyInput
            id={3}
            label={'RUB month before tax'}
            handler={handleGeneric}
            currencyvalue={state.rubmonth}
            max={6000000}
          />
          <CurrencyInput
            id={4}
            label={'RUB month after tax'}
            handler={handleGeneric}
            currencyvalue={state.rubmonthtaxed}
            max={6000000}
          />
          <SectionContent>
            Find out how much your salary is in USA
          </SectionContent>
          <CurrencyInput
            id={5}
            label={'USD year before tax'}
            handler={handleGeneric}
            currencyvalue={state.usd}
            max={100000}
          />
          <CurrencyInput
            id={6}
            label={'USD year after tax'}
            handler={handleGeneric}
            currencyvalue={state.usdtaxed}
            max={100000}
          />
          <CurrencyInput
            id={7}
            label={'USD month before tax'}
            handler={handleGeneric}
            currencyvalue={state.usdmonth}
            max={100000}
          />
          <CurrencyInput
            id={8}
            label={'USD month after tax'}
            handler={handleGeneric}
            currencyvalue={state.usdmonthtaxed}
            max={100000}
          />
          <SectionContent>
            Find out how much your salary is in Canada
          </SectionContent>
          <CurrencyInput
            id={9}
            label={'CAD year before tax'}
            handler={handleGeneric}
            currencyvalue={state.cad}
            max={100000}
          />
          <CurrencyInput
            id={10}
            label={'CAD year after tax'}
            handler={handleGeneric}
            currencyvalue={state.cadtaxed}
            max={100000}
          />
          <CurrencyInput
            id={11}
            label={'CAD month before tax'}
            handler={handleGeneric}
            currencyvalue={state.cadmonth}
            max={100000}
          />
          <CurrencyInput
            id={12}
            label={'CAD month after tax'}
            handler={handleGeneric}
            currencyvalue={state.cadmonthtaxed}
            max={100000}
          />
        </StyledCalcWrapper>
        <SideCalc></SideCalc>
        {isLoading && <Spinner />}
      </Holder>
    </StyledSection>
  );
}

export { Currencypage };

const CurrencyInput = ({ label, handler, currencyvalue, max, id = 123 }) => {
  const getBackgroundSize = () => {
    return { backgroundSize: `${(currencyvalue * 100) / max}% 100%` };
  };

  return (
    <SliderInputRoot405>
      <DcInput612>
        <DcInputInputContainer612>
          <Input612 id={id} step='1' onChange={handler} value={currencyvalue} />
          <StyledLabel>{label}</StyledLabel>
        </DcInputInputContainer612>
      </DcInput612>
      <SliderRoot405>
        <SliderAxis405>
          <LowerInput
            id={id}
            type='range'
            min='0'
            max={max}
            onChange={handler}
            style={getBackgroundSize()}
            value={currencyvalue}
          />
        </SliderAxis405>
      </SliderRoot405>
    </SliderInputRoot405>
  );
};

CurrencyInput.defaultProps = {
  max: 100000,
  handler: () => {},
};

export const DcInput612 = styled.div`
  width: 100%;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dc-color-white, #fff);
  border: 1px solid var(--dc-color-grey-200, #d3d4d4);
  transition: border-color 0.2s;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
  height: 52px !important;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const DcInputInputContainer612 = styled.div`
  height: 52px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: inherit;
`;

export const Input612 = styled.input`
  padding-top: 29px;
  width: 100%;
  height: calc(100% - 2px);
  margin: 1px 0;
  padding: 29px 11px 12px 11px;
  border: 0;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  text-overflow: ellipsis;
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  color: var(--dc-color-afro, #242629);
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
  text-shadow: none;
  text-indent: 0;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 0;
`;

export const SliderRoot405 = styled.div`
  position: absolute;
  bottom: -9px;
  display: flex;
  width: 100%;
  height: 20px;
  min-width: 180px;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
`;

export const LowerInput = styled.input.attrs({ type: 'range' })`
  // Толщина палки и цвет справа, закругление, цвет слева
  -webkit-appearance: none;
  height: 8px;
  background: #bdbdbd;
  background-image: linear-gradient(#61456a, #61456a);
  background-repeat: no-repeat;
  margin: 0;
  width: 100%;
  //  а то короткая по умолчанию
  border-radius: 0 0 5px 5px;

  /* сам кружок - его цвет высота ширина форма */
  /* transition непонятно для чего */
  /* на firefox есть бордюр его надо занулить */
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #61456a;
    cursor: pointer;
    border: 0;
    outline: 0;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  ::-moz-range-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #61456a;
    cursor: pointer;
    border: 0;
    outline: 0;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  /* полоска через центр ползунка - разная в firefox и chrome */
  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  ::-moz-range-track {
    box-shadow: none;
    border: none;
    background: transparent;
  }

  /* pseudo-classes тень при наведении на шарик */
  ::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(97, 69, 106, 0.16);
  }

  ::-moz-range-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(97, 69, 106, 0.16);
  }

  /* тень при нажатии на шарик становится еще больше */
  ::-webkit-slider-thumb:active {
    box-shadow: 0px 0px 0px 14px rgba(97, 69, 106, 0.16);
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  ::-moz-range-thumb:active {
    box-shadow: 0px 0px 0px 14px rgba(97, 69, 106, 0.16);
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

export const SliderAxis405 = styled.div`
  height: 8px;
  position: absolute;
  width: 100%;
  top: 10px;
  left: 0px;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
  font-size: 0;
  line-height: 0;
`;
