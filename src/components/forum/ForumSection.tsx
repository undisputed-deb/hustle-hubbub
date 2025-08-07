import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ForumHeader } from './ForumHeader'
import { PostCard } from './PostCard'
import { CreatePostModal } from './CreatePostModal'
import { AuthModal } from '../auth/AuthModal'
import { getPosts, Post, supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

export const ForumSection = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    loadPosts()
  }, [selectedCategory])

  const loadPosts = async () => {
    setLoading(true)
    const { data, error } = await getPosts(selectedCategory || undefined)
    
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load posts',
        variant: 'destructive',
      })
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const handleCreatePost = () => {
    if (!user) {
      setShowAuth(true)
      return
    }
    setShowCreatePost(true)
  }

  const handleAuthSuccess = () => {
    loadPosts()
  }

  const handlePostCreated = () => {
    loadPosts()
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="max-w-6xl mx-auto">
        <ForumHeader
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onCreatePost={handleCreatePost}
          isAuthenticated={!!user}
        />

        {/* Auth prompt for non-authenticated users */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg"
          >
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Join the Community</h3>
              <p className="text-muted-foreground">
                Sign up to create posts, like content, and engage with other entrepreneurs.
              </p>
              <Button onClick={() => setShowAuth(true)}>
                Sign Up / Sign In
              </Button>
            </div>
          </motion.div>
        )}

        {/* Posts */}
        <div className="mt-12">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4 p-6 bg-card/50 rounded-lg border border-border/50">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No posts found. {user ? 'Be the first to create one!' : 'Sign in to start the conversation!'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} onLike={loadPosts} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSuccess={handlePostCreated}
      />

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />
    </section>
  )
}