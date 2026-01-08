/**
 * Socket.io client setup for real-time updates
 * Note: Socket.io requires a separate server in Next.js
 * Consider using Supabase Realtime instead for better integration
 */

// Socket.io is disabled in Next.js - use Supabase Realtime instead
// This is kept for reference but won't work without a separate Socket.io server

export function getSocket() {
  console.warn('Socket.io is not configured. Consider using Supabase Realtime instead.');
  return null;
}

export function connectSocket(token) {
  console.warn('Socket.io is not configured. Consider using Supabase Realtime instead.');
  return null;
}

export function disconnectSocket() {
  // No-op
}

export function joinRoom(room) {
  // No-op
}
