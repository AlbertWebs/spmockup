import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import useHomepageData from '../hooks/useHomepageData';
import usePageData from '../hooks/usePageData';

const Privacy = () => {
  const { homepageData } = useHomepageData();
  const { pageData, loadError } = usePageData('privacy');

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
          <Breadcrumb items={[{ label: 'Privacy Policy', path: '/privacy' }]} />
          </div>
          </div>
      
      <main className="mx-auto max-w-4xl px-6 py-16">
        
        {pageData?.page ? (
          <>
            {pageData.page.hero_title && (
              <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-4">
                {pageData.page.hero_title}
              </h1>
            )}
            {pageData.page.hero_subtitle && (
              <p className="text-lg text-gray-600 mb-4">
                {pageData.page.hero_subtitle}
              </p>
            )}
            {pageData.page.last_updated && (
              <p className="text-sm text-gray-500 mb-8">
                Last updated: {new Date(pageData.page.last_updated).toLocaleDateString()}
              </p>
            )}
            {pageData.page.content && (
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-7"
                dangerouslySetInnerHTML={{ __html: pageData.page.content }}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Content coming soon...</p>
          </div>
        )}
      </main>
      <Footer data={homepageData?.footer} settings={homepageData?.settings} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default Privacy;
