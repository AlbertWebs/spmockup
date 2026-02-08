import React, { useMemo } from 'react';
import { CheckCircle2, Target, Users, Award } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import { Button } from './ui/button';

// Helper function to decode HTML entities and return HTML content
const decodeHtmlEntities = (text) => {
  if (!text) return '';
  // Check if we're in a browser environment
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }
  // Fallback for server-side rendering: use a simple regex-based decoder
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
};

const About = ({ data }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const section = data?.section;
  const highlights = useMemo(() => (
    data?.highlights?.length
      ? data.highlights.map((item) => item.text)
      : [
          'Integrated technical consulting',
          'Professional event planning & design',
          'Complete implementation support',
          'Africa-wide operations',
        ]
  ), [data]);

  const badgeLabel = section?.badge_label || 'About Us';
  const title = section?.title || 'Who We Are';
  const descriptionPrimary = useMemo(() => {
    const rawText = section?.description_primary
      || 'StagePass Audio-Visual Limited is an integrated technical, consulting, planning, design and implementation provider for professional events based in Nairobi and operating within Africa.';
    return decodeHtmlEntities(rawText);
  }, [section?.description_primary]);
  const descriptionSecondary = useMemo(() => {
    const rawText = section?.description_secondary || '';
    return decodeHtmlEntities(rawText);
  }, [section?.description_secondary]);
  const imageUrl = section?.image_url || 'https://stagepass.co.ke/uploads/banners/visionsp.jpg';
  const statValue = section?.stat_value || '2362+';
  const statLabel = section?.stat_label || 'Successful Events';
  const buttonLabel = section?.button_label || 'Learn More About Us';
  const visionTitle = section?.vision_title || 'Our Mission';
  const visionText = section?.vision_text || "TO BE AFRICA'S REVOLUTIONARY EVENTS TECHNOLOGY EXPERTS";
  const peopleTitle = section?.people_title || 'Our People';
  const peopleDescription = section?.people_description || "While we've got the most trusted audiovisual, staging and lighting brands available to you, it is our unparalleled team that will exceed your expectations.";

  return (
    <>
      {/* Section Divider */}
      <div className="h-12 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#172455] to-transparent"></div>
      </div>

      <section id="about" className="py-8 md:py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-[#172455] rounded-full blur-3xl opacity-5 animate-pulse-slow"></div>
        
        <div ref={ref} className={`container mx-auto px-4 lg:px-12 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center animate-fade-in-up">
            {/* Left - Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <LazyImage
                  src={imageUrl}
                  alt="StagePass Audio Visual - Professional event production and AV services in Kenya"
                  className="w-full h-[300px] md:h-[550px] object-cover"
                  width="800"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172455]/70 to-transparent"></div>
              </div>
              
              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-2xl p-4 max-w-xs animate-float">
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-black text-white">{statValue}</div>
                  <div className="text-white font-bold mt-2">{statLabel}</div>
                </div>
              </div>
              
              {/* Additional floating element */}
              <div className="absolute -top-6 -left-6 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-2xl shadow-2xl p-6 animate-float animation-delay-1000">
                <Award className="text-yellow-400" size={40} />
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8 animate-fade-in-right">
              <div>
                <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">{badgeLabel}</span>
                <h2 className="text-4xl lg:text-5xl font-black text-[#172455] mt-6 leading-tight">
                  {title}
                </h2>
                <div className="h-2 w-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mt-4"></div>
              </div>

              <div 
                className="text-xl text-gray-700 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: descriptionPrimary }}
              />

              {descriptionSecondary && (
                <div 
                  className="text-lg text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: descriptionSecondary }}
                />
              )}

              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <CheckCircle2 className="text-yellow-500 flex-shrink-0 group-hover:scale-125 transition-transform" size={24} />
                    <span className="text-gray-700 font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2"></div>
            </div>
          </div>

          {/* Mission and People Sections - Side by Side */}
          <div className="mt-16 md:mt-32 grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission Section */}
            <div className="text-center animate-fade-in-up">
              <div className="h-full bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
                <Target className="mx-auto text-yellow-400 mb-4 md:mb-6 animate-bounce-slow" size={48} />
                <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">{visionTitle}</h3>
                <p className="text-lg md:text-2xl lg:text-3xl font-black text-white leading-tight">
                  {visionText}
                </p>
              </div>
            </div>

            {/* Our People Section */}
            {peopleTitle && peopleDescription && (
              <div className="text-center animate-fade-in-up">
                <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 md:p-12 border-2 border-gray-100 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
                  <div className="text-center max-w-none mx-auto relative z-10">
                    <Users className="mx-auto text-yellow-400 mb-4 md:mb-6" size={48} />
                    <h3 className="text-xl md:text-2xl font-black text-[#172455] mb-3 md:mb-4">{peopleTitle}</h3>
                    <div className="h-2 w-20 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mx-auto mb-4 md:mb-6"></div>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">{peopleDescription}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-24 bg-gradient-to-b from-white to-gray-50 relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      </div>
    </>
  );
};

export default About;