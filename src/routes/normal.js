import DeliveryContainer from '../containers/DeliveryContainer';
import Home from '../components/Home';
import Partners from '../components/Partners';
import ServiceContainer from '../containers/ServiceContainer';
import ContactsContainer from '../containers/ContactsContainer';
import InformationContainer from '../containers/InformationContainer';

const Recently = () => (
  <div className='contenttext'>
    <h1 className='contentheadline'>Recently Added Fonts</h1>Recently Added
    Fonts
  </div>
);

export const menus = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/service', component: ServiceContainer, name: 'Service' },
  { path: '/delivery', component: DeliveryContainer, name: 'Delivery' },
  { path: '/contacts', component: ContactsContainer, name: 'Contacts' },
  { path: '/partners', component: Partners, name: 'Partners' },
  {
    path: '/information',
    component: InformationContainer,
    name: 'Information',
  },
];

export const routes = [
  { path: '/recently', component: Recently, name: 'Recently Added Fonts' },
  { path: '/most', component: Recently, name: 'Most Downloaded Fonts' },
  { path: '/almost', component: Recently, name: 'Almost Free Fonts' },
  { path: '/languages', component: Recently, name: 'Languages' },
  { path: '/tags', component: Recently, name: 'Tags' },
];
