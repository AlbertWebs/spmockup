import React, { useMemo } from 'react';
import { Package, Users, Calendar } from 'lucide-react';

const Stats = ({ data }) => {
  const section = data?.section;
  const iconMap = useMemo(() => ({
    Package,
    Users,
    Calendar,
  }), []);

  const stats = useMemo(() => {
    if (data?.items?.length) {
      return data.items.map((item) => {
        const Icon = iconMap[item.icon] || Package;
        return {
          ...item,
          icon: <Icon className="w-14 h-14" />,
        };
      });
    }
    return [
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
  }, [data, iconMap]);

  const backgroundVideo = section?.background_video_url || '';

return (<section className="py-16 h-[50vh] md:h-screen relative overflow-hidden text-white">

  {/* 🔹 Background Video */}
  {backgroundVideo && (
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={backgroundVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  )}

  {/* 🔹 Optional dark overlay for contrast */}
  <div className="absolute inset-0 bg-[#172455]/70"></div>

  {/* 🔹 Main Content */}
  <div className="container mx-auto px-6 lg:px-12 relative z-10 h-full flex items-center justify-center">
    <div className="grid md:grid-cols-3 gap-12 hidden md:grid w-full">
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