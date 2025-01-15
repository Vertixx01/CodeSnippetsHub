import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search snippets..."
        className="w-full px-4 py-3 pl-12 bg-background/50 pixel-border
                 font-code text-sm focus:outline-none focus:ring-2 focus:ring-pixel-purple/50
                 placeholder:text-pixel-gray/70"
      />
      <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2">
        <Search className="text-pixel-purple w-4 h-4" />
      </button>
    </form>
  );
};