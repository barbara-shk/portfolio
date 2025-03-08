import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { getThemeById, ThemeType } from './styles/theme';
import StyleSwitcher from './components/StyleSwitcher';
import CustomCursor from './styles/creative/CustomCursor';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact'; 

const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
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

const App: React.FC = () => {
  const savedTheme = localStorage.getItem('uiStyle') || 'standard';
  const [currentTheme, setCurrentTheme] = useState(savedTheme);
  const theme = getThemeById(currentTheme);
  
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('uiStyle', themeId);
    
    if (themeId === 'accessible') {
      loadFont('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap');
    } else if (themeId === 'creative') {
      loadFont('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
    } else {
      loadFont('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    }
  };
  
  const loadFont = (url: string) => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  };
  
  useEffect(() => {
    handleThemeChange(currentTheme);
  }, []);
  
  return (
    <ThemeProvider theme={theme}> 
    <GlobalStyles theme={theme} />
      <Router>
      <CustomCursor enabled={currentTheme === 'creative'} />
        <StyleSwitcher onChange={handleThemeChange} /> 
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main> 
      </Router>
    </ThemeProvider>
  );
};

export default App;