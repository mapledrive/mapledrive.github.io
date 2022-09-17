import React from 'react';
import {
  Rooter,
  FooterWidget,
  FooterTitle,
  FooterUl,
  StyledFooterNavLink,
} from 'style';

function Recently() {
  return <div>yes</div>;
}

export const routes = [
  { path: '/converter', component: Recently, name: 'Converter' },
  { path: '/slider', component: Recently, name: 'Slider' },
  { path: '/usecallbackpage', component: Recently, name: 'useCallback' },
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
  const listItems = routes.map(({ path, name }, key) => (
    <li key={key}>
      <StyledFooterNavLink to={path}>{name}</StyledFooterNavLink>
    </li>
  ));
  return <FooterUl>{listItems}</FooterUl>;
};

export const Footer = () => (
  <Rooter>
    <FooterWidget>
      <FooterTitle>Font Lists</FooterTitle>
      <FooterList routes={routes} />
    </FooterWidget>
    <FooterWidget>
      <FooterTitle>Commercial Favorites</FooterTitle>
      <FooterList routes={routes2} />
    </FooterWidget>
    <FooterWidget>
      <FooterTitle>Need Help?</FooterTitle>
      <FooterList routes={routes3} />
    </FooterWidget>
    <FooterWidget>
      <FooterTitle>Connect</FooterTitle>
      <FooterList routes={routes4} />
    </FooterWidget>
  </Rooter>
);
