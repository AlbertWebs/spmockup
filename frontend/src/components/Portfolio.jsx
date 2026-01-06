import React from 'react';
import { Play } from 'lucide-react';

const Portfolio = () => {
  const galleryItems = [
    {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop',
      title: 'Corporate Event 2024',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
      title: 'Concert Production',
    },
    {
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&h=400&fit=crop',
      title: 'Festival Setup',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      title: 'Stage Lighting Design',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
      title: 'Audio Visual Setup',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
      title: 'Conference Production',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
      title: 'Exhibition Event',
    },
    {
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=400&fit=crop',
      title: 'Gala Dinner Setup',
    },
  ];

  return (
    <section id="portfolio" className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">Our Work</span>
          <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8">
            Portfolio Gallery
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            Explore our recent projects and see how we bring events to life with <span className="text-[#172455] font-bold">cutting-edge technology</span> and creative excellence.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3] animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#172455]/90 via-[#172455]/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Play button for videos */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <div className="h-1 w-12 bg-yellow-400 mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;