import React from 'react';
import styled from 'styled-components';
import { Github, Linkedin, Mail } from 'lucide-react';

const FooterContainer = styled.footer`
  width: 100%;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.cardBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: ${props => props.theme.border.width} solid ${props => props.theme.colors.border};
  
  ${props => props.theme.id === 'creative' && `
    background-color: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(10px);
    border-top: none;
  `}
  
  ${props => props.theme.id === 'accessible' && `
    padding: ${props.theme.spacing.xl} ${props.theme.spacing.xl};
  `}
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  transition: color ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
  
  ${props => props.theme.id === 'accessible' && `
    padding: ${props.theme.spacing.sm};
    min-height: 44px;
    min-width: 44px;
    
    &:focus {
      outline: 2px solid ${props.theme.colors.accent};
      outline-offset: 2px;
    }
  `}
`;

const Footer: React.FC = () => { 
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© {currentYear} Your Name. All rights reserved.</Copyright>
        
        <SocialLinks>
          <SocialLink 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </SocialLink>
          
          <SocialLink 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </SocialLink>
          
          <SocialLink 
            href="mailto:your.email@example.com" 
            aria-label="Email me"
          >
            <Mail size={24} />
          </SocialLink>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;