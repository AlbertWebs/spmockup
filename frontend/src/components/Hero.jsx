import React, { useMemo, useRef, useState, useEffect } from 'react';
import LazyImage from './LazyImage';

const Hero = ({ data }) => {
  const [typedText, setTypedText] = useState("");
  const [textVisible, setTextVisible] = useState(false); 
  const [textDimmed, setTextDimmed] = useState(false); // New state for dimming text
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef(null);
  const typingRef = useRef(null);
  const dimmingRef = useRef(null);
  const startRef = useRef(null);
  const isAnimatingRef = useRef(false); // Track if animation is currently running
  const fullText = useMemo(
    () => data?.headline || "We Create the Most Engaging Events in the World Using Technology",
    [data]
  );
  const backgroundVideo = data?.background_video_url || "https://api.stagepass.co.ke/uploads/stagepass-audio-visual-safaricom-ceo-awade.mp4";
  
  // Use thumbnail_url from API, fallback to generating from video URL if not provided
  const thumbnailUrl = useMemo(() => {
    // First, try to use the thumbnail_url from the API (uploaded via admin panel)
    if (data?.thumbnail_url) {
      return data.thumbnail_url;
    }
    
    // Fallback: Generate thumbnail URL from video URL if no thumbnail was uploaded
    if (backgroundVideo) {
      const videoUrl = backgroundVideo;
      // Try different thumbnail naming conventions
      if (videoUrl.endsWith('.mp4')) {
        // Try _thumb.jpg first, then .jpg, then default path
        const baseUrl = videoUrl.replace('.mp4', '');
        return `${baseUrl}_thumb.jpg`;
      }
      // If not .mp4, try to append _thumb.jpg
      return `${videoUrl}_thumb.jpg`;
    }
    return null;
  }, [data?.thumbnail_url, backgroundVideo]);

  useEffect(() => {
    // Prevent double execution in React StrictMode or if animation is already running
    if (isAnimatingRef.current) {
      return;
    }

    // Clear any existing timers
    if (startRef.current) {
      clearTimeout(startRef.current);
    }
    if (typingRef.current) {
      clearInterval(typingRef.current);
    }
    if (dimmingRef.current) {
      clearTimeout(dimmingRef.current);
    }

    // Reset states
    setTypedText("");
    setTextVisible(false);
    setTextDimmed(false);
    isAnimatingRef.current = true;

    // Start typing animation after 3 seconds
    startRef.current = setTimeout(() => {
      setTextVisible(true); 
      let currentIndex = 0;
      const textLength = fullText.length;
      
      typingRef.current = setInterval(() => {
        if (currentIndex < textLength) {
          // Use substring instead of appending to prevent duplication
          setTypedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingRef.current);
          typingRef.current = null;
          // Start dimming after typing is complete
          dimmingRef.current = setTimeout(() => {
            setTextDimmed(true);
            isAnimatingRef.current = false; // Animation complete
          }, 5000); // 5 seconds after typing is complete
        }
      }, 70); // Typing speed in ms per character
    }, 3000); // 3 seconds delay before typing starts 

    return () => {
      if (startRef.current) {
        clearTimeout(startRef.current);
        startRef.current = null;
      }
      if (typingRef.current) {
        clearInterval(typingRef.current);
        typingRef.current = null;
      }
      if (dimmingRef.current) {
        clearTimeout(dimmingRef.current);
        dimmingRef.current = null;
      }
      // Reset the flag when effect is cleaned up
      isAnimatingRef.current = false;
    };
  }, [fullText]);

  // Handle video loading
  useEffect(() => {
    // Reset states when video changes
    setVideoLoaded(false);
    setVideoError(false);
    setThumbnailError(false);

    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
        setVideoError(false);
      };

      const handleError = () => {
        setVideoError(true);
        setVideoLoaded(false);
      };

      const handleLoadedData = () => {
        // Video has loaded enough data to start playing
        setVideoLoaded(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      // Set loading strategy for faster loading
      video.load();
      
      // Preload video more aggressively
      if (video.readyState < 2) {
        video.preload = 'auto';
      }

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [backgroundVideo]);
  return (
    <section className="relative h-[56.25vw] md:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white -mt-[4.25rem] md:mt-0" style={{ paddingTop: '4.25rem', minHeight: 'calc(100vh - 10rem)' }}>
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {/* Thumbnail/Poster Image - Shows while video loads */}
        {(!videoLoaded || videoError) && thumbnailUrl && !thumbnailError && (
          <LazyImage
            src={thumbnailUrl}
            alt="Hero background"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            onError={() => setThumbnailError(true)}
            width={1920}
            height={1080}
          />
        )}
        
        {/* Fallback gradient if no thumbnail or thumbnail failed to load */}
        {(!videoLoaded || videoError) && (!thumbnailUrl || thumbnailError) && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
        )}

        {/* Video - Shows once loaded */}
        <video
          ref={videoRef}
          src={backgroundVideo}
          loop
          autoPlay
          muted
          playsInline
          preload="auto"
          poster={thumbnailUrl || undefined}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
          }`}
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        />
        
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center max-w-4xl mx-auto px-4 transition-opacity duration-1000 ${textVisible ? (textDimmed ? 'opacity-25' : 'opacity-100') : 'opacity-0'}`}>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-6 text-white uppercase"
        >
          {typedText}
        </h1>
      </div>
    </section>
  );
};

export default Hero;

