import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Clock } from 'lucide-react'
import { Post, likePost } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'

interface PostCardProps {
  post: Post
  onLike?: () => void
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
  const [isLiking, setIsLiking] = useState(false)
  const [liked, setLiked] = useState(post.user_liked || false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const { toast } = useToast()

  const handleLike = async () => {
    setIsLiking(true)
    try {
      const { error, liked: newLikedState } = await likePost(post.id)
      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update like',
          variant: 'destructive',
        })
      } else {
        setLiked(newLikedState)
        setLikeCount(prev => newLikedState ? prev + 1 : prev - 1)
        onLike?.()
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Please sign in to like posts',
        variant: 'destructive',
      })
    }
    setIsLiking(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffDays > 0) {
      return `${diffDays}d ago`
    } else if (diffHours > 0) {
      return `${diffHours}h ago`
    } else {
      return 'Just now'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="p-6 space-y-4 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {post.author?.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">
                {post.author?.username || 'Anonymous'}
              </p>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>
          {post.category && (
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {post.category.name}
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 transition-all duration-200 ${
              liked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comment_count || 0}</span>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}