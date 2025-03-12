import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getThemeById } from './styles/theme'; 
import CustomCursor from './styles/creative/CustomCursor';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact'; 
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/layout/Header';

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
        <main>
          <Header handleThemeChange={handleThemeChange}/>
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
