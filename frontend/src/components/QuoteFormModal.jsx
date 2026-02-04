import React, { useState } from 'react';

const QuoteFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Honeypot field for spam protection
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic honeypot check
    if (formData.honeypot) {
      console.log('Spam detected!');
      onClose(); // Close the modal even if spam
      return;
    }

    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    onClose(); // Close modal on successful submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-[#172455]">Get Your AV Quote</h2>
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
              className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Submit Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteFormModal;
