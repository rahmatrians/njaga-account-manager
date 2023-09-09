
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://spjplcvqohzecqhywmdp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwanBsY3Zxb2h6ZWNxaHl3bWRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjI0MzAzNTYsImV4cCI6MTk3ODAwNjM1Nn0.zNfmAIKD6mh3KbLqd7_iT7yp9yjqZwN-u9U-sdGPkC8');