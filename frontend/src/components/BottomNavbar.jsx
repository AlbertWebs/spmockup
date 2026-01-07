import React, { useState, useEffect } from 'react';
import { Home, Info, Briefcase, Camera, Mail } from 'lucide-react';

const BottomNavbar = () => {
  const [activeLink, setActiveLink] = useState('#home');

  const navLinks = [
    { label: 'Home', href: '#home', icon: <Home size={20} /> },
    { label: 'About', href: '#about', icon: <Info size={20} /> },
    { label: 'Services', href: '#services', icon: <Briefcase size={20} /> },
    { label: 'Work', href: '#portfolio', icon: <Camera size={20} /> },
    { label: 'Contact', href: '#contact', icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      const currentActive = sections.find(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentActive) {
        setActiveLink('#' + currentActive.id);
      } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        // If at the very bottom, activate the last link
        setActiveLink(navLinks[navLinks.length - 1].href);
      } else if (window.scrollY === 0) {
        // If at the very top, activate the first link
        setActiveLink(navLinks[0].href);
      }
    };

    handleScroll(); // Initial check

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f1b3d] border-t border-[#172455]/10 shadow-lg lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className={`flex flex-col items-center justify-center text-xs font-bold transition-colors duration-200
              ${activeLink === link.href ? 'text-yellow-500' : 'text-gray-300 hover:text-white'}`}
            onClick={() => setActiveLink(link.href)}
          >
            {link.icon}
            <span className="mt-1">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;


