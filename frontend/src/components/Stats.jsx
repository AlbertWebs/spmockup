import React from 'react';
import { Package, Users, Calendar } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Package className="w-14 h-14" />,
      value: '43,234',
      label: 'AV Equipment',
    },
    {
      icon: <Users className="w-14 h-14" />,
      value: '421',
      label: 'Happy Clients',
    },
    {
      icon: <Calendar className="w-14 h-14" />,
      value: '2,362',
      label: 'Events',
    },
  ];

  return (
    <>
      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-white to-[#172455] relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>

      <section className="py-32 bg-gradient-to-br from-[#172455] via-[#1e3a8a] to-[#172455] text-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Animated gradient overlays */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse-slower"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-black mb-4 leading-tight">
              Sound reinforcement for <span className="text-yellow-400">70,000 pax</span> during
            </h2>
            <p className="text-3xl lg:text-4xl font-bold text-yellow-400">
              EVERTON VS KARIOBANGI SHARKS Football Match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-8 group-hover:scale-125 transition-all duration-500 shadow-2xl group-hover:shadow-yellow-500/50 group-hover:rotate-12">
                  {stat.icon}
                </div>
                <div className="text-6xl lg:text-7xl font-black text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-2xl text-white font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-[#172455] to-white relative">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>
    </>
  );
};

export default Stats;