import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LanguageCardProps {
  name: string;
  snippetCount: number;
}

export const LanguageCard = ({ name, snippetCount }: LanguageCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/language/${name.toLowerCase()}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="pixel-card group cursor-pointer hover:translate-y-[-2px] transition-all duration-200"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center bg-pixel-purple/20 rounded-lg">
          <Code className="w-8 h-8 text-pixel-purple group-hover:animate-pixel-spin" />
        </div>
        <div className="text-center">
          <h3 className="font-pixel text-sm mb-2 text-white">{name}</h3>
          <p className="text-pixel-gray text-xs">{snippetCount} snippets</p>
        </div>
      </div>
    </div>
  );
};