import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from 'pages/Homepage';
import { Servicepage } from 'pages/Servicepage';
import { Deliverypage } from 'pages/Deliverypage';
import { Sliderpage } from 'pages/Sliderpage';
import { Currencypage } from 'pages/Currencypage';
import { Informationpage } from 'pages/Informationpage';

export const Main = () => (
  <main>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/home' element={<Homepage />} />
      <Route path='/service' element={<Servicepage />} />
      <Route path='/delivery' element={<Deliverypage />} />
      <Route path='/slider' element={<Sliderpage />} />
      <Route path='/currency' element={<Currencypage />} />
      <Route path='/information' element={<Informationpage />} />
    </Routes>
  </main>
);