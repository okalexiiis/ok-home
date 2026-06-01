import { create } from "zustand";

export const searchEngines = [
  {
    name: "ddg",
    url: "https://duckduckgo.com/?q=%s",
  },
  {
    name: "utube",
    url: "https://www.youtube.com/results?search_query=%s",
  },
  {
    name: "tify",
    url: "https://open.spotify.com/search/%s",
  },
];

export type SearchEngine = (typeof searchEngines)[number];

interface ISearchEngineStore {
  searchInput: string;
  searchEngine: SearchEngine;
  setSearchEngine: (engine: SearchEngine) => void;
  setSearchInput: (input: string) => void;
  search: (query: string) => void;
}

export const useSearchEngine = create<ISearchEngineStore>((set, get) => ({
  searchInput: "",
  searchEngine: searchEngines[0],

  setSearchEngine: (engine) => set({ searchEngine: engine }),
  setSearchInput: (input) => set({ searchInput: input }),

  search: (query) => {
    const { searchEngine } = get();
    const url = searchEngine.url.replace("%s", encodeURIComponent(query));
    window.open(url, "_blank");
  },
}));
