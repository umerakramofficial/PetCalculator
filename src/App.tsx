import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load page components to split bundles and optimize performance
const Home = lazy(() => import('./pages/Home'));
const ToolsDirectory = lazy(() => import('./pages/ToolsDirectory'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Guides = lazy(() => import('./pages/Guides'));
const Compliance = lazy(() => import('./pages/Compliance'));

// Simple, modern loading spinner fallback for Suspense
const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[50vh]" aria-label="Loading page content">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

// Scroll to top helper on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Navbar />
          
          {/* Main layout container */}
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools-directory" element={<ToolsDirectory />} />
                <Route path="/dog-tools" element={<ToolsDirectory defaultCategory="dog" />} />
                <Route path="/cat-tools" element={<ToolsDirectory defaultCategory="cat" />} />
                <Route path="/tools/:toolId" element={<CalculatorPage />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/guides" element={<Guides />} />
                
                {/* Compliance/Legal Pathways */}
                <Route path="/about" element={<Compliance />} />
                <Route path="/contact" element={<Compliance />} />
                <Route path="/privacy-policy" element={<Compliance />} />
                <Route path="/terms-conditions" element={<Compliance />} />
                <Route path="/disclaimer" element={<Compliance />} />
                <Route path="/cookie-policy" element={<Compliance />} />
                <Route path="/editorial-policy" element={<Compliance />} />
                <Route path="/sitemap" element={<Compliance />} />

                {/* Catch-all Redirect to Home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
};
export default App;

