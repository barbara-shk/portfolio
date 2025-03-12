import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme'; 

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: ${props => props.theme.typography.fontFamily};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.typography.baseSize};
    line-height: ${props => props.theme.typography.lineHeight};
    transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing}; 
  }
  main {
    padding-top: 3em;
  }
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
    
    &:hover {
      color: ${props => props.theme.colors.accentLight};
    }
  }
  
  h1 {
    font-size: ${props => props.theme.typography.h1.fontSize};
    line-height: ${props => props.theme.typography.h1.lineHeight};
    margin-bottom: ${props => props.theme.spacing.lg};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
  
  h2 {
    font-size: ${props => props.theme.typography.h2.fontSize};
    line-height: ${props => props.theme.typography.h2.lineHeight};
    margin-bottom: ${props => props.theme.spacing.md};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.md};
    font-size: ${props => props.theme.typography.body.fontSize};
    line-height: ${props => props.theme.typography.body.lineHeight};
  }
  
  button, .button {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.border.radius};
    font-family: inherit;
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  }
  
  ${props => props.theme.globalStyles}
`;
