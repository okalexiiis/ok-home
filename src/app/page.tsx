import { Bookmarks } from "@/components/bookmarks";
import { NowPlaying } from "@/components/now-playing";
import { Rooms } from "@/components/rooms";
import { SearchInput } from "@/components/search-input";
import { Footer } from "@/components/shared/footer";
import { Welcome } from "@/components/welcome";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center gap-4 md:w-[60%] pt-16 selection:bg-foreground selection:text-background">
      <div className="w-full">
        <Welcome />
      </div>
      <SearchInput />
      <Bookmarks />
      <NowPlaying />
      <Rooms />
      <Footer color="none" />
    </div>
  );
}
