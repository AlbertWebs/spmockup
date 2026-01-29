import React, { useMemo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import QuoteFormModal from './QuoteFormModal'; // Import the new modal component

const Navbar = ({ data, isPage = false }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); // New state for modal

  // Page links mapping
  const pageLinksMap = {
    '#home': '/',
    '#about': '/about',
    '#services': '/services',
    '#portfolio': '/our-work',
    '#industries': '/industries',
    '#contact': '/contact',
  };

  const navLinks = useMemo(() => {
    if (isPage) {
      // For pages, use React Router links
      return [
        { label: 'Home', href: '/', isLink: true },
        { label: 'About Us', href: '/about', isLink: true },
        { label: 'Services', href: '/services', isLink: true },
        { label: 'Our Work', href: '/our-work', isLink: true },
        { label: 'Industries', href: '/industries', isLink: true },
        { label: 'Contact Us', href: '/contact', isLink: true },
      ];
    }
    // For homepage, use anchor links
    return data?.links?.length
      ? data.links
      : [
          { label: 'Home', href: '#home' },
          { label: 'About Us', href: '#about' },
          { label: 'Services', href: '#services' },
          { label: 'Our Work', href: '#portfolio' },
          { label: 'Industries', href: '#industries' },
          { label: 'Contact Us', href: '#contact' },
        ];
  }, [data, isPage]);

  useEffect(() => {
    if (isPage) {
      // For pages, set active link based on current route
      setActiveLink(location.pathname);
      setIsScrolled(true); // Always show scrolled state on pages
    } else {
      // For homepage, handle scroll-based active link
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);

        const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
        const currentActive = sections.find(section => {
          if (!section) return false;
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        });

        if (currentActive) {
          setActiveLink('#' + currentActive.id);
        }
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [navLinks, isPage, location]);

  const logoUrl = data?.logo_url || 'https://stagepass.nuhiluxurytravel.com/uploads/StagePass-LOGO-y.png';
  const ctaLabel = data?.cta_label || 'Get AV Quote';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      const currentActive = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        // Consider a section active if its top is within 100px from the top of the viewport
        // and its bottom is not yet scrolled past the top of the viewport.
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentActive) {
        setActiveLink('#' + currentActive.id);
      }
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isPage ? 'bg-[#0f1b3d] shadow-xl border-b-2 border-[#172455]/10' : 'bg-[#0f1b3d] backdrop-blur-md'}`}>
      {/* Top accent bar */}
      <div className="h-1 md:h-2 bg-gradient-to-r from-[#172455] via-yellow-500 to-[#172455] animate-gradient-x"></div>
      
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center h-full group">
            {isPage ? (
              <Link to="/" className="h-full flex items-center">
                <img 
                  src={logoUrl}
                  alt="StagePass Logo" 
                  className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
              </Link>
            ) : (
              <img 
                src={logoUrl}
                alt="StagePass Logo" 
                className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = isPage 
                ? activeLink === link.href 
                : activeLink === link.href;
              
              if (link.isLink) {
                return (
                  <Link
                    key={index}
                    to={link.href}
                    className={`text-white hover:text-yellow-600 font-bold transition-colors duration-200 relative group text-base shadow-sm hover:shadow-lg hover:scale-105 transform-gpu px-3 py-2 rounded-md ${isActive ? 'text-yellow-500' : ''}`}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300"></span>
                    <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                );
              }
              return (
                <a
                  key={index}
                  href={link.href}
                  className={`text-white hover:text-yellow-600 font-bold transition-colors duration-200 relative group text-base shadow-sm hover:shadow-lg hover:scale-105 transform-gpu px-3 py-2 rounded-md ${isActive ? 'text-yellow-500' : ''}`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300"></span>
                  <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              );
            })}
            <Button
              className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 font-bold border-2 border-yellow-500 animate-border-pulse"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              {ctaLabel}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 text-white hover:text-yellow-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#172455]/10 animate-fade-in bg-gradient-to-b from-[#0f1b3d] to-[#172455]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => {
                const isActive = isPage 
                  ? activeLink === link.href 
                  : activeLink === link.href;
                
                if (link.isLink) {
                  return (
                    <Link
                      key={index}
                      to={link.href}
                      className={`text-white hover:text-yellow-600 font-bold py-2 transition-colors duration-200 ${isActive ? 'text-yellow-500' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={index}
                    href={link.href}
                    className={`text-white hover:text-yellow-600 font-bold py-2 transition-colors duration-200 ${isActive ? 'text-yellow-500' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button
                className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white w-full rounded-full py-6 font-bold"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                {ctaLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;