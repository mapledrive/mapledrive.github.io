import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from 'pages/Homepage';
import { Pdfpage } from 'pages/Pdfpage';
import { Deliverypage } from 'pages/Deliverypage';
import { Sliderpage } from 'pages/Sliderpage';
import { Currencypage } from 'pages/Currencypage';
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
      <Route path='*' element={<Homepage />} />
    </Routes>
  </main>
);

// Using path="*"" means "match anything", so this route acts
// like a catch-all for URLs that we don't have explicit routes for.
