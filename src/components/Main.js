import React from 'react'
import {Route, Switch} from 'react-router-dom';
import {menus, routes, routes2, routes3, routes4} from '../routes/normal';

export const Main = (props) => 
	<div className="main-wrap">
		<div className="content">
			<RoutingGroupContent />
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



function RoutingGroupContent()  {
	const routeComponents = ( menus.concat(routes, routes2, routes3, routes4) ).map( ({ path, component }, key ) => 
	<Route exact path={path} component={component} key={key} />);
	return <Switch>{routeComponents}</Switch>;
}