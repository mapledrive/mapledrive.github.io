import React from 'react'
import {Route, Switch} from 'react-router-dom';
import HomeContainer from '../containers/HomeContainer';
import ServiceContainer from '../containers/ServiceContainer';
import DeliveryContainer from '../containers/DeliveryContainer';
import ContactsContainer from '../containers/ContactsContainer';
import PartnersContainer from '../containers/PartnersContainer';
import InformationContainer from '../containers/InformationContainer';

export const Main = (props) => 
	<div className="main-wrap">
		<div className="content">
			<Switch>
			<Route exact path='/' component={HomeContainer}/>
			<Route path='/service' component={ServiceContainer}/>
			<Route path='/delivery' component={DeliveryContainer}/>
			<Route path='/contacts' component={ContactsContainer}/>
			<Route path='/partners' component={PartnersContainer}/>
			<Route path='/information' component={InformationContainer}/>
			</Switch>
		</div>
    	<div className="sidebar">
			<SidebarPlace sidebartitle='About Maple Drive' sidebarcontent='Maple Drive is your best resource for FREE, hand-picked, high-quality, commercial-use fonts. Even if that means we send you elsewhere to get them... more info' />
			<SidebarPlace sidebartitle='New To this website?' sidebarcontent='Download our free beginners guide to fonts. Now that you have your guide, its time to use fonts on your website.' />
			<SidebarPlace sidebartitle='About Maple Drive' sidebarcontent='Maple Drive is your best resource for FREE, hand-picked, high-quality, commercial-use fonts. Even if that means we send you elsewhere to get them... more info' />
			<SidebarPlace sidebartitle='New To this website?' sidebarcontent='Download our free beginners guide to fonts. Now that you have your guide, its time to use fonts on your website.' />
		</div>
	</div>;
	

const SidebarPlace = (props) => 
<div className="sidebarwidget">
	<div className="sidebarTitle">{props.sidebartitle}</div>
	<div className="sidebarContent">{props.sidebarcontent}</div>
</div>;
