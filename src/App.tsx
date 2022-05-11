import styled, { ThemeProvider } from 'styled-components';

import Tab from 'components/Tab';
import Header from 'components/Header';
import Main from 'layout/Main';
import { useTheme } from 'hooks/useTheme';

const App = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container className='App'>
        <Header />
        <Main />
        <Footer />
        <Tab />
      </Container>
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  position: relative;
  max-width: 800px;
  min-height: 100vh;
  margin: 0 auto;
  background: ${(props) => props.theme.colors?.bgColor};
  color: ${(props) => props.theme.colors?.titleColor};
`;

const Footer = styled.footer`
  height: 100px;
`;
