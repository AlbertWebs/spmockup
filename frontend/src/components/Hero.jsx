import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Mic, Music, Lightbulb, Video } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase bg-yellow-50 px-4 py-2 rounded-full">
                Creative Solutions • Technical Excellence
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
              We Create the Most
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 mt-2">
                Engaging Events
              </span>
              <span className="block text-gray-700 text-4xl lg:text-5xl mt-2">in the World Using Technology</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              From concept to set-up to on-site support, we are there every step of the way to provide you with exceptional product and service.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-full transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right Content - Circular Graphic */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Main circle */}
              <div className="absolute inset-0 rounded-full border-8 border-yellow-400 opacity-20 animate-spin-slow"></div>
              <div className="absolute inset-8 rounded-full border-4 border-blue-400 opacity-30 animate-spin-slower"></div>
              
              {/* Center logo area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold text-yellow-400">SP</div>
                    <div className="text-xs mt-1 tracking-widest">STAGEPASS</div>
                    <div className="text-xs opacity-70">AUDIO VISUAL</div>
                  </div>
                </div>
              </div>
              
              {/* Floating icons */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
                <span className="text-2xl">🎬</span>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float delay-500">
                <span className="text-2xl">🎤</span>
              </div>
              <div className="absolute top-1/4 right-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float delay-1000">
                <span className="text-2xl">💡</span>
              </div>
              <div className="absolute top-1/2 left-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float delay-1500">
                <span className="text-2xl">🎵</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rainbow gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500"></div>
    </section>
  );
};

export default Hero;