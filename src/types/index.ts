// Database types
export interface Song {
  id: string;
  title: string;
  youtube_url: string;
  suggested_by: string;
  created_at: string;
}

export interface Vote {
  id: string;
  song_id: string;
  user_id: string;
  rating: number;
  created_at: string;
}

export interface SongRanking {
  id: string;
  title: string;
  youtube_url: string;
  avg_rating: number;
  vote_count: number;
}

// Supabase User type
export interface User {
  id: string;
  email?: string;
  created_at?: string;
}

// Session data
export interface SessionData {
  user: User;
  access_token: string;
  refresh_token: string;
}
