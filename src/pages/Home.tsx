import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, HelpCircle, ArrowRight, Activity, BookOpen, Star, Flame, Lock, ChevronDown, Droplet, Calendar } from 'lucide-react';
import { allCalculators } from '../data/calculators';
import { blogArticles } from '../data/blog';
import { petGuides } from '../data/guides';
import { SEO } from '../components/SEO';
import { useTranslation } from '../context/LanguageContext';
import { dogAge, catAge, petCalorie, petWaterIntake } from '../utils/calculations';
import { getUnitSystem } from '../utils/localStorage';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Quick Calculator State
  const [quickPetType, setQuickPetType] = useState<'dog' | 'cat'>('dog');
  const [quickAge, setQuickAge] = useState<number>(3);
  const [quickWeight, setQuickWeight] = useState<number>(10);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(() => {
    try {
      return getUnitSystem();
    } catch {
      return 'metric';
    }
  });

  // Tab State for calculators preview list
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dog' | 'cat'>('all');

  const handleToggleUnit = () => {
    const newSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(newSystem);
    if (newSystem === 'imperial') {
      setQuickWeight(Math.round(quickWeight * 2.20462));
    } else {
      setQuickWeight(Math.round(quickWeight / 2.20462));
    }
  };

  // Perform quick calculations dynamically
  const getQuickCalculations = () => {
    const parsedAge = Number(quickAge) || 0.1;
    const parsedWeight = Number(quickWeight) || 0.1;
    const safeAge = Math.max(0.1, Math.min(30, parsedAge));
    const safeWeight = Math.max(0.1, Math.min(150, parsedWeight));

    let humanAge = 0;
    let stage = 'Adult';
    if (quickPetType === 'dog') {
      let size: 'small' | 'medium' | 'large' | 'giant' = 'medium';
      const weightKg = unitSystem === 'imperial' ? safeWeight * 0.453592 : safeWeight;
      if (weightKg < 9) size = 'small';
      else if (weightKg <= 23) size = 'medium';
      else if (weightKg <= 41) size = 'large';
      else size = 'giant';
      const ageRes = dogAge({ age: safeAge, size });
      humanAge = Number(ageRes.results[0].value);
      stage = String(ageRes.results[1].value);
    } else {
      const ageRes = catAge({ age: safeAge });
      humanAge = Number(ageRes.results[0].value);
      stage = String(ageRes.results[1].value);
    }

    const calorieRes = petCalorie({ weight: safeWeight, condition: 'normal' }, unitSystem, quickPetType);
    const calories = Math.round(Number(calorieRes.results[0].value));

    const waterRes = petWaterIntake({ weight: safeWeight, diet: 'dry', activity: 'normal' }, unitSystem, quickPetType);
    const waterVal = String(waterRes.results[0].value);

    return { humanAge, stage, calories, waterVal };
  };

  const { humanAge, stage, calories, waterVal } = getQuickCalculations();

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
        schemas={[
          { type: 'Organization', data: {} },
          { type: 'FAQ', data: faqs }
        ]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 md:pt-16">
        {/* Decorative blur backdrop glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-950/20 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-950/20 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"></div>

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
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-300 leading-tight">
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

            {/* Hero Right Column: Interactive Quick Calculator Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="lg:col-span-5 relative w-full"
            >
              {/* Blur backdrop glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 opacity-20 blur-xl"></div>
              
              {/* Calculator Card Container */}
              <div className="relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Quick Vet Calculator
                  </span>
                </div>

                {/* Tab Switcher (Dog vs Cat) */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setQuickPetType('dog')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                      quickPetType === 'dog'
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>🐶</span>
                    <span>Dog</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickPetType('cat')}
                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
                      quickPetType === 'cat'
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <span>🐱</span>
                    <span>Cat</span>
                  </button>
                </div>

                {/* Inputs Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Age (years)</label>
                    <input
                      type="number"
                      value={quickAge}
                      onChange={(e) => setQuickAge(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                      step="0.5"
                      min="0.1"
                      max="30"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                        Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                      </label>
                      <button
                        type="button"
                        onClick={handleToggleUnit}
                        className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Swap Unit
                      </button>
                    </div>
                    <input
                      type="number"
                      value={quickWeight}
                      onChange={(e) => setQuickWeight(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                      step="0.5"
                      min="0.1"
                      max="150"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                    />
                  </div>
                </div>

                {/* Display Results Panel */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {/* Human Age Equivalent */}
                  <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-3 text-center flex flex-col justify-between h-28 shadow-sm">
                    <div className="mx-auto w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Human Age</span>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{humanAge} yrs</span>
                    </div>
                    <span className="text-[9px] bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold px-1 py-0.5 rounded-md block truncate self-center w-full max-w-[80px]">{stage}</span>
                  </div>

                  {/* Calories Needs */}
                  <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl p-3 text-center flex flex-col justify-between h-28 shadow-sm">
                    <div className="mx-auto w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-500">
                      <Flame className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Calories</span>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5">{calories} kcal</span>
                    </div>
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold block">daily target</span>
                  </div>

                  {/* Water Needs */}
                  <div className="bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100/50 dark:border-sky-900/30 rounded-2xl p-3 text-center flex flex-col justify-between h-28 shadow-sm">
                    <div className="mx-auto w-7 h-7 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
                      <Droplet className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Water</span>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-white block mt-0.5 leading-none">{waterVal.split(' ')[0]} <span className="text-[9px] font-semibold text-slate-400">{waterVal.split(' ')[1]}</span></span>
                    </div>
                    <span className="text-[9px] text-sky-600 dark:text-sky-400 font-bold block">drinking bowl</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-3">
                  <span>Calculations utilize clinical metrics</span>
                  <button 
                    onClick={() => navigate(quickPetType === 'dog' ? '/dog-tools' : '/cat-tools')}
                    className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center space-x-0.5"
                  >
                    <span>Full Tools</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
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

      {/* Category Tabs Tool Gallery */}
      <section className="bg-slate-100/50 dark:bg-slate-950/40 py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Explore Our Calculator Suite</h2>
            <p className="text-slate-500 dark:text-slate-400">Access clinical-grade calculations for every aspect of your pet's life.</p>
          </div>

          {/* Pill Tabs Selector */}
          <div className="flex justify-center">
            <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-wider ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>🐾</span>
                <span>All Tools</span>
              </button>
              <button
                onClick={() => setSelectedCategory('dog')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-wider ${
                  selectedCategory === 'dog'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>🐶</span>
                <span>Dog Tools</span>
              </button>
              <button
                onClick={() => setSelectedCategory('cat')}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 uppercase tracking-wider ${
                  selectedCategory === 'cat'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span>🐱</span>
                <span>Cat Tools</span>
              </button>
            </div>
          </div>

          {/* Animated Calculators Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {(selectedCategory === 'all' 
                ? allCalculators.slice(0, 8) 
                : allCalculators.filter(c => c.category === selectedCategory)
              ).map((tool) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={tool.id}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-500/35 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-[160px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        tool.category === 'dog' 
                          ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' 
                          : 'bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400'
                      }`}>
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-405 text-[11px] mt-1.5 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>Try Calculator</span>
                    <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom link to Directory */}
          <div className="text-center pt-4">
            <Link
              to="/tools-directory"
              className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60 px-6 py-3 rounded-xl font-bold hover:bg-indigo-100/50 dark:hover:bg-indigo-950/80 transition-all text-sm shadow-sm"
            >
              <span>View Full Directory ({allCalculators.length} tools)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
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
                className="w-full flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${activeFaq === idx ? 'transform rotate-180 text-indigo-600 dark:text-indigo-400' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
export default Home;
