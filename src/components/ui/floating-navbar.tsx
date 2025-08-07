import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingNavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps {
  navItems: FloatingNavItem[];
  className?: string;
}

export function FloatingNavbar({ navItems, className }: FloatingNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(prevScrollY > currentScrollY || currentScrollY < 100);
      prevScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-4 inset-x-0 mx-auto z-50 max-w-fit",
          className
        )}
      >
        <div className="relative backdrop-blur-md bg-surface/80 border border-border/50 rounded-2xl shadow-elevated px-8 py-4">
          <div className="flex items-center justify-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.link}
                className={cn(
                  "relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-smooth",
                  "hover:text-primary hover:scale-105",
                  activeItem === item.name
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onHoverStart={() => setActiveItem(item.name)}
                onHoverEnd={() => setActiveItem(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon && (
                  <motion.span
                    className="w-4 h-4"
                    animate={{ rotate: activeItem === item.name ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.span>
                )}
                <span>{item.name}</span>
                {activeItem === item.name && (
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.a>
            ))}
          </div>
          
          {/* Floating glow effect */}
          <div className="absolute inset-0 bg-gradient rounded-2xl opacity-20 blur-xl -z-10" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}