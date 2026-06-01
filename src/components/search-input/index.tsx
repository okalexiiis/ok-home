"use client";

import { Search } from "lucide-react";
import { motion } from "motion/react";
import {
  type SearchEngine,
  searchEngines,
  useSearchEngine,
} from "@/stores/search.store";

const engineColors: Record<
  string,
  {
    border: string;
    icon: string;
    separator: string;
    active: string;
    inactive: string;
  }
> = {
  ddg: {
    border: "focus-within:border-orange",
    icon: "text-orange",
    separator: "border-orange/40",
    active: "text-orange bg-orange/20",
    inactive: "text-orange/50",
  },
  utube: {
    border: "focus-within:border-red",
    icon: "text-red",
    separator: "border-red/40",
    active: "text-red bg-red/20",
    inactive: "text-red/50",
  },
  tify: {
    border: "focus-within:border-green",
    icon: "text-green",
    separator: "border-green/40",
    active: "text-green bg-green/20",
    inactive: "text-green/50",
  },
};

export function SearchInput() {
  const searchInput = useSearchEngine((state) => state.searchInput);
  const setSearchInput = useSearchEngine((state) => state.setSearchInput);
  const setSearchEngine = useSearchEngine((state) => state.setSearchEngine);
  const search = useSearchEngine((state) => state.search);
  const selectedEngine = useSearchEngine((state) => state.searchEngine);

  const selected = engineColors[selectedEngine.name];

  const isSearchEngineSelected = (engine: SearchEngine) =>
    selectedEngine.name === engine.name;

  return (
    <motion.form
      className={`flex items-stretch border-b-2 border-gray h-14 w-full text-foreground font-sans transition-colors ${selected.border}`}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      onSubmit={(e) => {
        e.preventDefault();
        search(searchInput);
      }}
    >
      {/* INPUT (70%) */}
      <div className="flex items-center gap-2 px-3 h-full w-[70%]">
        <Search className={`w-4 h-4 ${selected.icon}`} />

        <input
          className="no-ring h-full w-full bg-transparent outline-none"
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* SEPARATOR */}
      <div className={`border-l ${selected.separator}`} />

      {/* ENGINES (30%) */}
      <div className="flex h-full w-[30%] font-mono text-sm">
        {searchEngines.map((engine) => {
          const colors = engineColors[engine.name];
          return (
            <button
              key={engine.name}
              type="button"
              onClick={() => setSearchEngine(engine)}
              className={`h-full flex-1 flex items-center justify-center cursor-pointer transition-colors ${
                isSearchEngineSelected(engine) ? colors.active : colors.inactive
              }`}
            >
              {engine.name.toLowerCase()}
            </button>
          );
        })}
      </div>
    </motion.form>
  );
}
