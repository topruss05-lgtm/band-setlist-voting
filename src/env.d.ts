/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Extend Astro.locals to include user session
declare namespace App {
  interface Locals {
    user?: import('./types').User;
    session?: {
      access_token: string;
      refresh_token: string;
      user: import('./types').User;
    };
  }
}
