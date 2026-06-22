import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid, List, Star, Clock, ArrowUpDown, ArrowRight, PawPrint } from 'lucide-react';
import { allCalculators } from '../data/calculators';
import { getFavorites, getRecentTools } from '../utils/localStorage';
import { SEO } from '../components/SEO';

interface ToolsDirectoryProps {
  defaultCategory?: 'dog' | 'cat' | 'favorites' | 'recent';
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({ defaultCategory }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'dog' | 'cat' | 'favorites' | 'recent'>('all');
  const [sortBy, setSortBy] = useState<'alpha' | 'popular'>('alpha');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Local storage items
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentToolIds, setRecentToolIds] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
    setRecentToolIds(getRecentTools());
    
    // Set initial filter based on prop or search queries
    const queryFilter = searchParams.get('filter');
    if (defaultCategory) {
      setCategoryFilter(defaultCategory);
    } else if (queryFilter === 'favorites') {
      setCategoryFilter('favorites');
    } else if (queryFilter === 'recent') {
      setCategoryFilter('recent');
    } else {
      setCategoryFilter('all');
    }
  }, [defaultCategory, searchParams]);

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  // Filter and sort the calculators list
  const filteredTools = allCalculators
    .filter((tool) => {
      // 1. Search Query Match
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.seo.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchesSearch) return false;

      // 2. Category / Filter Match
      if (categoryFilter === 'dog') return tool.category === 'dog';
      if (categoryFilter === 'cat') return tool.category === 'cat';
      if (categoryFilter === 'favorites') return favorites.includes(tool.id);
      if (categoryFilter === 'recent') return recentToolIds.includes(tool.id);
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        // Sort featured/popular tools first, then alphabetically
        const aVal = (a.isPopular ? 2 : 0) + (a.isFeatured ? 1 : 0);
        const bVal = (b.isPopular ? 2 : 0) + (b.isFeatured ? 1 : 0);
        return bVal - aVal || a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name); // Default A-Z
    });

  const categories = [
    { label: 'All Tools', value: 'all', icon: PawPrint },
    { label: 'Dog Calculators', value: 'dog', icon: PawPrint },
    { label: 'Cat Calculators', value: 'cat', icon: PawPrint },
    { label: 'Favorites', value: 'favorites', icon: Star },
    { label: 'Recently Used', value: 'recent', icon: Clock }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-16"
    >
      <SEO
        title={`${categoryFilter === 'dog' ? 'Dog' : categoryFilter === 'cat' ? 'Cat' : 'Pet Care'} Calculators Directory`}
        description="Search and filter through our comprehensive veterinary-aligned calculator suite for dogs and cats."
      />

      {/* Directory Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {categoryFilter === 'dog' ? 'Dog Care Calculators' : categoryFilter === 'cat' ? 'Cat Care Calculators' : 'Calculator Directory'}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-2xl">
          Use our interactive filters, search metrics, and favorite flags to quickly locate feeding schedules, calorie recommendations, and health timelines.
        </p>
      </div>

      {/* Search and Filters Control Center */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, formula keyword, breed type..."
            className="w-full pl-11 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategoryFilter(cat.value as any)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                  : 'bg-slate-50 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border border-slate-250 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <cat.icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Sorting & View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs pt-1">
          {/* Sorting */}
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-semibold flex items-center">
              <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
              SORT BY:
            </span>
            <button
              onClick={() => setSortBy('alpha')}
              className={`px-3 py-1.5 rounded-lg border font-semibold ${
                sortBy === 'alpha'
                  ? 'bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              Alphabetical (A-Z)
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-lg border font-semibold ${
                sortBy === 'popular'
                  ? 'bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800'
              }`}
            >
              Popularity
            </button>
          </div>

          {/* Grid vs List Toggles */}
          <div className="flex items-center space-x-1.5 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border ${
                viewMode === 'grid'
                  ? 'bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800'
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg border ${
                viewMode === 'list'
                  ? 'bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800'
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or List Display */}
      {filteredTools.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const isFavoriteTool = favorites.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] hover:border-indigo-500/35 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        tool.category === 'dog' 
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' 
                          : 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400'
                      }`}>
                        {tool.category}
                      </span>
                      {isFavoriteTool && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="pt-6 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    <span>Open Calculator</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View Layout */
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {filteredTools.map((tool) => {
              const isFavoriteTool = favorites.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-4 min-w-[70%]">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${
                      tool.category === 'dog' 
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' 
                        : 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400'
                    }`}>
                      {tool.category}
                    </span>
                    <div className="truncate">
                      <span className="font-bold text-sm text-slate-900 dark:text-white block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 truncate block mt-0.5">
                        {tool.description}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {isFavoriteTool && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                    <ArrowRight className="h-4 w-4 text-slate-350 dark:text-slate-600 group-hover:translate-x-1 transition-all group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        /* Empty State */
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
          <p className="text-slate-400 text-sm">No calculators match your current query or category filters.</p>
          <button
            onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
            className="text-xs font-semibold px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </motion.div>
  );
};
export default ToolsDirectory;
