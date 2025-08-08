import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  username: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  post_count: number
  created_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author_id: string
  category_id: string
  likes: number
  comment_count: number
  created_at: string
  updated_at: string
  // Relations
  author?: Profile
  category?: Category
  user_liked?: boolean
}

export interface Comment {
  id: string
  content: string
  post_id: string
  author_id: string
  created_at: string
  // Relations
  author?: Profile
}

// Auth helpers
export const signUp = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Database helpers

export const getCategories = async () => {
  // If you haven’t created a `categories` table yet, return an empty array gracefully
  const { data, error } = await supabase.from('categories').select('*').order('name');
  // return any retrieved categories; ignore error if table doesn’t exist
  return { data: data ?? [], error };
};

export const getPosts = async (category?: string) => {
  // Build a simple query to your posts table and order by latest first.
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  // Optional filter by a category string (your posts table uses a string `category` column)
  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  return { data, error };
};


export const createPost = async (post: {
  title: string
  content: string
  excerpt: string
  category_id: string
}) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('posts')
    .insert({
      ...post,
      author_id: user.id,
    })
    .select(`
      *,
      author:profiles!posts_author_id_fkey(id, username, avatar_url),
      category:categories!posts_category_id_fkey(id, name)
    `)
    .single()

  return { data, error }
}

export const likePost = async (postId: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Check if already liked
  const { data: existingLike } = await supabase
    .from('post_likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    // Unlike
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id)
    return { error, liked: false }
  } else {
    // Like
    const { error } = await supabase
      .from('post_likes')
      .insert({
        post_id: postId,
        user_id: user.id,
      })
    return { error, liked: true }
  }
}