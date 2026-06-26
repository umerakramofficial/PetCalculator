import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Share2, Printer, Copy, Info, Check, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';
import { CalculatorConfig, CalculatorResult } from '../types/calculator';
import { getFavorites, toggleFavorite, isFavorite, addRecentTool, getUnitSystem, setUnitSystemSetting } from '../utils/localStorage';
import { allCalculators } from '../data/calculators';
import { AdSensePlaceholder } from './AdSensePlaceholder';
import { useTranslation } from '../context/LanguageContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, LineChart, Line } from 'recharts';

interface CalculatorTemplateProps {
  config: CalculatorConfig;
}

export const CalculatorTemplate: React.FC<CalculatorTemplateProps> = ({ config }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(getUnitSystem());
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [chartConfig, setChartConfig] = useState<any>(null);
  const [isFav, setIsFav] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Initialize form with defaults and update when config changes
  useEffect(() => {
    const initialData: Record<string, any> = {};
    config.inputs.forEach((input) => {
      initialData[input.id] = typeof input.defaultValue === 'function' ? input.defaultValue() : input.defaultValue;
    });
    setFormData(initialData);
    setIsFav(isFavorite(config.id));
    addRecentTool(config.id);
  }, [config]);

  // Handle calculation updates whenever inputs or unit system change
  useEffect(() => {
    if (Object.keys(formData).length === 0) return;
    try {
      const calculation = config.calculate(formData, unitSystem);
      setResults(calculation.results);
      if (calculation.chartData) {
        setChartData(calculation.chartData);
      } else {
        setChartData([]);
      }
      if (calculation.chartConfig) {
        setChartConfig(calculation.chartConfig);
      } else {
        setChartConfig(null);
      }
      if (calculation.tips) {
        setTips(calculation.tips);
      } else {
        setTips([]);
      }
    } catch (err) {
      console.error('Calculation error:', err);
    }
  }, [formData, unitSystem, config]);

  const handleInputChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleUnitSystemToggle = () => {
    const newSystem = unitSystem === 'metric' ? 'imperial' : 'metric';
    setUnitSystem(newSystem);
    setUnitSystemSetting(newSystem);

    // Convert weight input value if exists to match new system bounds
    config.inputs.forEach(input => {
      if (input.unitType === 'weight') {
        const currentValue = formData[input.id] || input.defaultValue;
        const convertedValue = newSystem === 'imperial' 
          ? Math.round(currentValue * 2.20462 * 10) / 10
          : Math.round(currentValue / 2.20462 * 10) / 10;
        handleInputChange(input.id, convertedValue);
      }
    });
  };

  const handleFavoriteToggle = () => {
    const status = toggleFavorite(config.id);
    setIsFav(status);
    window.dispatchEvent(new Event('favorites-changed'));
  };

  const handleCopyResults = () => {
    const resultsText = results.map(r => `${r.label}: ${r.value} ${r.unit || ''}`).join('\n');
    const textToCopy = `--- Pet Calculator Results ---\nTool: ${config.name}\n${resultsText}\nCalculate yours at: ${window.location.href}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find related tools
  const relatedTools = allCalculators
    .filter(c => c.id !== config.id && c.category === config.category)
    .slice(0, 3);

  // Render inputs based on active unit system parameters
  const renderInput = (input: any) => {
    let displayMin = input.min;
    let displayMax = input.max;
    let displayStep = input.step;
    let unitLabel = '';

    if (input.unitType === 'weight') {
      unitLabel = unitSystem === 'metric' ? 'kg' : 'lbs';
      // Adjust min/max display bounds for imperial
      if (unitSystem === 'imperial') {
        displayMin = input.min ? Math.round(input.min * 2.2) : undefined;
        displayMax = input.max ? Math.round(input.max * 2.2) : undefined;
        displayStep = 0.5;
      }
    } else if (input.unitType === 'liquid') {
      unitLabel = unitSystem === 'metric' ? 'mL' : 'fl oz';
    } else if (input.unitType === 'age') {
      unitLabel = 'years';
    }

    const value = formData[input.id] ?? '';

    return (
      <div key={input.id} className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor={input.id} className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            {input.label}
          </label>
          {input.tooltip && (
            <div className="relative group">
              <Info className="h-4 w-4 text-slate-400 dark:text-slate-500 cursor-pointer" />
              <div className="absolute right-0 bottom-6 hidden group-hover:block bg-slate-800 text-white text-xs rounded p-2 w-64 shadow-lg z-10">
                {input.tooltip}
              </div>
            </div>
          )}
        </div>

        {input.type === 'slider' ? (
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <input
                id={input.id}
                type="range"
                min={displayMin}
                max={displayMax}
                step={displayStep}
                value={value}
                onChange={(e) => handleInputChange(input.id, Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 min-w-[70px] text-center">
                {value} {unitLabel}
              </span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: {displayMin} {unitLabel}</span>
              <span>Max: {displayMax} {unitLabel}</span>
            </div>
          </div>
        ) : input.type === 'select' ? (
          <select
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            {input.options?.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : input.type === 'checkbox' ? (
          <div className="flex items-center">
            <input
              id={input.id}
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleInputChange(input.id, e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor={input.id} className="ml-2 text-sm text-slate-700 dark:text-slate-300">
              {input.label}
            </label>
          </div>
        ) : input.type === 'date' ? (
          <div className="relative rounded-lg shadow-sm">
            <input
              id={input.id}
              type="date"
              value={value}
              onChange={(e) => handleInputChange(input.id, e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        ) : (
          <div className="relative rounded-lg shadow-sm">
            <input
              id={input.id}
              type="number"
              min={displayMin}
              max={displayMax}
              step={displayStep}
              value={value}
              onChange={(e) => handleInputChange(input.id, Number(e.target.value))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            {unitLabel && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-500 text-xs">{unitLabel}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 print:bg-white print:text-black">
      {/* Header and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 dark:border-slate-800 pb-6 gap-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 uppercase tracking-wider">
            {config.category === 'dog' ? 'Dog Tools' : 'Cat Tools'}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">{config.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">{config.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Favorite */}
          <button
            onClick={handleFavoriteToggle}
            className={`p-2.5 rounded-lg border transition-all ${
              isFav 
                ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950 dark:border-rose-900 dark:text-rose-400' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
            title={isFav ? 'Remove Favorite' : 'Save Favorite'}
            aria-label="Favorite button"
            id="fav-btn"
          >
            <Heart className={`h-5 w-5 ${isFav ? 'fill-rose-500' : ''}`} />
          </button>

          {/* Copy Results */}
          <button
            onClick={handleCopyResults}
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Copy Results"
            aria-label="Copy results"
          >
            {copied ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
          </button>

          {/* Share Link */}
          <button
            onClick={handleShare}
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Copy URL"
            aria-label="Share page"
          >
            {shared ? <Check className="h-5 w-5 text-emerald-500" /> : <Share2 className="h-5 w-5" />}
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-all"
            title="Print Page"
            aria-label="Print results"
          >
            <Printer className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs Panel (Left) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">{t('calc_inputs')}</h2>
            {/* Unit System Toggle */}
            <button
              onClick={handleUnitSystemToggle}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors uppercase"
            >
              {t('btn_units')}: {unitSystem === 'metric' ? t('btn_metric') : t('btn_imperial')}
            </button>
          </div>
          <div className="space-y-5">
            {config.inputs.map(renderInput)}
          </div>
        </div>

        {/* Results Panel (Right) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Results Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-6 shadow-sm flex-grow">
            <h2 className="font-bold text-lg text-indigo-950 dark:text-indigo-300 border-b border-indigo-100/30 dark:border-indigo-900/20 pb-4">
              {t('calc_results')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {results.map((res, index) => (
                <div 
                  key={index} 
                  className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm hover:scale-[1.01] transition-transform ${
                    index === 0 ? 'sm:col-span-2 border-indigo-200 dark:border-indigo-800' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{res.label}</span>
                    {res.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        res.badge === 'success' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                        res.badge === 'warning' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                        res.badge === 'danger' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {res.badge.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {res.value}
                    </span>
                    {res.unit && (
                      <span className="ml-1 text-sm font-semibold text-slate-500">{res.unit}</span>
                    )}
                  </div>
                  {res.description && (
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{res.description}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Custom Tips */}
            {tips.length > 0 && (
              <div className="mt-6 bg-indigo-600/10 dark:bg-indigo-400/5 border border-indigo-500/20 rounded-xl p-4 space-y-2">
                <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-300 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                  {t('calc_tips')}
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-1 leading-relaxed">
                  {tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Visual Recharts Widget */}
          {chartData.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                {t('calc_chart')}
              </h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {chartConfig?.type === 'bar' ? (
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Bar dataKey={chartConfig.dataKeys[0]} fill="#f97316" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  ) : chartConfig?.type === 'area' ? (
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Area type="monotone" dataKey={chartConfig.dataKeys[0]} stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                  ) : (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                      <Line type="monotone" dataKey={chartData[0] && Object.keys(chartData[0])[1]} stroke="#f97316" strokeWidth={3} activeDot={{ r: 6 }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ad Zone 1: After Calculator */}
      <AdSensePlaceholder slot="after-calculator" format="horizontal" />

      {/* Deep Educational Material & SEO Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Guide Content (Left) */}
        <div className="lg:col-span-8 space-y-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
          {/* Detailed Description */}
          <div 
            className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: config.seo.educationalContent }}
          />

          {/* Formula Card */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center mb-2">
              <Info className="h-5 w-5 mr-2 text-indigo-600" />
              {t('calc_formula')}
            </h3>
            <code className="block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded font-mono text-xs text-indigo-600 dark:text-indigo-400 my-3">
              {config.formula.description}
            </code>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {config.formula.explanation}
            </p>
          </div>

          {/* Step-by-Step Example Calculations */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t('calc_examples')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.seo.examples.map((ex, idx) => (
                <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{ex.title}</h4>
                  <ol className="list-decimal list-inside text-xs text-slate-500 space-y-1">
                    {ex.steps.map((st, sidx) => (
                      <li key={sidx}>{st}</li>
                    ))}
                  </ol>
                  <div className="pt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Result: {ex.result}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vet Disclaimer (AdSense & Legal Requirement) */}
          <div className="border border-amber-200 bg-amber-500/5 dark:border-amber-900/30 rounded-xl p-5 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-800 dark:text-amber-500 uppercase tracking-wider">
                {t('calc_disclaimer_title')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {t('calc_disclaimer_desc')}
              </p>
            </div>
          </div>

          {/* References */}
          {config.references.length > 0 && (
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t('calc_sources')}</h4>
              <ul className="text-xs text-indigo-500 space-y-1">
                {config.references.map((ref, idx) => (
                  <li key={idx}>
                    {ref.url ? (
                      <a href={ref.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {ref.title} {ref.author ? `— ${ref.author}` : ''}
                      </a>
                    ) : (
                      <span>{ref.title} {ref.author ? `— ${ref.author}` : ''}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar & FAQs (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Related Tools */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-950 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
              {t('calc_related')}
            </h3>
            <div className="space-y-4 mt-4">
              {relatedTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all flex items-center justify-between group"
                >
                  <div className="truncate max-w-[80%]">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-xs text-slate-400 truncate block mt-0.5">
                      {tool.description}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transform group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Ad Zone 2: Before FAQ */}
          <AdSensePlaceholder slot="before-faq" format="rectangle" />

          {/* FAQ Accordion Section */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-950 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
              {t('calc_faq')}
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {config.seo.faq.map((faq, idx) => (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-lg leading-none ml-2">
                      {activeFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === idx && (
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CalculatorTemplate;
