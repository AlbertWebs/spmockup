import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const QuoteFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '', // Honeypot field for spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/quote/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await response.json();

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
          setSuccess(false);
        }, 2000);
      } else {
        setError(data.message || 'Failed to submit quote request. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-[#172455]">Get Your AV Quote</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            Thank you! We'll get back to you within 24 hours.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased space-y from 4 to 6 */}
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-[#172455] mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-[#172455] mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-base font-semibold text-[#172455] mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
              placeholder="+254 700 000 000"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base font-semibold text-[#172455] mb-2">Message</label> {/* Updated label classes */}
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="block w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
              required
            ></textarea>
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
          <div className="flex justify-end space-x-4 mt-6"> {/* Adjusted space-x and added mt */}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-base font-semibold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteFormModal;
