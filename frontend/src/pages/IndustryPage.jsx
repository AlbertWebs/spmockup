import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import useHomepageData from '../hooks/useHomepageData';
import { API_BASE_URL } from '../config/api';

const IndustryPage = () => {
  const { id } = useParams();
  const { homepageData } = useHomepageData();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/content/industry/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPageData(data.page);
        }
      } catch (err) {
        console.error('Error fetching industry data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustryData();
  }, [id]);

  const content = pageData || {
    title: 'Industry Services',
    description: 'Professional AV solutions tailored to your industry needs.'
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Industries', path: '/industries' },
    { label: content.title, path: `/industry/${id}` }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
      </div>
    );
  }

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
      
      <Footer data={homepageData?.footer} settings={homepageData?.settings} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default IndustryPage;
