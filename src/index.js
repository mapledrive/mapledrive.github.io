import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Main} from './components/Main';
import {Navigation} from './components/Navigation';
import {Bottom} from './components/Bottom';

class App extends React.Component {
	render() {
		return (
			<div className="wrapper">
					<Header />
					<Navigation/>
					<Main/>
					<Footer/>
					<Bottom/>
			</div>
		)
	}
}

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById("root"));