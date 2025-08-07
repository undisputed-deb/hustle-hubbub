import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Eye, ExternalLink, MapPin, DollarSign, Share2, Bookmark, Send, ThumbsUp, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  timeAgo: string;
  avatar: string;
}

interface StartupDetailModalProps {
  startup: any;
  isOpen: boolean;
  onClose: () => void;
  onLike: () => void;
  isLiked: boolean;
}

const StartupDetailModal: React.FC<StartupDetailModalProps> = ({
  startup,
  isOpen,
  onClose,
  onLike,
  isLiked
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alex Johnson",
      content: "This is exactly what the market needs! The scalability potential is incredible. Have you considered partnerships with major water treatment facilities?",
      likes: 12,
      timeAgo: "2 hours ago",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      author: "Sarah Kim",
      content: "Impressive technology! I'm particularly interested in the environmental impact metrics. Would love to see a detailed sustainability report.",
      likes: 8,
      timeAgo: "5 hours ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      author: "Michael Chen",
      content: "Great work on the MVP! The user interface looks clean and intuitive. Any plans for mobile app development?",
      likes: 15,
      timeAgo: "1 day ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    }
  ]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "You",
        content: newComment,
        likes: 0,
        timeAgo: "Just now",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-background rounded-2xl w-full max-w-6xl my-8 overflow-hidden border border-border shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            {startup.image_url && (
              <div className="h-64 overflow-hidden">
                <motion.img
                  src={startup.image_url}
                  alt={startup.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}
            
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="bg-primary px-3 py-1.5 rounded-full text-sm font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {startup.category}
                  </motion.span>
                  <motion.span 
                    className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {startup.funding_stage}
                  </motion.span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button 
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark className="w-4 h-4" />
                  </motion.button>
                  <motion.button 
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <motion.h1 
                className="text-3xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {startup.title}
              </motion.h1>
              <motion.div 
                className="flex items-center text-sm opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="font-medium">{startup.author}</span>
                {startup.location && (
                  <>
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{startup.location}</span>
                  </>
                )}
                {startup.revenue && (
                  <>
                    <span className="mx-2">•</span>
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>{startup.revenue}</span>
                  </>
                )}
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="flex max-h-[80vh]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Tab Navigation */}
              <div className="border-b border-border px-6 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'details', label: 'Details' },
                    { id: 'team', label: 'Team' },
                    { id: 'financials', label: 'Financials' }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ y: 0 }}
                    >
                      {tab.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold mb-3">About</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {startup.content}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                        <ul className="space-y-3 text-muted-foreground">
                          {[
                            'Advanced AI-powered algorithms for maximum efficiency',
                            'Scalable infrastructure supporting millions of users',
                            'Real-time analytics and performance monitoring',
                            'Enterprise-grade security and compliance'
                          ].map((feature, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Market Opportunity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { label: 'Total Market Size', value: '$50B' },
                            { label: 'Annual Growth Rate', value: '23%' },
                            { label: 'Target Customers', value: '2.5M' }
                          ].map((stat, index) => (
                            <motion.div
                              key={index}
                              className="bg-muted/50 rounded-lg p-4"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="text-2xl font-bold text-primary">{stat.value}</div>
                              <div className="text-sm text-muted-foreground">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {startup.tags && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                          <div className="flex flex-wrap gap-2">
                            {startup.tags.split(', ').map((tag, index) => (
                              <motion.span
                                key={index}
                                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Business Model</h3>
                        <p className="text-muted-foreground">
                          Subscription-based SaaS model with tiered pricing for different market segments.
                          Additional revenue streams through premium features and enterprise solutions.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Competitive Advantage</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• First-mover advantage in emerging market segment</li>
                          <li>• Proprietary technology with 3 pending patents</li>
                          <li>• Strong network effects and user retention</li>
                          <li>• Experienced team with domain expertise</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Milestones</h3>
                        <div className="space-y-3">
                          {[
                            { label: 'MVP Development Completed', status: 'completed' },
                            { label: 'First 1000 Users Acquired', status: 'completed' },
                            { label: 'Series A Funding Round', status: 'current' },
                            { label: 'International Expansion', status: 'planned' }
                          ].map((milestone, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className={`w-3 h-3 rounded-full mr-3 ${
                                milestone.status === 'completed' ? 'bg-green-500' :
                                milestone.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                              }`} />
                              <span className={`text-sm ${
                                milestone.status === 'planned' ? 'text-muted-foreground' : ''
                              }`}>
                                {milestone.label}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'team' && (
                    <motion.div
                      key="team"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            name: startup.author,
                            role: 'CEO & Founder',
                            description: 'Former VP at Google, 15+ years in tech. Stanford MBA, MIT Engineering.',
                            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'
                          },
                          {
                            name: 'Jane Smith',
                            role: 'CTO & Co-Founder',
                            description: 'Former Lead Engineer at Tesla, PhD in Computer Science from CMU.',
                            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face'
                          }
                        ].map((member, index) => (
                          <motion.div
                            key={index}
                            className="bg-muted/30 rounded-lg p-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center mb-3">
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-12 h-12 rounded-full mr-3"
                              />
                              <div>
                                <h4 className="font-semibold">{member.name}</h4>
                                <p className="text-sm text-muted-foreground">{member.role}</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {member.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'financials' && (
                    <motion.div
                      key="financials"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Revenue Model</h3>
                          <div className="space-y-2">
                            {[
                              { label: 'Subscription Revenue', value: '85%' },
                              { label: 'Enterprise Deals', value: '12%' },
                              { label: 'Other', value: '3%' }
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex justify-between"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="text-muted-foreground">{item.label}</span>
                                <span className="font-medium">{item.value}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Key Metrics</h3>
                          <div className="space-y-2">
                            {[
                              { label: 'Monthly Recurring Revenue', value: startup.revenue || '$2.3M' },
                              { label: 'Growth Rate (MoM)', value: '+18%', color: 'text-green-600' },
                              { label: 'Customer Acquisition Cost', value: '$85' }
                            ].map((metric, index) => (
                              <motion.div
                                key={index}
                                className="flex justify-between"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <span className="text-muted-foreground">{metric.label}</span>
                                <span className={`font-medium ${metric.color || ''}`}>{metric.value}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Comments Sidebar */}
            <div className="w-80 border-l border-border flex flex-col bg-muted/20">
              {/* Comments Header */}
              <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <motion.h3 
                    className="font-semibold text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Comments
                  </motion.h3>
                  <motion.span 
                    className="text-sm text-muted-foreground bg-primary/10 px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {comments.length}
                  </motion.span>
                </div>

                {/* Engagement Stats */}
                <div className="flex items-center justify-between text-sm">
                  <motion.button
                    onClick={onLike}
                    className="flex items-center space-x-2 hover:text-red-500 transition-all duration-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`w-5 h-5 transition-all ${isLiked ? 'text-red-500 fill-current animate-heartbeat' : ''}`} />
                    <span className="font-medium">{startup.upvotes + (isLiked ? 1 : 0)}</span>
                  </motion.button>
                  <motion.div 
                    className="flex items-center space-x-2 text-muted-foreground"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{startup.comments_count}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 text-muted-foreground"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Eye className="w-5 h-5" />
                    <span>{startup.views}</span>
                  </motion.div>
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="flex space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <motion.textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this startup..."
                      className="w-full p-3 text-sm border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all duration-200"
                      rows={3}
                      maxLength={280}
                      whileFocus={{ scale: 1.02 }}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <span className={`text-xs transition-colors ${
                        newComment.length > 250 ? 'text-red-500' : 'text-muted-foreground'
                      }`}>
                        {newComment.length}/280
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={handleCommentSubmit}
                          size="sm"
                          disabled={!newComment.trim()}
                          className="h-8 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-3 h-3 mr-2" />
                          Post
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto">
                {comments.length > 0 ? (
                  <div className="p-4 space-y-4">
                    {comments.map((comment, index) => (
                      <motion.div 
                        key={comment.id} 
                        className="flex space-x-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <motion.div 
                            className="bg-muted/50 rounded-lg p-3"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium truncate">{comment.author}</h4>
                              <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{comment.timeAgo}</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed break-words">{comment.content}</p>
                          </motion.div>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <motion.button 
                              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{comment.likes}</span>
                            </motion.button>
                            <motion.button 
                              className="hover:text-foreground transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              Reply
                            </motion.button>
                            <motion.button 
                              className="hover:text-red-500 transition-colors"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Flag className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No comments yet</p>
                    <p className="text-sm">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <motion.div 
            className="border-t border-border p-4 flex items-center justify-between bg-background/95 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center space-x-4">
              {startup.website && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" asChild>
                    <a href={startup.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                </motion.div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">
                  Connect
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Invest Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StartupDetailModal;