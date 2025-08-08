import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ArrowLeft, Save, X, Upload, Link as LinkIcon, 
  Flag, MapPin, DollarSign, Tag, Image as ImageIcon,
  AlertCircle, CheckCircle, Loader
} from 'lucide-react';

interface PostFormData {
  title: string;
  content: string;
  category: string;
  image_url: string;
  tags: string;
  funding_stage: string;
  location: string;
  website: string;
  revenue: string;
}

const EditPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: '',
    image_url: '',
    tags: '',
    funding_stage: '',
    location: '',
    website: '',
    revenue: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Categories and options
  const categories = [
    'Logistics', 'EdTech', 'FinTech', 'HealthTech', 'CleanTech', 
    'SaaS', 'E-commerce', 'AI/ML', 'Blockchain', 'IoT', 'Other'
  ];
  
  const fundingStages = [
    'Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'IPO', 'Acquired'
  ];

  // Load existing post data
  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', parseInt(id!));

      if (error) {
        setError('Failed to load post');
        return;
      }

      if (!data || data.length === 0) {
        setError('Post not found');
        return;
      }

      const post = data[0];
      
      // Load post data directly into form
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category: post.category || '',
        image_url: post.image_url || '',
        tags: post.tags || '',
        funding_stage: post.funding_stage || '',
        location: post.location || '',
        website: post.website || '',
        revenue: post.revenue || ''
      });
      
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: keyof PostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const updateData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category || 'Other',
        image_url: formData.image_url.trim() || null,
        tags: formData.tags.trim() || null,
        funding_stage: formData.funding_stage || null,
        location: formData.location.trim() || null,
        website: formData.website.trim() || null,
        revenue: formData.revenue.trim() || null
      };

      const { error } = await supabase
        .from('posts')
        .update(updateData)
        .eq('id', parseInt(id!));

      if (error) {
        throw error;
      }

      setSuccess(true);
      
      // Redirect to post page after successful update
      setTimeout(() => {
        navigate(`/post/${id}`);
      }, 1500);

    } catch (err) {
      console.error('Error updating post:', err);
      console.error('Full error details:', JSON.stringify(err, null, 2));
      setError(`Failed to update post: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <Loader className="w-8 h-8 animate-spin" />
          <span className="text-xl">Loading post...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error && loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/post/${id}`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Post
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                Editing: {formData.title.slice(0, 30)}...
              </span>
              {success && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Saved!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
            <p className="text-gray-400">Update your post information</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Post updated successfully! Redirecting...</span>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter your post title..."
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              maxLength={200}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {formData.title.length}/200
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Share your story, insights, or updates..."
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 resize-none"
              rows={8}
              maxLength={2000}
            />
            <div className="text-right text-xs text-gray-400 mt-1">
              {formData.content.length}/2000
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <ImageIcon className="w-4 h-4" />
              Image URL
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>

          {/* Business Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Funding Stage</label>
              <select
                value={formData.funding_stage}
                onChange={(e) => handleInputChange('funding_stage', e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              >
                <option value="">Select stage</option>
                {fundingStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <DollarSign className="w-4 h-4" />
                Revenue
              </label>
              <input
                type="text"
                value={formData.revenue}
                onChange={(e) => handleInputChange('revenue', e.target.value)}
                placeholder="$1M ARR"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Website and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <LinkIcon className="w-4 h-4" />
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yoursite.com"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Tag className="w-4 h-4" />
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="startup, innovation, AI"
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              disabled={saving || success}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              {saving ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : success ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Post
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/post/${id}`)}
              className="px-6 py-4 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default EditPostPage;