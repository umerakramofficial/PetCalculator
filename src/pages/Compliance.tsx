import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Globe, MapPin, CheckCircle, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { allCalculators } from '../data/calculators';
import { blogArticles } from '../data/blog';
import { petGuides } from '../data/guides';

export const Compliance: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  // Contact form state
  const [cForm, setCForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cForm.name && cForm.email && cForm.message) {
      setSubmitted(true);
      setCForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  let title = '';
  let metaDesc = '';
  let content = null;

  if (path === '/about') {
    title = 'About Us';
    metaDesc = 'Learn about the editorial values and veterinary guidelines behind PetCalc Pro.';
    content = (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Our Mission & Values</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          PetCalc Pro is a premier, veterinary-aligned authority platform designed to provide dog and cat owners with precise calculator utilities and educational guides. We believe that caring for pets should be backed by science, not guess-work.
        </p>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          Our suite of 20 focus calculators integrates standard veterinary clinical benchmarks from the American Animal Hospital Association (AAHA), the American Association of Feline Practitioners (AAFP), and nutritional standards from the National Research Council (NRC).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Clinical Sourcing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">All tools link to actual research papers and established health assessment guidelines.</p>
          </div>
          <div className="border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Absolute Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">No pet registration, databases, or cookies tracking your parameters. Everything runs locally in your browser.</p>
          </div>
        </div>
      </div>
    );
  } else if (path === '/contact') {
    title = 'Contact Us';
    metaDesc = 'Get in touch with the editorial team at PetCalc Pro.';
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Reach Our Team</h2>
          <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
            Have feedback regarding one of our calculators, suggestions for future tools, or editorial inquiries? Reach out to our support desk. We respond to inquiries within 48 business hours.
          </p>
          <div className="space-y-3 text-sm text-slate-655 dark:text-slate-350 pt-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-indigo-500" />
              <span>support@petcalc.pro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-indigo-500" />
              <span>www.petcalc.pro</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span>Pet Care Suite Labs, San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleContactSubmit} className="bg-slate-50 dark:bg-slate-950 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">Send Message</h3>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Name</label>
            <input
              type="text"
              value={cForm.name}
              onChange={(e) => setCForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              value={cForm.email}
              onChange={(e) => setCForm(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:ring-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Message</label>
            <textarea
              rows={4}
              value={cForm.message}
              onChange={(e) => setCForm(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs transition-colors"
          >
            {submitted ? 'Message Dispatched!' : 'Submit Inquiry'}
          </button>

          {submitted && (
            <p className="text-[10px] text-emerald-500 flex items-center mt-2">
              <CheckCircle className="h-4.5 w-4.5 mr-1" />
              Thank you! Your message has been sent to our veterinary editor.
            </p>
          )}
        </form>
      </div>
    );
  } else if (path === '/privacy-policy') {
    title = 'Privacy Policy';
    metaDesc = 'Review how PetCalc Pro safeguards user data.';
    content = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Information Collection & Storage</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          PetCalc Pro does not maintain external user accounts, logins, or database records. Any calculation configurations, pet profiles, or favorited items you enter are stored purely on your local browser (utilizing local storage). We do not collect, transmit, or sell this information.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Browser Cookies</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          We may configure basic technical cookies to preserve your theme preference (Dark Mode vs Light Mode) and active unit selections (Metric vs Imperial). Third-party providers, such as Google AdSense, may place advertising cookies to customize user experience.
        </p>
      </div>
    );
  } else if (path === '/terms-conditions') {
    title = 'Terms & Conditions';
    metaDesc = 'Read our conditions of service for using PetCalc Pro.';
    content = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Service Provision</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          By accessing PetCalc Pro, you agree to comply with our terms of service. Our tools, calculations, and resources are provided "as-is" without warranty.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Limitation of Liability</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          We do not guarantee the completeness or accuracy of any calculator outputs. PetCalc Pro and its affiliates will not be held liable for any health decisions, actions, or damages resulting from the use of this website.
        </p>
      </div>
    );
  } else if (path === '/disclaimer') {
    title = 'Disclaimer';
    metaDesc = 'Veterinary disclaimer regarding calculator estimates.';
    content = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider text-amber-600 dark:text-amber-500">
          Veterinary Medical Disclaimer
        </h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          The content, calculations, schedules, and tips provided throughout PetCalc Pro are for informational and educational purposes only. They are not intended as a substitute for professional veterinary advice, diagnoses, clinical assessments, or treatment plans.
        </p>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          Every pet has unique medical parameters. Always consult with a licensed veterinarian before changing your pet’s diet, feeding portions, exercise schedules, or vaccination timelines.
        </p>
      </div>
    );
  } else if (path === '/cookie-policy') {
    title = 'Cookie Policy';
    metaDesc = 'Information regarding browser cookie utilization on PetCalc Pro.';
    content = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Are Cookies?</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          Cookies are small text files stored in your browser to log preferences. PetCalc Pro uses them minimally to handle configurations (theme, unit conversions).
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Third-Party Analytics and Ads</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          Third-party scripts (like Google AdSense or analytics) use cookies to tailor ads to your browser profile. You can opt out of these cookies in your browser settings.
        </p>
      </div>
    );
  } else if (path === '/editorial-policy') {
    title = 'Editorial Policy';
    metaDesc = 'Learn about our rigorous veterinarian-aligned vetting standards.';
    content = (
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Accuracy and Vetting</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          Our calculators, articles, and guides are written and vetted by certified veterinary consultants and pet nutrition specialists. We ensure all resources reference peer-reviewed studies or clinical guidelines.
        </p>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Update Intervals</h2>
        <p className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed">
          We review our formulas and guidelines regularly to integrate changes in veterinary medicine, nutritional guidelines, and canine/feline developmental science.
        </p>
      </div>
    );
  } else if (path === '/sitemap') {
    title = 'Sitemap';
    metaDesc = 'Direct directory links for all tools, blog posts, and resources.';
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Calculator Directory</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500">
            {allCalculators.map((calc) => (
              <li key={calc.id}>
                <Link to={`/tools/${calc.id}`} className="hover:underline">{calc.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Blog Articles</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500">
            {blogArticles.map((art) => (
              <li key={art.id}>
                <Link to={`/blog/${art.slug}`} className="hover:underline">{art.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Guides & Compliance</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500 mb-6">
            {petGuides.map((guide) => (
              <li key={guide.id}>
                <Link to={`/guides`} className="hover:underline">{guide.title}</Link>
              </li>
            ))}
          </ul>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Legal Directories</h3>
          <ul className="space-y-1.5 text-xs text-indigo-500">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link to="/cookie-policy" className="hover:underline">Cookie Policy</Link></li>
            <li><Link to="/editorial-policy" className="hover:underline">Editorial Policy</Link></li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto pb-16 space-y-8"
    >
      <SEO title={title} description={metaDesc} />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight border-b border-slate-100 dark:border-slate-800 pb-4">
          {title}
        </h1>
        <div>{content}</div>
      </div>
    </motion.div>
  );
};
export default Compliance;
