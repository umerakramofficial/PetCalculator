import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Mail, Heart } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-slate-800 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white font-bold text-xl tracking-tight">
              <PawPrint className="h-6 w-6 text-indigo-400" />
              <span>Pet <span className="text-indigo-400">Calculator</span></span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm">
              {t('footer_tagline')}
            </p>
            {/* Newsletter */}
            <div className="space-y-2 max-w-sm pt-2">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Join Our Newsletter</h4>
              <p className="text-xs text-slate-500">Get healthy pet tips, vaccination updates, and nutrition checklists.</p>
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  {subscribed ? 'Joined!' : 'Subscribe'}
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-emerald-400 animate-pulse">Thank you! You have successfully subscribed.</p>
              )}
            </div>
          </div>

          {/* Dog Calculators Grid */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{t('footer_dog_tools')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/dog-age" className="hover:text-white transition-colors">Dog Age</Link></li>
              <li><Link to="/tools/dog-pregnancy" className="hover:text-white transition-colors">Pregnancy Tracker</Link></li>
              <li><Link to="/tools/dog-feeding" className="hover:text-white transition-colors">Feeding & Portion</Link></li>
              <li><Link to="/tools/dog-calorie" className="hover:text-white transition-colors">Calorie Calculator</Link></li>
              <li><Link to="/tools/dog-vaccination" className="hover:text-white transition-colors">Vaccine Planner</Link></li>
            </ul>
          </div>

          {/* Cat Calculators Grid */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{t('footer_cat_tools')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/cat-age" className="hover:text-white transition-colors">Cat Age</Link></li>
              <li><Link to="/tools/cat-pregnancy" className="hover:text-white transition-colors">Pregnancy Tracker</Link></li>
              <li><Link to="/tools/cat-feeding" className="hover:text-white transition-colors">Feeding Portions</Link></li>
              <li><Link to="/tools/cat-water" className="hover:text-white transition-colors">Water Intake</Link></li>
              <li><Link to="/tools/cat-vaccination" className="hover:text-white transition-colors">Vaccines Planner</Link></li>
            </ul>
          </div>

          {/* Educational content */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">{t('footer_resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="hover:text-white transition-colors">Pet Care Blog</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Wellness Guides</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Our Experts</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Sub-Links & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between text-xs space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">{t('footer_privacy')}</Link>
            <Link to="/terms-conditions" className="hover:text-white transition-colors">{t('footer_terms')}</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">{t('footer_disclaimer')}</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link to="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</Link>
            <Link to="/contact" className="hover:text-white transition-colors">{t('footer_contact')}</Link>
          </div>
          <div className="flex items-center space-x-1 text-slate-500">
            <span>&copy; {currentYear} Pet Calculator. Created with</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span>for dogs and cats.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
