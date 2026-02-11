import React, { useMemo, useRef, useState, useEffect } from 'react';
import LazyImage from './LazyImage';

const Hero = ({ data }) => {
  const [typedText, setTypedText] = useState("");
  const [textVisible, setTextVisible] = useState(false); 
  const [textDimmed, setTextDimmed] = useState(false); // New state for dimming text
  const [textFadeOut, setTextFadeOut] = useState(false); // State for fade-out-down animation
  const [secondTextVisible, setSecondTextVisible] = useState(false); // State for second text fade-in
  const [secondTextDimmed, setSecondTextDimmed] = useState(false); // State for second text dimming
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [videoFadeIn, setVideoFadeIn] = useState(false);
  const videoRef = useRef(null);
  const thumbnailTimerRef = useRef(null);
  const typingRef = useRef(null);
  const dimmingRef = useRef(null);
  const fadeOutTimerRef = useRef(null);
  const secondTextTimerRef = useRef(null);
  const secondTextDimmingRef = useRef(null);
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
    if (fadeOutTimerRef.current) {
      clearTimeout(fadeOutTimerRef.current);
    }
    if (secondTextTimerRef.current) {
      clearTimeout(secondTextTimerRef.current);
    }
    if (secondTextDimmingRef.current) {
      clearTimeout(secondTextDimmingRef.current);
    }

    // Reset states
    setTypedText("");
    setTextVisible(false);
    setTextDimmed(false);
    setTextFadeOut(false);
    setSecondTextVisible(false);
    setSecondTextDimmed(false);
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

    // Start fade-out-down animation after 10 seconds from component mount
    fadeOutTimerRef.current = setTimeout(() => {
      setTextFadeOut(true);
      // Start second text fade-in animation 10 seconds after first text starts fading out (20 seconds total)
      secondTextTimerRef.current = setTimeout(() => {
        setSecondTextVisible(true);
        // Start dimming second text after 5 seconds of being fully visible (same as first text)
        secondTextDimmingRef.current = setTimeout(() => {
          setSecondTextDimmed(true);
        }, 5000); // 5 seconds after second text becomes fully visible
      }, 10000); // 10 seconds delay after first text starts fading
    }, 10000); // 10 seconds delay

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
      if (fadeOutTimerRef.current) {
        clearTimeout(fadeOutTimerRef.current);
        fadeOutTimerRef.current = null;
      }
      if (secondTextTimerRef.current) {
        clearTimeout(secondTextTimerRef.current);
        secondTextTimerRef.current = null;
      }
      if (secondTextDimmingRef.current) {
        clearTimeout(secondTextDimmingRef.current);
        secondTextDimmingRef.current = null;
      }
      // Reset the flag when effect is cleaned up
      isAnimatingRef.current = false;
    };
  }, [fullText]);

  // Handle video loading and 10-second thumbnail delay
  useEffect(() => {
    // Reset states when video changes
    setVideoLoaded(false);
    setVideoError(false);
    setThumbnailError(false);
    setShowThumbnail(true);
    setVideoCanPlay(false);
    setVideoFadeIn(false);

    // Clear any existing thumbnail timer
    if (thumbnailTimerRef.current) {
      clearTimeout(thumbnailTimerRef.current);
    }

    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setVideoCanPlay(true);
        setVideoError(false);
        // Don't set videoLoaded yet - wait for thumbnail delay
      };

      const handleError = () => {
        setVideoError(true);
        setVideoCanPlay(false);
        setVideoLoaded(false);
      };

      const handlePlay = () => {
        setVideoLoaded(true);
        // Fade-in animation is handled by the 10-second timer
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('play', handlePlay);

      // Set loading strategy for faster loading
      video.load();
      
      // Preload video more aggressively
      if (video.readyState < 2) {
        video.preload = 'auto';
      }

      // Show thumbnail for 10 seconds, then start video with fade animation
      thumbnailTimerRef.current = setTimeout(() => {
        // Check if video element still exists and is ready to play
        if (videoRef.current) {
          const currentVideo = videoRef.current;
          // Check if video has an error
          if (currentVideo.error) {
            setVideoError(true);
            return;
          }
          // Check if video is ready to play (readyState 3 = HAVE_FUTURE_DATA, 4 = HAVE_ENOUGH_DATA)
          if (currentVideo.readyState >= 3) {
            // Video is ready, start playing
            currentVideo.play().then(() => {
              // Video started playing, trigger fade animations
              setTimeout(() => {
                setVideoFadeIn(true);
                // Fade out thumbnail after a brief moment
                setTimeout(() => {
                  setShowThumbnail(false);
                }, 100);
              }, 50);
            }).catch((err) => {
              console.error('Error playing video:', err);
              setVideoError(true);
            });
          } else {
            // Video not ready yet, wait for canplay event
            const handleCanPlayAfterDelay = () => {
              if (videoRef.current && !videoRef.current.error) {
                videoRef.current.play().then(() => {
                  // Video started playing, trigger fade animations
                  setTimeout(() => {
                    setVideoFadeIn(true);
                    // Fade out thumbnail after a brief moment
                    setTimeout(() => {
                      setShowThumbnail(false);
                    }, 100);
                  }, 50);
                }).catch((err) => {
                  console.error('Error playing video:', err);
                  setVideoError(true);
                });
              }
              if (videoRef.current) {
                videoRef.current.removeEventListener('canplay', handleCanPlayAfterDelay);
              }
            };
            if (videoRef.current) {
              videoRef.current.addEventListener('canplay', handleCanPlayAfterDelay);
            }
          }
        }
      }, 10000); // 10 seconds delay

      return () => {
        if (thumbnailTimerRef.current) {
          clearTimeout(thumbnailTimerRef.current);
        }
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('play', handlePlay);
      };
    }
  }, [backgroundVideo]);
  return (
    <section className="relative h-[56.25vw] md:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white -mt-[4.25rem] md:mt-0" style={{ paddingTop: '4.25rem', minHeight: 'calc(100vh - 10rem)' }}>
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {/* Thumbnail/Poster Image - Shows for 10 seconds before video starts, fades out when video starts */}
        {showThumbnail && thumbnailUrl && !thumbnailError && (
          <div 
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            style={{
              opacity: videoFadeIn ? 0 : 1,
              transition: videoFadeIn ? 'opacity 2s ease-in-out' : 'none'
            }}
          >
            <LazyImage
              src={thumbnailUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
              onError={() => setThumbnailError(true)}
              width={1920}
              height={1080}
            />
          </div>
        )}
        
        {/* Fallback gradient if no thumbnail or thumbnail failed to load */}
        {(!videoLoaded || videoError) && (!thumbnailUrl || thumbnailError) && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
        )}

        {/* Video - Starts playing after 10 seconds with smooth fade-in */}
        <video
          ref={videoRef}
          src={backgroundVideo}
          loop
          muted
          playsInline
          preload="auto"
          poster={thumbnailUrl || undefined}
          className="w-full h-full object-cover"
          style={{ 
            opacity: videoFadeIn && videoLoaded && !videoError ? 1 : 0,
            transition: videoFadeIn ? 'opacity 2s ease-in-out' : 'none',
            zIndex: videoFadeIn ? 5 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          onCanPlay={() => setVideoCanPlay(true)}
          onError={() => setVideoError(true)}
        />
        
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* First Text - Main headline */}
        <div 
          className={`transition-opacity duration-1000 ${textVisible ? (textDimmed ? 'opacity-25' : 'opacity-100') : 'opacity-0'}`}
          style={{
            opacity: textFadeOut ? 0 : (textVisible ? (textDimmed ? 0.25 : 1) : 0),
            transform: textFadeOut ? 'translateY(100px)' : 'translateY(0)',
            transition: textFadeOut ? 'opacity 10s ease-in-out, transform 10s ease-in-out' : 'opacity 1s ease-in-out, transform 0s ease-in-out'
          }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none mb-6 text-white uppercase"
          >
            {typedText}
          </h1>
        </div>

        {/* Second Text - Subtitle */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: secondTextVisible ? (secondTextDimmed ? 0.25 : 1) : 0,
            transform: secondTextVisible ? 'translateY(0)' : 'translateY(100px)',
            transition: secondTextVisible ? 'opacity 10s ease-in-out, transform 10s ease-in-out' : 'opacity 0s ease-in-out, transform 0s ease-in-out',
            pointerEvents: 'none'
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white uppercase">
            Home of Creative Solutions and Technical Excellence
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;

