import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import QuoteFormModal from './QuoteFormModal'; // Import the new modal component

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false); // New state for modal

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Industries', href: '#industries' },
    { label: 'Contact Us', href: '#contact' },
  ];

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0f1b3d] shadow-xl border-b-2 border-[#172455]/10' : 'bg-[#0f1b3d] backdrop-blur-md'}`}>
      {/* Top accent bar */}
      <div className="h-2 bg-gradient-to-r from-[#172455] via-yellow-500 to-[#172455] animate-gradient-x"></div>
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center h-full group">
            <img 
              src="https://stagepass.nuhiluxurytravel.com/uploads/StagePass-LOGO-y.png" 
              alt="StagePass Logo" 
              className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`text-white hover:text-yellow-600 font-bold transition-colors duration-200 relative group text-base shadow-sm hover:shadow-lg hover:scale-105 transform-gpu px-3 py-2 rounded-md ${activeLink === link.href ? 'text-yellow-500' : ''}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all duration-300"></span>
                <span className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <Button
              className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 font-bold border-2 border-yellow-500 animate-border-pulse"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Get AV Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-yellow-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#172455]/10 animate-fade-in bg-gradient-to-b from-[#0f1b3d] to-[#172455]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`text-white hover:text-yellow-600 font-bold py-2 transition-colors duration-200 ${activeLink === link.href ? 'text-yellow-500' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white w-full rounded-full py-6 font-bold">
                Get AV Quote
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