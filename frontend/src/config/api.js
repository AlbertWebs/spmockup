// API Configuration
// Set REACT_APP_API_BASE_URL in .env file to override
const getApiBaseUrl = () => {
  // Check for environment variable first
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  // Default to production API
  return 'https://stagepassapi.designekta.com';
};

export const API_BASE_URL = getApiBaseUrl();
