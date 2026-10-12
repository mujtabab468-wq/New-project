import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[2.5px] sm:h-[3px] bg-black/20">
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
          background: 'linear-gradient(90deg, #B600A8 0%, #7621B0 50%, #BE4C00 100%)',
        }}
        className="w-full h-full shadow-[0_0_8px_rgba(182,0,168,0.6)]"
      />
    </div>
  );
};

export default ScrollProgressBar;
