import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export function TypingAnimation({ 
  text, 
  duration = 50, 
  className,
  delay = 0 
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const typingEffect = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          setI(i + 1);
        } else {
          clearInterval(typingEffect);
        }
      }, duration);

      return () => {
        clearInterval(typingEffect);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [duration, i, text, delay]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay / 1000 }}
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-primary ml-1"
      />
    </motion.span>
  );
}