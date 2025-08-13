import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Users, TrendingUp, Lightbulb, Target, Zap } from 'lucide-react';

interface HeroSectionProps {
  onLaunchClick: () => void;
  onJoinClick: () => void;
}

const heroSlides = [
  {
    id: 1,
    title: "Launch Your Startup Dream",
    subtitle: "Turn Your Ideas Into Reality",
    description: "Join thousands of entrepreneurs building the next big thing. Share your startup, get feedback, and connect with like-minded founders.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    icon: <Rocket className="w-8 h-8" />,
    gradient: "from-purple-600 via-blue-600 to-cyan-600"
  },
  {
    id: 2,
    title: "Build Your Network",
    subtitle: "Connect With Fellow Entrepreneurs",
    description: "Discover innovative startups, collaborate with founders, and build meaningful connections in the startup ecosystem.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-green-600 via-emerald-600 to-teal-600"
  },
  {
    id: 3,
    title: "Scale Your Business",
    subtitle: "From Idea to IPO",
    description: "Get insights, funding opportunities, and mentorship to take your startup from concept to market leader.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: "from-orange-600 via-red-600 to-pink-600"
  },
  {
    id: 4,
    title: "Innovate Together",
    subtitle: "Where Ideas Come to Life",
    description: "Share your breakthrough moments, get expert feedback, and turn innovative concepts into successful ventures.",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    icon: <Lightbulb className="w-8 h-8" />,
    gradient: "from-indigo-600 via-purple-600 to-blue-600"
  },
  {
    id: 5,
    title: "Achieve Your Goals",
    subtitle: "Success Stories Start Here",
    description: "Join successful entrepreneurs who started their journey here. Your startup success story begins today.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    icon: <Target className="w-8 h-8" />,
    gradient: "from-yellow-600 via-orange-600 to-red-600"
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onLaunchClick, onJoinClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentHero = heroSlides[currentSlide];

  const handleLaunchClick = () => {
    // Smooth scroll to form section or open form
    onLaunchClick();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
            isAnimating ? 'scale-110 opacity-75' : 'scale-100 opacity-100'
          }`}
          style={{
            backgroundImage: `url(${currentHero.image})`,
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${currentHero.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse-custom" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-bounce-in" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'}`}>
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 animate-glow">
              {currentHero.icon}
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 animate-fade-in-up">
            <span className="block leading-tight">
              {currentHero.title.split(' ').map((word, index) => (
                <span 
                  key={index}
                  className="inline-block animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-6 animate-fade-in-up">
            {currentHero.subtitle}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
            {currentHero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up">
            <Button
              onClick={handleLaunchClick}
              size="lg"
              className="group relative px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-glow"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Launch Your Startup
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={onJoinClick}
              variant="outline"
              size="lg"
              className="px-8 py-4 border-2 border-white/50 text-white hover:bg-white/10 text-lg font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Join Community
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-white/70">Startups Launched</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$50M+</div>
              <div className="text-white/70">Funding Raised</div>
            </div>
            <div className="text-center animate-fade-in-up">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15K+</div>
              <div className="text-white/70">Active Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentSlide(index);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};