import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import './index.css';
import logoUrl from './logo.png';

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



class Menu extends React.Component {
	render(){
		var menus = ["Home","Service","Delivery","Contacts","Partners", "Information"]
		return (
			<ul style={ulStyle}>
				{
				menus.map((item, index) => <li style={linkStyle} key={index}><NavLink activeStyle={{outline:'none', color: '#32a7e0'}} style={vStyle} to={'/' + item.toLowerCase()}>{item}</NavLink></li>)
				}
			</ul>
		);
	}
}

const Navigation = (props) => <div style={navigationStyle}><Menu/></div>;

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
    	<div style={sidebarStyle}>Sidebar Widgets</div>
    	<div style={contentStyle}>
		<Switch>
			<Route exact path='/' component={Home}/>
			<Route exact path='/home' component={Home}/>
			<Route path='/service' component={Service}/>
			<Route path='/delivery' component={Delivery}/>
			<Route path='/contacts' component={Contacts}/>
			<Route path='/partners' component={Partners}/>
			<Route path='/information' component={Information}/>
		</Switch>
		</div>
	</div>;

const Home = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Almost Free Fonts</h1>Its mid-afternoon on a Friday at SpaceX headquarters in Hawthorne, California, and three of Elon Musks children are gathered around him – one of his triplets, both of his twins.Musk is wearing a gray T-shirt and sitting in a swivel chair at his desk, which is not in a private office behind a closed door, but in an accessible corner cubicle festooned with outer-space novelty items, photos of his rockets, and mementos from Tesla and his other companies.Elon Musk photographed in Hawthorne, California, on October 5th. Mark Seliger for Rolling Stone. Most tellingly, theres a framed poster of a shooting star with a caption underneath it that reads, When you wish upon a falling star, your dreams can come true. Unless its really a meteor hurtling to the Earth which will destroy all life. Then youre pretty much hosed, no matter what you wish for. Unless its death by meteorite." To most people, this would be mere dark humor, but in this setting, its also a reminder of Musks master plan: to create habitats for humanity on other planets and moons. If we dont send our civilization into another Dark Ages before Musk or one of his dreams inheritors pull it off, then Musk will likely be remembered as one of the most seminal figures of this millennium. Kids on all the terra</div>;
const Service = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Elephant Trophy Import Ban</h1>The U.S. Fish and Wildlife Service announced Thursday that it had lifted an Obama-era ban on importing sport-hunted trophies of elephants from Zimbabwe and Zambia. But Friday evening, President Trump seemed to say that decision was being reconsidered, tweeting that he would review all conservation facts and issue an update soon with Interior Secretary Ryan Zinke.Zinke later issued a statement, saying: President Trump and I have talked and both believe that conservation and healthy herds are critical. As a result, in a manner compliant with all applicable laws, rules, and regulations, the issuing of permits is being put on hold as the decision is being reviewed.The Washington Post has reported on big-game hunting by the presidents sons.The Fish and Wildlife Service said it had found that allowing trophy imports would help the conservation of elephants in those countries, a finding that allows it to authorize the import of the African elephant under the terms of the Endangered Species Act, which lists the African elephant as threatened.Legal, well-regulated sport hunting as part of a sound management program can benefit certain species by providing incentives to local communities to conserve those species </div>;
const Delivery = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Bitcoin Is Hot in Zimbabwe</h1>As the simabe are becoming more popular in countries like Zimbabwe as people lose faith.</div>;
const Contacts = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Mugabe</h1>Zimbabwe's ruling party has dismissed President Robert Mugabe as its leader, appointing former vice-president Emmerson Mnangagwa in his place, the head of the countrys influential liberation war veterans said.</div>;
const Partners = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Elections</h1>A special Zanu-PF Central Committee meeting is currently underway  in Harare to recall the revolutionary party’s First Secretary Cde Robert Mugabe from his position.</div>;
const Information = () => <div style={{ fontFamily: 'Roboto', fontSize: '14px', lineHeight: '20px', color:'#222'}}><h1 style={{fontFamily: 'fjalla', fontSize: '45px', color:'#aaa'}}>Butter</h1>The meeting is being chaired by Cde Obert Mpofu who is Zanu-PFs Secretary for Finance. Cde Mpofu is the most senior member present according to the party hierarchy.</div>;



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

const titles =  ['Reecently Added Fonts', 'Most Downloaded Fonts', 'Almost Free Fonts', 'Languages', 'Tags'];
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
	<Widget prozvishe={prozvishes}  titles={titles} />
	<Widget prozvishe={prozvishes2} titles={titles2} />
	<Widget prozvishe={prozvishes3} titles={titles3} />
	<Widget prozvishe={prozvishes4} titles={titles4} />
    </div> 
    );
  }
}

function Copyright(props) {
  return <div style={CopyrightStyle}>{props.bottominfo}</div>;
}


function Widget(props) {
  const titles = props.titles;
  const prozvishe = props.prozvishe;
  return (
  		<div style={widget}>
			<WidgetName prozvishe={prozvishe} />
			{titles.map((value, index)=>{ return <div key={index}><WidgetRow label={value} /></div> })}
		</div>
	);
}


function WidgetName (props) {
	return <div style={widgettitle}>{props.prozvishe}</div>
}


function WidgetRow (props) {
	const url = "/" + props.label.toLowerCase().trim().replace(" ", "-");
	return  <a href={url} style={widgetli}>{props.label}</a>		
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
