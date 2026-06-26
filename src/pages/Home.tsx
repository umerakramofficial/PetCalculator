import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, HelpCircle, ArrowRight, Activity, BookOpen, Star, Flame, Lock } from 'lucide-react';
import { allCalculators } from '../data/calculators';
import { blogArticles } from '../data/blog';
import { petGuides } from '../data/guides';
import { SEO } from '../components/SEO';
import { useTranslation } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const dogTools = allCalculators.filter(c => c.category === 'dog').slice(0, 4);
  const catTools = allCalculators.filter(c => c.category === 'cat').slice(0, 4);
  const popularTools = allCalculators.filter(c => c.isPopular).slice(0, 3);
  const recentArticles = blogArticles.slice(0, 3);
  const recentGuides = petGuides.slice(0, 2);

  const benefits = [
    { title: 'Veterinary Aligned', description: 'Calculations utilize standard AAHA, AAFP, and clinical vet formulas.', icon: ShieldCheck },
    { title: '100% Privacy Safeguard', description: 'No logins, registrations, or database storage. All parameters persist locally.', icon: Lock },
    { title: 'Tailored Unit Systems', description: 'Toggle effortlessly between Metric and Imperial calculations.', icon: Activity }
  ];

  const faqs = [
    { question: 'Are these calculators accurate?', answer: 'Our calculators use standard formulas from the American Animal Hospital Association (AAHA), American Association of Feline Practitioners (AAFP), and nutritional metrics from the National Research Council (NRC). However, they are for educational use and do not replace professional vet diagnostics.' },
    { question: 'Why does breed size matter for dog age calculations?', answer: 'Large and giant dog breeds mature faster and have shorter lifespans than small toy breeds. A 6-year-old Great Dane is senior, while a 6-year-old Chihuahua is in their prime.' },
    { question: 'How do you calculate daily pet feeding portion sizes?', answer: 'We first calculate the Resting Energy Requirement (RER) based on metabolic weight, apply an activity/spay multiplier to find Daily Energy Requirement (DER), and divide by the calorie density of your specific food.' },
    { question: 'Is my personal calculation history stored?', answer: 'No data is uploaded to any servers. All your calculations, pet profiles, and favorites are stored purely on your own device using local browser storage.' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-20 pb-16"
    >
      <SEO
        title="Smart Dog & Cat Care Calculator Suite"
        description="Calculate pet age in human years, feeding portions, pregnancy calendars, daily calorie needs, and hydration requirements for dogs and cats."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Niche Focused Veterinary Tools</span>
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {t('home_hero_title')}
              </h1>
              
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                {t('home_hero_subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link
                  to="/dog-tools"
                  className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-lg hover:shadow-indigo-500/25 transition-all text-center flex items-center justify-center space-x-2"
                >
                  <span>{t('nav_dog_tools')}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/cat-tools"
                  className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-slate-800 dark:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-all text-center"
                >
                  {t('nav_cat_tools')}
                </Link>
              </div>
            </div>

            {/* Hero Right Column: Mockup Interactive Dashboard Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              {/* Blur backdrop glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 opacity-20 blur-xl"></div>
              
              {/* Mockup Card */}
              <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Live Portion Calculator
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide">Pet Type & Status</span>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-900 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                        <span>🐶</span>
                        <span>Active Dog</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Target Weight</span>
                      <span className="text-slate-950 dark:text-white">15 kg</span>
                    </div>
                    <div className="h-2 bg-slate-150 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-indigo-600 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Simulated Results Box */}
                <div className="bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] text-indigo-950 dark:text-indigo-400 font-semibold block">Daily Calorie Target</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">1,059 <span className="text-xs font-medium text-slate-500">kcal/day</span></span>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                    <Flame className="h-5 w-5" />
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-4">
                  <span>Standard AAHA Formula</span>
                  <span className="text-emerald-500 font-semibold flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-ping"></span>
                    Operational
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Popular Tools</h2>
          <p className="text-slate-500 dark:text-slate-400">The most widely used calculators by dog and cat owners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(`/tools/${tool.id}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer relative group flex flex-col justify-between"
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
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>Try Calculator</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dog & Cat Tools Preview Splits */}
      <section className="bg-slate-100/50 dark:bg-slate-950/40 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Dog preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Essential Dog Calculators</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track age, feeding profiles, and vaccination milestones for dogs.</p>
              </div>
              <Link to="/dog-tools" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline">
                <span>All Dog Tools</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dogTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:scale-[1.01] hover:border-indigo-500/30 transition-all cursor-pointer group"
                >
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cat preview */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Essential Cat Calculators</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Check feline growth scales, water intake goals, and pregnancy timelines.</p>
              </div>
              <Link to="/cat-tools" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline">
                <span>All Cat Tools</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {catTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:scale-[1.01] hover:border-indigo-500/30 transition-all cursor-pointer group"
                >
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Pet Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Why Use Pet Calculator</h2>
          <p className="text-slate-500 dark:text-slate-400">A professional suite optimized for high-authority pet care calculations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950 rounded-xl w-fit">
                <b.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{b.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* High-Impact Middle Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-750 text-white p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-5 pointer-events-none bg-indigo-300"></div>
          
          <div className="space-y-4 max-w-lg z-10">
            <span className="inline-flex items-center space-x-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Toolkit</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Create a Free Vaccine <br />Roadmap in Seconds
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Input your puppy or kitten’s age to generate custom vaccine lists, core boosters due dates, and clinic milestones.
            </p>
          </div>
          
          <div className="z-10 flex-shrink-0">
            <Link
              to="/tools-directory"
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-indigo-600 font-bold rounded-xl shadow-lg transition-all text-sm flex items-center space-x-2"
            >
              <span>Launch Vaccine Planner</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pet Care Guides (Resource Center) Preview */}
      <section className="bg-indigo-50/50 dark:bg-indigo-950/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Educational Guides</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Step-by-step guidance on vaccines, hydration, and nutritional principles.</p>
            </div>
            <Link to="/guides" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline">
              <span>View All Guides</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentGuides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => navigate(`/guides/${guide.slug}`)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row group"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                  <img
                    src={guide.coverImage}
                    alt={guide.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                      {guide.category === 'dog' ? 'Dog Care' : 'Cat Care'}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 line-clamp-3">
                      {guide.excerpt}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
                    <span>Read Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles (Blog Preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Latest Articles</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Veterinarian-reviewed articles on pet health, behavior, and nutrition.</p>
          </div>
          <Link to="/blog" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline">
            <span>Visit Blog</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => navigate(`/blog/${art.slug}`)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 text-[10px] font-bold text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded uppercase">
                    {art.category}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center text-[10px] text-slate-400 space-x-2">
                    <span>{art.publishDate}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="px-5 pb-5 pt-2 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>Read Full Post</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-slate-500 dark:text-slate-400">Everything you need to know about the Pet Calculator platform.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-4">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>{faq.question}</span>
                <HelpCircle className="h-5 w-5 text-slate-400 flex-shrink-0 ml-4" />
              </button>
              {activeFaq === idx && (
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
export default Home;
