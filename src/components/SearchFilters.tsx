import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  query: string;
  category: string;
  author: string;
}

export const categories = [
  'All',
  'Algorithm',
  'Data Structure',
  'Utility',
  'Frontend',
  'Backend',
  'Database',
  'Testing',
  'DevOps',
];

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    author: '',
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Search snippets</Label>
          <Input
            placeholder="Search snippets..."
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Filter by Author</Label>
          <Input
            placeholder="Filter by author..."
            value={filters.author}
            onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
}
