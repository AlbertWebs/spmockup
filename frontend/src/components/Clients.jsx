import React from 'react';
import useOnScreen from '../hooks/useOnScreen';

const Clients = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const clientLogos = [
    "WEB-LOGOS-01.jpg", "WEB-LOGOS-02.jpg", "WEB-LOGOS-03.jpg", "WEB-LOGOS-04.jpg",
    "WEB-LOGOS-05.jpg", "WEB-LOGOS-06.jpg", "WEB-LOGOS-07.jpg", "WEB-LOGOS-08.jpg",
    "WEB-LOGOS-09.jpg", "WEB-LOGOS-10.jpg", "WEB-LOGOS-11.jpg", "WEB-LOGOS-12.jpg",
    "WEB-LOGOS-13.jpg", "WEB-LOGOS-14.jpg", "WEB-LOGOS-15.jpg", "WEB-LOGOS-16.jpg",
    "WEB-LOGOS-17.jpg", "WEB-LOGOS-18.jpg", "WEB-LOGOS-19.jpg", "WEB-LOGOS-20.jpg"
  ];

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
            <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">The Power Behind Us</span>
            <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8">
              Our Clients
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-medium">
              With forward-thinking brands and organizations that demand <span className="text-[#172455] font-bold">reliability, creativity, and flawless execution</span>. From corporate leaders to global innovators, our clients trust us to elevate their events.
            </p>
          </div>

          {/* Clients Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {clientLogos.map((num, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-2 flex items-center justify-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-gray-100 hover:border-yellow-400 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-full h-24 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center p-0">
                  <img 
                    src={process.env.PUBLIC_URL + `/uploads/clients/${num}`}
                    alt={`Client ${index + 1}`}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
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