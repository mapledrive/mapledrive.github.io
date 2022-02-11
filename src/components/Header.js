import React from 'react';
import logoUrl from '../logo.png';

export const Header = props => (
  <div className='header'>
    <img src={logoUrl} className='logotype' alt='logo' />
  </div>
);
