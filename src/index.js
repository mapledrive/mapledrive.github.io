import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'index.css';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Main } from 'components/Main';
import { Navigation } from 'components/Navigation';
import { Bottom } from 'components/Bottom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

var initialState = [
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
  {
    title: '',
    link: '',
    pubDate: '',
    author: '',
    content: '',
    contentSnippet: '',
    id: '',
    isoDate: '',
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REPOS':
      return action.repos;
    case 'CLEAR_REPOS':
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer, initialState);

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Navigation />
      <Main />
      <Footer />
      <Bottom />
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
