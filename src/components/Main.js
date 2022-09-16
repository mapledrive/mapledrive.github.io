import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from 'pages/Homepage';
import { Pdfpage } from 'pages/Pdfpage';
import { Deliverypage } from 'pages/Deliverypage';
import { Sliderpage } from 'pages/Sliderpage';
import { Currencypage } from 'pages/Currencypage';
import { Converterpage } from 'pages/Converterpage';
import { Informationpage } from 'pages/Informationpage';

export const Main = () => (
  <main>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/pdf' element={<Pdfpage />} />
      <Route path='/delivery' element={<Deliverypage />} />
      <Route path='/slider' element={<Sliderpage />} />
      <Route path='/currency' element={<Currencypage />} />
      <Route path='/information' element={<Informationpage />} />
      <Route path='/converter' element={<Converterpage />} />
      <Route path='*' element={<Homepage />} />
    </Routes>
  </main>
);
