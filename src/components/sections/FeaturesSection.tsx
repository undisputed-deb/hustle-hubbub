import { useState } from 'react';
import { motion } from 'framer-motion';
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
  ArrowRight,
  X
} from 'lucide-react';

const features = [
  {
    id: 'co-founder-matching',
    icon: Users,
    title: "Co-founder Matching",
    description: "AI-powered matching system to find your perfect business partner based on skills, vision, and personality.",
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 'idea-discussions',
    icon: MessageSquare,
    title: "Idea Discussions",
    description: "Share your startup ideas in a supportive community and get valuable feedback from experienced entrepreneurs.",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 'innovation-hub',
    icon: Lightbulb,
    title: "Innovation Hub",
    description: "Discover trending ideas, market opportunities, and breakthrough innovations in real-time.",
    color: "text-pink-500",
    gradient: "from-pink-500 to-orange-500"
  },
  {
    id: 'growth-analytics',
    icon: TrendingUp,
    title: "Growth Analytics",
    description: "Track your startup journey with detailed analytics and insights to measure your progress.",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: 'networking-events',
    icon: Handshake,
    title: "Networking Events",
    description: "Join exclusive virtual and in-person events to connect with investors, mentors, and fellow founders.",
    color: "text-orange-500",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 'rapid-prototyping',
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Turn ideas into reality with our integrated tools for MVP development and market validation.",
    color: "text-purple-500",
    gradient: "from-purple-500 to-blue-500"
  }
];

// Simple Modal Component
const SimpleModal = ({ isOpen, onClose, feature }: { isOpen: boolean; onClose: () => void; feature: any }) => {
  if (!isOpen || !feature) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${feature.gradient} p-8 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
              <feature.icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{feature.title}</h1>
              <p className="text-xl opacity-90">Learn More About This Feature</p>
            </div>
          </div>
          
          <p className="text-lg opacity-80 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Stats */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Key Metrics</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
                  <div className="text-2xl font-bold text-purple-400">2,500+</div>
                  <div className="text-sm text-gray-300">Active Users</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/30">
                  <div className="text-2xl font-bold text-green-400">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30">
                  <div className="text-2xl font-bold text-blue-400">24/7</div>
                  <div className="text-sm text-gray-300">Support Available</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">What You Get</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Advanced Analytics</h3>
                    <p className="text-gray-300 text-sm">Get detailed insights and metrics</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Real-time Updates</h3>
                    <p className="text-gray-300 text-sm">Stay updated with live notifications</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Expert Support</h3>
                    <p className="text-gray-300 text-sm">Get help from industry experts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Custom Integration</h3>
                    <p className="text-gray-300 text-sm">Integrate with your existing tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/50">
            <div className="flex items-start space-x-4">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-purple-500/50"
              />
              <div>
                <p className="text-gray-300 italic mb-2">
                  "This feature completely transformed how we approach our startup. Highly recommended!"
                </p>
                <div className="text-sm">
                  <div className="font-semibold text-white">Sarah Johnson</div>
                  <div className="text-gray-400">CEO, TechStartup Inc.</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <button className={`bg-gradient-to-r ${feature.gradient} text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}>
              Get Started Now
            </button>
            <p className="text-sm text-gray-400 mt-2">
              Join thousands of entrepreneurs already using this feature
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleLearnMore = (featureId: string) => {
    console.log('Learn more clicked:', featureId);
    setSelectedFeature(featureId);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setSelectedFeature(null);
  };

  const currentFeature = features.find(f => f.id === selectedFeature);

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-400">Features</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
              Build & Scale
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform provides all the tools and connections you need to transform your startup idea 
            into a thriving business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              
              {/* Content */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Learn More Button */}
              <button
                onClick={() => handleLearnMore(feature.id)}
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-all duration-300 font-medium text-sm hover:gap-3 hover:bg-purple-500/10 px-4 py-3 rounded-xl w-full justify-center border border-purple-500/30 hover:border-purple-400/50 hover:shadow-md group/button"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
            <Rocket className="w-5 h-5" />
            <span>Start Building Your Empire</span>
            <Heart className="w-5 h-5 text-pink-300" />
          </div>
        </div>
      </div>

      {/* Modal */}
      <SimpleModal 
        isOpen={!!selectedFeature}
        onClose={handleCloseModal}
        feature={currentFeature}
      />
    </section>
  );
}