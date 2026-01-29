import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import PortfolioSection from '../components/Portfolio';
import useHomepageData from '../hooks/useHomepageData';
import usePageData from '../hooks/usePageData';

const OurWork = () => {
  const { homepageData } = useHomepageData();
  const { pageData, loadError } = usePageData('our-work');

  return (
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
          <Breadcrumb items={[{ label: 'Our Work', path: '/our-work' }]} />
        </div>
      </div>
      
      {/* Homepage Portfolio Section */}
      <PortfolioSection data={homepageData?.portfolio} portfolioSource={homepageData?.settings?.portfolio_source} />
      
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
      
      <Footer data={homepageData?.footer} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default OurWork;
