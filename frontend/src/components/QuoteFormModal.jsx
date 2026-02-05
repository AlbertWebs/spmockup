import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { API_BASE_URL } from '../config/api';

const QuoteFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '', // Honeypot field for spam protection
  });
  const [mathChallenge, setMathChallenge] = useState({ a: 0, b: 0, operator: '+' });
  const [mathAnswer, setMathAnswer] = useState('');
  const [formTimestamp, setFormTimestamp] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Generate math challenge when modal opens
  useEffect(() => {
    if (isOpen) {
      generateMathChallenge();
      setFormTimestamp(Math.floor(Date.now() / 1000));
    }
  }, [isOpen]);

  const generateMathChallenge = () => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const operator = Math.random() > 0.5 ? '+' : '-';
    setMathChallenge({ a, b, operator });
    setMathAnswer('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic honeypot check
    if (formData.honeypot) {
      onClose();
      return;
    }

    // Validate math answer
    const expectedAnswer = mathChallenge.operator === '+' 
      ? mathChallenge.a + mathChallenge.b 
      : mathChallenge.a - mathChallenge.b;
    
    if (parseInt(mathAnswer) !== expectedAnswer) {
      setError('Please solve the math challenge correctly.');
      generateMathChallenge();
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting quote form to:', `${API_BASE_URL}/api/quote/submit`);
      console.log('Form data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message.substring(0, 50) + '...',
      });

      const response = await fetch(`${API_BASE_URL}/api/quote/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
        credentials: 'omit', // Don't send cookies
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          math_answer: parseInt(mathAnswer),
          math_challenge: `${mathChallenge.a} ${mathChallenge.operator} ${mathChallenge.b}`,
          form_timestamp: formTimestamp,
          honeypot: formData.honeypot,
        }),
      });

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        // Try to parse as JSON first
        let errorMessage = `Server error (${response.status}): ${response.statusText}`;
        let errorData = null;
        
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            // If not JSON, try to get text (might be HTML error page)
            const text = await response.text();
            // Try to extract error from HTML if it's an error page
            if (text.includes('419') || text.includes('Page Expired')) {
              errorMessage = 'Session expired. Please refresh the page and try again.';
            } else if (text.includes('500') || text.includes('Internal Server Error')) {
              errorMessage = 'Server error. Please try again later or contact support.';
            } else {
              errorMessage = `Server error: ${text.substring(0, 200)}`;
            }
          }
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          errorMessage = `Server error (${response.status}). Unable to parse error message.`;
        }
        
        console.error('Quote form submission error:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: `${API_BASE_URL}/api/quote/submit`,
        });
        
        setError(errorMessage);
        return;
      }

      // Parse JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        setError('Invalid response from server. Please try again.');
        return;
      }

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            honeypot: '',
          });
          setMathAnswer('');
          generateMathChallenge();
          setFormTimestamp(Math.floor(Date.now() / 1000));
          setSuccess(false);
        }, 2000);
      } else {
        setError(data.message || data.error || 'Failed to submit quote request. Please try again.');
        if (data.errors) {
          console.error('Validation errors:', data.errors);
        }
      }
    } catch (err) {
      console.error('Network or other error:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        apiUrl: `${API_BASE_URL}/api/quote/submit`,
      });
      
      // Provide more specific error messages
      let errorMessage = 'Unable to connect to server. ';
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errorMessage += 'This could be due to:\n';
        errorMessage += '• CORS policy blocking the request\n';
        errorMessage += '• Server is not responding\n';
        errorMessage += '• Network connectivity issue\n';
        errorMessage += `\nAPI URL: ${API_BASE_URL}/api/quote/submit\n`;
        errorMessage += 'Please check the browser console for more details.';
      } else {
        errorMessage += err.message || 'Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999] p-4 overflow-y-auto"
      style={{ isolation: 'isolate', position: 'fixed' }}
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md mx-auto my-auto relative z-[99999]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-extrabold text-center text-[#172455] flex-1">Get Your AV Quote</h2>
          <button
            onClick={onClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {error && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm">
            Thank you! We'll get back to you within 24 hours.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm sm:text-base font-semibold text-[#172455] mb-1 sm:mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm sm:text-base font-semibold text-[#172455] mb-1 sm:mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm sm:text-base font-semibold text-[#172455] mb-1 sm:mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-300"
              placeholder="+254 700 000 000"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm sm:text-base font-semibold text-[#172455] mb-1 sm:mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>
          
          {/* Math Challenge */}
          <div>
            <label htmlFor="mathAnswer" className="block text-sm sm:text-base font-semibold text-[#172455] mb-1 sm:mb-2">
              Math Challenge: {mathChallenge.a} {mathChallenge.operator} {mathChallenge.b} = ?
            </label>
            <input
              type="number"
              id="mathAnswer"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              placeholder="Enter answer"
              required
              className="block w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-300"
            />
          </div>
          
          {/* Honeypot field */}
          <div style={{ display: 'none' }}>
            <label htmlFor="honeypot">Do not fill this field</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 sm:space-x-0 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-gray-700 bg-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg sm:rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render modal using portal to document body to ensure it's above everything
  return createPortal(modalContent, document.body);
};

export default QuoteFormModal;
