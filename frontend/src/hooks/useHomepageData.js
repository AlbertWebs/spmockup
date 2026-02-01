import { useEffect, useState } from 'react';

const useHomepageData = () => {
  const [homepageData, setHomepageData] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const loadHomepageData = async () => {
      try {
        setLoadError('');
        const baseUrl = process.env.REACT_APP_API_BASE_URL
          || (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://stagepassapi.designekta.com');
        const response = await fetch(`${baseUrl}/api/content/homepage`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to load homepage content.');
        }
        const payload = await response.json();
        if (isMounted) {
          setHomepageData(payload);
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          setLoadError('Unable to load homepage content.');
        }
      }
    };

    loadHomepageData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { homepageData, loadError };
};

export default useHomepageData;
