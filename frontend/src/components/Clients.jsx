import React from 'react';

const Clients = () => {
  const clientLogos = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <>
      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#172455] to-transparent"></div>
      </div>

      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#172455] rounded-full blur-3xl opacity-5 animate-pulse-slow"></div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in-up">
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
                className="bg-white rounded-2xl p-8 flex items-center justify-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 border-gray-100 hover:border-yellow-400 group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-full h-24 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-yellow-100 group-hover:to-yellow-200 rounded-xl transition-all duration-500 flex items-center justify-center group-hover:scale-110">
                    <span className="text-sm text-gray-500 group-hover:text-[#172455] font-bold transition-colors">Client {num}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>
    </>
  );
};

export default Clients;