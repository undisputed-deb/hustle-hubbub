import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Users, MessageCircle, Lightbulb, TrendingUp, Shield, Zap, CheckCircle, 
  ArrowRight, Star, Play, Download, Calendar, DollarSign, Clock, Award,
  Globe, BarChart3, Rocket, Heart, Target, Brain
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');

  const featureDetails: Record<string, any> = {
    'co-founder-matching': {
      title: 'Co-founder Matching',
      subtitle: 'Find Your Perfect Business Partner',
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      description: 'Our AI-powered matching system analyzes skills, vision, personality, and working styles to connect you with the ideal co-founder for your startup journey.',
      features: [
        {
          title: 'Advanced AI Algorithm',
          description: 'Machine learning analyzes 50+ compatibility factors including personality traits, work styles, and business experience',
          icon: Brain
        },
        {
          title: 'Comprehensive Assessment',
          description: 'In-depth evaluation covering technical skills, leadership style, risk tolerance, and communication preferences',
          icon: Target
        },
        {
          title: 'Skill Complementarity',
          description: 'Smart matching of complementary technical and business skills to create balanced founding teams',
          icon: CheckCircle
        },
        {
          title: 'Vision Alignment',
          description: 'Ensures aligned startup goals, values, and long-term vision for sustainable partnerships',
          icon: Star
        },
        {
          title: 'Verified Profiles',
          description: 'All users undergo verification process including LinkedIn, GitHub, and professional references',
          icon: Shield
        },
        {
          title: 'Smart Introductions',
          description: 'AI-generated conversation starters and collaboration suggestions based on shared interests',
          icon: MessageCircle
        }
      ],
      stats: [
        { label: 'Successful Matches', value: '2,847', growth: '+23%' },
        { label: 'Match Accuracy', value: '94%', growth: '+8%' },
        { label: 'Average Time to Match', value: '7 days', growth: '-15%' },
        { label: 'Partnership Success Rate', value: '78%', growth: '+12%' }
      ],
      testimonials: [
        {
          text: "The co-founder matching system connected me with my perfect business partner. We've raised $2M together and our skills complement each other perfectly!",
          author: "Sarah Chen, CEO of TechFlow",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face",
          company: "TechFlow",
          funding: "$2M Series A"
        },
        {
          text: "Found my technical co-founder through the platform. The personality assessment was spot-on - we work incredibly well together!",
          author: "Marcus Johnson, Founder of DataSync",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
          company: "DataSync",
          funding: "$500K Seed"
        }
      ],
      pricing: {
        free: {
          name: "Basic Matching",
          price: "Free",
          features: ["3 matches per month", "Basic compatibility score", "Profile creation", "Message initial matches"]
        },
        pro: {
          name: "Pro Matching",
          price: "$29/month",
          features: ["Unlimited matches", "Advanced compatibility analysis", "Priority matching", "Video introductions", "Success coaching"]
        },
        enterprise: {
          name: "Enterprise",
          price: "Custom",
          features: ["White-label solution", "Custom matching criteria", "Dedicated success manager", "API access", "Advanced analytics"]
        }
      },
      howItWorks: [
        {
          step: 1,
          title: "Complete Your Profile",
          description: "Fill out comprehensive assessment covering skills, experience, personality, and startup vision",
          icon: Users
        },
        {
          step: 2,
          title: "AI Analysis",
          description: "Our algorithm analyzes your profile and identifies potential co-founder matches",
          icon: Brain
        },
        {
          step: 3,
          title: "Review Matches",
          description: "Browse curated matches with detailed compatibility scores and explanations",
          icon: Star
        },
        {
          step: 4,
          title: "Connect & Collaborate",
          description: "Start conversations with potential co-founders and begin collaboration",
          icon: Rocket
        }
      ]
    },
    'idea-discussions': {
      title: 'Idea Discussions',
      subtitle: 'Validate & Refine Your Startup Ideas',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      description: 'Share your startup ideas in a supportive community and get valuable feedback from experienced entrepreneurs, investors, and industry experts.',
      features: [
        {
          title: 'Structured Feedback Framework',
          description: 'Organized feedback system covering market potential, technical feasibility, and business model validation',
          icon: MessageCircle
        },
        {
          title: 'Expert Review Network',
          description: 'Access to 450+ industry veterans, successful founders, and angel investors who provide detailed feedback',
          icon: Star
        },
        {
          title: 'Real Market Validation',
          description: 'Test assumptions with real potential customers through integrated surveys and focus groups',
          icon: TrendingUp
        },
        {
          title: 'Idea Evolution Tracking',
          description: 'Visual timeline showing how your ideas develop and improve based on community input',
          icon: Lightbulb
        },
        {
          title: 'Anonymous Options',
          description: 'Share sensitive ideas anonymously while still receiving valuable feedback and validation',
          icon: Shield
        },
        {
          title: 'Smart Categorization',
          description: 'AI-powered tagging and categorization to connect you with relevant experts and feedback',
          icon: Brain
        }
      ],
      stats: [
        { label: 'Ideas Discussed', value: '12,500+', growth: '+34%' },
        { label: 'Expert Reviewers', value: '450+', growth: '+18%' },
        { label: 'Average Feedback Time', value: '2 hours', growth: '-25%' },
        { label: 'Ideas That Got Funded', value: '23%', growth: '+31%' }
      ],
      testimonials: [
        {
          text: "The feedback I received here helped me pivot my idea into a $5M ARR business. The community is incredibly supportive and the insights are actionable!",
          author: "Mike Rodriguez, Founder of DataCorp",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
          company: "DataCorp",
          funding: "$5M ARR"
        }
      ],
      pricing: {
        free: {
          name: "Community Access",
          price: "Free",
          features: ["Post 2 ideas per month", "Basic community feedback", "Public discussions", "Idea tracking"]
        },
        pro: {
          name: "Expert Feedback",
          price: "$19/month",
          features: ["Unlimited idea posts", "Expert reviewer access", "Private feedback sessions", "Market validation tools", "Priority support"]
        }
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
          title: 'AI-Powered Trend Analysis',
          description: 'Advanced machine learning analyzes global markets, patents, and emerging technologies to identify trends',
          icon: TrendingUp
        },
        {
          title: 'Opportunity Mapping',
          description: 'Interactive maps showing untapped markets, emerging niches, and high-potential business opportunities',
          icon: Globe
        },
        {
          title: 'Real-time Market Intelligence',
          description: 'Live feed of breakthrough innovations, funding rounds, and market shifts updated every hour',
          icon: Zap
        },
        {
          title: 'Competitive Landscape',
          description: 'Comprehensive competitor analysis and market positioning insights for informed decision making',
          icon: BarChart3
        },
        {
          title: 'Innovation Alerts',
          description: 'Personalized alerts for opportunities matching your interests, skills, and market focus',
          icon: Target
        },
        {
          title: 'Research Repository',
          description: 'Access to 850+ detailed market reports, trend analyses, and innovation case studies',
          icon: Download
        }
      ],
      stats: [
        { label: 'Market Opportunities', value: '5,200+', growth: '+42%' },
        { label: 'Trend Reports', value: '850+', growth: '+28%' },
        { label: 'Daily Updates', value: '50+', growth: '+67%' },
        { label: 'Success Stories', value: '1,200+', growth: '+45%' }
      ],
      testimonials: [
        {
          text: "The Innovation Hub helped me spot a market gap in sustainable packaging that became our $10M opportunity. The insights are incredibly valuable and actionable!",
          author: "Emma Thompson, CEO of GreenTech",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
          company: "GreenTech Solutions",
          funding: "$10M Series B"
        }
      ],
      pricing: {
        free: {
          name: "Basic Insights",
          price: "Free",
          features: ["Weekly trend reports", "Basic market data", "Community discussions", "Limited opportunity alerts"]
        },
        pro: {
          name: "Market Intelligence",
          price: "$49/month",
          features: ["Daily insights", "Advanced analytics", "Custom opportunity alerts", "Expert consultations", "Research repository access"]
        }
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
          title: 'Comprehensive KPI Tracking',
          description: 'Monitor user acquisition, revenue growth, churn rate, and 50+ other critical startup metrics',
          icon: BarChart3
        },
        {
          title: 'Predictive Analytics',
          description: 'AI-powered forecasting for revenue, user growth, and funding needs with 96% accuracy',
          icon: Brain
        },
        {
          title: 'Industry Benchmarking',
          description: 'Compare your metrics against 8,500+ startups in your industry and stage',
          icon: Award
        },
        {
          title: 'Custom Dashboards',
          description: 'Build personalized analytics dashboards with drag-and-drop widgets and real-time data',
          icon: Target
        },
        {
          title: 'Growth Recommendations',
          description: 'AI-generated recommendations for improving conversion rates, retention, and growth',
          icon: Lightbulb
        },
        {
          title: 'Investor-Ready Reports',
          description: 'One-click generation of professional reports for investor meetings and board updates',
          icon: Download
        }
      ],
      stats: [
        { label: 'Startups Tracked', value: '8,500+', growth: '+56%' },
        { label: 'Data Points', value: '50M+', growth: '+89%' },
        { label: 'Accuracy Rate', value: '96%', growth: '+4%' },
        { label: 'Growth Improvement', value: '+45%', growth: '+12%' }
      ],
      testimonials: [
        {
          text: "The analytics helped us identify our growth bottlenecks and increase our conversion rate by 300%. The predictive insights are incredibly accurate!",
          author: "Alex Kim, CTO of DataFlow",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
          company: "DataFlow Analytics",
          funding: "$3M Series A"
        }
      ],
      pricing: {
        free: {
          name: "Startup Tracker",
          price: "Free",
          features: ["Basic metrics", "Monthly reports", "5 dashboard widgets", "Community benchmarks"]
        },
        pro: {
          name: "Growth Suite",
          price: "$39/month",
          features: ["Advanced analytics", "Predictive forecasting", "Custom dashboards", "Industry benchmarks", "Weekly insights"]
        }
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
          title: 'Exclusive VIP Access',
          description: 'Premium events with top-tier investors, unicorn founders, and industry leaders',
          icon: Star
        },
        {
          title: 'Hybrid Event Format',
          description: 'Flexible virtual and in-person events across 25+ global cities with seamless networking',
          icon: Globe
        },
        {
          title: 'Smart Networking',
          description: 'AI-powered attendee matching and conversation starter suggestions based on mutual interests',
          icon: Brain
        },
        {
          title: 'Follow-up Automation',
          description: 'Automated follow-up tools and CRM integration to nurture relationships post-event',
          icon: Zap
        },
        {
          title: 'Industry-Specific Events',
          description: 'Curated events for specific verticals: FinTech, HealthTech, AI, CleanTech, and more',
          icon: Target
        },
        {
          title: 'Mentorship Matching',
          description: 'Connect with experienced mentors and advisors through dedicated mentorship events',
          icon: Award
        }
      ],
      stats: [
        { label: 'Monthly Events', value: '25+', growth: '+38%' },
        { label: 'Network Members', value: '15,000+', growth: '+67%' },
        { label: 'Investor Connections', value: '500+', growth: '+45%' },
        { label: 'Deals Closed', value: '$250M+', growth: '+78%' }
      ],
      testimonials: [
        {
          text: "I met my lead investor at a networking event here. The quality of attendees is exceptional - closed our Series A within 3 months of that first meeting!",
          author: "Jordan Martinez, Founder of SpaceTech",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
          company: "SpaceTech Innovations",
          funding: "$8M Series A"
        }
      ],
      pricing: {
        free: {
          name: "Community Events",
          price: "Free",
          features: ["Monthly community events", "Basic networking", "Event recordings", "Group discussions"]
        },
        pro: {
          name: "VIP Access",
          price: "$59/month",
          features: ["All premium events", "Investor meetups", "One-on-one introductions", "Private networking sessions", "Mentor matching"]
        }
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
          description: 'Drag-and-drop interface to build functional prototypes without any coding knowledge',
          icon: Zap
        },
        {
          title: 'Professional Design Systems',
          description: 'Access to 200+ UI/UX templates and components following modern design principles',
          icon: Star
        },
        {
          title: 'Integrated User Testing',
          description: 'Built-in A/B testing, user feedback collection, and validation tools',
          icon: Users
        },
        {
          title: 'One-Click Deployment',
          description: 'Deploy your MVP to the web instantly with custom domains and SSL certificates',
          icon: Globe
        },
        {
          title: 'Real-time Collaboration',
          description: 'Work with your team in real-time with commenting, version control, and approval workflows',
          icon: MessageCircle
        },
        {
          title: 'Analytics Integration',
          description: 'Built-in analytics to track user behavior, conversion rates, and prototype performance',
          icon: BarChart3
        }
      ],
      stats: [
        { label: 'Prototypes Built', value: '3,200+', growth: '+89%' },
        { label: 'Average Build Time', value: '3 days', growth: '-45%' },
        { label: 'Success Rate', value: '85%', growth: '+23%' },
        { label: 'Funding Raised', value: '$45M+', growth: '+156%' }
      ],
      testimonials: [
        {
          text: "Built and validated our MVP in just 5 days using the rapid prototyping tools. Saved us months of development time and $50k in development costs!",
          author: "Lisa Wang, CEO of HealthTech",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face",
          company: "HealthTech Solutions",
          funding: "$2.5M Seed"
        }
      ],
      pricing: {
        free: {
          name: "Prototype Builder",
          price: "Free",
          features: ["3 prototypes", "Basic templates", "Community support", "Web deployment"]
        },
        pro: {
          name: "MVP Suite",
          price: "$79/month",
          features: ["Unlimited prototypes", "Premium templates", "User testing tools", "Custom domains", "Priority support", "Team collaboration"]
        }
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'features', label: 'Features', icon: CheckCircle },
    { id: 'testimonials', label: 'Success Stories', icon: Heart },
    { id: 'pricing', label: 'Pricing', icon: DollarSign }
  ];

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
          className="bg-background rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-border shadow-2xl"
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
            
            <p className="text-lg opacity-80 leading-relaxed mb-6">
              {feature.description}
            </p>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-12rem)]">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-b border-border">
                  {feature.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-center group hover:scale-105 transition-transform duration-200"
                    >
                      <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                      {stat.growth && (
                        <div className="text-xs text-green-500 font-semibold">↗ {stat.growth}</div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* How It Works */}
                {feature.howItWorks && (
                  <div className="p-8 border-b border-border">
                    <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {feature.howItWorks.map((step, index) => (
                        <motion.div
                          key={step.step}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-center"
                        >
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto`}>
                            {step.step}
                          </div>
                          <h3 className="font-semibold mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

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
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Demo
                      </Button>
                      <Button variant="ghost" size="lg">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feature.features.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-start space-x-4 p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 hover:shadow-lg border border-border/30 hover:border-primary/20"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Success Stories</h2>
                <div className="space-y-6">
                  {feature.testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-muted/30 rounded-xl p-6 border border-border/30 hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-16 h-16 rounded-full border-2 border-primary/20"
                        />
                        <div className="flex-1">
                          <p className="text-lg italic mb-4 leading-relaxed">
                            "{testimonial.text}"
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-primary">{testimonial.author}</div>
                              <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-green-600">{testimonial.funding}</div>
                              <div className="text-xs text-muted-foreground">Funding Raised</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(feature.pricing).map(([key, plan], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                        key === 'pro' 
                          ? `border-primary bg-gradient-to-br ${feature.color} text-white` 
                          : 'border-border bg-muted/30 hover:border-primary/30'
                      }`}
                    >
                      {key === 'pro' && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-semibold">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold mb-1">{plan.price}</div>
                        {plan.price !== 'Free' && plan.price !== 'Custom' && (
                          <div className={`text-sm ${key === 'pro' ? 'text-white/80' : 'text-muted-foreground'}`}>
                            per month
                          </div>
                        )}
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                              key === 'pro' ? 'text-white' : 'text-green-500'
                            }`} />
                            <span className={`text-sm ${
                              key === 'pro' ? 'text-white/90' : 'text-muted-foreground'
                            }`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${
                          key === 'pro' 
                            ? 'bg-white text-primary hover:bg-gray-100' 
                            : `bg-gradient-to-r ${feature.color} text-white`
                        }`}
                        size="lg"
                      >
                        {plan.price === 'Free' ? 'Get Started' : 
                         plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    All plans include 24/7 support and 30-day money-back guarantee
                  </p>
                  <div className="flex justify-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Enterprise Security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>99.9% Uptime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span>SOC 2 Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FeatureDetailModal;