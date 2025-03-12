import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, User, Mail } from 'lucide-react'; 
import { useEffect, useRef, useState } from 'react';
import { CreativeHeroSection, FloatingShape, CreativeTitle, CreativeSubtitle, CreativeDescription, CreativeButtonContainer, CreativePrimaryButton, CreativeSecondaryButton, CreativeTechContainer, CreativeTechTitle, CreativeTechGrid, CreativeTechItem, CreativeFeature, CreativeFeatureTitle, CreativeFeatureDescription } from '../styles/Creative.styles';


const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing.xl};
  
  ${props => props.theme.id === 'creative' && `
    text-align: left;
    align-items: flex-start;
    
    @media (max-width: ${props.theme.breakpoints.md}) {
      text-align: center;
      align-items: center;
    }
  `}
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  ${props => props.theme.id === 'creative' && `
    margin-bottom: ${props.theme.spacing.xl};
    font-size: clamp(3rem, 8vw, 5rem);
    line-height: 1;
  `}
  
  ${props => props.theme.id === 'accessible' && `
    color: ${props.theme.colors.textPrimary};
  `}
`;

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  ${props => props.theme.id === 'creative' && `
    color: ${props.theme.colors.accentLight};
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  `}
  
  ${props => props.theme.id === 'accessible' && `
    color: ${props.theme.colors.textPrimary};
  `}
`;

const Description = styled.p`
  max-width: 700px;
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.body.fontSize};
  
  ${props => props.theme.id === 'creative' && `
    font-size: 1.25rem;
  `}
  
  ${props => props.theme.id === 'accessible' && `
    max-width: 650px;
    line-height: 1.7;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xxl};
  flex-wrap: wrap;
  justify-content: center;
  
  ${props => props.theme.id === 'creative' && `
    gap: ${props.theme.spacing.lg};
  `}
  
  ${props => props.theme.id === 'accessible' && `
    gap: ${props.theme.spacing.lg};
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.border.radius};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  text-decoration: none;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.theme.id === 'creative' && `
    background: linear-gradient(45deg, ${props.theme.colors.accent}, ${props.theme.colors.accentLight});
    padding: ${props.theme.spacing.lg} ${props.theme.spacing.xl};
    
    &:hover {
      box-shadow: 0 8px 20px rgba(108, 42, 255, 0.4);
    }
  `}
  
  ${props => props.theme.id === 'accessible' && `
    font-size: 1.125rem;
    font-weight: ${props.theme.typography.fontWeight.bold};
    padding: ${props.theme.spacing.md} ${props.theme.spacing.xl};
    min-height: 48px;
  `}
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  border: ${props => props.theme.border.width} solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textPrimary};
  
  &:hover {
    background-color: ${props => props.theme.colors.cardBackground};
  }
  
  ${props => props.theme.id === 'creative' && `
    border-color: ${props.theme.colors.accent};
    color: ${props.theme.colors.accentLight};
    padding: ${props.theme.spacing.lg} ${props.theme.spacing.xl};
    
    &:hover {
      background-color: rgba(108, 42, 255, 0.1);
      transform: translateY(-3px);
    }
  `}
  
  ${props => props.theme.id === 'accessible' && `
    border: 2px solid ${props.theme.colors.accent};
    color: ${props.theme.colors.accent};
    font-size: 1.125rem;
    font-weight: ${props.theme.typography.fontWeight.bold};
    padding: ${props.theme.spacing.md} ${props.theme.spacing.xl};
    min-height: 48px;
  `}
`;

const TechContainer = styled.div`
  width: 100%;
  max-width: 900px;
  text-align: center;
`;

const TechTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  
  ${props => props.theme.id === 'creative' && `
    color: ${props.theme.colors.accentLight};
    font-size: 1.5rem;
  `}
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  
  ${props => props.theme.id === 'creative' && `
    gap: ${props.theme.spacing.lg};
  `}
`;

const TechItem = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.border.radius};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.animation.duration} ${props => props.theme.animation.easing};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  ${props => props.theme.id === 'creative' && `
    background-color: rgba(30, 30, 30, 0.6);
    border: 1px solid rgba(108, 42, 255, 0.3);
    padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
    
    &:hover {
      border-color: ${props.theme.colors.accent};
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  `}
  
  ${props => props.theme.id === 'accessible' && `
    border: 2px solid ${props.theme.colors.border};
    padding: ${props.theme.spacing.md} ${props.theme.spacing.lg};
    font-weight: ${props.theme.typography.fontWeight.medium};
    min-height: 44px;
    
    &:hover {
      border-color: ${props.theme.colors.accent};
    }
  `}
`;

const ThemeFeature = styled.div`
  margin-top: ${props => props.theme.spacing.xxl};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.border.radius};
  text-align: center;
  max-width: 800px;
  
  ${props => {
    if (props.theme.id === 'accessible') {
      return `
        border: 2px solid ${props.theme.colors.accent};
        background-color: ${props.theme.colors.cardBackground};
      `;
    } else if (props.theme.id === 'creative') {
      return `
        background: linear-gradient(45deg, rgba(108, 42, 255, 0.1), rgba(165, 110, 255, 0.1));
        border-radius: 16px;
        backdrop-filter: blur(5px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      `;
    } else {
      return `
        background-color: ${props.theme.colors.cardBackground};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      `;
    }
  }}
`;

const FeatureTitle = styled.h3`
  margin-bottom: ${props => props.theme.spacing.md};
  
  ${props => props.theme.id === 'creative' && `
    background: linear-gradient(45deg, ${props.theme.colors.accent}, ${props.theme.colors.accentLight});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2rem;
  `}
`;

const Home: React.FC = () => {
  const theme = useTheme() as any;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
   
  useEffect(() => {
    if (theme.id === 'creative') {
      const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [theme.id]);
  
  const techStack = [
    { name: 'React', icon: <Code size={20} /> },
    { name: 'TypeScript', icon: <Code size={20} /> },
    { name: 'Vite', icon: <Code size={20} /> },
    { name: 'Styled Components', icon: <Code size={20} /> },
    { name: 'Responsive Design', icon: <Code size={20} /> },
    { name: 'UI/UX', icon: <User size={20} /> },
  ];
   
  const themeFeature = () => {
    if (theme.id === 'accessible') {
      return {
        title: 'Accessibility-First Design',
        description: 'This version of the portfolio follows WCAG guidelines with high contrast, clear typography, and proper focus states. All interactive elements have appropriate sizing for easy targeting, and semantic HTML ensures screen reader compatibility.'
      };
    } else if (theme.id === 'creative') {
      return {
        title: 'Immersive Experience',
        description: 'This portfolio version showcases creative design with animated gradients, motion effects, and innovative typography. The immersive experience demonstrates my ability to create unique and engaging interfaces that leave a lasting impression while maintaining usability.'
      };
    } else {
      return {
        title: 'Professional & Balanced Design',
        description: 'This standard design balances aesthetics and functionality with clean layouts, appropriate white space, and subtle animations. It demonstrates my ability to create professional interfaces suitable for various business contexts.'
      };
    }
  };
  
  const feature = themeFeature();
   
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
   
  if (theme.id === 'creative') {
    return (
      <HomeContainer ref={containerRef}>
        <CreativeHeroSection
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        > 
          <FloatingShape
            style={{
              background: '#7f5af0',
              width: '300px',
              height: '300px',
              top: '10%',
              right: '-150px',
              opacity: 0.2
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <FloatingShape
            style={{
              background: '#ff8906',
              width: '200px',
              height: '200px',
              bottom: '20%',
              left: '-100px',
              opacity: 0.15
            }}
            animate={{
              y: [0, 30, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1
            }}
          />
          <FloatingShape
            style={{
              background: '#e53170',
              width: '150px',
              height: '150px',
              top: '60%',
              right: '15%',
              opacity: 0.12
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 2
            }}
          />
          
          <CreativeTitle variants={itemVariants}>
            UX Engineer & Frontend Developer
          </CreativeTitle>
          
          <CreativeSubtitle variants={itemVariants}>
            Creating digital experiences
          </CreativeSubtitle>
          
          <CreativeDescription variants={itemVariants}>
            I'm a frontend developer specializing in UX engineering. I build responsive, 
            accessible, and performant web applications using React, TypeScript, and modern 
            frontend tools. This portfolio itself demonstrates my skills with its UI style 
            switcher that showcases three different design approaches.
          </CreativeDescription>
          
          <CreativeButtonContainer variants={itemVariants}>
            <CreativePrimaryButton 
              to="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight size={18} />
            </CreativePrimaryButton>
            
            <CreativeSecondaryButton 
              to="/about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Me <User size={18} />
            </CreativeSecondaryButton>
            
            <CreativeSecondaryButton 
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact <Mail size={18} />
            </CreativeSecondaryButton>
          </CreativeButtonContainer>
          
          <CreativeTechContainer variants={itemVariants}>
            <CreativeTechTitle>Technologies</CreativeTechTitle>
            <CreativeTechGrid>
              {techStack.map((tech, index) => (
                <CreativeTechItem 
                  key={tech.name}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(127, 90, 240, 0.7)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.6 + (index * 0.1) }
                  }}
                >
                  {tech.icon}
                  <span>{tech.name}</span>
                </CreativeTechItem>
              ))}
            </CreativeTechGrid>
          </CreativeTechContainer>
          
          <CreativeFeature 
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 1 }
            }}
          >
            <CreativeFeatureTitle>{feature.title}</CreativeFeatureTitle>
            <CreativeFeatureDescription>{feature.description}</CreativeFeatureDescription>
          </CreativeFeature>
        </CreativeHeroSection>
      </HomeContainer>
    );
  }
   
  return (
    <HomeContainer> 
      <HeroSection>
        <Title>UX Engineer & Frontend Developer</Title>
        <Subtitle>Creating intuitive and engaging user experiences</Subtitle>
        <Description>
          I'm a frontend developer specializing in UX engineering. I build responsive, 
          accessible, and performant web applications using React, TypeScript, and modern 
          frontend tools. This portfolio itself demonstrates my skills with its UI style 
          switcher that showcases three different design approaches.
        </Description>
        
        <ButtonContainer>
          <PrimaryButton to="/projects">
            View Projects <ArrowRight size={18} />
          </PrimaryButton>
          <SecondaryButton to="/about">
            About Me <User size={18} />
          </SecondaryButton>
          <SecondaryButton to="/contact">
            Contact <Mail size={18} />
          </SecondaryButton>
        </ButtonContainer>
        
        <TechContainer>
          <TechTitle>Technologies I Work With</TechTitle>
          <TechGrid>
            {techStack.map(tech => (
              <TechItem key={tech.name}>
                {tech.icon}
                <span>{tech.name}</span>
              </TechItem>
            ))}
          </TechGrid>
        </TechContainer>
        
        <ThemeFeature>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <p>{feature.description}</p>
        </ThemeFeature>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;
