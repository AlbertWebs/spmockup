import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

const About = () => {
  const highlights = [
    'Integrated technical consulting',
    'Professional event planning & design',
    'Complete implementation support',
    'Africa-wide operations',
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                alt="Event Production"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-600">2362+</div>
                <div className="text-gray-600 font-medium mt-1">Successful Events</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase">About Us</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                Who We Are
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              StagePass Audio-Visual Limited is an integrated technical, consulting, planning, design and implementation provider for professional events based in Nairobi and operating within Africa.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              We specialize in rentals of Audio-Visual technology including Sound, Screens, Lighting, Content Management, Digital and Interactive technology and scenic design. In addition, we also do the traditional aspects of events e.g. events logistics and venue bookings.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Our expertise combined with our extensive inventory of AV technologies gives us the unique ability to serve our clients, in a variety of industries, from concept to completion.
            </p>

            <div className="space-y-3 pt-4">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="text-yellow-500 flex-shrink-0" size={24} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              TO BE AFRICA'S REVOLUTIONARY EVENTS TECHNOLOGY EXPERTS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;