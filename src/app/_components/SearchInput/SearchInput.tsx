
"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  onSearch: (value: string) => void;
};

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(value: string) {
    setSearchTerm(value);
    onSearch(value);
  }

  return (
    <div className="relative w-full sm:max-w-sm">
      <FaSearch
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for a brand..."
        aria-label="Search for a brand"
        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-11 pr-4 text-sm transition focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
      />
    </div>
  );
};

export default SearchInput;
