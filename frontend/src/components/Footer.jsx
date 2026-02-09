import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp, Sparkles } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import QuoteFormModal from './QuoteFormModal';
import LazyImage from './LazyImage';
import { API_BASE_URL } from '../config/api';

const Footer = ({ data, settings }) => {
  const location = useLocation();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const isHomepage = location.pathname === '/';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const section = data?.section;
  
  // Build social links from settings (API) or fall back to footer social_links
  const socialLinks = useMemo(() => {
    // First, try to use settings from API
    if (settings) {
      const links = [];
      if (settings.facebook_url) {
        links.push({ platform: 'Facebook', url: settings.facebook_url });
      }
      if (settings.twitter_url) {
        links.push({ platform: 'Twitter', url: settings.twitter_url });
      }
      if (settings.instagram_url) {
        links.push({ platform: 'Instagram', url: settings.instagram_url });
      }
      if (settings.linkedin_url) {
        links.push({ platform: 'Linkedin', url: settings.linkedin_url });
      }
      if (settings.youtube_url) {
        links.push({ platform: 'Youtube', url: settings.youtube_url });
      }
      if (links.length > 0) {
        return links;
      }
    }
    
    // Fall back to footer social_links from database
    if (data?.social_links?.length) {
      return data.social_links;
    }
    
    // Default fallback
    return [
      { platform: 'Facebook', url: '#' },
      { platform: 'Twitter', url: '#' },
      { platform: 'Instagram', url: '#' },
      { platform: 'Linkedin', url: '#' },
      { platform: 'Youtube', url: '#' },
    ];
  }, [data, settings]);

  // Quick Links - use page routes if not on homepage, otherwise use anchor links
  const quickLinks = isHomepage && data?.quick_links?.length
    ? data.quick_links.map(link => ({
        ...link,
        isPage: link.href?.startsWith('/') || false,
      }))
    : [
        { label: 'About Us', href: isHomepage ? '#about' : '/about', isPage: !isHomepage },
        { label: 'Services', href: isHomepage ? '#services' : '/services', isPage: !isHomepage },
        { label: 'Our Work', href: isHomepage ? '#portfolio' : '/our-work', isPage: !isHomepage },
        { label: 'Industries', href: isHomepage ? '#industries' : '/industries', isPage: !isHomepage },
        { label: 'Contact', href: isHomepage ? '#contact' : '/contact', isPage: !isHomepage },
      ];

  // Resources links - always use these specific links
  const moreLinks = [
    { label: 'Terms & Conditions', href: '/terms-and-conditions', isPage: true },
    { label: 'Privacy Policy', href: '/privacy', isPage: true },
    { label: 'Get AV Quote', href: '#quote', isPage: false, isQuote: true },
  ];

  const serviceItems = data?.service_items?.length
    ? data.service_items
    : [
        { label: 'Full Production' },
        { label: 'Visual & Screens' },
        { label: 'Staging Services' },
        { label: 'Lighting Design' },
        { label: 'Audio Systems' },
        { label: 'Equipment Rentals' },
      ];

  // Prioritize site_logo_url from settings, then footer section logo_url, then default
  const logoUrl = useMemo(() => {
    const url = settings?.site_logo_url || section?.logo_url;
    if (url) {
      // If URL is relative, prepend API_BASE_URL
      if (url.startsWith('/') || (!url.startsWith('http://') && !url.startsWith('https://'))) {
        return `${API_BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
      }
      return url;
    }
    // Default fallback
    return `${API_BASE_URL}/uploads/StagePass-LOGO-y.png`;
  }, [settings?.site_logo_url, section?.logo_url]);
  const description = section?.description
    || "Africa's premier audio-visual and event technology provider, delivering excellence through innovation and expertise.";
  const currentYear = new Date().getFullYear();
  const copyright = section?.copyright
    || `© ${currentYear} StagePass Audio Visual Limited. All rights reserved. | Creative Solutions | Technical Excellence`;

  const iconMap = {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
  };

  return (
    <footer className="bg-gradient-to-br from-[#172455] via-[#1e3a8a] to-[#172455] text-white relative overflow-hidden">
      {/* Rainbow gradient bar on top with animation */}
      <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500 animate-gradient-x"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 py-20 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <LazyImage 
              src={logoUrl}
              alt="StagePass Logo" 
              className="h-12 w-auto object-contain brightness-0 invert"
              width={200}
              height={48}
            />
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
              {description}
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => {
                const Icon = iconMap[link.platform] || Sparkles;
                return (
                  <a
                    key={index}
                    href={link.url}
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <Icon size={20} className="group-hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6 text-yellow-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isPage ? (
                    <Link to={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center">
                      <span className="mr-2">→</span> {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center">
                      <span className="mr-2">→</span> {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div>
            <h3 className="text-xl font-black mb-6 text-yellow-400">Resources</h3>
            <ul className="space-y-3">
              {moreLinks.map((link, index) => (
                <li key={index}>
                  {link.isQuote ? (
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center w-full text-left"
                    >
                      <span className="mr-2">→</span> {link.label}
                    </button>
                  ) : link.isPage ? (
                    <Link to={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center">
                      <span className="mr-2">→</span> {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center">
                      <span className="mr-2">→</span> {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Our Services */}
          <div>
            <h3 className="text-xl font-black mb-6 text-yellow-400">Our Services</h3>
            <ul className="space-y-3">
              {serviceItems.map((item, index) => (
                <li key={index} className="text-gray-300 font-medium text-sm flex items-center">
                  <Sparkles size={16} className="mr-2 text-yellow-400" /> {item.label}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t border-white/10 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
          <div className="text-gray-400 text-sm font-medium">
            {copyright}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-[#172455] rounded-full flex items-center justify-center shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110 z-50 group animate-bounce-slow"
      >
        <ArrowUp size={28} className="font-bold group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </footer>
  );
};

export default Footer;