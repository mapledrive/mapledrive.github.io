import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import './index.css';
import logoUrl from './logo.png';
import Parser from "rss-parser";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	async componentDidMount() {
		let parser = new Parser();
		const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
		let feed = await parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss');
		var news = feed.items.slice(0, 10);
		this.setState({ data: news });
	}
	render() {
		return (
			<div className="footerItem">
				<h1 className="footerline">{this.state.data[0] ? "Latest news: " : "Loading, please wait"}</h1>
				{this.state.data.map(item => (<div className="contenttext"><p>{item.title}</p></div>) ) }
			</div>
		)
	}
}

const Service = () => <div className="footerItem"><h1 className="footerline">Elephant Trophy Import Ban</h1>The U.S. Fish and Wildlife Service announced Thursday that it had lifted an Obama-era ban on importing sport-hunted trophies of elephants from Zimbabwe and Zambia. But Friday evening, President Trump seemed to say that decision was being reconsidered, tweeting that he would review all conservation facts and issue an update soon with Interior Secretary Ryan Zinke.Zinke later issued a statement, saying: President Trump and I have talked and both believe that conservation and healthy herds are critical. As a result, in a manner compliant with all applicable laws, rules, and regulations, the issuing of permits is being put on hold as the decision is being reviewed.The Washington Post has reported on big-game hunting by the presidents sons.The Fish and Wildlife Service said it had found that allowing trophy imports would help the conservation of elephants in those countries, a finding that allows it to authorize the import of the African elephant under the terms of the Endangered Species Act, which lists the African elephant as threatened.Legal, well-regulated sport hunting as part of a sound management program can benefit certain species by providing incentives to local communities to conserve those species </div>;
const Delivery = () => <div className="footerItem"><h1 className="footerline">Bitcoin Is Hot in Zimbabwe</h1>As the simabe are becoming more popular in countries like Zimbabwe as people lose faith.</div>;
const Contacts = () => <div className="footerItem"><h1 className="footerline">Mugabe</h1>Zimbabwe's ruling party has dismissed President Robert Mugabe as its leader, appointing former vice-president Emmerson Mnangagwa in his place, the head of the countrys influential liberation war veterans said.</div>;

// https://www.valentinog.com/blog/how-async-await-in-react/
class Partners extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	async componentDidMount() {
		const response = await fetch(`https://randomuser.me/api/?results=4`);
		const json = await response.json();
		var authors = json.results;
		this.setState({ data: authors });
	}
	render() {
		var authors = this.state.data;
		return (
			<div className="footerItem">
				<h1 className="footerline">Partner names: </h1>
				<div className="contain">
					{authors.map((author, index) => (<div className="itemcontent" key={index}>{author.name.first}<br/><img src={author.picture.large} alt="new" /></div> ))}
				</div>  
			</div>
		)
	}
}

const Information = () => <div className="footerItem"><h1 className="footerline">Butter</h1>The meeting is being chaired by Cde Obert Mpofu who is Zanu-PFs Secretary for Finance. Cde Mpofu is the most senior member present according to the party hierarchy.</div>;


/* Footer  */


const Recently = () => <div className="footerItem"><h1 className="footerline">Recently Added Fonts</h1>Recently Added Fonts</div>;
const Most = () => <div className="footerItem"><h1 className="footerline">Most Downloaded Fonts</h1>Most downloaded fonts here</div>;
const Almost = () => <div className="footerItem"><h1 className="footerline">Almost Free Fonts</h1>Almost free but quality guaranteed</div>;
const Languages = () => <div className="footerItem"><h1 className="footerline">Languages</h1>Many languages</div>;
const Tags = () => <div className="footerItem"><h1 className="footerline">Tags</h1>Please check these tags</div>;


const Proxima = () => <div className="footerItem"><h1 className="footerline">Proxima Nova</h1>One of the latest fonts here</div>;
const Museo = () => <div className="footerItem"><h1 className="footerline">Museo Sans</h1>This is my favourit font so far</div>;
const Bombshell = () => <div className="footerItem"><h1 className="footerline">Bombshell</h1>Not for everyday use</div>;
const Brandon = () => <div className="footerItem"><h1 className="footerline">Brandon</h1>Please read about this font in the magazine</div>;
const Franklin = () => <div className="footerItem"><h1 className="footerline">Franklin</h1>By no means it is old</div>;


const Frequently = () => <div className="footerItem"><h1 className="footerline">Frequently Asked Questions</h1>How many questions are here</div>;
const Help = () => <div className="footerItem"><h1 className="footerline">Help installing fonts</h1>You should choose modern format</div>;
const Contactus = () => <div className="footerItem"><h1 className="footerline">Contact us</h1>Our phone is 9872344</div>;
const Privacy = () => <div className="footerItem"><h1 className="footerline">Privacy Policy</h1>The privacy policy can be loaded on the link below</div>;
const Advertising = () => <div className="footerItem"><h1 className="footerline">Advertising</h1>Advertising on this website</div>;


const Twitter = () => <div className="footerItem"><h1 className="footerline">Twitter</h1>Our twitter is general. We are happy to tweet</div>;
const Facebook = () => <div className="footerItem"><h1 className="footerline">Facebook</h1>You can get in touch with us with facebook</div>;
const Rss = () => <div className="footerItem"><h1 className="footerline">RSS</h1>RSS feeds are available</div>;
const Newsletter = () => <div className="footerItem"><h1 className="footerline">Newsletter</h1>Subscribe to get letters and read them</div>;
const Blog = () => <div className="footerItem"><h1 className="footerline">Blog</h1>There are articles here about technology</div>;
const Login = () => <div className="footerItem"><h1 className="footerline">Login</h1>Login to your page and check your updates</div>;



const Header = (props) => <div className="headerStyle"><img src={logoUrl} className="logoStyle" alt="logo" /></div>;

const menus = [
	{path: '/', component: Home, name: 'Home' }, 
	{path: '/service', component: Service, name: 'Service' }, 
	{path: '/delivery', component: Delivery, name: 'Delivery' },
	{path: '/contacts', component: Contacts, name: 'Contacts' }, 
	{path: '/partners', component: Partners, name: 'Partners' },
	{path: '/information', component: Information, name: 'Information' }
];


const routes = [
	{path: '/recently', component: Recently, name: 'Recently Added Fonts' }, 
	{path: '/most', component: Most, name: 'Most Downloaded Fonts' }, 
	{path: '/almost', component: Almost, name: 'Almost Free Fonts' },
	{path: '/languages', component: Languages, name: 'Languages' }, 
	{path: '/tags', component: Tags, name: 'Tags' }
];

const routes2 = [
	{path: '/proxima', component: Proxima, name: 'Proxima Nova' },
	{path: '/museo', component: Museo, name: 'Museo Sans' },
	{path: '/bombshell', component: Bombshell, name: 'Bombshell' },
	{path: '/brandon', component: Brandon, name: 'Brandon' },
	{path: '/franklin', component: Franklin, name: 'Franklin' }
];
	
const routes3 = [	
	{path: '/frequently', component: Frequently , name: 'Frequently Asked Questions' },
	{path: '/help', component: Help, name: 'Help Installing Fonts' },
	{path: '/contactus', component: Contactus, name: 'Contact Us' },
	{path: '/privacy', component: Privacy, name: 'Privacy Policy' },
	{path: '/advertising', component: Advertising, name: 'Advertising' }
];
	
const routes4 = [	
	{path: '/twitter', component: Twitter, name: 'Twitter' },
	{path: '/facebook', component: Facebook, name: 'Facebook' },
	{path: '/rss', component: Rss, name: 'RSS' },
	{path: '/newsletter', component: Newsletter, name: 'Newsletter' },
	{path: '/blog', component: Blog, name: 'Blog' },
	{path: '/login', component: Login, name: 'Login' }
];

function Navigation() {
  const listItems = menus.map(({path, component, name}, key) => <li className="linkStyle" key={key}><NavLink activeStyle={{outline:'none', color: '#32a7e0'}} className="vStyle" exact to={path}>{name}</NavLink></li> );
  return (
    <div className="navigationStyle"><ul className="ulStyle">{listItems}</ul></div>
  );
}

const Main = (props) => 
	<div className="mainStyle">
    	<div className="sidebarStyle">
			<SidebarPlace sidebartitle='About Maple Drive' sidebarcontent='Font Squirrel is your best resource for FREE, hand-picked, high-quality, commercial-use fonts. Even if that means we send you elsewhere to get them... more info' />
			<SidebarPlace sidebartitle='New To this website?' sidebarcontent='Download our free beginners guide to fonts. Now that you have your guide, its time to use fonts on your website.' />
		</div>
    	<div className="contentStyle">
			<RoutingGroupContent />
		</div>
	</div>;

function RoutingGroupContent()  {
	const routeComponents = ( menus.concat(routes, routes2, routes3, routes4) ).map( ({ path, component }, key ) => 
	<Route exact path={path} component={component} key={key} />);
	return <Switch>{routeComponents}</Switch>;
}

const SidebarPlace = (props) => 
<div className="sidebarPlaceStyle">
	<div className="sidebarTitle">{props.sidebartitle}</div>
	<div className="sidebarContent">{props.sidebarcontent}</div>
</div>;

const prozvishes  = 'Font Lists';
const prozvishes2 = 'Commercial Favorites';
const prozvishes3 = 'Need Help?';
const prozvishes4 = 'Connect';


class Footer extends React.Component {
  render() {
    return (
    <div className="siteFooter">
    <div className="container"><Directory />
    <Copyright bottominfo="©2009-2017 Font Squirrel. All rights reserved." />
    </div>
	</div>
    );
  }
}


class Directory extends React.Component {
  render() {
    return (
    <div>
	<Widget prozvishe={prozvishes}  routes={routes} />
	<Widget prozvishe={prozvishes2} routes={routes2} />
	<Widget prozvishe={prozvishes3} routes={routes3} />
	<Widget prozvishe={prozvishes4} routes={routes4} />
    </div> 
    );
  }
}

function Copyright(props) {
  return <div className="CopyrightStyle">{props.bottominfo}</div>;
}


function Widget(props) {
  const prozvishe = props.prozvishe;
  const routes = props.routes;
  return (
  		<div className="widget">
			<WidgetName prozvishe={prozvishe} />
			<FooterList routes={routes} />
		</div>
	);
}

function WidgetName (props) {
	return <div className="widgettitle">{props.prozvishe}</div>
}

function FooterList(props) {
  const routes = props.routes;
  const listItems = routes.map(({path, component, name}, key) => <li key={key}><NavLink onClick={scrollToTop(1000)} className="widgetli" activeStyle={{outline:'none', color: '#32a7e0'}}  to={path}>{name}</NavLink></li> );
  return (
    <ul className="widgetul">{listItems}</ul>
  );
}





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

class App extends React.Component {
	render() {
		return (
			<div className="generalStyle">
				<div className="containerStyle">
					<Header />
					<Navigation/>
					<Main/>
					<Footer/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById("root"));
