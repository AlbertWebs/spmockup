import React, { useMemo, useState } from 'react';
import { Building2, Clapperboard, Gem, Handshake, Music, Palette, Theater, Trophy } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import { API_BASE_URL } from '../config/api';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

// Default descriptions for industries
const getIndustryDescription = (title) => {
  const descriptions = {
    'Concerts': 'From intimate acoustic sets to large-scale music festivals, we deliver immersive audio-visual experiences that amplify every performance. Our state-of-the-art sound systems and dynamic lighting create unforgettable moments for artists and audiences alike.',
    'Corporate Events': 'Professional presentations, conferences, and corporate gatherings require precision and reliability. We provide seamless AV solutions that enhance your message, from boardroom meetings to large-scale conventions.',
    'Fashion': 'Fashion shows demand elegance and sophistication. Our lighting and sound design complement the artistry on the runway, creating an atmosphere that showcases every detail and movement.',
    'Theater & Dance': 'Theatrical productions and dance performances need nuanced audio-visual support. We craft immersive environments that enhance storytelling and bring performances to life with precision and artistry.',
    'Gala Dinners': 'Elegant events deserve elegant solutions. We create sophisticated atmospheres for gala dinners, award ceremonies, and formal gatherings with refined lighting and crystal-clear audio.',
    'Trade shows': 'Make your brand stand out at trade shows and exhibitions. Our custom AV setups help you engage visitors, showcase products effectively, and create memorable brand experiences.',
    'Sporting Events': 'From local tournaments to major sporting events, we deliver powerful sound systems and dynamic lighting that energize crowds and enhance the competitive atmosphere.',
    'Nonprofit Events': 'Supporting meaningful causes with impactful presentations. We help nonprofit organizations communicate their mission effectively through professional AV solutions that inspire action.',
  };
  return descriptions[title] || 'Tailored audio-visual solutions designed to elevate your event experience with precision, creativity, and excellence.';
};

const IndustryCard = ({ title, icon: Icon, iconUrl, description, overlayDescription, onTap }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Desktop: Hover overlay */}
      <div 
        className="relative h-72 rounded-2xl overflow-hidden group transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/20 bg-white/80 backdrop-blur border border-yellow-100 hidden md:block cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-yellow-200/40 blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
        
        {/* Front of the card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl transition-transform duration-500 group-hover:scale-95">
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

        {/* Hover Overlay with Details */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#172455] to-[#1e3a8a] text-white p-4 rounded-2xl flex flex-col justify-start items-center transition-all duration-500 overflow-hidden ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <div className="flex-shrink-0">
            {iconUrl ? (
              <img src={iconUrl} alt={title} className="h-10 w-10 object-contain mb-2" />
            ) : (
              <Icon className="text-yellow-400 mb-2" size={40} />
            )}
          </div>
          <h3 className="font-bold text-yellow-400 text-lg mb-2 text-center flex-shrink-0">{title}</h3>
          <div className="flex-1 overflow-hidden w-full">
            {overlayDescription ? (
              <div 
                className="text-xs text-slate-200 leading-tight prose prose-invert prose-sm max-w-none w-full [&_p]:mb-1 [&_ul]:mb-2 [&_li]:mb-0.5 [&_p.font-bold]:!font-bold"
                dangerouslySetInnerHTML={{ __html: overlayDescription }}
              />
            ) : (
              <p className="text-xs text-slate-200 text-center leading-tight line-clamp-6">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Tap to open modal */}
      <div 
        className="relative h-72 rounded-2xl overflow-hidden group transition-all duration-500 transform active:scale-95 bg-white/80 backdrop-blur border border-yellow-100 block md:hidden cursor-pointer"
        onClick={onTap}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-blue-50 opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>
        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-yellow-200/40 blur-2xl"></div>
        
        {/* Front of the card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#172455] to-[#1e3a8a] flex items-center justify-center shadow-2xl">
            {iconUrl ? (
              <img src={iconUrl} alt={title} className="h-10 w-10 object-contain" />
            ) : (
              <Icon className="text-yellow-300" size={36} />
            )}
          </div>
          <h3 className="text-2xl font-extrabold text-[#172455] mt-6 text-center">{title}</h3>
          <p className="text-sm text-gray-500 mt-2 text-center">Tap for details</p>
        </div>
      </div>
    </>
  );
};

const Industries = ({ data }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const section = data?.section;
  
  const iconMap = useMemo(() => ({
    'Corporate & Business Events': Building2,
    'Entertainment & Live Shows': Music,
    'Exhibitions & Trade Shows': Clapperboard,
    'Education & Training': Building2,
    'Religious Institutions': Building2,
    'Hospitality & Tourism': Gem,
    'Healthcare & Medical': Building2,
    'Government & Public Sector': Building2,
    'Retail & Brand Experiences': Palette,
    'Media, Film & Broadcasting': Clapperboard,
    // Legacy mappings for backward compatibility
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
        description: item.description || getIndustryDescription(item.title),
        overlayDescription: item.overlay_description || null,
      }));
    }
    return [
      {
        title: "Corporate & Business Events",
        icon: Building2,
        description: 'Professional audio-visual solutions for corporate gatherings, conferences, and business events.',
      },
      {
        title: "Entertainment & Live Shows",
        icon: Music,
        description: 'Immersive audio-visual experiences for concerts, festivals, and live performances.',
      },
      {
        title: "Exhibitions & Trade Shows",
        icon: Clapperboard,
        description: 'Engaging displays and interactive solutions for exhibitions and trade shows.',
      },
      {
        title: "Education & Training",
        icon: Building2,
        description: 'Comprehensive AV solutions for educational institutions and training centers.',
      },
      {
        title: "Religious Institutions",
        icon: Building2,
        description: 'Professional AV systems for worship services, conferences, and religious events.',
      },
      {
        title: "Hospitality & Tourism",
        icon: Gem,
        description: 'Elegant AV solutions for hotels, resorts, and destination events.',
      },
      {
        title: "Healthcare & Medical",
        icon: Building2,
        description: 'Specialized AV solutions for medical conferences and healthcare facilities.',
      },
      {
        title: "Government & Public Sector",
        icon: Building2,
        description: 'Large-scale AV solutions for government functions and public events.',
      },
      {
        title: "Retail & Brand Experiences",
        icon: Palette,
        description: 'Dynamic displays and interactive experiences for retail and brand activations.',
      },
      {
        title: "Media, Film & Broadcasting",
        icon: Clapperboard,
        description: 'Professional studio and broadcast solutions for media production.',
      },
    ];
  }, [data, iconMap]);

  const handleCardTap = (industry) => {
    setSelectedIndustry(industry);
    setIsModalOpen(true);
  };

  const title = section?.title || 'Industries We Serve';
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
                title={industry.title}
                icon={industry.icon}
                iconUrl={industry.iconUrl}
                description={industry.description}
                overlayDescription={industry.overlayDescription}
                onTap={() => handleCardTap(industry)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Modal */}
      {selectedIndustry && (() => {
        const IconComponent = selectedIndustry.icon;
        return (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-md bg-white">
              <DialogHeader>
                <div className="flex items-center justify-center mb-4">
                  {selectedIndustry.iconUrl ? (
                    <img 
                      src={selectedIndustry.iconUrl} 
                      alt={selectedIndustry.title} 
                      className="h-16 w-16 object-contain" 
                    />
                  ) : IconComponent ? (
                    <IconComponent className="text-[#172455]" size={64} />
                  ) : null}
                </div>
                <DialogTitle className="text-2xl font-bold text-[#172455] text-center">
                  {selectedIndustry.title}
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-4 leading-relaxed">
                  {selectedIndustry.overlayDescription ? (
                    <div 
                      className="prose prose-sm max-w-none w-full [&_p.font-bold]:!font-bold"
                      dangerouslySetInnerHTML={{ __html: selectedIndustry.overlayDescription }}
                    />
                  ) : (
                    <p className="text-center">{selectedIndustry.description}</p>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })()}
    </section>
  );
};

export default Industries;
