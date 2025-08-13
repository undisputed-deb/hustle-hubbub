import React, { useState, useEffect } from 'react';

interface FloatingImage {
  id: number;
  url: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // Startup-themed images
  const backgroundImages = [
    'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Innovation
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Charts/Analytics
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Rocket/Launch
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Team/Collaboration
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Success/Target
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Technology
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Business/Growth
    'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Ideas/Brainstorming
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Startup workspace
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60', // Digital innovation
  ];

  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowHeight(window.innerHeight);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    handleResize();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Generate floating images based on scroll position
    const generateImages = () => {
      const images: FloatingImage[] = [];
      const totalImages = 15;
      
      for (let i = 0; i < totalImages; i++) {
        images.push({
          id: i,
          url: backgroundImages[i % backgroundImages.length],
          x: Math.random() * 100,
          y: (i * 200) + Math.random() * 300,
          size: 80 + Math.random() * 120,
          duration: 15 + Math.random() * 25,
          delay: Math.random() * 10,
          opacity: 0.15 + Math.random() * 0.25
        });
      }
      
      setFloatingImages(images);
    };

    generateImages();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Images */}
      {floatingImages.map((image) => {
        const parallaxY = scrollY * (0.1 + (image.id % 3) * 0.05);
        const isVisible = scrollY + windowHeight > image.y - 200 && scrollY < image.y + image.size + 200;
        
        return (
          <div
            key={image.id}
            className="absolute transition-all duration-1000 ease-out"
            style={{
              left: `${image.x}%`,
              top: `${image.y - parallaxY}px`,
              width: `${image.size}px`,
              height: `${image.size}px`,
              opacity: isVisible ? image.opacity : 0,
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                rotate(${scrollY * 0.02 + image.delay * 10}deg)
                scale(${isVisible ? 1 : 0.5})
              `,
              animationDelay: `${image.delay}s`,
            }}
          >
            <div
              className="w-full h-full rounded-2xl bg-cover bg-center shadow-2xl animate-floating-elements"
              style={{
                backgroundImage: `url(${image.url})`,
                animationDuration: `${image.duration}s`,
                filter: 'blur(1px) brightness(0.8)',
              }}
            />
            
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `linear-gradient(45deg, 
                  rgba(139, 92, 246, 0.1), 
                  rgba(59, 130, 246, 0.1), 
                  rgba(16, 185, 129, 0.1))`,
                animation: `glowPulse ${image.duration + 5}s ease-in-out infinite`,
                animationDelay: `${image.delay}s`,
              }}
            />
          </div>
        );
      })}

      {/* Floating Geometric Shapes */}
      {Array.from({ length: 8 }, (_, i) => {
        const shapeY = i * 400 + 200;
        const parallaxY = scrollY * (0.05 + (i % 2) * 0.03);
        const isVisible = scrollY + windowHeight > shapeY - 100 && scrollY < shapeY + 300;
        
        return (
          <div
            key={`shape-${i}`}
            className="absolute transition-all duration-1000 ease-out"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${shapeY - parallaxY}px`,
              opacity: isVisible ? 0.1 : 0,
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                rotate(${scrollY * 0.03 + i * 45}deg)
                scale(${isVisible ? 1 : 0.3})
              `,
            }}
          >
            {i % 3 === 0 ? (
              // Circle
              <div
                className="w-32 h-32 rounded-full border-2 border-purple-400 animate-pulse-custom"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            ) : i % 3 === 1 ? (
              // Triangle
              <div
                className="w-0 h-0 border-l-16 border-r-16 border-b-28 border-l-transparent border-r-transparent border-b-blue-400 animate-float"
                style={{ 
                  borderLeftWidth: '32px',
                  borderRightWidth: '32px',
                  borderBottomWidth: '56px',
                  animationDelay: `${i * 0.7}s` 
                }}
              />
            ) : (
              // Square
              <div
                className="w-24 h-24 border-2 border-emerald-400 transform rotate-45 animate-bounce-in"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            )}
          </div>
        );
      })}

      {/* Floating Particles */}
      {Array.from({ length: 20 }, (_, i) => {
        const particleY = i * 200 + Math.random() * 100;
        const parallaxY = scrollY * (0.02 + Math.random() * 0.03);
        const isVisible = scrollY + windowHeight > particleY - 50 && scrollY < particleY + 100;
        
        return (
          <div
            key={`particle-${i}`}
            className="absolute transition-all duration-500 ease-out"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${particleY - parallaxY}px`,
              opacity: isVisible ? 0.4 : 0,
              transform: `
                translateX(-50%) 
                translateY(-50%) 
                scale(${isVisible ? 1 : 0})
              `,
            }}
          >
            <div
              className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-glow"
              style={{ 
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          </div>
        );
      })}

      {/* Gradient Overlays for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
    </div>
  );
};

export default AnimatedBackground;