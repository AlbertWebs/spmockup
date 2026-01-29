import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import ContactSection from '../components/Contact';
import useHomepageData from '../hooks/useHomepageData';
import usePageData from '../hooks/usePageData';

const ContactPage = () => {
  const { homepageData } = useHomepageData();
  const { pageData, loadError } = usePageData('contact');

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
          <Breadcrumb items={[{ label: 'Contact', path: '/contact' }]} />
        </div>
      </div>
      
      {/* Homepage Contact Section */}
      <ContactSection data={homepageData?.contact} />
      
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
              className="prose prose-lg max-w-none text-gray-700 leading-7 mb-8"
              dangerouslySetInnerHTML={{ __html: pageData.page.content }}
            />
          )}
          {pageData.page.form_title && (
            <h2 className="text-2xl font-bold text-[#172455] mb-2">
              {pageData.page.form_title}
            </h2>
          )}
          {pageData.page.form_description && (
            <p className="text-gray-600 mb-6">
              {pageData.page.form_description}
            </p>
          )}
        </main>
      )}
      
      {/* Google Maps Section */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.912275276431!2d36.843964!3d-1.2210802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1607cace031f%3A0xf92242b77a4956a5!2sStagePass%20Audio%20Visual%20Limited!5e0!3m2!1sen!2ske!4v1769701077953!5m2!1sen!2ske" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="StagePass Audio Visual Location"
          ></iframe>
        </div>
      </section>
      
      <Footer data={homepageData?.footer} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default ContactPage;
