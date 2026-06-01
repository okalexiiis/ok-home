export const runtime = "edge";
import { getNowPlaying } from "@/lib/lastfm";


export async function GET() {
  const track = await getNowPlaying();
  return Response.json({ track });
}
