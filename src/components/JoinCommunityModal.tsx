import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Star, Trophy, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (plan: string) => void;
}

const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({
  isOpen,
  onClose,
  onJoin
}) => {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [step, setStep] = useState(1);

  const plans = [
    {
      id: 'free',
      name: 'Community',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Access to startup directory',
        'Basic networking features',
        'Community forums',
        'Weekly newsletters',
        'Basic startup tools'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$29/month',
      description: 'For serious entrepreneurs',
      features: [
        'Everything in Community',
        'Priority startup listings',
        'Advanced networking tools',
        'Investor connections',
        'Mentorship matching',
        'Exclusive events access',
        'Analytics dashboard'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99/month',
      description: 'For established companies',
      features: [
        'Everything in Professional',
        'Custom branding',
        'API access',
        'Dedicated support',
        'White-label solutions',
        'Advanced analytics',
        'Custom integrations'
      ],
      color: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  const communityStats = [
    { icon: Users, label: 'Active Members', value: '50K+', color: 'text-blue-500' },
    { icon: Star, label: 'Success Stories', value: '2.3K+', color: 'text-yellow-500' },
    { icon: Trophy, label: 'Funded Startups', value: '890+', color: 'text-green-500' },
    { icon: Target, label: 'Avg. Funding', value: '$2.1M', color: 'text-purple-500' }
  ];

  const handleJoin = () => {
    onJoin(selectedPlan);
    setStep(2);
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 2000);
  };

  if (!isOpen) return null;

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
          className="bg-background rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {step === 1 ? (
            <>
              {/* Header */}
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
                    <p className="text-xl opacity-90">
                      Connect with 50,000+ entrepreneurs, investors, and innovators
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border-b border-border">
                {communityStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Plans */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-primary shadow-lg scale-105'
                          : 'border-border hover:border-primary/50'
                      } ${plan.popular ? 'ring-2 ring-primary/20' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} mb-4 flex items-center justify-center`}>
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold mb-2">{plan.price}</div>
                      <p className="text-muted-foreground mb-6">{plan.description}</p>
                      
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border p-6 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Ready to get started?</h3>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of successful entrepreneurs today
                    </p>
                  </div>
                  <Button
                    onClick={handleJoin}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8"
                  >
                    Join Community
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Success Step */
            <div className="p-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-4">Welcome to the Community!</h2>
              <p className="text-muted-foreground mb-6">
                You've successfully joined our startup network. Get ready to connect, learn, and grow!
              </p>
              
              <div className="text-sm text-muted-foreground">
                Redirecting you to your dashboard...
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JoinCommunityModal;