import React from 'react'
import {menus} from '../routes/normal';
import {NavLink} from 'react-router-dom';


export function Navigation() {
  const listItems = menus.map(({path, component, name}, key) => <li className="cell" key={key}><NavLink activeStyle={{outline:'none', color: '#32a7e0'}} className="v" exact to={path}>{name}</NavLink></li> );
  return (
    <ul className="navigation">{listItems}</ul>
  );
}