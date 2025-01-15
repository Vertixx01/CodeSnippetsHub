import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase, type CodeSnippet } from "@/lib/supabase";
import { SnippetCard } from "@/components/SnippetCard";
import { AddSnippetForm } from "@/components/AddSnippetForm";
import { SearchFilters, type SearchFilters as Filters } from "@/components/SearchFilters";
import { useState } from "react";

const Language = () => {
  const { language } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>({
    query: '',
    category: '',
    author: '',
  });

  const { data: snippets, isLoading } = useQuery({
    queryKey: ['snippets', language, filters],
    queryFn: async () => {
      let query = supabase
        .from('snippets')
        .select('*')
        .eq('language', language);

      if (filters.query) {
        query = query.or(`title.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
      }

      if (filters.category && filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }

      if (filters.author) {
        query = query.ilike('author', `%${filters.author}%`);
      }

      const { data, error } = await query.order('likes', { ascending: false });

      if (error) throw error;
      return data as CodeSnippet[];
    },
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <AddSnippetForm language={language || ''} />
        </div>

        <SearchFilters onFiltersChange={setFilters} />

        <h1 className="font-pixel text-3xl text-white mb-8 mt-4 capitalize">
          {language} Snippets
        </h1>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : snippets?.length === 0 ? (
          <div className="text-center py-8">No snippets found</div>
        ) : (
          <div className="grid gap-6 mt-8">
            {snippets?.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Language;