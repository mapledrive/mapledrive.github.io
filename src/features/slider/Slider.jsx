import { useState } from 'react';
import styled from 'styled-components';

function Slider() {
  const [value, setValue] = useState(50);
  return <Slide value={value} onChange={e => setValue(e.target.value)} />;
}

export default Slider;

const Slide = styled.input.attrs({ type: 'range' })`
  //  Толщина палки и цвет справа, закругление, цвет слева
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 8px;
  width: 100%;
  background: #bdbdbd;
  border-radius: 5px;
  background: ${props =>
    `linear-gradient(to right, #606c38 0%, #606c38 ${props.value}%, #bdbdbd ${props.value}%, #bdbdbd 100%);`};
  outline: 0;
  margin: 0;

  // сам кружок - его цвет высота ширина форма
  // transition непонятно для чего
  // на firefox есть бордюр его надо занулить
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #606c38;
    cursor: pointer;
    border: 0;
    outline: 0;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  ::-moz-range-thumb {
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #606c38;
    cursor: pointer;
    border: 0;
    outline: 0;
    transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  //  полоска через центр ползунка - разная в firefox и chrome
  ::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  ::-moz-range-track {
    -moz-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  //  pseudo-classes тень при наведении на шарик
  ::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(96, 108, 56, 0.16);
  }
  ::-moz-range-thumb:hover {
    box-shadow: 0px 0px 0px 8px rgba(96, 108, 56, 0.16);
  }

  // тень при нажатии на шарик становится еще больше
  ::-webkit-slider-thumb:active {
    box-shadow: 0px 0px 0px 14px rgba(96, 108, 56, 0.16);
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  ::-moz-range-thumb:active {
    box-shadow: 0px 0px 0px 14px rgba(96, 108, 56, 0.16);
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
