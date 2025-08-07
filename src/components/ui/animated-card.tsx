import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from './card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover3d?: boolean;
  glowOnHover?: boolean;
}

export function AnimatedCard({ 
  children, 
  className, 
  delay = 0,
  hover3d = true,
  glowOnHover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={hover3d ? { 
        scale: 1.02, 
        rotateX: 5,
        rotateY: 5,
        z: 50
      } : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn("perspective-1000", className)}
    >
      <Card className={cn(
        "relative bg-gradient-card border border-border/50 backdrop-blur-sm transition-smooth",
        glowOnHover && "hover:shadow-glow hover:border-primary/50",
        className
      )}>
        {glowOnHover && (
          <motion.div 
            className="absolute inset-0 bg-gradient rounded-lg opacity-0 blur-xl transition-opacity duration-300"
            whileHover={{ opacity: 0.1 }}
          />
        )}
        {children}
      </Card>
    </motion.div>
  );
}