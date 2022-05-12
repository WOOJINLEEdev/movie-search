import styled, { ThemeProvider } from 'styled-components';

import Main from 'layout/Main';
import Tab from 'components/common/Tab';
import Header from 'components/common/Header';
import TopButton from 'components/common/TopButton';
import { useTheme } from 'hooks/useTheme';

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Application className='App'>
        <Container>
          <Header />
          <Main />
          <Footer />
          <Tab />
          <TopButton />
        </Container>
      </Application>
    </ThemeProvider>
  );
};

export default App;

const Application = styled.div`
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors?.titleColor};
  background: ${(props) => props.theme.colors?.bgColor};
`;

const Container = styled.div`
  position: relative;
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  color: ${(props) => props.theme.colors?.titleColor};
  background: ${(props) => props.theme.colors?.bgColor};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;

const Footer = styled.footer`
  height: 80px;
`;
