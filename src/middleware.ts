import { defineMiddleware } from "astro:middleware";
import { supabase } from "./lib/supabase";
import type { User } from "./types";

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/dashboard", "/vote", "/suggest", "/setlist"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, locals } = context;
  const pathname = url.pathname;

  // Check if the current route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    const accessToken = cookies.get("sb-access-token");
    const refreshToken = cookies.get("sb-refresh-token");

    // If no tokens, redirect to signin
    if (!accessToken || !refreshToken) {
      return redirect("/signin");
    }

    // Verify session
    try {
      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error || !data.session) {
        // Clear invalid cookies
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
        return redirect("/signin");
      }

      // Store user in locals for use in pages
      locals.user = data.user as User;
      locals.session = data.session;
    } catch (error) {
      // Clear cookies on error
      cookies.delete("sb-access-token", { path: "/" });
      cookies.delete("sb-refresh-token", { path: "/" });
      return redirect("/signin");
    }
  }

  return next();
});
