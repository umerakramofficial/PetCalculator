import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, User, Share2, ArrowRight } from 'lucide-react';
import { blogArticles, getRelatedArticles } from '../data/blog';
import { SEO } from '../components/SEO';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';

export const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = blogArticles.find((art) => art.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Article Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400">
          The requested blog post could not be retrieved. It may have been archived.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Blog Index</span>
        </Link>
      </div>
    );
  }

  const related = getRelatedArticles(article, 3);

  // A simple, safe markdown-to-JSX parser
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    let inList = false;
    let listItems: string[] = [];
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];

    const elements: React.ReactNode[] = [];

    const parseMarkdownInline = (str: string) => {
      let parsed = str;
      // Replace markdown links with clickable links
      parsed = parsed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 dark:text-indigo-400 hover:underline">$1</a>');
      // Replace bold markers with HTML strong tags
      parsed = parsed.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>');
      return parsed;
    };

    const flushList = (key: number) => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300 my-4 text-sm pl-4">
            {listItems.map((li, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: li }} />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const flushTable = (key: number) => {
      if (tableRows.length > 0 || tableHeaders.length > 0) {
        elements.push(
          <div key={`table-wrapper-${key}`} className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-semibold">
                <tr>
                  {tableHeaders.map((th, idx) => (
                    <th key={idx} className="px-4 py-3" dangerouslySetInnerHTML={{ __html: parseMarkdownInline(th) }} />
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {tableRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-2.5" dangerouslySetInnerHTML={{ __html: parseMarkdownInline(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableHeaders = [];
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Handle Table
      if (trimmed.startsWith('|')) {
        flushList(index);
        inTable = true;
        const cells = trimmed.split('|').map(c => c.trim()).filter((_, i, arr) => i > 0 && i < arr.length - 1);
        if (trimmed.includes('---')) {
          // Separator line, ignore
          return;
        }
        if (tableHeaders.length === 0) {
          tableHeaders = cells;
        } else {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable(index);
      }

      // Handle Headings
      if (trimmed.startsWith('## ')) {
        flushList(index);
        const content = trimmed.replace('## ', '');
        elements.push(
          <h2 key={index} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-100 dark:border-slate-800/50 pb-2">
            {content}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList(index);
        const content = trimmed.replace('### ', '');
        elements.push(
          <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">
            {content}
          </h3>
        );
      } 
      // Handle Unordered Lists
      else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        inList = true;
        const content = trimmed.substring(2);
        listItems.push(parseMarkdownInline(content));
      } else if (trimmed.match(/^\d+\.\s/)) {
        flushList(index);
        // Basic ordered list rendering
        const content = trimmed.replace(/^\d+\.\s/, '');
        const parsed = parseMarkdownInline(content);
        elements.push(
          <p key={index} className="pl-4 text-sm text-slate-700 dark:text-slate-300 my-2 leading-relaxed">
            <span className="font-semibold text-indigo-600 mr-1">{trimmed.match(/^\d+/)?.[0]}.</span>
            <span dangerouslySetInnerHTML={{ __html: parsed }} />
          </p>
        );
      }
      // Handle Paragraphs / Content lines
      else if (trimmed !== '') {
        flushList(index);
        const parsed = parseMarkdownInline(trimmed);
        elements.push(
          <p key={index} className="text-slate-655 text-sm dark:text-slate-350 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: parsed }} />
        );
      } else {
        flushList(index);
      }
    });

    // Final flushes
    flushList(lines.length);
    flushTable(lines.length);

    return elements;
  };

  const breadcrumbs = [
    { name: 'Blog', path: '/blog' },
    { name: article.title }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-16 space-y-6"
    >
      <SEO
        title={article.title}
        description={article.excerpt}
        ogType="article"
        ogImage={article.coverImage}
        schemas={[
          {
            type: 'Article',
            data: {
              title: article.title,
              image: article.coverImage,
              authorName: article.author.name,
              publishDate: '2026-06-22',
              excerpt: article.excerpt
            }
          }
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      {/* Back Button */}
      <Link
        to="/blog"
        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-2 transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-0.5" />
        <span>Back to Blog Listing</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {/* Metadata */}
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {article.title}
            </h1>
            
            {/* Author details */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <div className="flex items-center space-x-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-8 w-8 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{article.author.name}</div>
                  <div className="text-[10px] text-slate-400">{article.author.role}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 ml-0 md:ml-4">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="h-64 md:h-[400px] rounded-xl overflow-hidden shadow-sm relative">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ad Slot: After Intro (Google AdSense Compliant Zone) */}
          <AdSensePlaceholder slot="after-article-intro" format="horizontal" />

          {/* Content Body */}
          <div className="article-body">
            {renderMarkdown(article.content)}
          </div>

          {/* Ad Slot: Mid Content */}
          <AdSensePlaceholder slot="mid-article-content" format="horizontal" />
        </div>

        {/* Sidebar & Related Posts (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Related Articles */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-slate-950 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
              Related Articles
            </h3>
            <div className="space-y-4 mt-4">
              {related.map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigate(`/blog/${art.slug}`)}
                  className="w-full text-left cursor-pointer group flex items-start space-x-3"
                >
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="h-16 w-16 rounded-lg object-cover flex-shrink-0 border border-slate-100"
                  />
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                      {art.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {art.publishDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Ad Block */}
          <AdSensePlaceholder slot="sidebar-article" format="rectangle" />
        </div>
      </div>
    </motion.div>
  );
};
export default BlogDetail;
