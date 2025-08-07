import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface StartupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const StartupForm: React.FC<StartupFormProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    image_url: '',
    tags: '',
    funding_stage: '',
    location: '',
    website: '',
    revenue: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'CleanTech', 'EdTech', 'FinTech', 'HealthTech', 'AgriTech', 
    'FoodTech', 'CyberSecurity', 'Logistics', 'AI/ML', 'Blockchain'
  ];

  const fundingStages = [
    'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C', 'IPO'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Check if user is authenticated, if not, create anonymous entry
      const { data: { user } } = await supabase.auth.getUser();
      
      // Prepare data for insertion - only include fields that exist in your table
      const insertData = {
        title: formData.title,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        upvotes: 0,
        comments_count: 0, // Note: using comments_count to match your schema
        views: 0,
        image_url: formData.image_url || null,
        tags: formData.tags || null,
        funding_stage: formData.funding_stage || null,
        location: formData.location || null,
        website: formData.website || null,
        revenue: formData.revenue || null,
        created_at: new Date().toISOString()
      };

      console.log('Submitting data:', insertData);

      const { data, error } = await supabase
        .from('posts')
        .insert([insertData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Success:', data);
      
      // Reset form
      setFormData({
        title: '', content: '', author: '', category: '',
        image_url: '', tags: '', funding_stage: '', location: '', website: '', revenue: ''
      });
      
      onSuccess && onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Form submission error:', error);
      setError(error.message || 'Failed to submit startup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-background rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🚀 Launch Your Startup
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {error && (
          <motion.div 
            className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-lg mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="font-medium">Submission Error</div>
            <div className="text-sm mt-1">{error}</div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Startup Name *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Enter your startup name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Founder Name *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
              placeholder="Describe your startup, what problem it solves, and what makes it unique..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Funding Stage
              </label>
              <select
                name="funding_stage"
                value={formData.funding_stage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">Select stage</option>
                {fundingStages.map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="City, State/Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Revenue/Stage
              </label>
              <input
                type="text"
                name="revenue"
                value={formData.revenue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="e.g., $1M ARR or Pre-Revenue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              placeholder="ai, machine-learning, saas (comma-separated)"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Launching...
                </>
              ) : (
                <>
                  🚀 Launch Startup
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StartupForm;