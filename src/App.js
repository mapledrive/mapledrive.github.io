import './index.css';
import { Header } from 'components/Header';
import { Navigation } from 'components/Navigation';
import { Footer } from 'components/Footer';
import { Bottom } from 'components/Bottom';
import { Main } from 'components/Main';
import { Aside } from 'components/Aside';

const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <Navigation />
      <Main />
      <Aside />
      <Footer />
      <Bottom />
    </div>
  );
};

export default App;
