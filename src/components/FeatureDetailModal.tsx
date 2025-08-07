import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, MessageCircle, Lightbulb, TrendingUp, Shield, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeatureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureId: string;
}

const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({
  isOpen,
  onClose,
  featureId
}) => {
  const featureDetails: Record<string, any> = {
    'co-founder-matching': {
      title: 'Co-founder Matching',
      subtitle: 'Find Your Perfect Business Partner',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      description: 'Our AI-powered matching system analyzes skills, vision, personality, and working styles to connect you with the ideal co-founder for your startup journey.',
      features: [
        {
          title: 'Advanced Algorithm',
          description: 'Machine learning analyzes 50+ compatibility factors',
          icon: Zap
        },
        {
          title: 'Personality Assessment',
          description: 'Comprehensive personality and work style evaluation',
          icon: Users
        },
        {
          title: 'Skill Complementarity',
          description: 'Matches complementary technical and business skills',
          icon: CheckCircle
        },
        {
          title: 'Vision Alignment',
          description: 'Ensures aligned startup goals and values',
          icon: Star
        }
      ],
      stats: [
        { label: 'Successful Matches', value: '2,847' },
        { label: 'Match Accuracy', value: '94%' },
        { label: 'Average Time to Match', value: '7 days' },
        { label: 'Partnership Success Rate', value: '78%' }
      ],
      testimonial: {
        text: "The co-founder matching system connected me with my perfect business partner. We've raised $2M together!",
        author: "Sarah Chen, CEO of TechFlow",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"
      }
    },
    'idea-discussions': {
      title: 'Idea Discussions',
      subtitle: 'Validate & Refine Your Startup Ideas',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      description: 'Share your startup ideas in a supportive community and get valuable feedback from experienced entrepreneurs, investors, and industry experts.',
      features: [
        {
          title: 'Structured Feedback',
          description: 'Get organized feedback on market fit, feasibility, and potential',
          icon: MessageCircle
        },
        {
          title: 'Expert Reviews',
          description: 'Industry veterans and successful founders review your ideas',
          icon: Star
        },
        {
          title: 'Market Validation',
          description: 'Test your assumptions with real market feedback',
          icon: TrendingUp
        },
        {
          title: 'Idea Evolution',
          description: 'Track how your ideas develop based on community input',
          icon: Lightbulb
        }
      ],
      stats: [
        { label: 'Ideas Discussed', value: '12,500+' },
        { label: 'Expert Reviewers', value: '450+' },
        { label: 'Average Feedback Time', value: '2 hours' },
        { label: 'Ideas That Got Funded', value: '23%' }
      ],
      testimonial: {
        text: "The feedback I received here helped me pivot my idea into a $5M ARR business. The community is incredibly supportive!",
        author: "Mike Rodriguez, Founder of DataCorp",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
      }
    },
    'innovation-hub': {
      title: 'Innovation Hub',
      subtitle: 'Discover Market Opportunities',
      icon: Lightbulb,
      color: 'from-pink-500 to-orange-500',
      description: 'Stay ahead of the curve with trending ideas, market opportunities, and breakthrough innovations curated from global markets and emerging technologies.',
      features: [
        {
          title: 'Trend Analysis',
          description: 'AI-powered analysis of emerging market trends',
          icon: TrendingUp
        },
        {
          title: 'Opportunity Mapping',
          description: 'Identify untapped markets and business opportunities',
          icon: Lightbulb
        },
        {
          title: 'Real-time Updates',
          description: 'Live feed of breakthrough innovations and market shifts',
          icon: Zap
        },
        {
          title: 'Competitive Intelligence',
          description: 'Track competitors and market dynamics',
          icon: Shield
        }
      ],
      stats: [
        { label: 'Market Opportunities', value: '5,200+' },
        { label: 'Trend Reports', value: '850+' },
        { label: 'Daily Updates', value: '50+' },
        { label: 'Success Stories', value: '1,200+' }
      ],
      testimonial: {
        text: "The Innovation Hub helped me spot a market gap that became our $10M opportunity. The insights are incredibly valuable!",
        author: "Emma Thompson, CEO of GreenTech",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
      }
    },
    'growth-analytics': {
      title: 'Growth Analytics',
      subtitle: 'Track Your Startup Journey',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'Comprehensive analytics and insights to measure your startup progress, identify growth opportunities, and make data-driven decisions.',
      features: [
        {
          title: 'Performance Metrics',
          description: 'Track KPIs, user acquisition, and revenue growth',
          icon: TrendingUp
        },
        {
          title: 'Predictive Analytics',
          description: 'AI-powered forecasting and growth predictions',
          icon: Zap
        },
        {
          title: 'Benchmark Comparisons',
          description: 'Compare your metrics against industry standards',
          icon: CheckCircle
        },
        {
          title: 'Custom Dashboards',
          description: 'Personalized analytics dashboards for your needs',
          icon: Star
        }
      ],
      stats: [
        { label: 'Startups Tracked', value: '8,500+' },
        { label: 'Data Points', value: '50M+' },
        { label: 'Accuracy Rate', value: '96%' },
        { label: 'Growth Improvement', value: '+45%' }
      ],
      testimonial: {
        text: "The analytics helped us identify our growth bottlenecks and increase our conversion rate by 300%!",
        author: "Alex Kim, CTO of DataFlow",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
      }
    },
    'networking-events': {
      title: 'Networking Events',
      subtitle: 'Connect With Industry Leaders',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      description: 'Join exclusive virtual and in-person events to connect with investors, mentors, successful founders, and fellow entrepreneurs in your industry.',
      features: [
        {
          title: 'Exclusive Access',
          description: 'VIP events with top investors and industry leaders',
          icon: Star
        },
        {
          title: 'Virtual & In-Person',
          description: 'Flexible event formats to fit your schedule',
          icon: Users
        },
        {
          title: 'Targeted Networking',
          description: 'Industry-specific events and curated connections',
          icon: CheckCircle
        },
        {
          title: 'Follow-up Tools',
          description: 'Smart tools to nurture relationships after events',
          icon: Zap
        }
      ],
      stats: [
        { label: 'Monthly Events', value: '25+' },
        { label: 'Network Members', value: '15,000+' },
        { label: 'Investor Connections', value: '500+' },
        { label: 'Deals Closed', value: '$250M+' }
      ],
      testimonial: {
        text: "I met my lead investor at a networking event here. Closed our Series A within 3 months!",
        author: "Jordan Martinez, Founder of SpaceTech",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
      }
    },
    'rapid-prototyping': {
      title: 'Rapid Prototyping',
      subtitle: 'Turn Ideas Into Reality',
      icon: Zap,
      color: 'from-purple-500 to-blue-500',
      description: 'Transform your ideas into working prototypes with our integrated tools for MVP development, design systems, and market validation.',
      features: [
        {
          title: 'No-Code Builder',
          description: 'Build functional prototypes without coding',
          icon: Zap
        },
        {
          title: 'Design Systems',
          description: 'Professional UI/UX templates and components',
          icon: Star
        },
        {
          title: 'User Testing',
          description: 'Built-in tools for user feedback and validation',
          icon: Users
        },
        {
          title: 'MVP Launch',
          description: 'Deploy and launch your MVP in minutes',
          icon: CheckCircle
        }
      ],
      stats: [
        { label: 'Prototypes Built', value: '3,200+' },
        { label: 'Average Build Time', value: '3 days' },
        { label: 'Success Rate', value: '85%' },
        { label: 'Funding Raised', value: '$45M+' }
      ],
      testimonial: {
        text: "Built and validated our MVP in just 5 days. Saved us months of development time and $50k in costs!",
        author: "Lisa Wang, CEO of HealthTech",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face"
      }
    }
  };

  const feature = featureDetails[featureId as keyof typeof featureDetails];

  if (!isOpen) return null;

  if (!feature) {
    console.error('Feature not found:', featureId);
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Feature not found</h2>
          <p className="text-muted-foreground mb-4">The requested feature details could not be loaded.</p>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={`relative bg-gradient-to-r ${feature.color} p-8 text-white`}>
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
                <p className="text-xl opacity-90">{feature.subtitle}</p>
              </div>
            </div>
            
            <p className="text-lg opacity-80 leading-relaxed">
              {feature.description}
            </p>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-12rem)]">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-b border-border">
              {feature.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="p-8 border-b border-border">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feature.features.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-8 border-b border-border">
              <h2 className="text-2xl font-bold mb-6">Success Story</h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-muted/30 rounded-xl p-6"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={feature.testimonial.avatar}
                    alt={feature.testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="text-lg italic mb-4 leading-relaxed">
                      "{feature.testimonial.text}"
                    </p>
                    <div className="font-semibold text-primary">
                      {feature.testimonial.author}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of entrepreneurs who are already using {feature.title}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    size="lg"
                    className={`bg-gradient-to-r ${feature.color} hover:opacity-90 transition-opacity px-8`}
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeatureDetailModal;