import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Check, FileText, ChevronRight } from 'lucide-react';
import { petGuides } from '../data/guides';
import { SEO } from '../components/SEO';

export const Guides: React.FC = () => {
  const [activeGuideId, setActiveGuideId] = useState(petGuides[0].id);
  const activeGuide = petGuides.find((g) => g.id === activeGuideId) || petGuides[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8 pb-16"
    >
      <SEO
        title="Pet Care Educational Guides: Expert Handbooks"
        description="Browse our library of veterinary-reviewed resource guides covering puppy vaccine schedules, feline nutrition, and weight reduction metrics."
      />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Resource Center Guides</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-2xl">
          Deep, veterinarian-vetted guides to help you manage your dogs and cats. Select an active handbook below to read full sections.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Guides Sidebar list (Left) */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Available Handbooks</h3>
          <div className="space-y-3">
            {petGuides.map((guide) => {
              const isActive = guide.id === activeGuideId;
              return (
                <button
                  key={guide.id}
                  onClick={() => setActiveGuideId(guide.id)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm flex items-start justify-between group transition-all ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/10'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="space-y-1 truncate max-w-[85%]">
                    <span className={`text-[9px] font-extrabold uppercase tracking-wide block ${
                      isActive ? 'text-indigo-200' : 'text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {guide.category === 'dog' ? 'Dog Care' : 'Cat Care'}
                    </span>
                    <span className="font-bold block truncate leading-snug">{guide.title}</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 mt-1.5 flex-shrink-0 transition-transform ${
                    isActive ? 'text-white translate-x-0.5' : 'text-slate-400 group-hover:translate-x-0.5'
                  }`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Guide Viewer (Right) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-5 space-y-2">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {activeGuide.category === 'dog' ? 'Dog Guide' : 'Cat Guide'}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {activeGuide.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm italic">
              {activeGuide.excerpt}
            </p>
          </div>

          <div className="space-y-8">
            {activeGuide.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center">
                  <FileText className="h-4.5 w-4.5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  {section.title}
                </h3>
                <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed pl-6.5 border-l-2 border-slate-100 dark:border-slate-800/80">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Quick confirmation check */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800/50 flex items-center text-xs text-slate-400 space-x-1.5">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>Veterinarian Reviewed Guidelines</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Guides;
