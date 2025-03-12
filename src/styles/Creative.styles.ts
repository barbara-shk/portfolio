import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CreativeHeroSection = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    text-align: center;
    align-items: center;
  }
`;

const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: -1;
  opacity: 0.6;
`;

const CreativeTitle = styled(motion.h1)`
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 6px;
    background: linear-gradient(90deg, #7f5af0, #ff8906);
    border-radius: 3px;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const CreativeSubtitle = styled(motion.h2)`
  background: linear-gradient(45deg, #ff8906, #e53170);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: ${props => props.theme.spacing.xl};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CreativeDescription = styled(motion.p)`
  max-width: 700px;
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: 1.25rem;
  position: relative;
`;

const CreativeButtonContainer = styled(motion.div)`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xxl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const CreativeButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-decoration: none;
  position: relative;
  overflow: hidden;
  border: none;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #7f5af0, #9e86ff);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const CreativePrimaryButton = styled(CreativeButton)`
  background: linear-gradient(45deg, #7f5af0, #9e86ff);
  color: white;
  border-radius: 16px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(127, 90, 240, 0.6);
  }
  
  &::before {
    background: linear-gradient(45deg, #9e86ff, #7f5af0);
  }
`;

const CreativeSecondaryButton = styled(CreativeButton)`
  background: transparent;
  color: #7f5af0;
  border: 2px solid #7f5af0;
  border-radius: 16px;
  
  &:hover {
    background-color: rgba(127, 90, 240, 0.1);
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(127, 90, 240, 0.2);
    color: white;
  }
`;

const CreativeTechContainer = styled(motion.div)`
  width: 100%;
  max-width: 900px;
`;

const CreativeTechTitle = styled(motion.h3)`
  font-size: 1.75rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: #ff8906;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CreativeTechGrid = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const CreativeTechItem = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(127, 90, 240, 0.3);
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  
  &:hover {
    border-color: #7f5af0;
    box-shadow: 0 0 15px rgba(127, 90, 240, 0.5);
    transform: translateY(-5px) scale(1.05);
  }
`;

const CreativeFeature = styled(motion.div)`
  margin-top: ${props => props.theme.spacing.xxl};
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(45deg, rgba(127, 90, 240, 0.1), rgba(255, 137, 6, 0.1));
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(127, 90, 240, 0.3);
  position: relative;
  overflow: hidden;
  max-width: 800px;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(transparent, rgba(127, 90, 240, 0.1), transparent 30%);
    animation: rotate 10s linear infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CreativeFeatureTitle = styled(motion.h3)`
  background: linear-gradient(45deg, #7f5af0, #ff8906);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.25rem;
  margin-bottom: ${props => props.theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const CreativeFeatureDescription = styled(motion.p)`
  position: relative;
  z-index: 1;
  font-size: 1.2rem;
`;

export {
  CreativeHeroSection,
  FloatingShape,
  CreativeTitle,
  CreativeSubtitle,
  CreativeDescription,
  CreativeButtonContainer,
  CreativePrimaryButton,
  CreativeSecondaryButton,
  CreativeTechContainer,
  CreativeTechTitle,
  CreativeTechGrid,
  CreativeTechItem,
  CreativeFeature,
  CreativeFeatureTitle,
  CreativeFeatureDescription
};