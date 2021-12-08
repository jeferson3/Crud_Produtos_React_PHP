import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './Styles/theme';
import { GlobalStyle } from './Styles/global-style';

import App from './Pages/Products/List';
import { GlobalContextProvider } from './Context/GlobalContext';
import { SpinnerContainer } from './Components/Spinner';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <GlobalContextProvider>
        <SpinnerContainer />
        <App />
      </GlobalContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);