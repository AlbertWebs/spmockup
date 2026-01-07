import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [textVisible, setTextVisible] = useState(false); 
  const [textDimmed, setTextDimmed] = useState(false); // New state for dimming text
  const fullText = "WWe Create the Most Engaging Events in the World Using Technology";

  useEffect(() => {
    let typeTimeout;
    let dimmingTimeout; // New timeout for dimming

    const startTyping = setTimeout(() => {
      setTextVisible(true); 
      let i = 0;
      typeTimeout = setInterval(() => {
        if (i < fullText.length) {
          setTypedText(prev => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typeTimeout);
          // Start dimming after typing is complete
          dimmingTimeout = setTimeout(() => {
            setTextDimmed(true);
          }, 5000); // 5 seconds after typing is complete
        }
      }, 70); // Typing speed in ms per character
    }, 200); 

    return () => {
      clearTimeout(startTyping);
      clearInterval(typeTimeout);
      clearTimeout(dimmingTimeout); // Clear dimming timeout on unmount
    };
  }, []);
  return (
    <section className="relative h-[50vh] md:h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://stagepass.co.ke/uploads/video/ceo.mp4"
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

