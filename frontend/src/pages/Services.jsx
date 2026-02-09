import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import ServicesSection from '../components/Services';
import SEO from '../components/SEO';
import useHomepageData from '../hooks/useHomepageData';
import usePageData from '../hooks/usePageData';

const Services = () => {
  const { homepageData } = useHomepageData();
  const { pageData, loadError } = usePageData('services');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Audio Visual Services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "StagePass Audio Visual Limited"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Audio Visual Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sound Systems",
            "description": "Professional sound systems for events"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stage Lighting",
            "description": "Stage lighting design and installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LED Screens",
            "description": "LED screen rentals and installation"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="Our Services - Professional AV & Event Production | StagePass"
        description="StagePass offers comprehensive audio visual services including sound systems, stage lighting, LED screens, video conferencing, and full event production in Kenya."
        keywords="AV services Kenya, sound systems, stage lighting, LED screens, event production, video conferencing"
        url="https://stagepass.co.ke/services"
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
          <Breadcrumb items={[{ label: 'Services', path: '/services' }]} />
        </div>
      </div>
      
      {/* Homepage Services Section */}
      <ServicesSection data={homepageData?.services} />
      
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

export default Services;
