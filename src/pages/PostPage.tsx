import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { dummyStartups } from '@/data/dummyStartups';
import { 
  Heart, 
  MessageCircle, 
  Eye, 
  ExternalLink, 
  MapPin, 
  DollarSign, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  Edit3,
  Trash2,
  Send,
  ThumbsUp,
  Flag,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  timeAgo: string;
  avatar: string;
  created_at: string;
}

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [upvotes, setUpvotes] = useState(0);

  useEffect(() => {
    if (id) {
      fetchStartup();
      fetchComments();
    }
  }, [id]);

  const fetchStartup = async () => {
    try {
      setLoading(true);
      
      // First try to find in real startups (database)
      const { data: realData, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (realData && !error) {
        setStartup({
          ...realData,
          isReal: true,
          upvotes: realData.upvotes || 0,
          comments_count: realData.comments_count || 0,
          views: realData.views || 0,
        });
        setUpvotes(realData.upvotes || 0);
      } else {
        // Try to find in dummy startups
        const dummyStartup = dummyStartups.find(s => s.id.toString() === id);
        if (dummyStartup) {
          setStartup({ ...dummyStartup, isReal: false });
          setUpvotes(dummyStartup.upvotes);
        } else {
          toast({
            title: "Post not found",
            description: "The requested post could not be found.",
            variant: "destructive"
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error fetching startup:', error);
      toast({
        title: "Error",
        description: "Failed to load post.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = () => {
    // Sample comments for demo
    setComments([
      {
        id: 1,
        author: "Alex Johnson",
        content: "This is exactly what the market needs! The scalability potential is incredible. Have you considered partnerships with major industry players?",
        likes: 12,
        timeAgo: "2 hours ago",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        author: "Sarah Kim",
        content: "Impressive work! I'm particularly interested in the technical implementation. Would love to see more details about the architecture.",
        likes: 8,
        timeAgo: "5 hours ago", 
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face",
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
      }
    ]);
  };

  // Handle unlimited upvoting (required feature)
  const handleLike = async () => {
    if (startup?.isReal) {
      try {
        const newUpvotes = upvotes + 1; // Allow unlimited upvotes
        
        const { error } = await supabase
          .from('posts')
          .update({ upvotes: newUpvotes })
          .eq('id', id);

        if (!error) {
          setUpvotes(newUpvotes);
          setIsLiked(!isLiked);
        }
      } catch (error) {
        console.error('Error updating upvotes:', error);
      }
    } else {
      // For dummy startups, just update locally
      setUpvotes(upvotes + 1); // Allow unlimited upvotes
      setIsLiked(!isLiked);
    }
  };

  const handleDelete = async () => {
    if (!startup?.isReal) {
      toast({
        title: "Cannot delete",
        description: "Demo posts cannot be deleted.",
        variant: "destructive"
      });
      return;
    }

    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('posts')
          .delete()
          .eq('id', id);

        if (!error) {
          toast({
            title: "Post deleted",
            description: "Your post has been successfully deleted.",
          });
          navigate('/');
        } else {
          throw error;
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        toast({
          title: "Error",
          description: "Failed to delete post.",
          variant: "destructive"
        });
      }
    }
  };

  // Handle comment submission (required feature)
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        // For real posts, save to database
        if (startup?.isReal) {
          const { data, error } = await supabase
            .from('comments')
            .insert({
              content: newComment,
              author: 'You',
              post_id: parseInt(id!),
              upvotes: 0
            })
            .select()
            .single();

          if (!error && data) {
            const newCommentObj: Comment = {
              id: data.id,
              author: data.author,
              content: data.content,
              likes: data.upvotes || 0,
              timeAgo: "Just now",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
              created_at: data.created_at
            };
            
            setComments([newCommentObj, ...comments]);
            
            // Update comment count
            await supabase
              .from('posts')
              .update({ comments_count: (startup.comments_count || 0) + 1 })
              .eq('id', id);
              
            setStartup(prev => ({ ...prev, comments_count: (prev.comments_count || 0) + 1 }));
          }
        } else {
          // For dummy posts, just add locally
          const comment: Comment = {
            id: comments.length + 1,
            author: "You",
            content: newComment,
            likes: 0,
            timeAgo: "Just now",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
            created_at: new Date().toISOString()
          };
          setComments([comment, ...comments]);
        }
        
        setNewComment('');
        
      } catch (error) {
        console.error('Error submitting comment:', error);
        toast({
          title: "Error",
          description: "Failed to submit comment.",
          variant: "destructive"
        });
      }
    }
  };

  // Navigate to edit page instead of modal
  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            {startup.isReal && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8"
            >
              {startup.image_url && (
                <div className="h-64 md:h-80 overflow-hidden rounded-2xl mb-6">
                  <img
                    src={startup.image_url}
                    alt={startup.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800`;
                    }}
                  />
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                  {startup.category}
                </span>
                <span className="bg-secondary/10 text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                  {startup.funding_stage}
                </span>
                {startup.isReal && (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    🆕 New
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{startup.title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <span className="font-medium text-foreground">{startup.author}</span>
                {startup.location && (
                  <>
                    <span className="mx-2">•</span>
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{startup.location}</span>
                  </>
                )}
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{new Date(startup.created_at).toLocaleDateString()}</span>
              </div>

              {startup.revenue && startup.revenue !== 'Pre-Revenue' && (
                <div className="flex items-center text-green-600 dark:text-green-400 mb-6 font-semibold">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span className="text-lg">{startup.revenue}</span>
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="prose prose-lg max-w-none mb-8"
            >
              <p className="text-lg leading-relaxed">{startup.content}</p>
            </motion.div>

            {/* Tags */}
            {startup.tags && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {startup.tags.split(', ').map((tag, index) => (
                  <span
                    key={index}
                    className="bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 p-6 bg-muted/30 rounded-2xl mb-8"
            >
              {/* Upvote Button - Required Feature (unlimited clicks) */}
              <button
                onClick={handleLike}
                className="flex items-center gap-2 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : ''}`} />
                <span className="font-medium">{upvotes}</span>
              </button>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-6 h-6" />
                <span>{comments.length}</span>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="w-6 h-6" />
                <span>{startup.views}</span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                {startup.website && (
                  <a
                    href={startup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Comments Sidebar - Required Feature */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
              
              {/* Comment Input - Required Feature */}
              <div className="mb-6">
                <div className="flex space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-3 text-sm border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                      rows={3}
                      maxLength={280}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-muted-foreground">
                        {newComment.length}/280
                      </span>
                      <Button
                        onClick={handleCommentSubmit}
                        size="sm"
                        disabled={!newComment.trim()}
                        className="h-8"
                      >
                        <Send className="w-3 h-3 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List - Required Feature */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3 p-4 bg-muted/30 rounded-xl"
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium">{comment.author}</h4>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="hover:text-foreground transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;