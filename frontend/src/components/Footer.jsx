import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Rainbow gradient bar on top */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500"></div>
      
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">STAGEPASS</span>
                <span className="text-xs text-gray-400 leading-none">Audio Visual Limited</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Africa's premier audio-visual and event technology provider, delivering excellence since inception.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-yellow-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-yellow-400 transition-colors">Our Work</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Full Production</li>
              <li className="text-gray-400 text-sm">Visual & Screens</li>
              <li className="text-gray-400 text-sm">Staging Services</li>
              <li className="text-gray-400 text-sm">Lighting Design</li>
              <li className="text-gray-400 text-sm">Audio Systems</li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2025 StagePass Audio Visual Limited. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;