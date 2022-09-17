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
`;

export const SectionTitle = styled.aside`
  color: #aaa;
  line-height: 50px;
  padding: 0px;
  box-sizing: border-box;
  font-family: fjalla;
  font-size: 45px;
  font-weight: 900;
  font-style: normal;
  white-space: wrap;
`;

export const SectionContent = styled.aside`
  color: #222;
  padding: 12px 0px;
  box-sizing: border-box;
  font-size: 15px;
  font-family: Roboto;
  line-height: 22px;
  font-weight: 400;
  font-style: normal;
`;
