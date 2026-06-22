import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, ArrowRight, User } from 'lucide-react';
import { blogArticles } from '../data/blog';
import { SEO } from '../components/SEO';

export const BlogList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Dog Care', 'Cat Care', 'Dog Health', 'Cat Health', 'Dog Nutrition', 'Cat Nutrition'];

  const filteredArticles = blogArticles.filter((art) => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-16"
    >
      <SEO
        title="Pet Care Blog: Health, Nutrition & Behavior Guides"
        description="Read research-backed articles and veterinarian guidelines on dog and cat aging, wellness, pregnancy, and feeding requirements."
      />

      {/* Hero Header */}
      <div className="text-center py-6 space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Pet Care Knowledge Base</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
          Explore veterinarian-aligned guides, clinical nutrition charts, and wellness tips to give your pets the premium care they deserve.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, keyword, or tag..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
          />
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => navigate(`/blog/${art.slug}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 ease-out"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded shadow uppercase tracking-wide">
                    {art.category}
                  </span>
                </div>
                
                <div className="p-5 space-y-3">
                  <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium">
                    <span>{art.publishDate}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {art.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read Link */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{art.author.name}</span>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
                  <span>Read Article</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <p className="text-slate-400 text-sm">No articles match your current search terms.</p>
        </div>
      )}
    </motion.div>
  );
};
export default BlogList;
