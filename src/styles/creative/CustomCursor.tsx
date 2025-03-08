import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorOuter = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(127, 90, 240, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorInner = styled(motion.div)`
  position: fixed;
  width: 8px;
  height: 8px;
  background-color: #7f5af0;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

interface CustomCursorProps {
  enabled: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    if (!enabled) return;
    
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
       
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(!!isClickable);
    };
    
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
     
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
       
      document.body.style.cursor = 'auto';
    };
  }, [enabled]);
  
  if (!enabled) return null;
  
  return (
    <>
      <CursorOuter
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: isPointer ? 1.2 : 1,
          opacity: isActive ? 0.9 : 0.6,
          borderColor: isPointer ? 'rgba(255, 137, 6, 0.8)' : 'rgba(127, 90, 240, 0.5)',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
          mass: 0.5
        }}
      />
      <CursorInner
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isActive ? 2 : isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? '#ff8906' : '#7f5af0',
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 300,
        }}
      />
    </>
  );
};

export default CustomCursor;