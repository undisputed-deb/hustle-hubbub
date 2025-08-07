import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, MessageSquare } from 'lucide-react'
import { Category, getCategories } from '@/lib/supabase'
import { motion } from 'framer-motion'

interface ForumHeaderProps {
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
  onCreatePost: () => void
  isAuthenticated: boolean
}

export const ForumHeader = ({ 
  selectedCategory, 
  onCategorySelect, 
  onCreatePost,
  isAuthenticated 
}: ForumHeaderProps) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    const { data } = await getCategories()
    setCategories(data || [])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Community Forum</h1>
          <p className="text-muted-foreground mt-1">
            Connect, share, and learn with fellow entrepreneurs
          </p>
        </div>
        {isAuthenticated && (
          <Button onClick={onCreatePost} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>1,234 Members</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>5,678 Posts</span>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className={`cursor-pointer transition-all duration-200 ${
                selectedCategory === null 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 hover:bg-secondary'
              }`}
              onClick={() => onCategorySelect(null)}
            >
              All Posts
            </Badge>
          </motion.div>
          
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary/50 hover:bg-secondary'
                }`}
                onClick={() => onCategorySelect(category.id)}
              >
                {category.icon} {category.name} ({category.post_count})
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}