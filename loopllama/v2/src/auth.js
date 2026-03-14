// auth.js -- Supabase authentication helpers.

import { supabase } from './supabase.js';

// Sign in with Google via OAuth redirect flow.
export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: _redirectUrl() },
  });
}

// Sign in with GitHub via OAuth redirect flow.
export function signInWithGitHub() {
  return supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: _redirectUrl() },
  });
}

// Sign out the current user.
export function signOut() {
  return supabase.auth.signOut();
}

// Return the current session's user, or null if not signed in.
// Reads from the cached session -- fast, no network round-trip.
export async function getUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ?? null;
}

// Subscribe to auth state changes.
// callback(user) receives the User object when signed in, or null when signed out.
// Returns an unsubscribe function; call it to clean up the listener.
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => callback(session?.user ?? null),
  );
  return () => subscription.unsubscribe();
}

// Build the OAuth redirect URL from the current page location so it works
// correctly in both dev (localhost:5173) and prod.
function _redirectUrl() {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash   = '';
  return url.toString();
}
