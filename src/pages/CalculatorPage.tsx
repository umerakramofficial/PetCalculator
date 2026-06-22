import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowLeft } from 'lucide-react';
import { getCalculatorById } from '../data/calculators';
import { CalculatorTemplate } from '../components/CalculatorTemplate';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';

export const CalculatorPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const config = toolId ? getCalculatorById(toolId) : undefined;

  if (!config) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Calculator Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The requested calculator does not exist or has been relocated to another category section.
        </p>
        <Link
          to="/tools-directory"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { name: 'Tools Directory', path: '/tools-directory' },
    { name: config.category === 'dog' ? 'Dog Tools' : 'Cat Tools', path: config.category === 'dog' ? '/dog-tools' : '/cat-tools' },
    { name: config.name }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16 space-y-4"
    >
      {/* Dynamic SEO Tags */}
      <SEO
        title={config.seo.metaTitle}
        description={config.seo.metaDescription}
        keywords={config.seo.keywords}
        schemas={[
          { type: 'FAQ', data: config.seo.faq }
        ]}
      />

      {/* Nav Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Back button */}
      <Link
        to={config.category === 'dog' ? '/dog-tools' : '/cat-tools'}
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-2 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-0.5" />
        <span>Back to {config.category === 'dog' ? 'Dog' : 'Cat'} Tools List</span>
      </Link>

      {/* Main Template */}
      <CalculatorTemplate config={config} />
    </motion.div>
  );
};
export default CalculatorPage;
