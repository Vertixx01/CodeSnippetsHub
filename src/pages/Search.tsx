import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase, type CodeSnippet } from "@/lib/supabase";
import { SearchBar } from "@/components/SearchBar";
import { SnippetCard } from "@/components/SnippetCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: snippets, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .textSearch('title', query)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as CodeSnippet[];
    },
    enabled: !!query,
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <SearchBar />
        </div>

        <h2 className="font-pixel text-xl text-white mb-8">
          Search Results for "{query}"
        </h2>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-pixel-gray animate-pulse">Searching snippets...</p>
          </div>
        ) : snippets?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-pixel-gray font-code">
              No snippets found for "{query}"
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {snippets?.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;