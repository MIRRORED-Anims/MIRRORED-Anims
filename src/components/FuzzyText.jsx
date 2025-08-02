import React, { useState, useEffect } from 'react';

const FuzzyText = ({ 
  children, 
  fontSize = '2rem', 
  fontWeight = 300, 
  color = '#000000', 
  baseIntensity = 0.08, 
  hoverIntensity = 0.15,
  fontFamily = "'Courier New', monospace"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey(prev => prev + 1);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Check for dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Create a mutation observer to watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const intensity = isHovered ? hoverIntensity : baseIntensity;
  
  const generateRandomOffset = () => {
    return (Math.random() - 0.5) * intensity * 20;
  };

  const textShadow = Array.from({ length: 8 }, (_, i) => {
    const x = generateRandomOffset();
    const y = generateRandomOffset();
    const blur = Math.random() * intensity * 15;
    const alpha = 0.2 + Math.random() * 0.4;
    return `${x}px ${y}px ${blur}px rgba(0, 0, 0, ${alpha})`;
  }).join(', ');

  const transform = `translate(${generateRandomOffset() * 0.5}px, ${generateRandomOffset() * 0.5}px) scale(${isHovered ? 1.02 : 1})`;

  const currentColor = isDark ? '#ffffff' : color;

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color: currentColor,
        fontFamily,
        textShadow,
        cursor: 'default',
        userSelect: 'none',
        display: 'inline-block',
        transition: 'all 0.1s ease',
        transform,
        filter: `blur(${intensity * 0.5}px)`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={animationKey}
    >
      {children}
    </div>
  );
};

export default FuzzyText;