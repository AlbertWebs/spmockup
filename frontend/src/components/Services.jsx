import React from 'react';
import { Radio, Monitor, Box, Lightbulb, Grid3x3, Palette, Volume2, PenTool, Package } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Box className="w-10 h-10" />,
      title: 'Full Production & Event Packages',
      description: 'Complete event production services from start to finish, handling all technical needs.',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: <Monitor className="w-10 h-10" />,
      title: 'Visual',
      description: 'Stunning visual displays with cutting-edge screen technology and sharp imagery.',
      gradient: 'from-[#172455] to-[#1e3a8a]',
    },
    {
      icon: <Radio className="w-10 h-10" />,
      title: 'Staging Services',
      description: 'Safe and creative staging solutions for any event requirement.',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: 'Lighting',
      description: 'Intelligent lighting design that creates emotion through color, texture and movement.',
      gradient: 'from-[#172455] to-[#1e3a8a]',
    },
    {
      icon: <Grid3x3 className="w-10 h-10" />,
      title: 'Rigging & Truss Services',
      description: 'Professional rigging and truss services with legal and technical compliance.',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: 'Graphics',
      description: 'Eye-catching visual content including signs, posters, and printed materials.',
      gradient: 'from-[#172455] to-[#1e3a8a]',
    },
    {
      icon: <Volume2 className="w-10 h-10" />,
      title: 'Audio',
      description: 'Crystal clear sound systems with complex control and diverse inputs.',
      gradient: 'from-yellow-400 to-yellow-600',
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: 'Design Services',
      description: 'Flawless design planning for lighting, staging, audio and overall event aesthetics.',
      gradient: 'from-[#172455] to-[#1e3a8a]',
    },
    {
      icon: <Package className="w-10 h-10" />,
      title: 'Equipment Rentals & Sales',
      description: 'Massive inventory of the best audiovisual technology available for rent or purchase.',
      gradient: 'from-yellow-400 to-yellow-600',
    },
  ];

  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#172455] rounded-full blur-3xl opacity-5 animate-pulse-slower"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
          <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">Our Capabilities</span>
          <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8 leading-tight">
            One-Stop-Solution For All Your AV Services
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 font-medium">
            From concept to set-up to on-site support, we are there every step of the way to provide you with the <span className="text-[#172455] font-bold">exceptional product and service</span> you deserve.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:border-transparent transition-all duration-500 hover:-translate-y-3 cursor-pointer relative overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-xl`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-[#172455] mb-4 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Our People Section */}
        <div className="mt-32 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-16 border-2 border-gray-100 shadow-2xl relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <h3 className="text-4xl font-black text-[#172455] mb-6">Our People</h3>
            <div className="h-2 w-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-6"></div>
            <p className="text-2xl text-gray-700 leading-relaxed font-medium">
              While we've got the most trusted audiovisual, staging and lighting brands available to you, it is our <span className="text-[#172455] font-bold">unparalleled team</span> that will exceed your expectations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Rainbow gradient bar with animation */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500 animate-gradient-x"></div>
    </section>
  );
};

export default Services;