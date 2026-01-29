import { useEffect, useState } from 'react';

const usePageData = (endpoint) => {
  const [pageData, setPageData] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadPageData = async () => {
      try {
        setLoadError('');
        const baseUrl = process.env.REACT_APP_API_BASE_URL
          || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '');
        const response = await fetch(`${baseUrl}/api/content/${endpoint}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to load ${endpoint} content.`);
        }
        const payload = await response.json();
        if (isMounted) {
          setPageData(payload);
          
          // Set comprehensive SEO meta tags
          if (payload.page) {
            const siteName = payload.settings?.site_name || 'StagePass';
            const websiteUrl = payload.settings?.website_url || window.location.origin;
            const pageTitle = payload.page.title || 'StagePass';
            const pageDescription = payload.page.meta_description || '';
            const pageKeywords = payload.page.meta_keywords || '';
            const ogImage = payload.page.og_image || '';
            
            // Get current path for canonical URL
            const currentPath = window.location.pathname;
            const canonicalUrl = `${websiteUrl}${currentPath}`;
            
            // Helper function to set or update meta tag
            const setMetaTag = (selector, attribute, value, content) => {
              let meta = document.querySelector(selector);
              if (!meta) {
                meta = document.createElement('meta');
                if (attribute === 'name') {
                  meta.setAttribute('name', value);
                } else if (attribute === 'property') {
                  meta.setAttribute('property', value);
                }
                document.head.appendChild(meta);
              }
              meta.setAttribute('content', content);
            };
            
            // Set document title
            document.title = pageTitle;
            
            // Basic meta tags
            if (pageDescription) {
              setMetaTag('meta[name="description"]', 'name', 'description', pageDescription);
            }
            
            if (pageKeywords) {
              setMetaTag('meta[name="keywords"]', 'name', 'keywords', pageKeywords);
            }
            
            // Open Graph tags
            setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
            if (pageDescription) {
              setMetaTag('meta[property="og:description"]', 'property', 'og:description', pageDescription);
            }
            setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
            setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
            setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteName);
            if (ogImage) {
              setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
              setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', ogImage);
            }
            
            // Twitter Card tags
            setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
            setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
            if (pageDescription) {
              setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', pageDescription);
            }
            if (ogImage) {
              setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
            }
            
            // Canonical URL
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
              canonical = document.createElement('link');
              canonical.setAttribute('rel', 'canonical');
              document.head.appendChild(canonical);
            }
            canonical.setAttribute('href', canonicalUrl);
          }
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          setLoadError(`Unable to load ${endpoint} content.`);
        }
      }
    };

    loadPageData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [endpoint]);

  return { pageData, loadError };
};

export default usePageData;
