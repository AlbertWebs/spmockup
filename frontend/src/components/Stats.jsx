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

return (<section className="py-16 h-[50vh] md:h-screen relative overflow-hidden text-white">

  {/* 🔹 Background Video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    src="https://stagepass.co.ke/uploads/video/sharks.mp4"
    autoPlay
    loop
    muted
    playsInline
  />

  {/* 🔹 Optional dark overlay for contrast */}
  <div className="absolute inset-0 bg-[#172455]/70"></div>

  {/* 🔹 Main Content */}
  <div className="container mx-auto px-6 lg:px-12 relative z-10">
    <div className="text-center mb-20 animate-fade-in-up">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
        Sound reinforcement for <span className="text-yellow-400">70,000 pax</span> during
      </h2>
      <p className="text-xl md:text-3xl lg:text-4xl font-bold text-yellow-400">
        EVERTON VS KARIOBANGI SHARKS Football Match
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-12 hidden md:grid">
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
    )
};

export default Stats;