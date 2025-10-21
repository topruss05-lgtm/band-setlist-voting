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

  const { song_id } = await request.json();

  if (!song_id) {
    return new Response(JSON.stringify({ error: "Song ID ist erforderlich" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Delete song (RLS ensures user can only delete their own songs)
  const { error } = await supabase
    .from("songs")
    .delete()
    .eq("id", song_id)
    .eq("suggested_by", session.data.user.id);

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
