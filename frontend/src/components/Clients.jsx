import React, { useMemo } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { API_BASE_URL } from '../config/api';

const Clients = ({ data }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const section = data?.section;
  const clientLogos = useMemo(() => {
    if (data?.logos?.length) {
      return data.logos.map((logo) => ({
        src: logo.logo_path,
        alt: logo.alt_text || 'Client logo',
      }));
    }
    return [
      "WEB-LOGOS-01.jpg", "WEB-LOGOS-02.jpg", "WEB-LOGOS-03.jpg", "WEB-LOGOS-04.jpg",
      "WEB-LOGOS-05.jpg", "WEB-LOGOS-06.jpg", "WEB-LOGOS-07.jpg", "WEB-LOGOS-08.jpg",
      "WEB-LOGOS-09.jpg", "WEB-LOGOS-10.jpg", "WEB-LOGOS-11.jpg", "WEB-LOGOS-12.jpg",
      "WEB-LOGOS-13.jpg", "WEB-LOGOS-14.jpg", "WEB-LOGOS-15.jpg", "WEB-LOGOS-16.jpg",
      "WEB-LOGOS-17.jpg", "WEB-LOGOS-18.jpg", "WEB-LOGOS-19.jpg", "WEB-LOGOS-20.jpg"
    ].map((file) => ({
      src: `${API_BASE_URL}/uploads/clients/${file}`,
      alt: 'Client logo',
    }));
  }, [data]);

  const badgeLabel = section?.badge_label || 'The Power Behind Us';
  const title = section?.title || 'Our Clients';
  const description = section?.description
    || 'With forward-thinking brands and organizations that demand reliability, creativity, and flawless execution. From corporate leaders to global innovators, our clients trust us to elevate their events.';

  return (
    <>
      {/* Section Divider */}
      <div className="h-12 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#172455] to-transparent"></div>
      </div>

      <section ref={ref} className={`py-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#172455] rounded-full blur-3xl opacity-5 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">{badgeLabel}</span>
            <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8">
              {title}
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium">
              {description}
            </p>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="rounded-2xl p-[3px] bg-gradient-to-br from-yellow-400 via-orange-500 to-yellow-600 hover:from-yellow-300 hover:via-orange-400 hover:to-yellow-500 transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="bg-white rounded-2xl p-2 flex items-center justify-center h-full hover:shadow-2xl transition-all duration-500">
                  <div className="w-full h-24 flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center p-0">
                      <img 
                        src={logo.src}
                        alt={logo.alt || `Client logo - ${logo.alt || 'StagePass client'}`}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        width="200"
                        height="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-12 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>
    </>
  );
};

export default Clients;