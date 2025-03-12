import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, ChevronDown, Check, Accessibility, Paintbrush, Layout } from 'lucide-react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${props => props.theme.colors.background};
  border-bottom: ${props => props.theme.border.width} solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  
  ${props => props.theme.id === 'creative' && `
    background-color: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: none;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  `}
  
  ${props => props.theme.id === 'accessible' && `
    box-shadow: 0 2px 0 ${props.theme.colors.accent};
    border-bottom: none;
  `}
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.textPrimary};
  text-decoration: none;
  
  ${props => props.theme.id === 'creative' && `
    background: linear-gradient(45deg, ${props.theme.colors.accent}, ${props.theme.colors.accentLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2rem;
  `}
  
  ${props => props.theme.id === 'accessible' && `
    color: ${props.theme.colors.accent};
    font-size: 1.5rem;
    letter-spacing: 0.5px;
  `}
`;

const Nav = styled.nav`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const MobileNav = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.spacing.xl};
  z-index: 20;
  transform: translateX(${props => props.isOpen ? '0' : '100%'});
  transition: transform ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  
  ${props => props.theme.id === 'creative' && `
    background-color: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(10px);
  `}
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? props.theme.colors.accent : props.theme.colors.textPrimary};
  text-decoration: none;
  position: relative;
  font-weight: ${props => props.$isActive ? 
    props.theme.typography.fontWeight.medium : 
    props.theme.typography.fontWeight.regular};
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.accent};
    transition: width ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  }
  
  &:hover:after {
    width: 100%;
  }
  
  ${props => props.theme.id === 'accessible' && `
    padding: ${props.theme.spacing.sm} ${props.theme.spacing.md};
    border-radius: ${props.theme.border.radius};
    
    &:after {
      display: none;
    }
    
    ${props.$isActive ? `
      background-color: ${props.theme.colors.accent};
      color: white;
    ` : `
      &:hover {
        background-color: ${props.theme.colors.cardBackground};
      }
    `}
  `}
  
  ${props => props.theme.id === 'creative' && `
    font-size: 1.25rem;
    
    &:after {
      height: 3px;
      background: linear-gradient(45deg, ${props.theme.colors.accent}, ${props.theme.colors.accentLight});
      border-radius: 3px;
    }
  `}
`;

// Style Switcher Components
const StyleSwitcherContainer = styled.div`
  position: relative;
  margin-left: ${props => props.theme.spacing.md};
`;

const StyleButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: transparent;
  border: ${props => props.theme.border.width} solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.border.radius};
  color: ${props => props.theme.colors.textPrimary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  
  &:hover {
    background-color: ${props => props.theme.colors.cardBackground};
    border-color: ${props => props.theme.colors.accent};
  }
  
  ${props => props.theme.id === 'creative' && `
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
  `}
  
  ${props => props.theme.id === 'accessible' && `
    min-height: 44px;
    min-width: 44px;
    border: 2px solid ${props.theme.colors.border};
    
    &:focus {
      outline: 2px solid ${props.theme.colors.accent};
      outline-offset: 2px;
    }
  `}
`;

const StyleDropdown = styled.div`
  position: absolute;
  top: calc(100% + ${props => props.theme.spacing.sm});
  right: 0;
  width: 240px;
  background-color: ${props => props.theme.colors.background};
  border: ${props => props.theme.border.width} solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.border.radius};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 30;
  transform-origin: top right;
  animation: dropdownFade 0.2s ease-out;
  
  @keyframes dropdownFade {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  ${props => props.theme.id === 'creative' && `
    background: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  `}
  
  ${props => props.theme.id === 'accessible' && `
    border: 2px solid ${props.theme.colors.border};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `}
`;

const StyleOption = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.isSelected ? props.theme.colors.cardBackground : 'transparent'};
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  
  &:hover {
    background-color: ${props => props.theme.colors.cardBackground};
  }
  
  ${props => props.theme.id === 'creative' && `
    padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
    
    ${props.isSelected ? `
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent);
      border-left: 3px solid ${props.theme.colors.accent};
    ` : `
      border-left: 3px solid transparent;
    `}
    
    &:hover {
      background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), transparent);
    }
  `}
  
  ${props => props.theme.id === 'accessible' && `
    min-height: 44px;
    padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
    
    ${props.isSelected ? `
      background-color: ${props.theme.colors.accent}20;
      border-left: 4px solid ${props.theme.colors.accent};
    ` : `
      border-left: 4px solid transparent;
    `}
    
    &:focus {
      outline: 2px solid ${props.theme.colors.accent};
      outline-offset: -2px;
    }
  `}
`;

const IconWrapper = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: ${props => props.isSelected ? props.theme.colors.accent : props.theme.colors.textSecondary};
  
  ${props => props.theme.id === 'creative' && `
    ${props.isSelected ? `
      color: ${props.theme.colors.accent};
    ` : ``}
  `}
`;

const StyleInfo = styled.div`
  flex: 1;
`;

const StyleName = styled.div<{ isSelected: boolean }>`
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.isSelected ? props.theme.colors.accent : props.theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const StyleDescription = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.4;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textPrimary};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  display: none;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
  
  ${props => props.theme.id === 'accessible' && `
    min-height: 44px;
    min-width: 44px;
    padding: ${props.theme.spacing.md};
  `}
`;

const CloseButton = styled(MobileMenuButton)`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
`;

const MobileStyleSwitcher = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
  width: 80%;
  max-width: 300px;
`;

interface HeaderProps {
  handleThemeChange: (themeId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ handleThemeChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('standard');
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Define style options
  const styles = [
    { 
      id: 'accessible', 
      name: 'Accessible', 
      description: 'WCAG compliant, high contrast, clear typography',
      icon: <Accessibility size={20} />
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique animations, creative typography, visually rich',
      icon: <Paintbrush size={20} />
    },
    { 
      id: 'standard', 
      name: 'Standard', 
      description: 'Clean, professional, balanced design',
      icon: <Layout size={20} />
    }
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
   
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setStyleDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    handleThemeChange(styleId);
    setStyleDropdownOpen(false);
  };
  
  const isActive = (path: string) => location.pathname === path;
  const currentStyle = styles.find(style => style.id === selectedStyle);
  
  return (
    <HeaderContainer>
      <Logo to="/">Portfolio</Logo>
      <Nav>
        <NavLink to="/" $isActive={isActive('/')}>Home</NavLink>
        <NavLink to="/projects" $isActive={isActive('/projects')}>Projects</NavLink>
        <NavLink to="/about" $isActive={isActive('/about')}>About</NavLink>
        <NavLink to="/contact" $isActive={isActive('/contact')}>Contact</NavLink>
        
        <StyleSwitcherContainer ref={dropdownRef}>
          <StyleButton onClick={() => setStyleDropdownOpen(!styleDropdownOpen)}>
            <IconWrapper>
              {currentStyle?.icon}
            </IconWrapper>
            <span>{currentStyle?.name}</span>
            <ChevronDown size={16} style={{ 
              transform: styleDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }} />
          </StyleButton>
          
          {styleDropdownOpen && (
            <StyleDropdown>
              {styles.map(style => (
                <StyleOption 
                  key={style.id}
                  isSelected={selectedStyle === style.id}
                  onClick={() => handleStyleSelect(style.id)}
                >
                  <IconWrapper isSelected={selectedStyle === style.id}>
                    {style.icon}
                  </IconWrapper>
                  <StyleInfo>
                    <StyleName isSelected={selectedStyle === style.id}>
                      {style.name}
                      {selectedStyle === style.id && (
                        <span style={{ marginLeft: '8px' }}>
                          <Check size={14} />
                        </span>
                      )}
                    </StyleName>
                    <StyleDescription>
                      {style.description}
                    </StyleDescription>
                  </StyleInfo>
                </StyleOption>
              ))}
            </StyleDropdown>
          )}
        </StyleSwitcherContainer>
      </Nav>
      
      <MobileMenuButton onClick={() => setIsMenuOpen(true)}>
        <Menu size={24} />
      </MobileMenuButton>
      
      <MobileNav isOpen={isMenuOpen}>
        <CloseButton onClick={() => setIsMenuOpen(false)}>
          <X size={24} />
        </CloseButton>
        <NavLink to="/" $isActive={isActive('/')}>Home</NavLink>
        <NavLink to="/projects" $isActive={isActive('/projects')}>Projects</NavLink>
        <NavLink to="/about" $isActive={isActive('/about')}>About</NavLink>
        <NavLink to="/contact" $isActive={isActive('/contact')}>Contact</NavLink>
        
        <MobileStyleSwitcher>
          {styles.map(style => (
            <StyleOption 
              key={style.id}
              isSelected={selectedStyle === style.id}
              onClick={() => {
                handleStyleSelect(style.id);
                setIsMenuOpen(false);
              }}
            >
              <IconWrapper isSelected={selectedStyle === style.id}>
                {style.icon}
              </IconWrapper>
              <StyleInfo>
                <StyleName isSelected={selectedStyle === style.id}>
                  {style.name}
                  {selectedStyle === style.id && (
                    <span style={{ marginLeft: '8px' }}>
                      <Check size={14} />
                    </span>
                  )}
                </StyleName>
                <StyleDescription>
                  {style.description}
                </StyleDescription>
              </StyleInfo>
            </StyleOption>
          ))}
        </MobileStyleSwitcher>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;