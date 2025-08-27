import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User role types
export type UserRole = 'admin' | 'customer'

// Auth types
export interface AuthUser {
  id: string
  email: string
  user_role?: UserRole
  full_name?: string
  avatar_url?: string
}

// Helper function to get user role from profiles table
export const getUserRole = async (): Promise<UserRole | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  // Fetch user role from profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('user_role')
    .eq('id', user.id)
    .single()
  
  return profile?.user_role as UserRole || null
}

// Check if user has admin role
export const isAdmin = async (): Promise<boolean> => {
  const role = await getUserRole()
  return role === 'admin'
}



// Sign in function for admin/seller
export const signInAdmin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  
  // Check if user has admin role
  const role = await getUserRole()
  if (role !== 'admin') {
    await supabase.auth.signOut()
    throw new Error('Access denied: Admin access required')
  }
  
  return data
}

// Sign out function
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}