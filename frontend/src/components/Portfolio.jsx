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
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase">Our Work</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Portfolio Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our recent projects and see how we bring events to life with cutting-edge technology and creative excellence.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                {item.type === 'video' && (
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                )}
              </div>
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;