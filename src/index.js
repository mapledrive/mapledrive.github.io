import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Main} from './components/Main';
import {Navigation} from './components/Navigation';
import {Bottom} from './components/Bottom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import Parser from "rss-parser";
import { withRouter } from 'react-router-dom';




var initialState =
[
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" },
  { "title": "", "link": "", "pubDate": "", "author": "", "content": "", "contentSnippet": "", "id": "", "isoDate": "" }
];



// actions.js
const addRepos = repos => ({ type: "ADD_REPOS", repos });
const clearRepos = () => ({ type: "CLEAR_REPOS" });
const getRepos = username => async dispatch => {
  try {
	let parser = new Parser();
	const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
	let feed = await parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss');
	var repos = feed.items.slice(0, 10);
	//console.log(repos);
    dispatch(addRepos(repos));
  } catch (error) {
    console.log(error);
    dispatch(clearRepos());
  }
};


const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_REPOS":
      return action.repos;
    case "CLEAR_REPOS":
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));


class App extends React.Component {
	componentDidMount() {
		this.props.getRepos()
	}
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

const mapStateToProps = state => ({ repos: state });
const mapDispatchToProps = { getRepos };
const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<AppContainer />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);