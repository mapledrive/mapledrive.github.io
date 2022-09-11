import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <ul className='navigation'>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/'
        >
          Home
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/service'
        >
          Service
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/delivery'
        >
          Delivery
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/slider'
        >
          Slider
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/currency'
        >
          Currency
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/information'
        >
          Information
        </NavLink>
      </li>
    </ul>
  );
}
