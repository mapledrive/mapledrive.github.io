import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

function Currencypage() {
  const dollarprefix = '$ ';
  const cadprefix = 'CAD ';
  const rubprefix = 'RUB ';
  const [value, setValue] = useState(0);

  const handleChange = e => {
    e.preventDefault();
    const { value = '' } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, '');
    setValue(parsedValue);
  };

  const handleOnBlur = () => setValue(Number(value).toFixed(2));

  return (
    <section>
      <div className='sectionTitle'>Super Simple Currency Input</div>
      <div className='sectionContent'>Please input sum in dollars here</div>
      <CurrencyInput
        prefix={dollarprefix}
        name='currencyInput'
        id='currencyInput'
        data-number-to-fixed='2'
        data-number-stepfactor='100'
        value={value}
        placeholder=''
        onChange={handleChange}
        onBlur={handleOnBlur}
        allowDecimals
        decimalsLimit='2'
        disableAbbreviations
      />
      <br />
      <CurrencyInput
        prefix={cadprefix}
        name='currencyInput'
        id='currencyInput'
        data-number-to-fixed='2'
        data-number-stepfactor='100'
        value={value * 1.31}
        placeholder=''
        onChange={handleChange}
        onBlur={handleOnBlur}
        allowDecimals
        decimalsLimit='2'
        disableAbbreviations
      />
      <br />
      <CurrencyInput
        prefix={rubprefix}
        name='currencyInput'
        id='currencyInput'
        data-number-to-fixed='2'
        data-number-stepfactor='100'
        value={value * 60.8}
        placeholder=''
        onChange={handleChange}
        onBlur={handleOnBlur}
        allowDecimals
        decimalsLimit='2'
        disableAbbreviations
      />
    </section>
  );
}

export { Currencypage };
