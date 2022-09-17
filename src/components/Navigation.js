import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <ul className='navigation'>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'baseColor')}
          to='/'
          end
        >
          Home
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'baseColor')}
          to='/pdf'
        >
          Pdf
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'baseColor')}
          to='/news'
        >
          News
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'baseColor')}
          to='/slider'
        >
          Slider
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'baseColor')}
          to='/currency'
        >
          Currency
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'baseColor')}
          to='/information'
        >
          Information
        </NavLink>
      </li>
    </ul>
  );
}
