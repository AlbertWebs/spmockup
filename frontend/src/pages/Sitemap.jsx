import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import useHomepageData from '../hooks/useHomepageData';
import { Map, Home, Info, Briefcase, Building2, Mail, Shield, FileText } from 'lucide-react';

const Sitemap = () => {
  const { homepageData } = useHomepageData();
  const baseUrl = 'http://stagepass.co.ke';

  const mainPages = [
    { path: '/', label: 'Home', icon: Home, description: 'Welcome to StagePass Audio Visual' },
    { path: '/about', label: 'About Us', icon: Info, description: 'Learn about StagePass and our mission' },
    { path: '/services', label: 'Services', icon: Briefcase, description: 'Our professional AV services' },
    { path: '/our-work', label: 'Our Work', icon: Map, description: 'View our portfolio and projects' },
    { path: '/industries', label: 'Industries', icon: Building2, description: 'Industries we serve' },
    { path: '/contact', label: 'Contact Us', icon: Mail, description: 'Get in touch with our team' },
  ];

  const legalPages = [
    { path: '/privacy', label: 'Privacy Policy', icon: Shield, description: 'Our privacy policy and data protection' },
    { path: '/terms-and-conditions', label: 'Terms and Conditions', icon: FileText, description: 'Terms of service and conditions' },
  ];

  const homepageSections = [
    { id: 'home', label: 'Home Section', description: 'Hero section and introduction' },
    { id: 'about', label: 'About Section', description: 'About StagePass Audio Visual' },
    { id: 'services', label: 'Services Section', description: 'Our AV services overview' },
    { id: 'portfolio', label: 'Portfolio Section', description: 'Our work and projects' },
    { id: 'industries', label: 'Industries Section', description: 'Industries we serve' },
    { id: 'contact', label: 'Contact Section', description: 'Contact information and form' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar data={homepageData?.navigation} isPage={true} />
      
      {/* Breadcrumb */}
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-6xl px-6">
          <Breadcrumb items={[{ label: 'Sitemap', path: '/sitemap' }]} />
        </div>
      </div>

      {/* Sitemap Content */}
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-4">
            Sitemap
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find all pages and sections of the StagePass Audio Visual website
          </p>
        </div>

        {/* Main Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#172455] mb-6 flex items-center gap-2">
            <Map className="w-6 h-6 text-yellow-500" />
            Main Pages
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-lg flex items-center justify-center group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#172455] mb-1 group-hover:text-yellow-600 transition-colors">
                        {page.label}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                      <span className="text-xs text-gray-500 font-mono">{baseUrl}{page.path}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Legal Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#172455] mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-yellow-500" />
            Legal & Policy Pages
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {legalPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-lg flex items-center justify-center group-hover:from-yellow-400 group-hover:to-yellow-600 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#172455] mb-1 group-hover:text-yellow-600 transition-colors">
                        {page.label}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{page.description}</p>
                      <span className="text-xs text-gray-500 font-mono">{baseUrl}{page.path}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Homepage Sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#172455] mb-6 flex items-center gap-2">
            <Home className="w-6 h-6 text-yellow-500" />
            Homepage Sections
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200">
            <p className="text-gray-600 mb-6">
              The homepage contains the following sections that can be accessed via anchor links:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {homepageSections.map((section) => (
                <a
                  key={section.id}
                  href={`/#${section.id}`}
                  className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-yellow-500 rounded-full group-hover:scale-150 transition-transform"></div>
                  <div>
                    <h4 className="font-semibold text-[#172455] group-hover:text-yellow-600 transition-colors">
                      {section.label}
                    </h4>
                    <p className="text-xs text-gray-500">{section.description}</p>
                    <span className="text-xs text-gray-400 font-mono">{baseUrl}/#{section.id}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* XML Sitemap Link */}
        <section className="bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">XML Sitemap</h2>
          <p className="text-gray-300 mb-6">
            For search engines, you can access our XML sitemap at:
          </p>
          <a
            href={`${baseUrl}/sitemap.xml`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-[#172455] font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View XML Sitemap
          </a>
          <p className="text-sm text-gray-300 mt-4 font-mono">{baseUrl}/sitemap.xml</p>
        </section>
      </main>

      <Footer data={homepageData?.footer} settings={homepageData?.settings} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default Sitemap;
