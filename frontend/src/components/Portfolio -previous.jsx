import React, { useState } from 'react';
import { Play } from 'lucide-react';
import YouTubeModal from './YouTubeModal';
import ImageModal from './ImageModal'; // Import the new ImageModal component
import useOnScreen from '../hooks/useOnScreen';

const Portfolio = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [currentYouTubeId, setCurrentYouTubeId] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State for Image modal
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // State for current image URL
  const [currentImageTitle, setCurrentImageTitle] = useState(''); // State for current image title
  const galleryItems = [
    {
      type: 'image',
      thumbnail: 'portfolio/1.jpg',
      title: 'Corporate Event 2024',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/2.jpg',
      title: 'Concert Production',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/3.jpg',
      title: 'Festival Setup',
    },
    {
      type: 'video',
      thumbnail: 'portfolio/4.jpg', // Using an existing image as thumbnail for the video
      title: 'Stage Lighting Design',
      youtubeId: 'sJSNvegZDoI', // The new YouTube video ID
    },
    {
      type: 'image',
      thumbnail: 'portfolio/5.jpg',
      title: 'Audio Visual Setup',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/6.jpg',
      title: 'Conference Production',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/7.jpg',
      title: 'Exhibition Event',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/8.jpg',
      title: 'Gala Dinner Setup',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/9.jpg',
      title: 'New Portfolio Item 1',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/10.jpg',
      title: 'New Portfolio Item 2',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/11.jpg',
      title: 'New Portfolio Item 3',
    },
    {
      type: 'image',
      thumbnail: 'portfolio/12.jpg',
      title: 'New Portfolio Item 4',
    },
  ];

  return (
    <>
    <section id="portfolio" className="py-16 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header */}
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3]"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                if (item.type === 'image') {
                  setCurrentImageUrl(item.thumbnail);
                  setCurrentImageTitle(item.title);
                  setIsImageModalOpen(true);
                } else if (item.type === 'video') {
                  setCurrentYouTubeId(item.youtubeId);
                  setIsYouTubeModalOpen(true);
                }
              }}
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
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  onClick={() => {
                    setCurrentYouTubeId(item.youtubeId);
                    setIsYouTubeModalOpen(true);
                  }}
                >
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
      <YouTubeModal
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
        youtubeId={currentYouTubeId}
      />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={currentImageUrl}
        title={currentImageTitle}
      />
    </section>
    </> // Closing Fragment tag
  );
};

export default Portfolio;