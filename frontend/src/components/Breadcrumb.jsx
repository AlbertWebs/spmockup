import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav 
      className="relative mb-12 overflow-hidden" 
      aria-label="Breadcrumb"
    >
      {/* Solid white background layer */}
      <div className="absolute inset-0 bg-white rounded-2xl"></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 rounded-2xl opacity-60"></div>
      
      {/* Decorative elements - more visible */}
      <div className="absolute -top-4 -left-6 w-32 h-32 bg-gradient-to-br from-yellow-200/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -bottom-4 -right-6 w-40 h-40 bg-gradient-to-tl from-[#172455]/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative flex items-center space-x-1 py-5 px-8 rounded-2xl bg-white border-2 border-gray-400 shadow-2xl">
        {/* Home icon with premium styling */}
        <Link 
          to="/" 
          className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#172455] to-[#1e3a8a] text-white hover:from-[#1e3a8a] hover:to-[#172455] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-110 transform-gpu"
          aria-label="Home"
        >
          <Home className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Premium separator */}
            <div className="flex items-center px-2">
              <div className="relative">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="absolute inset-0 w-8 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent animate-pulse"></div>
              </div>
              <Sparkles className="w-3 h-3 text-yellow-500/60 mx-1" />
            </div>
            
            {index === items.length - 1 ? (
              <div className="relative group">
                <span className="relative z-10 px-6 py-3 text-sm font-bold text-[#172455] uppercase tracking-wider bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl border-2 border-yellow-400/80 shadow-lg">
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-yellow-500/40 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ) : (
              <Link 
                to={item.path} 
                className="group relative px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#172455] transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-gray-100 hover:to-yellow-100"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer pointer-events-none"></div>
    </nav>
  );
};

export default Breadcrumb;
