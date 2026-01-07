import React from 'react';
import { CheckCircle2, Target, Users, Award } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import { Button } from './ui/button';

const About = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const highlights = [
    'Integrated technical consulting',
    'Professional event planning & design',
    'Complete implementation support',
    'Africa-wide operations',
  ];

  return (
    <>
      {/* Section Divider */}
      <div className="h-12 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#172455] to-transparent"></div>
      </div>

      <section id="about" className="py-8 md:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-[#172455] rounded-full blur-3xl opacity-5 animate-pulse-slow"></div>
        
        <div ref={ref} className={`container mx-auto px-4 lg:px-12 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center animate-fade-in-up">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://stagepass.co.ke/uploads/banners/visionsp.jpg"
                  alt="Event Production"
                  className="w-full h-[300px] md:h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172455]/70 to-transparent"></div>
              </div>
              
              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-4 max-w-xs animate-float">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-black text-white">2362+</div>
                  <div className="text-white font-bold mt-2">Successful Events</div>
                </div>
              </div>
              
              {/* Additional floating element */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-2xl shadow-2xl p-6 animate-float animation-delay-1000">
                <Award className="text-yellow-400" size={40} />
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8 animate-fade-in-right">
              <div>
                <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">About Us</span>
                <h2 className="text-4xl lg:text-5xl font-black text-[#172455] mt-6 leading-tight">
                  Who We Are
                </h2>
                <div className="h-2 w-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mt-4"></div>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                StagePass Audio-Visual Limited is an <span className="text-[#172455] font-bold">integrated technical, consulting, planning, design and implementation provider</span> for professional events based in Nairobi and operating within Africa.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                We specialize in rentals of Audio-Visual technology including Sound, Screens, Lighting, Content Management, Digital and Interactive technology and scenic design.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <CheckCircle2 className="text-yellow-500 flex-shrink-0 group-hover:scale-125 transition-transform" size={24} />
                    <span className="text-gray-700 font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button className="bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white px-8 py-5 text-base rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-110 font-bold border-2 border-yellow-500">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="mt-16 md:mt-32 text-center animate-fade-in-up">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
              <Target className="mx-auto text-yellow-400 mb-6 animate-bounce-slow" size={64} />
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4 md:mb-6">Our Vision</h3>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                TO BE AFRICA'S REVOLUTIONARY EVENTS TECHNOLOGY EXPERTS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>
    </>
  );
};

export default About;