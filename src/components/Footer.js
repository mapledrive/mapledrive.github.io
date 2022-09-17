import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rooter, FooterWidget } from 'style';

function Recently() {
  return <div>yes</div>;
}

export const routes = [
  { path: '/converter', component: Recently, name: 'Converter' },
  { path: '/github', component: Recently, name: 'Github' },
  { path: '/almost', component: Recently, name: 'Almost Free Fonts' },
  { path: '/languages', component: Recently, name: 'Languages' },
  { path: '/tags', component: Recently, name: 'Tags' },
];

export const routes2 = [
  { path: '/proxima', component: Recently, name: 'Proxima Nova' },
  { path: '/museo', component: Recently, name: 'Museo Sans' },
  { path: '/bombshell', component: Recently, name: 'Bombshell' },
  { path: '/brandon', component: Recently, name: 'Brandon' },
  { path: '/franklin', component: Recently, name: 'Franklin' },
];

export const routes3 = [
  {
    path: '/frequently',
    component: Recently,
    name: 'Frequently Asked Questions',
  },
  { path: '/help', component: Recently, name: 'Help Installing Fonts' },
  { path: '/contactus', component: Recently, name: 'Contact Us' },
  { path: '/privacy', component: Recently, name: 'Privacy Policy' },
  { path: '/advertising', component: Recently, name: 'Advertising' },
];

export const routes4 = [
  { path: '/twitter', component: Recently, name: 'Twitter' },
  { path: '/facebook', component: Recently, name: 'Facebook' },
  { path: '/rss', component: Recently, name: 'RSS' },
  { path: '/newsletter', component: Recently, name: 'Newsletter' },
  { path: '/blog', component: Recently, name: 'Blog' },
  { path: '/login', component: Recently, name: 'Login' },
];

const FooterList = ({ routes }) => {
  const listItems = routes.map(({ path, component, name }, key) => (
    <li key={key}>
      <NavLink
        onClick={() => {}}
        // className='footerli'
        className={navData => (navData.isActive ? 'footerli' : 'footerli')}
        // activeStyle={{ outline: 'none', color: '#32a7e0' }}
        to={path}
      >
        {name}
      </NavLink>
    </li>
  ));
  return <ul className='footerul'>{listItems}</ul>;
};

export const Footer = () => (
  <Rooter>
    <FooterWidget>
      <div className='footertitle'>Font Lists</div>
      <FooterList routes={routes} />
    </FooterWidget>
    <FooterWidget>
      <div className='footertitle'>Commercial Favorites</div>
      <FooterList routes={routes2} />
    </FooterWidget>
    <FooterWidget>
      <div className='footertitle'>Need Help?</div>
      <FooterList routes={routes3} />
    </FooterWidget>
    <FooterWidget>
      <div className='footertitle'>Connect</div>
      <FooterList routes={routes4} />
    </FooterWidget>
  </Rooter>
);
