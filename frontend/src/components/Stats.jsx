import React from 'react';
import { Package, Users, Calendar } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Package className="w-12 h-12" />,
      value: '43,234',
      label: 'AV Equipment',
    },
    {
      icon: <Users className="w-12 h-12" />,
      value: '421',
      label: 'Happy Clients',
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      value: '2,362',
      label: 'Events',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Sound reinforcement for 70,000 pax during EVERTON VS KARIOBANGI SHARKS Football Match
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                {stat.icon}
              </div>
              <div className="text-5xl lg:text-6xl font-bold text-yellow-400 mb-2">
                {stat.value}
              </div>
              <div className="text-xl text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;