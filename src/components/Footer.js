import React from 'react'
import {NavLink} from 'react-router-dom';
import {routes, routes2, routes3, routes4} from '../routes/normal';

export const Recently = () => <div className="contenttext"><h1 className="contentheadline">Recently Added Fonts</h1>Recently Added Fonts</div>;
export const Most = () => <div className="contenttext"><h1 className="contentheadline">Most Downloaded Fonts</h1>Most downloaded fonts here</div>;
export const Almost = () => <div className="contenttext"><h1 className="contentheadline">Almost Free Fonts</h1>Almost free but quality guaranteed</div>;
export const Languages = () => <div className="contenttext"><h1 className="contentheadline">Languages</h1>Many languages</div>;
export const Tags = () => <div className="contenttext"><h1 className="contentheadline">Tags</h1>Please check these tags</div>;


export const Proxima = () => <div className="contenttext"><h1 className="contentheadline">Proxima Nova</h1>One of the latest fonts here</div>;
export const Museo = () => <div className="contenttext"><h1 className="contentheadline">Museo Sans</h1>This is my favourit font so far</div>;
export const Bombshell = () => <div className="contenttext"><h1 className="contentheadline">Bombshell</h1>Not for everyday use</div>;
export const Brandon = () => <div className="contenttext"><h1 className="contentheadline">Brandon</h1>Please read about this font in the magazine</div>;
export const Franklin = () => <div className="contenttext"><h1 className="contentheadline">Franklin</h1>By no means it is old</div>;


export const Frequently = () => <div className="contenttext"><h1 className="contentheadline">Frequently Asked Questions</h1>How many questions are here</div>;
export const Help = () => <div className="contenttext"><h1 className="contentheadline">Help installing fonts</h1>You should choose modern format</div>;
export const Contactus = () => <div className="contenttext"><h1 className="contentheadline">Contact us</h1>Our phone is 9872344</div>;
export const Privacy = () => <div className="contenttext"><h1 className="contentheadline">Privacy Policy</h1>The privacy policy can be loaded on the link below</div>;
export const Advertising = () => <div className="contenttext"><h1 className="contentheadline">Advertising</h1>Advertising on this website</div>;


export const Twitter = () => <div className="contenttext"><h1 className="contentheadline">Twitter</h1>Our twitter is general. We are happy to tweet</div>;
export const Facebook = () => <div className="contenttext"><h1 className="contentheadline">Facebook</h1>You can get in touch with us with facebook</div>;
export const Rss = () => <div className="contenttext"><h1 className="contentheadline">RSS</h1>RSS feeds are available</div>;
export const Newsletter = () => <div className="contenttext"><h1 className="contentheadline">Newsletter</h1>Subscribe to get letters and read them</div>;
export const Blog = () => <div className="contenttext"><h1 className="contentheadline">Blog</h1>There are articles here about technology</div>;
export const Login = () => <div className="contenttext"><h1 className="contentheadline">Login</h1>Login to your page and check your updates</div>;




export class Footer extends React.Component {
  render() {
    return (
    <div className="rooter">
		<Widget prozvishe={prozvishes}  routes={routes} />
		<Widget prozvishe={prozvishes2} routes={routes2} />
		<Widget prozvishe={prozvishes3} routes={routes3} />
		<Widget prozvishe={prozvishes4} routes={routes4} />
	</div>
    );
  }
}


function Widget(props) {
  const prozvishe = props.prozvishe;
  const routes = props.routes;
  return (
  		<div className="footerwidget">
			<WidgetName prozvishe={prozvishe} />
			<FooterList routes={routes} />
		</div>
	);
}

function WidgetName (props) {
	return <div className="footertitle">{props.prozvishe}</div>
}

function FooterList(props) {
  const routes = props.routes;
  const listItems = routes.map(({path, component, name}, key) => <li key={key}><NavLink onClick={scrollToTop(1000)} className="footerli" activeStyle={{outline:'none', color: '#32a7e0'}}  to={path}>{name}</NavLink></li> );
  return (
    <ul className="footerul">{listItems}</ul>
  );
}


const prozvishes  = 'Font Lists';
const prozvishes2 = 'Commercial Favorites';
const prozvishes3 = 'Need Help?';
const prozvishes4 = 'Connect';



function scrollToTop(scrollDuration) {
    var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}