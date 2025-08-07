import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedCard } from '@/components/ui/animated-card';
import { ParallaxElement } from '@/components/ui/parallax-hero';
import FeatureDetailModal from '@/components/FeatureDetailModal';
import { 
  Users, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp, 
  Handshake, 
  Zap,
  Target,
  Rocket,
  Heart,
  ArrowRight
} from 'lucide-react';

const features = [
  {
    id: 'co-founder-matching',
    icon: Users,
    title: "Co-founder Matching",
    description: "AI-powered matching system to find your perfect business partner based on skills, vision, and personality.",
    color: "text-primary",
    gradient: "from-primary to-primary-variant"
  },
  {
    id: 'idea-discussions',
    icon: MessageSquare,
    title: "Idea Discussions",
    description: "Share your startup ideas in a supportive community and get valuable feedback from experienced entrepreneurs.",
    color: "text-secondary",
    gradient: "from-secondary to-secondary-glow"
  },
  {
    id: 'innovation-hub',
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Discover trending ideas, market opportunities, and breakthrough innovations in real-time.",
    color: "text-accent",
    gradient: "from-accent to-accent-glow"
  },
  {
    id: 'growth-analytics',
    icon: TrendingUp,
    title: "Growth Analytics",
    description: "Track your startup journey with detailed analytics and insights to measure your progress.",
    color: "text-success",
    gradient: "from-success to-success-glow"
  },
  {
    id: 'networking-events',
    icon: Handshake,
    title: "Networking Events",
    description: "Join exclusive virtual and in-person events to connect with investors, mentors, and fellow founders.",
    color: "text-warning",
    gradient: "from-warning to-warning-glow"
  },
  {
    id: 'rapid-prototyping',
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Turn ideas into reality with our integrated tools for MVP development and market validation.",
    color: "text-primary",
    gradient: "from-primary-variant to-secondary"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleLearnMore = (featureId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Learn more clicked for:', featureId);
    setSelectedFeature(featureId);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <ParallaxElement speed={0.1} className="absolute top-20 left-0 opacity-20">
        <div className="w-96 h-96 rounded-full bg-gradient blur-3xl" />
      </ParallaxElement>
      
      <ParallaxElement speed={0.15} direction="down" className="absolute bottom-20 right-0 opacity-20">
        <div className="w-80 h-80 rounded-full bg-gradient-secondary blur-3xl" />
      </ParallaxElement>

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Features</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Everything You Need to
            <span className="text-gradient block">Build & Scale</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform provides all the tools and connections you need to transform your startup idea 
            into a thriving business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <AnimatedCard
              key={feature.title}
              delay={index * 0.1}
              className="group cursor-pointer hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              onClick={() => {
                console.log('Card clicked:', feature.id);
                handleLearnMore(feature.id);
              }}
            >
              <div className="p-8 h-full flex flex-col">
                {/* Icon with gradient background */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-smooth`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>
                
                {/* Learn More Button */}
                <div className="mt-6 pt-4 border-t border-border/30">
                  <motion.button
                    onClick={(e) => handleLearnMore(feature.id, e)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 font-medium text-sm hover:gap-3 hover:bg-primary/5 px-4 py-3 rounded-xl w-full justify-center border border-primary/20 hover:border-primary/40 hover:shadow-lg group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <motion.div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient border border-border/30 text-white font-semibold cursor-pointer hover-glow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Rocket className="w-5 h-5" />
            <span>Start Building Your Empire</span>
            <Heart className="w-5 h-5 text-accent animate-heartbeat" />
          </motion.div>
        </motion.div>
      </div>

      {/* Feature Detail Modal */}
      <FeatureDetailModal
        isOpen={!!selectedFeature}
        onClose={() => {
          console.log('Closing modal');
          setSelectedFeature(null);
        }}
        featureId={selectedFeature || ''}
      />
    </section>
  );
}