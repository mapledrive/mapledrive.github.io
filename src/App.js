import './index.css';
import { Header } from 'components/Header';
import { Navigation } from 'components/Navigation';
import { Footer } from 'components/Footer';
import { Bottom } from 'components/Bottom';
import { Main } from 'components/Main';
import { Aside } from 'components/Aside';
import { GlobalStyle, Wrapper } from 'style';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header />
        <Navigation />
        <Main />
        <Aside />
        <Footer />
        <Bottom />
      </Wrapper>
    </>
  );
};

export default App;
