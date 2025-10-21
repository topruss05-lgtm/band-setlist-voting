import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  if (!accessToken || !refreshToken) {
    return new Response("Nicht authentifiziert", { status: 401 });
  }

  const session = await supabase.auth.setSession({
    refresh_token: refreshToken.value,
    access_token: accessToken.value,
  });

  if (session.error) {
    return new Response("Session ungültig", { status: 401 });
  }

  const formData = await request.formData();
  const title = formData.get("title")?.toString();
  const youtube_url = formData.get("youtube_url")?.toString();

  if (!title || !youtube_url) {
    return new Response("Titel und YouTube-URL sind erforderlich", { status: 400 });
  }

  const { error } = await supabase
    .from("songs")
    .insert({
      title,
      youtube_url,
      suggested_by: session.data.user.id,
    });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/vote");
};
