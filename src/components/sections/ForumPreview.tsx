import { motion } from 'framer-motion';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ParallaxElement } from '@/components/ui/parallax-hero';
import { 
  MessageSquare, 
  Heart, 
  TrendingUp, 
  Clock, 
  Users,
  Lightbulb,
  Rocket,
  Target
} from 'lucide-react';

// Mock forum data
const mockPosts = [
  {
    id: 1,
    title: "Looking for a technical co-founder for AI-powered fitness app",
    author: "Sarah Chen",
    avatar: "SC",
    time: "2 hours ago",
    likes: 24,
    comments: 8,
    category: "Co-founder Search",
    trending: true,
    excerpt: "Building a revolutionary AI fitness coach that personalizes workouts based on real-time biometric data..."
  },
  {
    id: 2,
    title: "Feedback on my sustainable fashion marketplace idea",
    author: "Marcus Rodriguez",
    avatar: "MR",
    time: "5 hours ago",
    likes: 18,
    comments: 12,
    category: "Idea Validation",
    trending: false,
    excerpt: "Creating a platform that connects consumers with eco-friendly fashion brands and tracks sustainability impact..."
  },
  {
    id: 3,
    title: "Just raised our Series A! AMA about the process",
    author: "Emma Thompson",
    avatar: "ET",
    time: "1 day ago",
    likes: 89,
    comments: 34,
    category: "Success Story",
    trending: true,
    excerpt: "After 18 months of building our fintech startup, we successfully closed our Series A round..."
  },
  {
    id: 4,
    title: "Weekly Pitch Session - Share your 60-second elevator pitch",
    author: "David Park",
    avatar: "DP",
    time: "3 days ago",
    likes: 45,
    comments: 67,
    category: "Community Event",
    trending: false,
    excerpt: "Practice your pitch and get instant feedback from fellow entrepreneurs and mentors..."
  }
];

const categories = [
  { name: "Co-founder Search", icon: Users, count: 156 },
  { name: "Idea Validation", icon: Lightbulb, count: 234 },
  { name: "Success Stories", icon: Rocket, count: 89 },
  { name: "Community Events", icon: Target, count: 45 }
];

export function ForumPreview() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <ParallaxElement speed={0.1} className="absolute top-0 right-0 opacity-10">
        <div className="w-96 h-96 rounded-full bg-gradient-accent blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageSquare className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">Community</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Join the
            <span className="text-gradient block">Conversation</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with thousands of entrepreneurs sharing ideas, seeking co-founders, 
            and celebrating successes in our vibrant community forum.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="p-4 rounded-xl bg-surface/30 backdrop-blur-sm border border-border/30 text-center hover:bg-surface/50 transition-smooth cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium text-foreground mb-1">{category.name}</div>
              <div className="text-xs text-muted-foreground">{category.count} posts</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Forum Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mockPosts.map((post, index) => (
            <AnimatedCard key={post.id} delay={index * 0.1} className="group cursor-pointer">
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`/avatars/${post.avatar.toLowerCase()}.jpg`} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{post.author}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.time}
                      </div>
                    </div>
                  </div>
                  
                  {post.trending && (
                    <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Category Badge */}
                <Badge variant="secondary" className="mb-3 text-xs">
                  {post.category}
                </Badge>

                {/* Post Title */}
                <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {post.title}
                </h3>

                {/* Post Excerpt */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Post Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-smooth cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{post.likes}</span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-1 text-muted-foreground hover:text-secondary transition-smooth cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs">{post.comments}</span>
                    </motion.div>
                  </div>
                  
                  <motion.div
                    className="text-primary opacity-0 group-hover:opacity-100 transition-smooth text-sm"
                    initial={{ x: -10 }}
                    whileInView={{ x: 0 }}
                  >
                    Read more →
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-secondary hover:shadow-glow transition-smooth px-8 py-4 text-lg font-semibold"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Join the Discussion
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}