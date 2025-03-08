import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X } from 'lucide-react';

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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); 

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
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <HeaderContainer>
      <Logo to="/">Portfolio</Logo>
      
      <Nav>
        <NavLink to="/" $isActive={isActive('/')}>Home</NavLink>
        <NavLink to="/projects" $isActive={isActive('/projects')}>Projects</NavLink>
        <NavLink to="/about" $isActive={isActive('/about')}>About</NavLink>
        <NavLink to="/contact" $isActive={isActive('/contact')}>Contact</NavLink>
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
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;