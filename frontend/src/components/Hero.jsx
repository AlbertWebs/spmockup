import React, { useMemo, useRef, useState, useEffect } from 'react';

const Hero = ({ data }) => {
  const [typedText, setTypedText] = useState("");
  const [textVisible, setTextVisible] = useState(false); 
  const [textDimmed, setTextDimmed] = useState(false); // New state for dimming text
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const typingRef = useRef(null);
  const dimmingRef = useRef(null);
  const startRef = useRef(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const fullText = useMemo(
    () => data?.headline || "We Create the Most Engaging Events in the World Using Technology",
    [data]
  );
  const backgroundVideo = data?.background_video_url || "https://stagepass.co.ke/uploads/video/ceo.mp4";
  const posterImage = data?.poster_image_url || null; // Optional poster image

  // Intersection Observer to load video only when section is visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Load video only when section is visible
  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;

    const video = videoRef.current;
    
    // Reset video state when source changes
    setVideoLoaded(false);
    setVideoError(false);
    
    // Clear the current source to prevent showing old video
    video.pause();
    video.src = '';
    video.load();
    
    // Small delay to ensure old video is cleared, then set new source
    const timer = setTimeout(() => {
      if (videoRef.current) {
        video.src = backgroundVideo;
        // Only load metadata first, then let browser decide when to load full video
        video.load();
        
        // Try to play the video
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented, but video will still load
          });
        }
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [backgroundVideo, shouldLoadVideo]);

  useEffect(() => {
    if (startRef.current) {
      clearTimeout(startRef.current);
    }
    if (typingRef.current) {
      clearInterval(typingRef.current);
    }
    if (dimmingRef.current) {
      clearTimeout(dimmingRef.current);
    }

    setTypedText("");
    setTextVisible(false);
    setTextDimmed(false);

    startRef.current = setTimeout(() => {
      setTextVisible(true); 
      let i = 0;
      typingRef.current = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingRef.current);
          // Start dimming after typing is complete
          dimmingRef.current = setTimeout(() => {
            setTextDimmed(true);
          }, 5000); // 5 seconds after typing is complete
        }
      }, 70); // Typing speed in ms per character
    }, 200); 

    return () => {
      clearTimeout(startRef.current);
      clearInterval(typingRef.current);
      clearTimeout(dimmingRef.current); // Clear dimming timeout on unmount
    };
  }, [fullText]);
  return (
    <section 
      ref={sectionRef}
      className="relative h-[56.25vw] md:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white -mt-[4.25rem] md:mt-0" 
      style={{ paddingTop: '4.25rem', minHeight: 'calc(100vh - 10rem)' }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {/* Poster/Thumbnail Image - Shows immediately while video loads */}
        {posterImage && !videoLoaded && (
          <img
            src={posterImage}
            alt="Hero background"
            className="w-full h-full object-cover"
            style={{
              opacity: videoLoaded ? 0 : 1,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        )}
        
        {/* Video Element - Only loads when section is visible */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            key={backgroundVideo}
            loop
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster={posterImage || undefined}
            className="w-full h-full object-cover"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            style={{ 
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        )}
        
        {/* Loading State - Only show if no poster image */}
        {!videoLoaded && !videoError && !posterImage && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
          </div>
        )}
        
        {/* Fallback if video fails to load */}
        {videoError && posterImage && (
          <img
            src={posterImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        )}
        
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

