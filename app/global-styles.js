import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Poppins,Helvetica,Roboto,Arial,sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Poppins,Helvetica,Roboto,Arial,sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Poppins,Helvetica,Roboto,Arial,sans-serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
