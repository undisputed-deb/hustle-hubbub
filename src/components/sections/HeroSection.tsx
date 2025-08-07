import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import SlowTypingAnimation from '@/components/ui/SlowTypingAnimation';
import { ParallaxHero, ParallaxElement } from '@/components/ui/parallax-hero';
import { Scene3D } from '@/components/3d/Scene3D';
import { Rocket, Users, Lightbulb, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

interface HeroSectionProps {
  onLaunchClick?: () => void;
  onJoinClick?: () => void;
}

export function HeroSection({ onLaunchClick, onJoinClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Parallax Background Image */}
      <ParallaxHero speed={0.3} className="absolute inset-0 -z-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
      </ParallaxHero>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 -z-10" />
      
      {/* Floating Elements */}
      <ParallaxElement speed={0.1} className="absolute top-20 left-10">
        <motion.div 
          className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm animate-float"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </ParallaxElement>
      
      <ParallaxElement speed={0.2} direction="down" className="absolute top-40 right-20">
        <motion.div 
          className="w-12 h-12 rounded-full bg-secondary/20 backdrop-blur-sm animate-float"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </ParallaxElement>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient">Startup</span>
            <br />
            <span className="text-secondary">Network</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-muted-foreground mb-8">
            <SlowTypingAnimation 
              text="Where ideas become billion-dollar ventures"
              speed={120}
              delay={2000}
              className="text-gradient"
              showCursor={true}
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Connect with visionary entrepreneurs, share groundbreaking ideas, and find your perfect co-founder. 
          Join the ultimate community where startups are born and dreams become reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              onClick={onLaunchClick}
              className="bg-gradient hover:shadow-glow transition-smooth px-8 py-4 text-lg font-semibold"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Launch Your Startup
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={onJoinClick}
              className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary transition-smooth px-8 py-4 text-lg font-semibold backdrop-blur-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Network
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, label: "Active Members", value: "10K+" },
            { icon: Lightbulb, label: "Ideas Shared", value: "25K+" },
            { icon: Rocket, label: "Startups Launched", value: "500+" },
            { icon: TrendingUp, label: "Success Rate", value: "78%" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-surface/20 backdrop-blur-sm border border-border/30"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary animate-pulse-glow" />
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}