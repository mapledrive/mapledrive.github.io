import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import './index.css';
import logoUrl from './logo.png';



const Home = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Andromeda OS</h1>Details of Microsofts goal to mould Windows into a modular operating system to work across all manner of gadgets have surfaced, under the name Andromeda OS. Workers at Redmond familiar with Microsofts internal projects spilled the information to Windows Central, and explained that Andromeda OS has the goal of making Windows more flexible so that it can run on devices not normally suited for an operating system thats based on old and demanding code, architecture and features some 30-years-old.Instead of simply trying to scale Windows to run on say smart watches or low-powered tablets, Andromeda OS will turn Windows 10 into a modular system suitable for different architectures rather than the x86 architecture used by desktops, laptops, and tablets running Intel or AMD chips. And functions can be added or taken away from Andromeda OS to suit the system or device its required to run on, essentially offering an easy way for developers to use a Windows OS without being hampered by performance-sapping features their device might not need.</div>;
const Service = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Elephant Trophy Import Ban</h1>The U.S. Fish and Wildlife Service announced Thursday that it had lifted an Obama-era ban on importing sport-hunted trophies of elephants from Zimbabwe and Zambia. But Friday evening, President Trump seemed to say that decision was being reconsidered, tweeting that he would review all conservation facts and issue an update soon with Interior Secretary Ryan Zinke.Zinke later issued a statement, saying: President Trump and I have talked and both believe that conservation and healthy herds are critical. As a result, in a manner compliant with all applicable laws, rules, and regulations, the issuing of permits is being put on hold as the decision is being reviewed.The Washington Post has reported on big-game hunting by the presidents sons.The Fish and Wildlife Service said it had found that allowing trophy imports would help the conservation of elephants in those countries, a finding that allows it to authorize the import of the African elephant under the terms of the Endangered Species Act, which lists the African elephant as threatened.Legal, well-regulated sport hunting as part of a sound management program can benefit certain species by providing incentives to local communities to conserve those species </div>;
const Delivery = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Bitcoin Is Hot in Zimbabwe</h1>As the simabe are becoming more popular in countries like Zimbabwe as people lose faith.</div>;
const Contacts = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Mugabe</h1>Zimbabwe's ruling party has dismissed President Robert Mugabe as its leader, appointing former vice-president Emmerson Mnangagwa in his place, the head of the countrys influential liberation war veterans said.</div>;
const Partners = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Elections</h1>A special Zanu-PF Central Committee meeting is currently underway  in Harare to recall the revolutionary party’s First Secretary Cde Robert Mugabe from his position.</div>;
const Information = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Butter</h1>The meeting is being chaired by Cde Obert Mpofu who is Zanu-PFs Secretary for Finance. Cde Mpofu is the most senior member present according to the party hierarchy.</div>;


const Recently = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Recently Added Fonts</h1>Recently Added Fonts</div>;
const Most = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Most Downloaded Fonts</h1>Most downloaded fonts here</div>;
const Almost = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Almost Free Fonts</h1>Almost free but quality guaranteed</div>;
const Languages = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Languages</h1>Many languages</div>;
const Tags = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Tags</h1>Please check these tags</div>;


const Proxima = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Proxima Nova</h1>One of the latest fonts here</div>;
const Museo = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Museo Sans</h1>This is my favourit font so far</div>;
const Bombshell = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Bombshell</h1>Not for everyday use</div>;
const Brandon = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Brandon</h1>Please read about this font in the magazine</div>;
const Franklin = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Franklin</h1>By no means it is old</div>;


const Frequently = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Frequently Asked Questions</h1>How many questions are here</div>;
const Help = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Help installing fonts</h1>You should choose modern format</div>;
const Contactus = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Contact us</h1>Our phone is 9872344</div>;
const Privacy = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Privacy Policy</h1>The privacy policy can be loaded on the link below</div>;
const Advertising = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Advertising</h1>Advertising on this website</div>;


const Twitter = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Twitter</h1>Our twitter is general. We are happy to tweet</div>;
const Facebook = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Facebook</h1>You can get in touch with us with facebook</div>;
const Rss = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>RSS</h1>RSS feeds are available</div>;
const Newsletter = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Newsletter</h1>Subscribe to get letters and read them</div>;
const Blog = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Blog</h1>There are articles here about technology</div>;
const Login = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Login</h1>Login to your page and check your updates</div>;



/**
 * Header
 */

var headerStyle = {
	backgroundColor: "#61456A",
	height: '200px',
	padding: '20px 30px',
	boxSizing: 'border-box'
};

var logoStyle = {
	backgroundColor: "#61456A",
	maxWidth: '296px'
};

const Header = (props) => <div style={headerStyle}><img src={logoUrl} style={logoStyle} alt="logo" /></div>;


/**
 * Navigation
 */

var linkStyle = {
	height:'45px',
	lineHeight: '45px',
    display: 'inline-block',
	padding: '0px 10px',
	float: 'left'
};

var ulStyle = {
	padding: '0px',
	margin: '0px'
};

var vStyle = {
	color: '#e3e3e1',
	textDecoration: 'none',
	fontSize: '22px',
	fontFamily: 'fjalla',
	outline:'none'
};

var navigationStyle = {
	backgroundColor: "#000",
	height: '45px',
	padding: '0px 25px'
};

var menuStyle = {
	backgroundColor: "#BDBDBB",
	padding: '0px 50px'
};



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
  const listItems = menus.map(({path, component, name}, key) => <li style={linkStyle} key={key}><NavLink activeStyle={{outline:'none', color: '#32a7e0'}} style={vStyle} exact to={path}>{name}</NavLink></li> );
  return (
    <div style={navigationStyle}><ul style={ulStyle}>{listItems}</ul></div>
  );
}





/**
 * Main part of website
 */

var mainStyle = {
	height: '500px',
	overflow: 'hidden',
    fontSize: '18px'
};

var sidebarStyle = {
	float: 'right',
    width: '30%',
    minHeight: '500px',
    background: '#E4E4E2',
    padding: '30px',
    boxSizing: 'border-box'
};

var contentStyle = {
	overflow: 'hidden',
    minHeight: '500px',
    background: '#fff',
    padding: '30px',
    boxSizing: 'border-box'
};



const Main = (props) => 
	<div style={mainStyle}>
    	<div style={sidebarStyle}>
			<SidebarPlace sidebartitle='About Font Squirrel' sidebarcontent='Font Squirrel is your best resource for FREE, hand-picked, high-quality, commercial-use fonts. Even if that means we send you elsewhere to get them... more info' />
			<SidebarPlace sidebartitle='New To Fonts?' sidebarcontent='Download our free beginners guide to fonts. Now that you have your guide, its time to use fonts on your website.' />
		</div>
    	<div style={contentStyle}>
			<RoutingGroupContent />
		</div>
	</div>;

function RoutingGroupContent()  {
	const routeComponents = ( menus.concat(routes, routes2, routes3, routes4) ).map( ({ path, component }, key ) => 
	<Route exact path={path} component={component} key={key} />);
	return <Switch>{routeComponents}</Switch>;
}



/**
 * Sidebar
 */

var sidebarPlaceStyle = {
	padding: '0px 0px 20px 0px',
	boxSizing: 'border-box',
	color: '#e3e3e1'
};

var sidebarTitle = {
	backgroundColor: "#999999",
	color: "#fff",
	height: '40px',
	lineHeight: '40px',
	padding: '0px 7px',
	boxSizing: 'border-box',
	fontSize: '22px',
	fontFamily: 'fjalla'
};

var sidebarContent = {
	color: "#222",
	minHeight: '50px',
	padding: '12px 0px',
	boxSizing: 'border-box',
	fontSize: '13px',
	fontFamily: 'Roboto',
	lineHeight: '20px'
};

const SidebarPlace = (props) => 
<div style={sidebarPlaceStyle}>
	<div style={sidebarTitle}>{props.sidebartitle}</div>
	<div style={sidebarContent}>{props.sidebarcontent}</div>
</div>;




/**
 * Footer part of website
 */

var siteFooter = {
	color: '#ffffff',
	backgroundColor: "#BDBDBB",
	padding: '0px 0px',
	fontSize: '14px',
	boxSizing: 'border-box',
	display: 'block',
    textAlign: 'left'
};

var container = {
    margin: '0 auto',
    padding: '35px 35px',
    overflow: 'hidden',
	backgroundColor: "#3D2D43",
	boxSizing: 'border-box'
};

var widget = {
	width: '25%',
	boxSizing: 'border-box',
	float: 'left',
	display: 'inline',
    marginBottom: '20px',
    padding: '0'
};

var widgettitle = {
    fontSize: '22px',
    fontFamily: 'fjalla, Charcoal, sans-serif',
    fontWeight: 'normal',
    lineHeight:'30px',
	textTransform: 'uppercase',
	color: '#a27eaf',
	marginBottom: '8px',
	marginTop: '0px'
};

var widgetul = {
	listStyleType: 'none',
	padding: '0px',
	margin: '0px'
}

var widgetli = {
	fontSize: '14px',
	fontFamily: 'pt_sansregular',
	lineHeight: '21px',
    color: '#fff',
	padding: '0 0 5px',
	textDecoration: 'none'
};

var CopyrightStyle = {
	fontSize: '14px',
	fontFamily: 'pt_sansregular'
};

const titles =  ['Recently Added Fonts', 'Most Downloaded Fonts', 'Almost Free Fonts', 'Languages', 'Tags'];
const titles2 = ['Proxima Nova', 'Museo Sans', 'Bombshell Pro', 'Brandon Grotesque', 'Franklin Gothic FS'];
const titles3 = ['Frequently Asked Questions', 'Help Installing Fonts', 'Contact Us', 'Privacy Policy', 'Advertising'];
const titles4 = ['Twitter', 'Facebook', 'RSS', 'Newsletter', 'Blog', 'Login'];

const prozvishes  = 'Font Lists';
const prozvishes2 = 'Commercial Favorites';
const prozvishes3 = 'Need Help?';
const prozvishes4 = 'Connect';


class Footer extends React.Component {
  render() {
    return (
    <div style={siteFooter}>
    <div style={container}><Directory />
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
  return <div style={CopyrightStyle}>{props.bottominfo}</div>;
}


function Widget(props) {
  const prozvishe = props.prozvishe;
  const routes = props.routes;
  return (
  		<div style={widget}>
			<WidgetName prozvishe={prozvishe} />
			<FooterList routes={routes} />
		</div>
	);
}

function WidgetName (props) {
	return <div style={widgettitle}>{props.prozvishe}</div>
}

function FooterList(props) {
  const routes = props.routes;
  const listItems = routes.map(({path, component, name}, key) => <li key={key}><NavLink style={widgetli} activeStyle={{outline:'none', color: '#32a7e0'}}  to={path}>{name}</NavLink></li> );
  return (
    <ul style={widgetul}>{listItems}</ul>
  );
}













/**
 * Structure of outside website 
 */

var generalStyle = {
	backgroundColor: "#BDBDBB",
	padding: '0px 50px',
};

var containerStyle = {
	border: '0px dashed black',
	paddingTop: '40px',
	paddingBottom: '50px'
};

const General = (props) => <div style={generalStyle}><Container/></div>;

const Container = (props) => {
	return (
	<div style={containerStyle}>
		<Header />
		<Navigation/>
		<Main/>
		<Footer/>
	</div>
	);
}

ReactDOM.render(<HashRouter><General/></HashRouter>, document.getElementById('root'));
