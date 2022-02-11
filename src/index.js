import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'index.css';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Main } from 'components/Main';
import { Navigation } from 'components/Navigation';
import { Bottom } from 'components/Bottom';
import { Provider } from 'react-redux';
import store from 'store';

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
