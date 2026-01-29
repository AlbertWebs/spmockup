import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import PWAInstallPrompt from './components/PWAInstallPrompt';
import useHomepageData from './hooks/useHomepageData';
import './App.css';
import Privacy from './pages/Privacy';
import TermsAndConditions from './pages/TermsAndConditions';
import AboutPage from './pages/About';
import ServicesPage from './pages/Services';
import OurWork from './pages/OurWork';
import IndustriesPage from './pages/Industries';
import ContactPage from './pages/Contact';
import Sitemap from './pages/Sitemap';

const Home = () => {
  const { homepageData, loadError } = useHomepageData();

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar data={homepageData?.navigation} />
      <div id="home" className="relative">
        <Hero data={homepageData?.hero} />
      </div>
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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/our-Work" element={<OurWork />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/sitemap" element={<Sitemap />} />
        </Routes>
      </BrowserRouter>
      <PWAInstallPrompt />
      <Toaster />
    </div>
  );
}

export default App;