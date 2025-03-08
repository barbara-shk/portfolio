import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.textPrimary};
    transition: all 0.2s ease-in-out;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;