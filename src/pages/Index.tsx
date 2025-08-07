import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ForumSection } from '@/components/forum/ForumSection';
import { CTASection } from '@/components/sections/CTASection';
import StartupForm from '@/components/StartupForm';
import StartupList from '@/components/StartupList';
import JoinCommunityModal from '@/components/JoinCommunityModal';
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
      title: "🚀 Startup Launched!",
      description: "Your startup has been successfully added to the network.",
    });
    
    // Trigger refresh using both methods
    setRefreshTrigger(prev => prev + 1);
    
    // Direct refresh call
    setTimeout(() => {
      if (startupListRef.current?.refresh) {
        startupListRef.current.refresh();
      }
    }, 500);
  };

  const handleJoinCommunity = (plan: string) => {
    toast({
      title: "🎉 Welcome to the Community!",
      description: `You've successfully joined our ${plan} plan. Check your email for next steps.`,
    });
  };

  const handleLaunchClick = () => {
    setIsFormOpen(true);
  };

  const handleJoinClick = () => {
    setIsJoinModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div id="home" className="scroll-reveal">
        <HeroSection 
          onLaunchClick={handleLaunchClick} 
          onJoinClick={handleJoinClick}
        />
      </div>
      <div id="features" className="scroll-reveal">
        <FeaturesSection />
      </div>
      <div id="startups" className="scroll-reveal">
        <StartupList ref={startupListRef} refreshTrigger={refreshTrigger} />
      </div>
      <div id="forum" className="scroll-reveal">
        <ForumSection />
      </div>
      <div id="launch" className="scroll-reveal">
        <CTASection 
          onLaunchClick={handleLaunchClick}
          onJoinClick={handleJoinClick}
        />
      </div>
      
      <StartupForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleFormSuccess}
      />
      
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinCommunity}
      />
    </div>
  );
};

export default Index;