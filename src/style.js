import styled, { createGlobalStyle } from 'styled-components';
import fjalla from 'fonts/fjalla-one-v4-latin-regular.woff';
import pt_sansregular from 'fonts/PTS55F-webfont.woff';
import Roboto from 'fonts/roboto-v18-latin-regular.woff';
import { NavLink } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
 
  @font-face {
    font-family: 'fjalla';
    src: url(${fjalla}) format('woff');
  }
  
  @font-face {
    font-family: 'pt_sansregular';
    font-weight: normal;
    font-style: normal;
    src: url(${pt_sansregular}) format('woff');
  }
  
  @font-face {
    font-family: 'Roboto';
    src:  url(${Roboto}) format('woff');
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  background-color: #bdbdbb;
  padding: 40px 50px;

  @media (max-width: 800px) {
    padding: 10px;
  }
`;

/**
 * Header
 */
export const StyledHeader = styled.div`
  grid-column: 1 / span 2;
  background: linear-gradient(60deg, #61456a 0%, #613c6a 100%) !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 20px;

  @media (max-width: 800px) {
    padding: 20px;
  }
`;

export const Logo = styled.img`
  height: 150px;
  @media (max-width: 800px) {
    height: 50px;
  }
`;

/**
 * Navigation
 */

export const StyledNavigation = styled.ul`
  grid-column: 1 / span 2;
  background-color: #000;
  padding: 0px 30px;
  margin: 0px;
  display: flex;
  flex-direction: row;
  list-style: none; /* Remove list bullets */
  overflow: hidden;

  @media (max-width: 800px) {
    padding: 0px 20px;
  }
`;

export const Cell = styled.li`
  height: 45px;
  line-height: 45px;
  padding: 0px 20px 0px 0px;
  @media (max-width: 800px) {  
    height: 35px;
    line-height: 35px;
    padding: 0px 15px 0px 0px;
  }
}
`;

export const StyledNavLink = styled(NavLink)`
  color: #e3e3e1;
  text-decoration: none;
  font-size: 22px;
  font-family: fjalla;

  &:hover {
    color: #999999;
  }

  // How to style an active NavLink
  // check for existence of the active class
  &[class*='active'] {
    color: #32a7e0;
  }

  @media (max-width: 800px) {
    font-size: 18px;
    outline: none;
  }
`;

/**
 * Main part
 */

export const StyledMain = styled.main`
  background: #fff;
  color: #222;
  display: flex;
  margin: 0;
  padding: 30px;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 22px;
  font-family: fjalla;
  min-height: 800px;

  @media (max-width: 800px) {
    grid-column: 1 / span 2;
    padding: 20px;
  }
`;

export const StyledSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 50px;
  margin-bottom: 20px;
  box-sizing: border-box;
  color: #e3e3e1;
  padding: 0;
`;

export const SectionTitle = styled.div`
  color: #aaa;
  line-height: 50px;
  padding: 0px;
  box-sizing: border-box;
  font-family: fjalla;
  font-size: 45px;
  font-weight: 900;
  font-style: normal;
  white-space: wrap;
  @media (max-width: 800px) {
    line-height: 30px;
    font-size: 25px;
  }
`;

export const SectionContent = styled.div`
  color: #222;
  padding: 12px 0px;
  box-sizing: border-box;
  font-size: 15px;
  font-family: Roboto;
  line-height: 22px;
  font-weight: 400;
  font-style: normal;
`;

export const StyledAside = styled.aside`
  position: relative;
  background-color: #e4e4e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 30px;
  box-sizing: border-box;
  min-height: 800px;
  opacity: ${props => (props.isLoading ? 0.4 : 1)};

  @media (max-width: 800px) {
    grid-column: 1 / span 2;
    padding: 20px;
  }
`;

/**
 * Bottom
 */

export const StyledBottom = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #3d2d43;
  font-size: 14px;
  font-family: pt_sansregular;
  padding: 0px 30px;
  color: #fff;
  height: 50px;
  @media (max-width: 800px) {
    padding: 20px;
  }
`;

/**
 * Footer part of website
 */

export const Rooter = styled.div`
  grid-column: 1 / span 2;
  background-color: #3d2d43;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;

export const FooterWidget = styled.div`
  flex: 25%;
  max-width: 25%;
  margin: 0;
  padding: 30px;
  box-sizing: border-box;
  @media (max-width: 800px) {
    flex: 100%;
    max-width: 100%;
    padding: 20px;
  }
`;

export const FooterTitle = styled.div`
  font-size: 22px;
  font-family: fjalla, Charcoal, sans-serif;
  font-weight: normal;
  line-height: 30px;
  text-transform: uppercase;
  color: #a27eaf;
  margin-bottom: 8px;
  margin-top: 0px;
`;

export const FooterUl = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

export const StyledFooterNavLink = styled(NavLink)`
  font-size: 14px;
  font-family: pt_sansregular;
  line-height: 21px;
  color: #fff;
  padding: 0 0 5px;
  text-decoration: none;

  &:hover {
    color: #999999;
  }

  &[class*='active'] {
    color: #32a7e0;
  }
`;

/**
 * Sidebar
 */

export const SidebarWidget = styled.div`
  width: 100%;
  min-height: 150px;
  margin-bottom: 20px;
  box-sizing: border-box;
  color: #e3e3e1;
  padding: 0;
`;

export const SidebarTitle = styled.div`
  background-color: #999999;
  color: #fff;
  height: 40px;
  line-height: 40px;
  padding: 0px 7px;
  box-sizing: border-box;
  font-size: 22px;
  font-family: fjalla;
  overflow: hidden;
`;

export const SidebarContent = styled.div`
  color: #222;
  padding: 12px 0px;
  box-sizing: border-box;
  font-size: 13px;
  font-family: Roboto;
  line-height: 20px;
`;

export const Holder = styled.div`
  position: relative;
  width: 100%;
  height: 1065px;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const StyledCalcWrapper = styled.div`
  position: relative;
  max-width: 700px;
  width: 100%;
  height: 1065px;
  box-sizing: border-box;
  color: #e3e3e1;
  padding: 0;
  display: flex;
  flex: 0 2 700px; /* do not grow, do not shrink, start at 700px */
  flex-direction: column;
  opacity: ${props => (props.isLoading ? 0.4 : 1)};
`;

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
`;

export const GearWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  pointer-events: none;
  animation: rotation infinite 10s linear;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SideCalc = styled.div`
  display: flex;
  flex: 1; /* grow */
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 20px;
  line-height: 40px;
  font-size: 22px;
  font-family: fjalla;
  @media (max-width: 800px) {
    display: none;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;

  transform: scale(0.75) translateY(-16px);
  position: absolute;
  top: 16.5px;
  left: 12px;
  width: calc(100% - 24px);
  font-size: 16px;
  color: var(--dc-color-grey-640, #737476);
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  transform-origin: left;
  transition: 0.2s;
  white-space: nowrap;
  pointer-events: none;
  text-align: left;
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
  text-shadow: none;
  text-indent: 0;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;

  &:last-child {
    grid-column: 2;
  }
`;

export const SliderInputRoot405 = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 180px;
  width: 100%;
  box-sizing: inherit;
  font-size: 0;
  line-height: 0;
  font-family: Roboto, sans-serif;
  margin-bottom: 25px;
  &:not(:last-child) {
    margin-bottom: 25px;
  }

  &:before {
    content: attr(data-left-hint);
    left: 0;
    position: absolute;
    bottom: -30px;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    letter-spacing: normal;
    text-decoration: none;
    text-transform: none;
    text-shadow: none;
    text-indent: 0;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-stretch: normal;
  }

  &:after {
    content: attr(data-right-hint);
    right: 0;
    position: absolute;
    bottom: -30px;
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    letter-spacing: normal;
    text-decoration: none;
    text-transform: none;
    text-shadow: none;
    text-indent: 0;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-stretch: normal;
  }
`;

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
