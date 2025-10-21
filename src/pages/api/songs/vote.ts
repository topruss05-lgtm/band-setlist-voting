import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies }) => {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return new Response(JSON.stringify({ error: "Nicht authentifiziert" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const session = await supabase.auth.setSession({
    refresh_token: refreshToken.value,
    access_token: accessToken.value,
  });

  if (session.error) {
    return new Response(JSON.stringify({ error: "Session ungültig" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { song_id, rating } = await request.json();

  if (!song_id || !rating) {
    return new Response(JSON.stringify({ error: "Song ID und Rating sind erforderlich" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  if (rating < 1 || rating > 5) {
    return new Response(JSON.stringify({ error: "Rating muss zwischen 1 und 5 liegen" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Upsert vote (insert or update if exists)
  const { error } = await supabase
    .from("votes")
    .upsert({
      song_id,
      user_id: session.data.user.id,
      rating,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'song_id,user_id'
    });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
