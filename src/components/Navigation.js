import React from 'react'
import {NavLink} from 'react-router-dom';

export function Navigation() {
    return (
			<ul className="navigation">
				<li className="cell"><NavLink className="v" activeStyle={{outline:'none', color: '#32a7e0'}} exact to='/'>Home</NavLink></li>
				<li className="cell"><NavLink className="v" activeStyle={{outline:'none', color: '#32a7e0'}} exact to='/service'>Service</NavLink></li>
				<li className="cell"><NavLink className="v" activeStyle={{outline:'none', color: '#32a7e0'}} exact to='/delivery'>Delivery</NavLink></li>
				<li className="cell"><NavLink className="v" activeStyle={{outline:'none', color: '#32a7e0'}} exact to='/contacts'>Contacts</NavLink></li>
				<li className="cell"><NavLink className="v" activeStyle={{outline:'none', color: '#32a7e0'}} exact to='/partners'>Partners</NavLink></li>
				<li className="cell"><NavLink className="v" activeStyle={{outline:'none', color: '#32a7e0'}} exact to='/information'>Information</NavLink></li>
			</ul>
  );
}
