import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from 'pages/Homepage';
import { SkeletonPage } from 'pages/SkeletonPage';
import { Newspage } from 'pages/Newspage';
import { Sliderpage } from 'pages/Sliderpage';
import { Currencypage } from 'pages/Currencypage';
import { Converterpage } from 'pages/Converterpage';
import { Informationpage } from 'pages/Informationpage';
import { Githubpage } from 'pages/Githubpage';
import { UseCallbackPage } from 'pages/UseCallbackPage';
import { Parserpage } from 'pages/Parserpage';
import { StyledMain } from 'style';

export const Main = () => (
  <StyledMain>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/skeleton' element={<SkeletonPage />} />
      <Route path='/news' element={<Newspage />} />
      <Route path='/slider' element={<Sliderpage />} />
      <Route path='/currency' element={<Currencypage />} />
      <Route path='/information' element={<Informationpage />} />
      <Route path='/converter' element={<Converterpage />} />
      <Route path='/github' element={<Githubpage />} />
      <Route path='/usecallbackpage' element={<UseCallbackPage />} />
      <Route path='/parser' element={<Parserpage />} />
      <Route path='*' element={<Homepage />} />
    </Routes>
  </StyledMain>
);
