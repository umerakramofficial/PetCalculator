import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ToolsDirectory from './pages/ToolsDirectory';
import CalculatorPage from './pages/CalculatorPage';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Guides from './pages/Guides';
import Compliance from './pages/Compliance';

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
        </main>

        <Footer />
      </div>
    </Router>
    </LanguageProvider>
  );
};
export default App;
