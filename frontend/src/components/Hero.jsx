import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Mic, Music, Lightbulb, Video, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-yellow-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-[#172455] rounded-full blur-3xl opacity-10 animate-pulse-slower"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-yellow-100 to-blue-100 rounded-full blur-3xl opacity-20 animate-spin-very-slow"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 animate-fade-in-up">
              <Sparkles className="text-yellow-500 animate-spin-slow" size={24} />
              <span className="text-sm font-bold text-[#172455] tracking-wider uppercase bg-gradient-to-r from-yellow-100 to-yellow-200 px-6 py-3 rounded-full shadow-md">
                Creative Solutions • Technical Excellence
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-tight animate-fade-in-up animation-delay-200">
              <span className="text-[#172455] block animate-text-reveal">
                We Create the Most
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 mt-3 animate-gradient-x">
                Engaging Events
              </span>
              <span className="block text-gray-700 text-4xl lg:text-5xl mt-3 font-bold animate-fade-in-up animation-delay-400">
                in the World Using Technology
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl font-medium animate-fade-in-up animation-delay-600">
              From concept to set-up to on-site support, we are there every step of the way to provide you with <span className="text-[#172455] font-bold">exceptional product and service</span>.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-800">
              <Button size="lg" className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white px-10 py-7 text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110 font-bold group">
                Our Work 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-[#172455] text-[#172455] hover:bg-[#172455] hover:text-white px-10 py-7 text-lg rounded-full transition-all duration-300 hover:scale-105 font-bold shadow-lg">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Right Content - Enhanced Circular Graphic */}
          <div className="relative flex items-center justify-center animate-fade-in-right">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Animated circles */}
              <div className="absolute inset-0 rounded-full border-8 border-yellow-400 opacity-30 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border-6 border-[#172455] opacity-20 animate-spin-slower"></div>
              <div className="absolute inset-8 rounded-full border-4 border-yellow-500 opacity-40 animate-spin-reverse"></div>
              
              {/* Center logo area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full bg-gradient-to-br from-[#172455] via-[#1e3a8a] to-[#172455] flex items-center justify-center shadow-2xl animate-pulse-glow">
                  <div className="text-center text-white">
                    <div className="text-5xl font-black text-yellow-400 animate-bounce-slow">SP</div>
                    <div className="text-xs mt-2 tracking-widest font-bold">STAGEPASS</div>
                    <div className="text-xs opacity-80 font-medium">AUDIO VISUAL</div>
                  </div>
                </div>
              </div>
              
              {/* Floating icons with enhanced animation */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center animate-float-enhanced">
                <Video className="text-white" size={32} />
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-full shadow-2xl flex items-center justify-center animate-float-enhanced animation-delay-500">
                <Mic className="text-yellow-400" size={32} />
              </div>
              <div className="absolute top-1/4 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-2xl flex items-center justify-center animate-float-enhanced animation-delay-1000">
                <Lightbulb className="text-white" size={32} />
              </div>
              <div className="absolute top-1/2 left-0 w-20 h-20 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-full shadow-2xl flex items-center justify-center animate-float-enhanced animation-delay-1500">
                <Music className="text-yellow-400" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Rainbow gradient bar with animation */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500 animate-gradient-x"></div>
    </section>
  );
};

export default Hero;