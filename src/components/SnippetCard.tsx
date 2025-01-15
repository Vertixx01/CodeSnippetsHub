import { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeSnippet } from '@/lib/supabase';
import { Copy, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface SnippetCardProps {
  snippet: CodeSnippet;
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const [likes, setLikes] = useState(snippet.likes);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code.replace(/\\n/g, '\n'));
    toast({
      title: "Copied to clipboard!",
      description: "The code snippet has been copied to your clipboard.",
    });
  };

  const handleLike = async () => {
    const { error } = await supabase
      .from('snippets')
      .update({ likes: likes + 1 })
      .eq('id', snippet.id);
    if (error) throw error;
    setLikes(likes + 1);
    toast({
      title: "Liked!",
      description: "You liked this snippet.",
    });
  };
  return (
    <div className="pixel-card space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-pixel text-lg text-white mb-2">{snippet.title}</h3>
          <p className="text-pixel-gray text-sm mb-4">{snippet.description}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="p-2 hover:bg-pixel-purple/20 rounded-lg">
            <Copy className="w-5 h-5 text-pixel-purple" />
          </button>
          <button 
            onClick={handleLike}
            className="p-2 hover:bg-pixel-purple/20 rounded-lg flex items-center gap-1"
          >
            <Heart className="w-5 h-5 text-pixel-purple" />
            <span className="text-sm text-pixel-gray">{likes}</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <SyntaxHighlighter
          language={snippet.language.toLowerCase()}
          style={atomOneDark}
          customStyle={{
            padding: '1rem',
            borderRadius: '0.5rem',
            margin: 0,
          }}
        >
          {snippet.code.replace(/\\n/g, '\n')}
        </SyntaxHighlighter>
      </div>

      <div className="flex justify-between text-pixel-gray">
        <span>Author: {snippet.author}</span>
        <span>Category: {snippet.category[0]?.toUpperCase() + snippet.category.slice(1)}</span>
        <span>Date Created: {new Date(snippet.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};