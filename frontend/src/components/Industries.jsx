import React, { useMemo } from 'react';
import { Building2, Clapperboard, Gem, Handshake, Music, Palette, Theater, Trophy } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import { API_BASE_URL } from '../config/api';

const IndustryCard = ({ title, icon: Icon, iconUrl }) => {

  return (
    <div className="relative h-72 rounded-2xl overflow-hidden group transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/20 bg-white/80 backdrop-blur border border-yellow-100">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-yellow-200/40 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
      {/* Front of the card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl transition-transform duration-500 group-hover:-rotate-y-180">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#172455] to-[#1e3a8a] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
          {iconUrl ? (
            <img src={iconUrl} alt={title} className="h-10 w-10 object-contain" />
          ) : (
            <Icon className="text-yellow-300" size={36} />
          )}
        </div>
        <h3 className="text-2xl font-extrabold text-[#172455] mt-6 text-center">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 text-center">Tailored event solutions</p>
      </div>

      {/* Back of the card */}
      <div className="absolute inset-0 bg-[#172455] text-white p-6 rounded-2xl flex flex-col items-center justify-center transition-transform duration-500 rotate-y-180 group-hover:rotate-y-0 opacity-0 group-hover:opacity-100">
        {iconUrl ? (
          <img src={iconUrl} alt={title} className="h-12 w-12 object-contain" />
        ) : (
          <Icon className="text-yellow-400" size={40} />
        )}
        <p className="font-bold text-yellow-400 mt-4 text-lg">{title}</p>
        <p className="text-xs text-slate-300 mt-2 text-center">Excellence • Precision • Creativity</p>
      </div>
    </div>
  );
};

const Industries = ({ data }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const section = data?.section;
  const iconMap = useMemo(() => ({
    Concerts: Music,
    'Corporate Events': Building2,
    Fashion: Palette,
    'Theater & Dance': Theater,
    'Gala Dinners': Gem,
    'Trade shows': Clapperboard,
    'Sporting Events': Trophy,
    'Nonprofit Events': Handshake,
  }), []);

  const industryData = useMemo(() => {
    if (data?.items?.length) {
      return data.items.map((item) => ({
        title: item.title,
        icon: iconMap[item.icon_name] || iconMap[item.title] || Building2,
        iconUrl: item.icon_url
          ? (item.icon_url.startsWith('http') ? item.icon_url : `${API_BASE_URL}${item.icon_url}`)
          : null,
      }));
    }
    return [
      {
        title: "Concerts",
        icon: Music,
      },
      {
        title: "Corporate Events",
        icon: Building2,
      },
      {
        title: "Fashion",
        icon: Palette,
      },
      {
        title: "Theater & Dance",
        icon: Theater,
      },
      {
        title: "Gala Dinners",
        icon: Gem,
      },
      {
        title: "Trade shows",
        icon: Clapperboard,
      },
      {
        title: "Sporting Events",
        icon: Trophy,
      },
      {
        title: "Nonprofit Events",
        icon: Handshake,
      },
    ];
  }, [data, iconMap]);

  const title = section?.title || 'Our Industries';
  const subtitle = section?.subtitle || 'StagePass Audio Visual serves a diverse range of industries with tailored solutions.';

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 via-gray-50 to-white" id="industries">
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className={`text-center mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">Industries</span>
          <h2 className="text-4xl lg:text-6xl font-black text-[#172455] mb-4 mt-6">
            {title.includes('Industries') ? (
              <>
                {title.split('Industries')[0]}
                <span className="text-yellow-500">Industries</span>
                {title.split('Industries')[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {industryData.map((industry, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <IndustryCard
                key={index}
                title={industry.title}
                icon={industry.icon}
                iconUrl={industry.iconUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
