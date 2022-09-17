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
  background-color: #61456a;
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
