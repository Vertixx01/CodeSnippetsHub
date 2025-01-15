import { SearchBar } from "@/components/SearchBar";
import { LanguageCard } from "@/components/LanguageCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const languages = [
  { name: "JavaScript", query: "javascript" },
  { name: "Python", query: "python" },
  { name: "Java", query: "java" },
  { name: "C++", query: "c++" },
  { name: "Ruby", query: "ruby" },
  { name: "Go", query: "go" },
  { name: "TypeScript", query: "typescript" },
  { name: "PHP", query: "php" },
];

const Index = () => {
  const [snippetCounts, setSnippetCounts] = useState<number[]>([]);

  const { data: languageCounts, isLoading } = useQuery({
    queryKey: ['languageCounts'],
    queryFn: async () => {
      const counts = await Promise.all(
        languages.map(async ({ query }) => {
          const { count, error } = await supabase
            .from('snippets')
            .select('*', { count: 'exact', head: true })
            .eq('language', query);
            
          if (error) throw error;
          return { language: query, count: count || 0 };
        })
      );
      return Object.fromEntries(counts.map(({ language, count }) => [language, count]));
    },
  });

  useEffect(() => {
    if (languageCounts) {
      const counts = languages.map(({ query }) => languageCounts?.[query] || 0);
      setSnippetCounts(counts);
    }
  }, [languageCounts]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16 animate-float">
        <h1 className="font-pixel text-3xl sm:text-4xl mb-6 text-white">
          CodeSnippets<span className="text-pixel-purple">Hub</span>
        </h1>
        <p className="text-pixel-gray max-w-2xl mx-auto mb-8 font-code">
          Discover and share code snippets across multiple programming
          languages. Built by developers, for developers.
        </p>
        <SearchBar />
      </div>

      {/* Languages Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-pixel text-xl text-white">Popular Languages</h2>
          <Button
            variant="ghost"
            className="text-pixel-purple hover:text-pixel-purple/90 font-pixel text-sm"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.name}
              name={lang.name}
              snippetCount={snippetCounts?.[languages.indexOf(lang)] || 0}
            />
          ))}
        </div>
      </div>

      {/* Call to Action (yet to be implemented) */}
      <div className="text-center mt-16">
        <Button className="pixel-button">
          Start Contributing
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Footer */}
      <footer className="text-pixel-gray text-center mt-12">
        <p>Open Source on GitHub {' '}
          <a
            href="https://github.com/Vertixx01/CodeSnippetsHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-pixel-purple">@Vertixx01/CodeSnippetsHub</span>
          </a>
        </p>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Vertixx01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-pixel-purple"> @Vertixx01</span>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;
