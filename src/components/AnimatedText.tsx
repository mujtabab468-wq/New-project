import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text?: string;
  className?: string;
}

const Character: React.FC<{
  progress: MotionValue<number>;
  range: [number, number];
  char: string;
}> = ({ progress, range, char }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none" aria-hidden="true">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 select-text"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const totalLength = text.length;

  // Split into words while keeping track of character indices
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto ${className}`}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
      }}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const startCharIdx = charCounter;
        charCounter += word.length + (wordIdx < words.length - 1 ? 1 : 0);

        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const globalIdx = startCharIdx + charIdx;
              const start = globalIdx / totalLength;
              const end = Math.min(1, start + 1 / totalLength);
              return (
                <Character
                  key={charIdx}
                  progress={scrollYProgress}
                  range={[start, end]}
                  char={char}
                />
              );
            })}
            {wordIdx < words.length - 1 && (
              <Character
                progress={scrollYProgress}
                range={[
                  (startCharIdx + wordChars.length) / totalLength,
                  Math.min(1, (startCharIdx + wordChars.length + 1) / totalLength),
                ]}
                char=" "
              />
            )}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
