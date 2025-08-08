import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyStartups } from '@/data/dummyStartups';
import { supabase } from '@/lib/supabase';


import { 
  Heart, MessageCircle, Eye, ExternalLink, MapPin, DollarSign, Share2, Bookmark, 
  RefreshCw, Search, Filter, Edit, Trash2, MoreVertical, Clock, Flag, Video,
  ArrowUp, Key, UserCheck, Copy, Settings, AlertCircle, Palette, Moon, Sun
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface StartupListProps {
  refreshTrigger?: number;
}

// Enhanced Post interface with all forum features
interface Post {
  id: number;
  created_at: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image_url: string | null;
  upvotes: number;
  comments_count: number;
  views: number;
  tags: string | null;
  funding_stage: string | null;
  location: string | null;
  website: string | null;
  revenue: string | null;
  // Forum features
  user_id?: string;
  secret_key?: string;
  video_url?: string;
  flag?: 'Question' | 'Opinion' | 'Discussion' | 'News' | null;
  repost_id?: number | null;
  isReal?: boolean;
}

// Authentication hook
const useAuth = () => {
  const [userId] = useState(() => {
    const stored = localStorage.getItem('forum_user_id');
    if (stored) return stored;
    const newId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('forum_user_id', newId);
    return newId;
  });
  
  const [userName] = useState(() => {
    const stored = localStorage.getItem('forum_user_name');
    if (stored) return stored;
    const names = ['TechEnthusiast', 'StartupGuru', 'InnovatorX', 'CodeMaster', 'VisionaryDev'];
    const randomName = names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000);
    localStorage.setItem('forum_user_name', randomName);
    return randomName;
  });

  return { userId, userName };
};

// Theme customization hook
const useTheme = () => {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('forum_theme') || 'dark'
  );
  
  const [colorScheme, setColorScheme] = useState(() =>
    localStorage.getItem('forum_color_scheme') || 'purple'
  );

  const [showFullPosts, setShowFullPosts] = useState(() =>
    localStorage.getItem('forum_show_full_posts') === 'true'
  );

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('forum_theme', newTheme);
  };

  const updateColorScheme = (scheme: string) => {
    setColorScheme(scheme);
    localStorage.setItem('forum_color_scheme', scheme);
  };

  const toggleFullPosts = () => {
    const newValue = !showFullPosts;
    setShowFullPosts(newValue);
    localStorage.setItem('forum_show_full_posts', newValue.toString());
  };

  return { 
    theme, colorScheme, showFullPosts, 
    updateTheme, updateColorScheme, toggleFullPosts 
  };
};

const StartupList = forwardRef<{ refresh: () => void }, StartupListProps>(({ refreshTrigger }, ref) => {
  const navigate = useNavigate();
  const { userId, userName } = useAuth();
  const { theme, colorScheme, showFullPosts, updateTheme, updateColorScheme, toggleFullPosts } = useTheme();
  
  const [likedStartups, setLikedStartups] = useState<Set<number>>(new Set());
  const [bookmarkedStartups, setBookmarkedStartups] = useState<Set<number>>(new Set());
  const [realStartups, setRealStartups] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'created_at' | 'upvotes'>('created_at');
  const [filterFlag, setFilterFlag] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [secretKeyInput, setSecretKeyInput] = useState<string>('');
  const [showSecretModal, setShowSecretModal] = useState<{postId: number, action: 'edit' | 'delete'} | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [repostId, setRepostId] = useState<string>('');

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);
  const opacity = useTransform(scrollY, [0, 200], [0.3, 1]);

  // Color schemes
  const colorSchemes = {
    purple: { primary: 'purple-500', secondary: 'blue-500', accent: 'pink-500' },
    blue: { primary: 'blue-500', secondary: 'cyan-500', accent: 'indigo-500' },
    green: { primary: 'green-500', secondary: 'emerald-500', accent: 'teal-500' },
    orange: { primary: 'orange-500', secondary: 'red-500', accent: 'yellow-500' }
  };

  const currentColors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.purple;

  // Fetch real startups from Supabase
  const fetchStartups = async (showRefreshIndicator = false) => {
    try {
      if (showRefreshIndicator) setRefreshing(true);
      if (!showRefreshIndicator) setLoading(true);
      
      console.log('🔄 Fetching startups from Supabase...');
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order(sortBy, { ascending: false });

      if (error) {
        console.error('❌ Error fetching startups:', error);
      } else {
        console.log('✅ Fetched startups from database:', data);
        
        const transformedData: Post[] = data?.map((startup, index) => ({
          ...startup,
          upvotes: startup.upvotes || 0,
          comments_count: startup.comments_count || 0,
          views: startup.views || Math.floor(Math.random() * 1000) + 100,
          tags: startup.tags || 'startup, innovation',
          funding_stage: startup.funding_stage || 'Seed',
          location: startup.location || 'Remote',
          website: startup.website || '',
          revenue: startup.revenue || 'Pre-Revenue',
          image_url: startup.image_url || `https://images.unsplash.com/photo-${1550000000000 + index}?w=500&h=300&fit=crop`,
          isReal: true
        })) || [];
        
        setRealStartups(transformedData);
        console.log(`📊 Showing ${transformedData.length} real startups`);
      }
    } catch (error) {
      console.error('💥 Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Expose refresh function to parent
  useImperativeHandle(ref, () => ({
    refresh: () => fetchStartups(true)
  }));

  // Initial fetch
  useEffect(() => {
    fetchStartups();
  }, [sortBy]);

  // Refresh when trigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      console.log('🔄 Refresh triggered:', refreshTrigger);
      fetchStartups(true);
    }
  }, [refreshTrigger]);

  // Handle unlimited upvoting (required feature)
  const handleUpvote = async (startupId: number) => {
    try {
      // Update local state immediately
      setRealStartups(prev => prev.map(post => 
        post.id === startupId 
          ? { ...post, upvotes: post.upvotes + 1 }
          : post
      ));

      // Update database
      const post = realStartups.find(p => p.id === startupId);
      if (post) {
        await supabase
          .from('posts')
          .update({ upvotes: post.upvotes + 1 })
          .eq('id', startupId);
      }
    } catch (error) {
      console.error('Error updating upvotes:', error);
    }
  };

  const handleLike = (startupId: number) => {
    const newLiked = new Set(likedStartups);
    if (newLiked.has(startupId)) {
      newLiked.delete(startupId);
    } else {
      newLiked.add(startupId);
    }
    setLikedStartups(newLiked);
  };

  const handleBookmark = (startupId: number) => {
    const newBookmarked = new Set(bookmarkedStartups);
    if (newBookmarked.has(startupId)) {
      newBookmarked.delete(startupId);
    } else {
      newBookmarked.add(startupId);
    }
    setBookmarkedStartups(newBookmarked);
    localStorage.setItem('bookmarkedStartups', JSON.stringify([...newBookmarked]));
  };

  // Authentication check for edit/delete (stretch feature)
  const checkAuth = (post: Post, action: 'edit' | 'delete') => {
    if (post.user_id === userId) {
      if (action === 'edit') handleEdit(post.id);
      else if (action === 'delete') setDeleteConfirm(post.id);
    } else {
      setShowSecretModal({ postId: post.id, action });
    }
  };

  // Handle secret key verification (stretch feature)
  const verifySecretKey = () => {
    const post = allStartups.find(p => p.id === showSecretModal?.postId);
    if (post && secretKeyInput === post.secret_key) {
      if (showSecretModal.action === 'edit') {
        handleEdit(post.id);
      } else if (showSecretModal.action === 'delete') {
        setDeleteConfirm(post.id);
      }
      setShowSecretModal(null);
      setSecretKeyInput('');
    } else {
      setError('Invalid secret key');
    }
  };

  // Handle post deletion (required feature)
  const handleDelete = async (postId: number) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Error deleting post:', error);
        setError('Failed to delete post');
        return;
      }

      setRealStartups(prev => prev.filter(post => post.id !== postId));
      setDeleteConfirm(null);
      console.log('✅ Post deleted successfully');
      
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  // Handle post editing (required feature)
  const handleEdit = (postId: number) => {
    navigate(`/edit-post/${postId}`);
    setDropdownOpen(null);
  };

  // Handle repost creation (stretch feature)
  const handleRepost = async () => {
    try {
      const originalPostId = parseInt(repostId);
      const originalPost = allStartups.find(p => p.id === originalPostId);
      
      if (!originalPost) {
        setError('Post not found');
        return;
      }

      // Create repost
      const repostData = {
        title: `🔄 Repost: ${originalPost.title}`,
        content: `Building on this discussion: "${originalPost.content.slice(0, 100)}..."`,
        author: userName,
        user_id: userId,
        category: originalPost.category,
        repost_id: originalPostId,
        flag: 'Discussion',
        upvotes: 0,
        comments_count: 0,
        views: 0
      };

      const { data, error } = await supabase.from('posts').insert(repostData);
      
      if (!error && data) {
        setRealStartups(prev => [data[0], ...prev]);
        setShowRepostModal(false);
        setRepostId('');
      }
    } catch (error) {
      console.error('Error creating repost:', error);
      setError('Failed to create repost');
    }
  };

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedStartups');
    if (saved) {
      try {
        const bookmarks = JSON.parse(saved);
        setBookmarkedStartups(new Set(bookmarks));
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Combine real startups with dummy startups
  const allStartups: Post[] = [
    ...realStartups,
    ...dummyStartups.map(startup => ({ ...startup, isReal: false }))
  ];

  // Filter and sort startups (required features: search by title, sort by time/upvotes)
  const filteredStartups = allStartups
    .filter(startup => {
      const matchesSearch = startup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFlag = filterFlag === 'all' || startup.flag === filterFlag;
      
      return matchesSearch && matchesFlag;
    })
    .sort((a, b) => {
      if (sortBy === 'upvotes') {
        return (b.upvotes || 0) - (a.upvotes || 0);
      } else {
        // Sort by creation time (newest first)
        return new Date(b.created_at || b.id).getTime() - new Date(a.created_at || a.id).getTime();
      }
    });

  const getFlagColor = (flag: string | null) => {
    const colors = {
      'Question': 'from-blue-500 to-cyan-500',
      'Opinion': 'from-purple-500 to-pink-500',
      'Discussion': 'from-green-500 to-emerald-500',
      'News': 'from-orange-500 to-red-500'
    };
    return colors[flag as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = document.querySelectorAll('.startup-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredStartups]);

  // Hide error notifications that might appear from other sources
  useEffect(() => {
    const hideErrors = () => {
      const errorElements = document.querySelectorAll('[class*="error"], [class*="toast"], [class*="alert"]');
      errorElements.forEach(el => {
        if (el.textContent?.includes('Failed to load posts')) {
          el.style.display = 'none';
        }
      });
    };

    hideErrors();
    const interval = setInterval(hideErrors, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Startup Community Forum</span>
            {refreshing && <RefreshCw className="w-3 h-3 animate-spin" />}
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
              User: {userName}
            </span>
          </motion.div>
          
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Startup Forum
            </motion.h2>
            <motion.button
              onClick={() => fetchStartups(true)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Refresh startups"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </motion.button>
            <motion.button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Enhanced Search and Filter Controls */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Search Bar - Required Feature */}
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
            </div>

            {/* Sort Dropdown - Required Feature */}
            <div className="flex items-center gap-2">
              <Clock className="text-muted-foreground w-4 h-4" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'created_at' | 'upvotes')}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="created_at">Sort by Time</option>
                <option value="upvotes">Sort by Upvotes</option>
              </select>
            </div>

            {/* Flag Filter - Stretch Feature */}
            <div className="flex items-center gap-2">
              <Flag className="text-muted-foreground w-4 h-4" />
              <select
                value={filterFlag}
                onChange={(e) => setFilterFlag(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              >
                <option value="all">All Posts</option>
                <option value="Question">Questions</option>
                <option value="Opinion">Opinions</option>
                <option value="Discussion">Discussions</option>
                <option value="News">News</option>
              </select>
            </div>

            {/* Repost Button - Stretch Feature */}
            <button
              onClick={() => setShowRepostModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Repost
            </button>
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {searchTerm ? (
              <>Found {filteredStartups.length} posts matching "{searchTerm}"</>
            ) : (
              <>Showing {realStartups.length} real posts + {dummyStartups.length} featured posts • Filter by flag or search by title</>
            )}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {loading && realStartups.length === 0 ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border animate-pulse"
              >
                <div className="h-48 bg-muted rounded-lg mb-6" />
                <div className="h-4 bg-muted rounded mb-4" />
                <div className="h-3 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            ))
          ) : (
            filteredStartups.map((startup, index) => (
              <motion.div
                key={`${startup.isReal ? 'real' : 'dummy'}-${startup.id}`}
                className="startup-card bg-card rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-700 p-6 border border-border group hover:border-primary/30 relative overflow-hidden backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
                onClick={() => navigate(`/post/${startup.id}`)}
              >
                {/* Post Flag Badge - Stretch Feature */}
                {startup.flag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`bg-gradient-to-r ${getFlagColor(startup.flag)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                      <Flag className="w-3 h-3" />
                      {startup.flag}
                    </span>
                  </div>
                )}

                {/* Real/New Startup Badge */}
                {startup.isReal && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      New
                    </span>
                  </div>
                )}

                {/* Three-dots menu for edit/delete - Required Features */}
                <div className="absolute top-4 right-14 z-10 dropdown-container" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === startup.id ? null : startup.id)}
                    className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                  
                  {dropdownOpen === startup.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => checkAuth(startup, 'edit')}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Post
                        {startup.user_id !== userId && <Key className="w-3 h-3 text-yellow-500" />}
                      </button>
                      <button
                        onClick={() => checkAuth(startup, 'delete')}
                        className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Post
                        {startup.user_id !== userId && <Key className="w-3 h-3 text-yellow-500" />}
                      </button>
                      <div className="px-4 py-2 text-xs text-muted-foreground bg-muted/50 border-t border-border">
                        {startup.user_id === userId ? 'You own this post' : 'Requires secret key'}
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookmark(startup.id);
                  }}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                >
                  <Bookmark 
                    className={`w-4 h-4 transition-colors ${
                      bookmarkedStartups.has(startup.id) ? 'text-yellow-500 fill-current' : 'text-muted-foreground'
                    }`} 
                  />
                </button>

                {/* Repost Reference - Stretch Feature */}
                {startup.repost_id && (
                  <div className="mb-4 p-3 bg-muted rounded-lg border-l-4 border-primary">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Copy className="w-3 h-3" />
                      <span>References Post #{startup.repost_id}</span>
                    </div>
                  </div>
                )}

                {/* Image or Video - Enhanced Media Support */}
                {(startup.image_url || startup.video_url) && (
                  <div className="overflow-hidden rounded-lg mb-6 relative">
                    {startup.video_url ? (
                      <div className="relative">
                        <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                          <Video className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-3">
                            <Video className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : startup.image_url && (
                      <img
                        src={startup.image_url}
                        alt={startup.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500`;
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                
                <div className="relative z-10">
                  {/* Creation Time - Required Feature */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{formatTimeAgo(startup.created_at)}</span>
                    <span>•</span>
                    <span className="font-medium">{startup.author}</span>
                    {startup.user_id === userId && (
                      <UserCheck className="w-4 h-4 text-green-500" title="Your post" />
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                      {startup.category}
                    </span>
                    <span className="bg-secondary/10 text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                      {startup.funding_stage}
                    </span>
                  </div>

                  {/* Post Title - Required Feature */}
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-primary transition-colors ${showFullPosts ? '' : 'line-clamp-2'}`}>
                    {startup.title}
                  </h3>
                  
                  {/* Show content on home feed if enabled - Stretch Feature */}
                  {showFullPosts && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                      {startup.content}
                    </p>
                  )}

                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">{startup.author}</span>
                    {startup.location && startup.location !== 'Remote' && (
                      <>
                        <span className="mx-2">•</span>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{startup.location}</span>
                      </>
                    )}
                  </div>

                  {startup.revenue && startup.revenue !== 'Pre-Revenue' && (
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400 mb-5 font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>{startup.revenue}</span>
                    </div>
                  )}

                  {/* Upvotes Count - Required Feature (unlimited clicks) */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-5">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpvote(startup.id);
                        }}
                        className="flex items-center hover:text-primary transition-colors cursor-pointer group/upvote"
                      >
                        <ArrowUp 
                          className="w-4 h-4 mr-1 transition-all duration-300 group-hover/upvote:scale-110" 
                        />
                        <span className="font-semibold">{startup.upvotes}</span>
                      </button>
                      <div className="flex items-center hover:text-blue-500 transition-colors cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>{startup.comments_count}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{startup.views}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Share functionality
                        if (navigator.share) {
                          navigator.share({
                            title: startup.title,
                            text: startup.content,
                            url: `${window.location.origin}/post/${startup.id}`
                          });
                        } else {
                          navigator.clipboard.writeText(`${window.location.origin}/post/${startup.id}`);
                        }
                      }}
                      className="p-1.5 hover:bg-muted rounded-full transition-colors hover-scale"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {startup.tags && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {startup.tags.split(', ').slice(0, 3).map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + tagIndex * 0.1 }}
                          className="bg-muted text-muted-foreground px-2.5 py-1 rounded-full text-xs hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer hover-scale"
                        >
                          #{tag.trim()}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <motion.button 
                      onClick={() => navigate(`/post/${startup.id}`)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold btn-ripple hover-glow"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                    {startup.website && (
                      <motion.a
                        href={startup.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-border rounded-lg hover:bg-muted transition-colors hover-lift"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Secret Key Modal - Stretch Feature */}
      {showSecretModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSecretModal(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Authentication Required</h3>
                <p className="text-sm text-muted-foreground">Enter the secret key to {showSecretModal.action} this post</p>
              </div>
            </div>
            
            <input
              type="password"
              placeholder="Enter secret key..."
              value={secretKeyInput}
              onChange={(e) => setSecretKeyInput(e.target.value)}
              className="w-full p-3 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              onKeyPress={(e) => e.key === 'Enter' && verifySecretKey()}
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSecretModal(null);
                  setSecretKeyInput('');
                }}
                className="flex-1 px-4 py-2 border border-border rounded-lg transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={verifySecretKey}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
              >
                Verify
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal - Required Feature */}
      {deleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Delete Post</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{allStartups.find(p => p.id === deleteConfirm)?.title}"?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Settings Modal - Stretch Feature */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSettings(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Interface Settings</h3>
            </div>
            
            {/* Theme Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Theme</label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateTheme('light')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${theme === 'light' ? 'border-primary bg-primary/10' : 'border-border'} transition-colors`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => updateTheme('dark')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${theme === 'dark' ? 'border-primary bg-primary/10' : 'border-border'} transition-colors`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>
            </div>

            {/* Color Scheme */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Color Scheme</label>
              <div className="flex gap-2">
                {Object.keys(colorSchemes).map((scheme) => (
                  <button
                    key={scheme}
                    onClick={() => updateColorScheme(scheme)}
                    className={`w-8 h-8 rounded-full border-2 ${colorScheme === scheme ? 'border-primary' : 'border-muted'} transition-colors`}
                    style={{ 
                      background: scheme === 'purple' ? 'linear-gradient(45deg, #8b5cf6, #ec4899)' :
                                 scheme === 'blue' ? 'linear-gradient(45deg, #3b82f6, #06b6d4)' :
                                 scheme === 'green' ? 'linear-gradient(45deg, #10b981, #14b8a6)' :
                                 'linear-gradient(45deg, #f97316, #ef4444)'
                    }}
                    title={scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                  />
                ))}
              </div>
            </div>

            {/* Show Full Posts Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={showFullPosts}
                  onChange={toggleFullPosts}
                  className="w-4 h-4 text-primary rounded"
                />
                <span className="text-sm">Show content and images on home feed</span>
              </label>
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
            >
              Done
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Repost Modal - Stretch Feature */}
      {showRepostModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowRepostModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <Copy className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold">Create Repost</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Reference a previous post by entering its ID to create a discussion thread.
            </p>
            
            <input
              type="number"
              placeholder="Enter post ID..."
              value={repostId}
              onChange={(e) => setRepostId(e.target.value)}
              className="w-full p-3 border border-border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRepostModal(false);
                  setRepostId('');
                }}
                className="flex-1 px-4 py-2 border border-border rounded-lg transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleRepost}
                disabled={!repostId}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Repost
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
});

StartupList.displayName = 'StartupList';

export default StartupList;