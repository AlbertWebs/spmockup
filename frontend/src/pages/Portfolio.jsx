import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import ImageModal from '../components/ImageModal';
import VideoModal from '../components/VideoModal';
import { Play } from 'lucide-react';
import useHomepageData from '../hooks/useHomepageData';
import { API_BASE_URL } from '../config/api';
import SEO from '../components/SEO';

const Portfolio = () => {
  const { homepageData } = useHomepageData();
  const [instagramItems, setInstagramItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [currentImageTitle, setCurrentImageTitle] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadInstagram = async () => {
      try {
        setIsLoading(true);
        setError('');
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
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError('Unable to load Instagram feed right now.');
          console.error('Error loading Instagram:', err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadInstagram();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const galleryItems = useMemo(() => {
    return instagramItems.map((item) => ({
      id: item.instagram_id,
      type: item.media_type === 'VIDEO' ? 'video' : 'image',
      thumbnail: item.media_type === 'VIDEO'
        ? (item.thumbnail_url || item.media_url)
        : item.media_url,
      media_url: item.media_url,
      title: item.caption || 'Instagram Post',
      permalink: item.permalink,
    }));
  }, [instagramItems]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Portfolio - StagePass Audio Visual",
    "description": "Explore our portfolio of professional audio visual projects and event productions",
    "url": "https://stagepass.co.ke/portfolio"
  };

  return (
    <>
      <SEO
        title="Portfolio — StagePass Audio Visual Limited"
        description="Explore our portfolio of professional audio visual projects, event productions, and creative solutions. See how we bring events to life with cutting-edge technology."
        keywords="portfolio, audio visual projects, event production portfolio, stagepass portfolio, AV projects Kenya"
        url="https://stagepass.co.ke/portfolio"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white">
        <Navbar data={homepageData?.navigation} isPage={true} />
        
        {/* Breadcrumb */}
        <div className="pt-28 pb-4">
          <div className="mx-auto max-w-7xl px-6">
            <Breadcrumb items={[{ label: 'Portfolio', path: '/portfolio' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-b from-gray-100 via-gray-50 to-white py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">
                Our Portfolio
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-[#172455] mt-6 mb-6">
                Our <span className="text-yellow-500">Work</span>
              </h1>
              <div className="h-2 w-32 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-8"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                Explore our recent projects and see how we bring events to life with cutting-edge technology and creative excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            {isLoading && (
              <div className="text-center text-gray-600 font-medium py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mb-4"></div>
                <p>Loading Instagram feed...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-red-600 font-medium py-12 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && galleryItems.length === 0 && (
              <div className="text-center text-gray-600 font-medium py-12">
                <p>No Instagram posts available yet.</p>
                <p className="text-sm mt-2">Please check back later.</p>
              </div>
            )}

            {!isLoading && !error && galleryItems.length > 0 && (
              <>
                <div className="mb-8 text-center">
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-[#172455]">{galleryItems.length}</span> posts from Instagram
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {galleryItems.map((item, index) => {
                    const isVideo = item.type === 'video';
                    const itemTitle = item.title || 'Instagram Post';
                    const thumbnail = item.thumbnail;

                    return (
                      <div
                        key={item.id || index}
                        className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer aspect-[4/3]"
                        style={{ animationDelay: `${index * 50}ms` }}
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
                          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                          loading="lazy"
                          width="400"
                          height="300"
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#172455]/90 via-[#172455]/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Play button for videos */}
                        {isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                              <Play className="w-10 h-10 text-white ml-1" fill="white" />
                            </div>
                          </div>
                        )}
                        
                        {/* Title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-white font-bold text-lg line-clamp-2">{itemTitle}</h3>
                          <div className="h-1 w-12 bg-yellow-400 mt-2"></div>
                        </div>

                        {/* View on Instagram link */}
                        {item.permalink && (
                          <a
                            href={item.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/90 hover:bg-white rounded-full p-2"
                            onClick={(e) => e.stopPropagation()}
                            title="View on Instagram"
                          >
                            <svg className="w-5 h-5 text-[#172455]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
        
        <Footer data={homepageData?.footer} settings={homepageData?.settings} />
        <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
      </div>

      {/* Modals */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={currentImageUrl}
        title={currentImageTitle}
      />
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={currentVideoUrl}
        title={currentVideoTitle}
      />
    </>
  );
};

export default Portfolio;
