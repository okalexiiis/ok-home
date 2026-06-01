import { getNowPlaying } from "@/lib/lastfm";

export const runtime = "edge";

export async function GET() {
  const track = await getNowPlaying();
  return Response.json({ track });
}
