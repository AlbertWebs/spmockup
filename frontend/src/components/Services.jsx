import React from 'react';
import { Radio, Monitor, Box, Lightbulb, Grid3x3, Palette, Volume2, PenTool, Package } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Box className="w-8 h-8" />,
      title: 'Full Production & Event Packages',
      description: 'Complete event production services from start to finish, handling all technical needs.',
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: 'Visual',
      description: 'Stunning visual displays with cutting-edge screen technology and sharp imagery.',
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: 'Staging Services',
      description: 'Safe and creative staging solutions for any event requirement.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Lighting',
      description: 'Intelligent lighting design that creates emotion through color, texture and movement.',
    },
    {
      icon: <Grid3x3 className="w-8 h-8" />,
      title: 'Rigging & Truss Services',
      description: 'Professional rigging and truss services with legal and technical compliance.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Graphics',
      description: 'Eye-catching visual content including signs, posters, and printed materials.',
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: 'Audio',
      description: 'Crystal clear sound systems with complex control and diverse inputs.',
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: 'Design Services',
      description: 'Flawless design planning for lighting, staging, audio and overall event aesthetics.',
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Equipment Rentals & Sales',
      description: 'Massive inventory of the best audiovisual technology available for rent or purchase.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase">Our Capabilities</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            One-Stop-Solution For All Your AV Services
          </h2>
          <p className="text-xl text-gray-600">
            From concept to set-up to on-site support, we are there every step of the way to provide you with the exceptional product and service you deserve.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Our People Section */}
        <div className="mt-24 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 border border-gray-100 shadow-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our People</h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              While we've got the most trusted audiovisual, staging and lighting brands available to you, it is our unparalleled team that will exceed your expectations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Rainbow gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500"></div>
    </section>
  );
};

export default Services;