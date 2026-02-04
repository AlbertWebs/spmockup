import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import useHomepageData from '../hooks/useHomepageData';

const IndustryPage = () => {
  const { id } = useParams();
  const { homepageData } = useHomepageData();
  
  // Industry content based on ID - you can fetch from API later
  const getIndustryContent = () => {
    const industryMap = {
      '4': {
        title: 'Industry Services',
        description: 'We provide comprehensive AV solutions for various industries, ensuring professional and reliable service for your specific industry needs.'
      }
    };

    return industryMap[id] || {
      title: 'Industry Services',
      description: 'Professional AV solutions tailored to your industry needs.'
    };
  };

  const content = getIndustryContent();
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Industries', path: '/industries' },
    { label: content.title, path: `/industry/${id}` }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar data={homepageData?.navigation} isPage={true} />
      
      {/* Breadcrumb */}
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      {/* Industry Content */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-6">
          {content.title}
        </h1>
        
        {content.description && (
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {content.description}
          </p>
        )}
        
        {content.content && (
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-7 mb-8"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        )}
      </main>
      
      <Footer data={homepageData?.footer} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default IndustryPage;
