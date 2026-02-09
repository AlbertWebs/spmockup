import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import AboutSection from '../components/About';
import SEO from '../components/SEO';
import useHomepageData from '../hooks/useHomepageData';
import usePageData from '../hooks/usePageData';

const About = () => {
  const { homepageData } = useHomepageData();
  const { pageData, loadError } = usePageData('about');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us - StagePass Audio Visual Limited",
    "description": "Learn about StagePass Audio Visual Limited, Kenya's leading events and audio-visual company providing professional sound systems, event production, and technical event support.",
    "url": "https://stagepass.co.ke/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "StagePass Audio Visual Limited",
      "description": "Professional audio visual and event production company in Kenya"
    }
  };

  return (
    <>
      <SEO
        title="About Us - StagePass Audio Visual Limited | Professional AV Services in Kenya"
        description="Learn about StagePass Audio Visual Limited, Kenya's leading events and audio-visual company providing professional sound systems, event production, video conferencing, and technical event support."
        keywords="about StagePass, audio visual company Kenya, event production company, AV services Nairobi"
        url="https://stagepass.co.ke/about"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-white">
      <Navbar data={homepageData?.navigation} isPage={true} />
      {loadError && (
        <div className="bg-red-50 text-red-700 text-center py-4 font-semibold mt-20">
          {loadError}
        </div>
      )}
      
      {/* Breadcrumb - positioned at top with proper spacing */}
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumb items={[{ label: 'About', path: '/about' }]} />
        </div>
      </div>
      
      {/* Homepage About Section */}
      <AboutSection data={homepageData?.about} />
      
      {/* Page-specific content */}
      {pageData?.page && (
        <main className="mx-auto max-w-4xl px-6 py-16">
          
          {pageData.page.hero_title && (
            <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-4">
              {pageData.page.hero_title}
            </h1>
          )}
          {pageData.page.hero_subtitle && (
            <p className="text-lg text-gray-600 mb-8">
              {pageData.page.hero_subtitle}
            </p>
          )}
          {pageData.page.image_url && (
            <div className="mb-8">
              <img 
                src={pageData.page.image_url} 
                alt={pageData.page.hero_title || 'About'} 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
          {pageData.page.content && (
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-7"
              dangerouslySetInnerHTML={{ __html: pageData.page.content }}
            />
          )}
        </main>
      )}
      
      <Footer data={homepageData?.footer} settings={homepageData?.settings} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
      </div>
    </>
  );
};

export default About;
