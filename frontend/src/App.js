import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import Industries from './components/Industries';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import BottomNavbar from './components/BottomNavbar';
import useHomepageData from './hooks/useHomepageData';
import './App.css';
import Privacy from './pages/Privacy';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import ServicePage from './pages/ServicePage';
import OurWork from './pages/OurWork';
import IndustriesPage from './pages/Industries';
import ContactPage from './pages/Contact';
import Sitemap from './pages/Sitemap';
import SEO from './components/SEO';

const Home = () => {
  const { homepageData, loadError } = useHomepageData();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "StagePass Audio Visual Limited",
    "url": "https://stagepass.co.ke",
    "logo": "https://stagepass.co.ke/uploads/StagePass-LOGO-y.png",
    "image": "https://stagepass.co.ke/uploads/StagePass-LOGO-y.png",
    "description": "StagePass Audio Visual Limited provides professional audio visual, sound engineering, stage lighting, LED screens, and event production services across Kenya.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jacaranda Close, Ridgeways",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.2210922,
      "longitude": 36.8443046
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    },
    "priceRange": "$$",
    "telephone": "+254 729 171 351",
    "email": "info@stagepass.co.ke",
    "openingHours": "Mo-Fr 09:00-18:00, Sa 10:00-16:00",
    "sameAs": [
      "https://facebook.com/stagepass",
      "https://twitter.com/stagepass",
      "https://linkedin.com/company/stagepass"
    ],
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
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Production",
            "description": "Full event production services"
          }
        }
      ]
    }
  };

  return (
    <>
      <SEO
        title="The Best Audio Visual Company in Kenya — StagePass Audio Visual Limited"
        description="StagePass Audio Visual Limited is Kenya's leading events and audio-visual company — offering professional sound systems, event production, video conferencing, stage lighting, LED screens and technical event support in Nairobi and across Kenya."
        keywords="audio visual company Kenya, AV company Nairobi, event production Kenya, sound systems Kenya, stage lighting Kenya, video conferencing Kenya, event technology Kenya, professional event services Kenya"
        url="https://stagepass.co.ke"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gray-900">
        <Navbar data={homepageData?.navigation} />
        <main id="home" className="relative">
          <Hero data={homepageData?.hero} />
        </main>
      {loadError && (
        <div className="bg-red-50 text-red-700 text-center py-4 font-semibold">
          {loadError}
        </div>
      )}
      <About data={homepageData?.about} />
      <Services data={homepageData?.services} />
      <Stats data={homepageData?.stats} />
      <Portfolio data={homepageData?.portfolio} portfolioSource={homepageData?.settings?.portfolio_source} />
      <Industries data={homepageData?.industries} />
      <Clients data={homepageData?.clients} />
        <Contact data={homepageData?.contact} />
        <Footer data={homepageData?.footer} />
        <BottomNavbar data={homepageData?.navigation?.bottom_links} />
      </div>
    </>
  );
};

function App() {
  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:service" element={<ServicePage />} />
            <Route path="/service/:service/:subservice" element={<ServicePage />} />
            <Route path="/services/:service" element={<ServicePage />} />
            <Route path="/services/:service/:subservice" element={<ServicePage />} />
            <Route path="/our-work" element={<OurWork />} />
            <Route path="/our-Work" element={<OurWork />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </HelmetProvider>
  );
}

export default App;