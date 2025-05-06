
// This file is a placeholder for future Supabase integration
// Currently we're using dummy auth with localStorage instead

import { createClient } from '@supabase/supabase-js';

console.log('Using dummy authentication - Supabase integration disabled');

// Create a mock client that won't be used in the app but prevents import errors
const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: () => Promise.resolve({ error: new Error('Using dummy auth') }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
    insert: () => Promise.resolve({ error: null }),
  }),
};

export { supabase };
