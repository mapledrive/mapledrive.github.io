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
          Hrome
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
          to='/contacts'
        >
          Contacts
        </NavLink>
      </li>
      <li className='cell'>
        <NavLink
          className={navData => (navData.isActive ? 'activeBlue' : 'v')}
          to='/partners'
        >
          Partners
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
