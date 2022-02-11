import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes/normal';

function Widget(props) {
  const routes = props.routes;
  return (
    <div className='footerwidget'>
      <WidgetName />
      <FooterList routes={routes} />
    </div>
  );
}

function WidgetName() {
  return <div className='footertitle'>Recently Added Fonts</div>;
}

function FooterList(props) {
  const routes = props.routes;
  const listItems = routes.map(({ path, component, name }, key) => (
    <li key={key}>
      <NavLink
        onClick={() => {}}
        className='footerli'
        activeStyle={{ outline: 'none', color: '#32a7e0' }}
        to={path}
      >
        {name}
      </NavLink>
    </li>
  ));
  return <ul className='footerul'>{listItems}</ul>;
}

export class Footer extends React.Component {
  render() {
    return (
      <div className='rooter'>
        <Widget routes={routes} />
        <Widget routes={routes} />
        <Widget routes={routes} />
        <Widget routes={routes} />
      </div>
    );
  }
}
