import React from 'react';

const Clients = () => {
  const clientLogos = [
    'WEB-LOGOS-01.jpg',
    'WEB-LOGOS-02.jpg',
    'WEB-LOGOS-03.jpg',
    'WEB-LOGOS-04.jpg',
    'WEB-LOGOS-05.jpg',
    'WEB-LOGOS-06.jpg',
    'WEB-LOGOS-07.jpg',
    'WEB-LOGOS-08.jpg',
    'WEB-LOGOS-09.jpg',
    'WEB-LOGOS-10.jpg',
    'WEB-LOGOS-11.jpg',
    'WEB-LOGOS-12.jpg',
    'WEB-LOGOS-13.jpg',
    'WEB-LOGOS-14.jpg',
    'WEB-LOGOS-15.jpg',
    'WEB-LOGOS-16.jpg',
    'WEB-LOGOS-17.jpg',
    'WEB-LOGOS-18.jpg',
    'WEB-LOGOS-19.jpg',
    'WEB-LOGOS-20.jpg',
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase">The Power Behind Us</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Our Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With forward-thinking brands and organizations that demand reliability, creativity, and flawless execution. From corporate leaders to global innovators, our clients trust us to elevate their events with world-class technical expertise.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 group"
            >
              <div className="w-full h-20 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg group-hover:bg-gray-300 transition-colors flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-medium">Client {index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;