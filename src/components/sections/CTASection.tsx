import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ParallaxElement } from '@/components/ui/parallax-hero';
import { Rocket, Users, Zap, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onLaunchClick?: () => void;
  onJoinClick?: () => void;
}

export function CTASection({ onLaunchClick, onJoinClick }: CTASectionProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient opacity-20" />
      
      <ParallaxElement speed={0.1} className="absolute top-20 left-0 opacity-30">
        <div className="w-80 h-80 rounded-full bg-primary/20 blur-3xl" />
      </ParallaxElement>
      
      <ParallaxElement speed={0.15} direction="down" className="absolute bottom-20 right-0 opacity-30">
        <div className="w-96 h-96 rounded-full bg-secondary/20 blur-3xl" />
      </ParallaxElement>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main Heading */}
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Build the
            <span className="text-gradient block">Next Big Thing?</span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of entrepreneurs who are turning their wildest ideas into 
            billion-dollar companies. Your startup journey begins here.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={onLaunchClick}
                className="bg-gradient hover:shadow-glow transition-smooth px-10 py-6 text-xl font-bold group"
              >
                <Rocket className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                Launch Your Startup
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                onClick={onJoinClick}
                className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent transition-smooth px-10 py-6 text-xl font-bold backdrop-blur-sm group"
              >
                <Users className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Join Community
              </Button>
            </motion.div>
          </motion.div>

          {/* Features List */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: Zap,
                title: "Instant Connections",
                description: "Connect with co-founders and investors in minutes"
              },
              {
                icon: Users,
                title: "Expert Community", 
                description: "Learn from successful entrepreneurs and mentors"
              },
              {
                icon: Rocket,
                title: "Launch Support",
                description: "Get the tools and guidance to launch successfully"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-6 rounded-2xl bg-surface/20 backdrop-blur-sm border border-border/30"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                custom={index}
              >
                <motion.div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient p-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 pt-8 border-t border-border/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by entrepreneurs from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["Y Combinator", "Techstars", "500 Startups", "Accel", "Sequoia"].map((company) => (
                <motion.div
                  key={company}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}