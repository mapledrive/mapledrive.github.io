import styled, { createGlobalStyle } from 'styled-components';
import fjalla from 'fonts/fjalla-one-v4-latin-regular.woff';
import pt_sansregular from 'fonts/PTS55F-webfont.woff';
import Roboto from 'fonts/roboto-v18-latin-regular.woff';

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
