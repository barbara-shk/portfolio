import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CursorOuter = styled(motion.div)`
  position: fixed;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(127, 90, 240, 0.5);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  will-change: transform;
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
  will-change: transform;
`;

interface CustomCursorProps {
  enabled: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ enabled }) => {
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  // Create motion values for smoother animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Configure springs with optimized settings for better responsiveness
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 };
  
  // Create springs for the outer cursor
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);
  
  // Create springs for the inner cursor with higher stiffness for better responsiveness
  const innerX = useSpring(mouseX, { ...springConfig, stiffness: 700 });
  const innerY = useSpring(mouseY, { ...springConfig, stiffness: 700 });
  
  // Use a throttling mechanism to reduce unnecessary updates
  const lastUpdateTime = useRef(0);
  const throttleMs = useRef(5); // 5ms throttle - adjust if needed
  
  useEffect(() => {
    if (!enabled) return;
    
    const updatePosition = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      // Throttle updates to reduce performance impact
      if (currentTime - lastUpdateTime.current >= throttleMs.current) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        lastUpdateTime.current = currentTime;
        
        // Check if cursor is over a clickable element
        const target = e.target as HTMLElement;
        const isClickable = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' ||
          target.closest('a') || 
          target.closest('button') ||
          getComputedStyle(target).cursor === 'pointer';
        
        // Only update state if it's changed to avoid unnecessary renders
        if (isClickable !== isPointer) {
          setIsPointer(isClickable as boolean);
        }
      }
    };
    
    // Optimize event listeners with passive option for better performance
    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    
    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    
    // Hide the default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      
      document.body.style.cursor = 'auto';
    };
  }, [enabled, mouseX, mouseY, isPointer]);
  
  if (!enabled) return null;
  
  return (
    <>
      <CursorOuter
        style={{
          translateX: outerX,
          translateY: outerY,
          x: "-50%",
          y: "-50%",
          scale: isPointer ? 1.2 : 1,
          opacity: isActive ? 0.9 : 0.6,
          borderColor: isPointer ? 'rgba(255, 137, 6, 0.8)' : 'rgba(127, 90, 240, 0.5)',
        }}
      />
      <CursorInner
        style={{
          translateX: innerX,
          translateY: innerY,
          x: "-50%",
          y: "-50%",
          scale: isActive ? 2 : isPointer ? 1.5 : 1,
          backgroundColor: isPointer ? '#ff8906' : '#7f5af0',
        }}
      />
    </>
  );
};

export default CustomCursor;