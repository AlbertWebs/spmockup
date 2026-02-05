import React, { useEffect, useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import YouTubeModal from './YouTubeModal';
import ImageModal from './ImageModal'; // Import the new ImageModal component
import VideoModal from './VideoModal';
import useOnScreen from '../hooks/useOnScreen';
import { API_BASE_URL } from '../config/api';

const Portfolio = ({ data, portfolioSource }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [currentYouTubeId, setCurrentYouTubeId] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State for Image modal
  const [currentImageUrl, setCurrentImageUrl] = useState(''); // State for current image URL
  const [currentImageTitle, setCurrentImageTitle] = useState(''); // State for current image title
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');
  const section = data?.section;
  const [instagramItems, setInstagramItems] = useState([]);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(false);
  const [instagramError, setInstagramError] = useState('');

  useEffect(() => {
    if (portfolioSource !== 'instagram') {
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    const loadInstagram = async () => {
      try {
        setIsLoadingInstagram(true);
        setInstagramError('');
        const response = await fetch(`${API_BASE_URL}/api/portfolio/instagram?limit=50`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to load Instagram feed.');
        }
        const payload = await response.json();
        if (isMounted) {
          setInstagramItems(Array.isArray(payload?.data) ? payload.data : []);
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          setInstagramError('Unable to load Instagram feed right now.');
        }
      } finally {
        if (isMounted) {
          setIsLoadingInstagram(false);
        }
      }
    };

    loadInstagram();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [portfolioSource]);

  const instagramGallery = useMemo(() => {
    const videos = instagramItems.filter((item) => item.media_type === 'VIDEO').slice(0, 12);
    const images = instagramItems.filter((item) => item.media_type !== 'VIDEO').slice(0, 12);

    const mapItem = (item) => ({
      id: item.instagram_id,
      type: item.media_type === 'VIDEO' ? 'video' : 'image',
      thumbnail: item.media_type === 'VIDEO'
        ? (item.thumbnail_url || item.media_url)
        : item.media_url,
      media_url: item.media_url,
      title: item.caption || 'Instagram Post',
      permalink: item.permalink,
    });

    return [...videos.map(mapItem), ...images.map(mapItem)];
  }, [instagramItems]);

  const galleryItems = useMemo(() => {
    // If Instagram is selected, only use Instagram items (don't fall back to database)
    if (portfolioSource === 'instagram') {
      return instagramGallery;
    }
    // Only show database items when Instagram is NOT selected
    if (data?.items?.length) {
      return data.items;
    }
    return [
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/1.jpg`,
        title: 'Corporate Event 2024',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/2.jpg`,
        title: 'Concert Production',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/3.jpg`,
        title: 'Festival Setup',
      },
      {
        type: 'video',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/4.jpg`,
        title: 'Stage Lighting Design',
        youtube_id: 'sJSNvegZDoI',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/5.jpg`,
        title: 'Audio Visual Setup',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/6.jpg`,
        title: 'Conference Production',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/7.jpg`,
        title: 'Exhibition Event',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/8.jpg`,
        title: 'Gala Dinner Setup',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/9.jpg`,
        title: 'New Portfolio Item 1',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/10.jpg`,
        title: 'New Portfolio Item 2',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/11.jpg`,
        title: 'New Portfolio Item 3',
      },
      {
        type: 'image',
        thumbnail: `${API_BASE_URL}/uploads/portfolio/12.jpg`,
        title: 'New Portfolio Item 4',
      },
    ];
  }, [data, instagramGallery, portfolioSource]);

  const badgeLabel = section?.badge_label || 'Our Work';
  const title = section?.title || 'Portfolio Gallery';
  const description = section?.description
    || 'Explore our recent projects and see how we bring events to life with cutting-edge technology and creative excellence.';

  return (
    <>
    <section id="portfolio" className="py-16 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header - Hidden on mobile, visible on desktop */}
        <div className={`hidden md:block text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">{badgeLabel}</span>
          <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8">
            {title}
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            {description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioSource === 'instagram' && isLoadingInstagram && (
            <div className="col-span-full text-center text-gray-600 font-medium py-12">
              Loading Instagram feed...
            </div>
          )}
          {portfolioSource === 'instagram' && instagramError && (
            <div className="col-span-full text-center text-red-600 font-medium py-12">
              {instagramError}
            </div>
          )}
          {portfolioSource === 'instagram' && !isLoadingInstagram && !instagramError && instagramGallery.length === 0 && (
            <div className="col-span-full text-center text-gray-600 font-medium py-12">
              No Instagram posts available yet.
            </div>
          )}
          {/* Only show database items when Instagram is NOT selected */}
          {portfolioSource !== 'instagram' && galleryItems.map((item, index) => {
            const isVideo = item.type === 'video';
            const itemTitle = item.title || 'Portfolio Item';
            const thumbnail = item.thumbnail;

            return (
              <div
                key={item.id || index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3]"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  if (isVideo) {
                    if (item.youtube_id) {
                      setCurrentYouTubeId(item.youtube_id);
                      setIsYouTubeModalOpen(true);
                      return;
                    }
                    return;
                  }
                  setCurrentImageUrl(item.media_url || thumbnail);
                  setCurrentImageTitle(itemTitle);
                  setIsImageModalOpen(true);
                }}
              >
                <img
                  src={thumbnail}
                  alt={`${itemTitle} - StagePass Audio Visual Portfolio`}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                
                {/* Gradient overlay - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#172455]/90 via-[#172455]/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Play button for videos */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
                
                {/* Title - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg line-clamp-2">{itemTitle}</h3>
                  <div className="h-1 w-12 bg-yellow-400 mt-2"></div>
                </div>
              </div>
            );
          })}
          {portfolioSource === 'instagram' && !isLoadingInstagram && instagramGallery.length > 0 && instagramGallery.map((item, index) => {
            const isVideo = item.type === 'video';
            const itemTitle = item.title || 'Instagram Post';
            const thumbnail = item.thumbnail;

            return (
              <div
                key={item.id || index}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3]"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  if (isVideo) {
                    setCurrentVideoUrl(item.media_url);
                    setCurrentVideoTitle(itemTitle);
                    setIsVideoModalOpen(true);
                    return;
                  }
                  setCurrentImageUrl(item.media_url);
                  setCurrentImageTitle(itemTitle);
                  setIsImageModalOpen(true);
                }}
              >
                <img
                  src={thumbnail}
                  alt={`${itemTitle} - StagePass Audio Visual Portfolio`}
                  loading="lazy"
                  width="400"
                  height="300"
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                
                {/* Gradient overlay - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#172455]/90 via-[#172455]/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Play button for videos */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
                
                {/* Title - Hidden on mobile, visible on tablet and desktop for Instagram */}
                <div className="hidden md:block absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg line-clamp-2">{itemTitle}</h3>
                  <div className="h-1 w-12 bg-yellow-400 mt-2"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <YouTubeModal
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
        youtubeId={currentYouTubeId}
      />
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={currentVideoUrl}
        title={currentVideoTitle}
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