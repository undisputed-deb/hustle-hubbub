import React, { useState, useEffect } from 'react';

interface SlowTypingAnimationProps {
  text: string;
  speed?: number; // milliseconds per character
  delay?: number; // initial delay before starting
  className?: string;
  showCursor?: boolean;
}

const SlowTypingAnimation: React.FC<SlowTypingAnimationProps> = ({
  text,
  speed = 150, // slower default speed
  delay = 2000,
  className = '',
  showCursor = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }, speed);

        return () => clearTimeout(timer);
      } else if (!isComplete) {
        setIsComplete(true);
        // Keep cursor blinking for a while after completion
        setTimeout(() => {
          setShowCursorBlink(false);
        }, 3000);
      }
    }, currentIndex === 0 ? delay : 0);

    return () => clearTimeout(startTyping);
  }, [currentIndex, text, speed, delay, isComplete]);

  return (
    <span className={className}>
      {displayedText}
      {(showCursor && (!isComplete || showCursorBlink)) && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  );
};

export default SlowTypingAnimation;