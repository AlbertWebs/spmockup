import React, { useMemo, useRef, useState, useEffect } from 'react';

const Hero = ({ data }) => {
  const [typedText, setTypedText] = useState("");
  const [textVisible, setTextVisible] = useState(false); 
  const [textDimmed, setTextDimmed] = useState(false); // New state for dimming text
  const typingRef = useRef(null);
  const dimmingRef = useRef(null);
  const startRef = useRef(null);
  const fullText = useMemo(
    () => data?.headline || "WWe Create the Most Engaging Events in the World Using Technology",
    [data]
  );
  const backgroundVideo = data?.background_video_url || "https://api.stagepass.co.ke/uploads/stagepass-audio-visual-safaricom-ceo-awade.mp4";

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
    <section className="relative h-[56.25vw] md:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white -mt-[4.25rem] md:mt-0" style={{ paddingTop: '4.25rem', minHeight: 'calc(100vh - 10rem)' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          src={backgroundVideo}
          loop
          autoPlay
          muted
          className="w-full h-full object-cover"
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

