import React, { useReducer } from 'react';
import {
  StyledForm,
  StyledNumeric,
  StyledLabel,
} from 'features/converter/converterStyle';

const USDRUB = 60; // US dollar to ruble rate
const EURRUB = 60; // euro to ruble rate

const initialState = {
  rub: 0,
  usd: 0,
  eur: 0,
};

function reducer(state, action) {
  const value = action.payload;
  switch (action.type) {
    case 'onrubchange':
      return {
        ...state,
        rub: value,
        usd: value / USDRUB,
        eur: value / EURRUB,
      };
    case 'onusdchange':
      return {
        ...state,
        rub: value * USDRUB,
        usd: value,
        eur: (value / USDRUB) * EURRUB,
      };
    case 'oneurchange':
      return {
        ...state,
        rub: value * EURRUB,
        usd: (value / EURRUB) * USDRUB,
        eur: value,
      };
    default:
      return state;
  }
}

function Converterpage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleGeneric = e => {
    const received = e.target.value;
    const id = e.target.id;
    if (id === '1') {
      dispatch({ type: 'onrubchange', payload: received });
    }
    if (id === '2') {
      dispatch({ type: 'onusdchange', payload: received });
    }
    if (id === '3') {
      dispatch({ type: 'oneurchange', payload: received });
    }
  };

  const inputData = [
    { id: 1, currency: state.rub, name: 'Russian Ruble' },
    { id: 2, currency: state.usd, name: 'United States Dollar' },
    { id: 3, currency: state.eur, name: 'Euro' },
  ];

  return (
    <StyledForm>
      {inputData.map(data => (
        <Input key={data.id} data={data} onChange={handleGeneric} />
      ))}
    </StyledForm>
  );
}

const Input = ({ data, onChange }) => {
  return (
    <>
      <StyledLabel htmlFor={data.id}>
        <b>{data.name}</b>
      </StyledLabel>
      <StyledNumeric
        className='numeric'
        id={data.id}
        onChange={onChange}
        value={data.currency}
      />
    </>
  );
};

export { Converterpage };
