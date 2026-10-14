import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  // Exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing position with smooth spring physics
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad, not touch-only)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsPointerDevice(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerDevice(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor-hover]'
      );

      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch screens
  if (!isPointerDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Outer trailing expanding ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.9 : 1,
          opacity: isVisible ? 1 : 0,
          borderWidth: isHovered ? '1.5px' : '1px',
          backgroundColor: isHovered ? 'rgba(215, 226, 234, 0.12)' : 'rgba(215, 226, 234, 0.03)',
          borderColor: isHovered ? 'rgba(215, 226, 234, 0.85)' : 'rgba(215, 226, 234, 0.4)',
        }}
        transition={{
          scale: { type: 'spring', damping: 20, stiffness: 350 },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
        }}
        className="w-10 h-10 rounded-full border backdrop-blur-[0.5px] will-change-transform flex items-center justify-center"
      >
        {/* Subtle inner accent pulse when hovered */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="w-2.5 h-2.5 rounded-full bg-[#B600A8]/50 blur-[2px]"
          />
        )}
      </motion.div>

      {/* 2. Inner precision dot that stays locked to exact cursor */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.7 : isHovered ? 0.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.15 },
          opacity: { duration: 0.2 },
        }}
        className="w-1.5 h-1.5 rounded-full bg-[#D7E2EA] shadow-[0_0_6px_rgba(255,255,255,0.8)] will-change-transform"
      />
    </div>
  );
};

export default CustomCursor;
