import {Recently, Most, Almost, Languages, Tags, Proxima, Museo, Bombshell,Brandon, Franklin, Frequently, Help, Contactus, Privacy, Advertising, Twitter, Facebook, Rss, Newsletter, Blog, Login} from '../components/Footer';
import DeliveryContainer from '../containers/DeliveryContainer';
import {Home} from '../components/Home';
import Partners from '../components/Partners';
import ServiceContainer from '../containers/ServiceContainer';
import ContactsContainer from '../containers/ContactsContainer';
import InformationContainer from '../containers/InformationContainer';

export const menus = [
	{path: '/', component: Home, name: 'Home' }, 
	{path: '/service', component: ServiceContainer, name: 'Service' }, 
	{path: '/delivery', component: DeliveryContainer, name: 'Delivery' },
	{path: '/contacts', component: ContactsContainer, name: 'Contacts' }, 
	{path: '/partners', component: Partners, name: 'Partners' },
	{path: '/information', component: InformationContainer, name: 'Information' }
];


export const routes = [
	{path: '/recently', component: Recently, name: 'Recently Added Fonts' }, 
	{path: '/most', component: Most, name: 'Most Downloaded Fonts' }, 
	{path: '/almost', component: Almost, name: 'Almost Free Fonts' },
	{path: '/languages', component: Languages, name: 'Languages' }, 
	{path: '/tags', component: Tags, name: 'Tags' }
];

export const routes2 = [
	{path: '/proxima', component: Proxima, name: 'Proxima Nova' },
	{path: '/museo', component: Museo, name: 'Museo Sans' },
	{path: '/bombshell', component: Bombshell, name: 'Bombshell' },
	{path: '/brandon', component: Brandon, name: 'Brandon' },
	{path: '/franklin', component: Franklin, name: 'Franklin' }
];
	
export const routes3 = [	
	{path: '/frequently', component: Frequently , name: 'Frequently Asked Questions' },
	{path: '/help', component: Help, name: 'Help Installing Fonts' },
	{path: '/contactus', component: Contactus, name: 'Contact Us' },
	{path: '/privacy', component: Privacy, name: 'Privacy Policy' },
	{path: '/advertising', component: Advertising, name: 'Advertising' }
];
	
export const routes4 = [	
	{path: '/twitter', component: Twitter, name: 'Twitter' },
	{path: '/facebook', component: Facebook, name: 'Facebook' },
	{path: '/rss', component: Rss, name: 'RSS' },
	{path: '/newsletter', component: Newsletter, name: 'Newsletter' },
	{path: '/blog', component: Blog, name: 'Blog' },
	{path: '/login', component: Login, name: 'Login' }
];
