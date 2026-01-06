import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp, Sparkles } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-[#172455] via-[#1e3a8a] to-[#172455] text-white relative overflow-hidden">
      {/* Rainbow gradient bar on top with animation */}
      <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500 animate-gradient-x"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
      
      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <img 
              src="https://stagepass.nuhiluxurytravel.com/uploads/StagePass-LOGO-y.png" 
              alt="StagePass Logo" 
              className="h-12 w-auto object-contain brightness-0 invert"
            />
            <p className="text-gray-300 text-sm leading-relaxed font-medium">
              Africa's premier audio-visual and event technology provider, delivering excellence through innovation and expertise.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <Facebook size={20} className="group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <Twitter size={20} className="group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <Instagram size={20} className="group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <Linkedin size={20} className="group-hover:text-white" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                <Youtube size={20} className="group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-black mb-6 text-yellow-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Home</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Services</a></li>
              <li><a href="#portfolio" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Our Work</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium flex items-center group"><span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span> Contact</a></li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="text-xl font-black mb-6 text-yellow-400">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-300 font-medium text-sm flex items-center"><Sparkles size={16} className="mr-2 text-yellow-400" /> Full Production</li>
              <li className="text-gray-300 font-medium text-sm flex items-center"><Sparkles size={16} className="mr-2 text-yellow-400" /> Visual & Screens</li>
              <li className="text-gray-300 font-medium text-sm flex items-center"><Sparkles size={16} className="mr-2 text-yellow-400" /> Staging Services</li>
              <li className="text-gray-300 font-medium text-sm flex items-center"><Sparkles size={16} className="mr-2 text-yellow-400" /> Lighting Design</li>
              <li className="text-gray-300 font-medium text-sm flex items-center"><Sparkles size={16} className="mr-2 text-yellow-400" /> Audio Systems</li>
              <li className="text-gray-300 font-medium text-sm flex items-center"><Sparkles size={16} className="mr-2 text-yellow-400" /> Equipment Rentals</li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="text-xl font-black mb-6 text-yellow-400">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-6 font-medium">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-5 py-3 rounded-full bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-[#172455] rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <div className="text-gray-400 text-sm font-medium">
            © 2025 StagePass Audio Visual Limited. All rights reserved. | Made with excellence in Nairobi, Kenya
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
    </footer>
  );
};

export default Footer;