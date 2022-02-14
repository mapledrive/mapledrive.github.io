import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Homepage } from 'pages/Homepage';
import { Servicepage } from 'pages/Servicepage';
import { Deliverypage } from 'pages/Deliverypage';
import { Contactspage } from 'pages/Contactspage';
import { Partnerspage } from 'pages/Partnerspage';
import { Informationpage } from 'pages/Informationpage';

export const Main = () => (
  <main>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/home' element={<Homepage />} />
      <Route path='/service' element={<Servicepage />} />
      <Route path='/delivery' element={<Deliverypage />} />
      <Route path='/contacts' element={<Contactspage />} />
      <Route path='/partners' element={<Partnerspage />} />
      <Route path='/information' element={<Informationpage />} />
    </Routes>
  </main>
);
