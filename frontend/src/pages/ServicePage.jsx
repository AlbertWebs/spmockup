import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import SEO from '../components/SEO';
import useHomepageData from '../hooks/useHomepageData';
import { API_BASE_URL } from '../config/api';

const ServicePage = () => {
  const { service, subservice } = useParams();
  const { homepageData } = useHomepageData();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = subservice 
          ? `${API_BASE_URL}/api/content/service/${service}/${subservice}`
          : `${API_BASE_URL}/api/content/service/${service}`;
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setPageData(data.page || data);
        } else {
          setError('Service page not found');
        }
      } catch (err) {
        console.error('Error fetching service data:', err);
        setError('Failed to load service page');
      } finally {
        setLoading(false);
      }
    };

    if (service) {
      fetchServiceData();
    }
  }, [service, subservice]);

  const content = pageData || {
    title: service ? service.charAt(0).toUpperCase() + service.slice(1).replace(/-/g, ' ') : 'Service',
    description: 'Professional AV services for your event needs.'
  };

  const pageTitle = content.title 
    ? `${content.title} - StagePass Audio Visual Services`
    : 'Service - StagePass Audio Visual';
  
  const pageUrl = subservice 
    ? `https://stagepass.co.ke/services/${service}/${subservice}`
    : `https://stagepass.co.ke/services/${service}`;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: content.title, path: `/service/${service}${subservice ? `/${subservice}` : ''}` }
  ];

  if (loading) {
    return (
      <>
        <SEO
          title={pageTitle}
          description={content.description}
          url={pageUrl}
        />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
        </div>
      </>
    );
  }

  if (error && !pageData) {
    return (
      <>
        <SEO
          title={pageTitle}
          description={content.description}
          url={pageUrl}
        />
        <div className="min-h-screen bg-white">
          <Navbar data={homepageData?.navigation} isPage={true} />
          <div className="pt-28 pb-4">
            <div className="mx-auto max-w-4xl px-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </div>
          <main className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {error}
            </p>
          </main>
          <Footer data={homepageData?.footer} />
          <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={pageTitle}
        description={content.description || `Professional ${content.title} services from StagePass Audio Visual Limited in Kenya.`}
        keywords={`${content.title}, audio visual services Kenya, AV services Nairobi, event production`}
        url={pageUrl}
      />
      <div className="min-h-screen bg-white">
        <Navbar data={homepageData?.navigation} isPage={true} />
        
        {/* Breadcrumb */}
        <div className="pt-28 pb-4">
          <div className="mx-auto max-w-4xl px-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>
        
        {/* Service Content */}
        <main className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-6">
            {content.title}
          </h1>
          
          {content.description && (
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {content.description}
            </p>
          )}
          
          {content.content ? (
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-7 mb-8"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          ) : (
            <div className="prose prose-lg max-w-none text-gray-700 leading-7 mb-8">
              <p>Content for this service page is being prepared. Please check back soon or contact us for more information.</p>
            </div>
          )}
        </main>
        
        <Footer data={homepageData?.footer} />
        <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
      </div>
    </>
  );
};

export default ServicePage;
