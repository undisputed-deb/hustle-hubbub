import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ForumSection } from '@/components/forum/ForumSection';
import { CTASection } from '@/components/sections/CTASection';
import StartupForm from '@/components/StartupForm';
import StartupList from '@/components/StartupList';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import AnimatedBackground from '@/components/AnimatedBackground';
import { useToast } from '@/hooks/use-toast';
import '../styles/animations.css';

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const startupListRef = useRef<{ refresh: () => void }>(null);
  const { toast } = useToast();

  // Scroll reveal animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleFormSuccess = () => {
    toast({
      title: "🚀 Startup Launched Successfully!",
      description: "Your startup has been added to Hustle Hubbub. Welcome to the community!",
    });
    
    // Trigger refresh using both methods
    setRefreshTrigger(prev => prev + 1);
    
    // Direct refresh call with delay for better UX
    setTimeout(() => {
      if (startupListRef.current?.refresh) {
        startupListRef.current.refresh();
      }
    }, 500);
  };

  const handleJoinCommunity = (plan: string) => {
    toast({
      title: "🎉 Welcome to Hustle Hubbub!",
      description: `You've successfully joined our ${plan} plan. Check your email for next steps.`,
    });
  };

  const handleLaunchClick = () => {
    setIsFormOpen(true);
  };

  const handleJoinClick = () => {
    setIsJoinModalOpen(true);
  };

  // Smooth scroll to startup section when form opens
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background - appears throughout the page as you scroll */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <div className="relative z-40">
        <Navbar />
      </div>
      
      {/* Hero Section with Dynamic Background */}
      <div id="home" className="scroll-reveal relative z-30">
        <HeroSection 
          onLaunchClick={handleLaunchClick} 
          onJoinClick={handleJoinClick}
        />
      </div>
      
      {/* Features Section */}
      <div id="features" className="scroll-reveal relative z-30 bg-background/90 backdrop-blur-sm">
        <FeaturesSection />
      </div>
      
      {/* Startups Showcase */}
      <div id="startups" className="scroll-reveal relative z-30 bg-background/95 backdrop-blur-sm">
        <StartupList ref={startupListRef} refreshTrigger={refreshTrigger} />
      </div>
      
      {/* Community Forum */}
      <div id="forum" className="scroll-reveal relative z-30 bg-background/90 backdrop-blur-sm">
        <ForumSection />
      </div>
      
      {/* Call to Action */}
      <div id="launch" className="scroll-reveal relative z-30 bg-background/95 backdrop-blur-sm">
        <CTASection 
          onLaunchClick={handleLaunchClick}
          onJoinClick={handleJoinClick}
        />
      </div>
      
      {/* Startup Submission Form Modal */}
      <div className="relative z-50">
        <StartupForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
        />
      </div>
      
      {/* Join Community Modal */}
      <div className="relative z-50">
        <JoinCommunityModal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          onJoin={handleJoinCommunity}
        />
      </div>
    </div>
  );
};

export default Index;