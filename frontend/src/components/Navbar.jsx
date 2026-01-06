import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-xl border-b-2 border-[#172455]/10' : 'bg-white/98 backdrop-blur-md'}`}>
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#172455] via-yellow-500 to-[#172455]"></div>
      
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://stagepass.nuhiluxurytravel.com/uploads/StagePass-LOGO-y.png" 
              alt="StagePass Logo" 
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#172455] hover:text-yellow-600 font-bold transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <Button className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 font-bold">
              Get AV Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#172455] hover:text-yellow-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#172455]/10 animate-fade-in bg-gradient-to-b from-white to-gray-50">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[#172455] hover:text-yellow-600 font-bold py-2 transition-colors duration-200"
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
    </nav>
  );
};

export default Navbar;