import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const QuoteFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    mathAnswer: '',
    honeypot: '', // Honeypot field for spam protection
  });
  const [mathChallenge, setMathChallenge] = useState({ a: 0, b: 0 });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    setIsLoading(true);
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    setMathChallenge({ a, b });
    setFormData((prev) => ({ ...prev, mathAnswer: '', phone: '' }));
    setError('');
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      clearTimeout(timer);
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic honeypot check
    if (formData.honeypot) {
      console.log('Spam detected!');
      onClose(); // Close the modal even if spam
      return;
    }

    const expectedAnswer = mathChallenge.a + mathChallenge.b;
    if (Number(formData.mathAnswer) !== expectedAnswer) {
      setError('Please solve the math challenge to continue.');
      return;
    }

    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    onClose(); // Close modal on successful submission
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4" 
      style={{ top: 0, left: 0, right: 0, bottom: 0, position: 'fixed' }}
      onClick={(e) => {
        // Close modal when clicking outside
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-lg relative" style={{ margin: 'auto' }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
        
        <div className="absolute -top-12 -right-12 h-24 w-24 bg-yellow-200/50 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 h-24 w-24 bg-blue-200/40 rounded-full blur-2xl"></div>
        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
              <p className="mt-3 text-sm font-semibold text-[#172455]">Preparing your quote form...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold mb-1 text-center text-[#172455]">Get Your AV Quote</h2>
              <p className="text-center text-gray-600 mb-5 text-sm">Tell us about your event and we'll respond quickly.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#172455] mb-1.5">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
                placeholder="Your full name"
                className="block w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#172455] mb-1.5">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
                placeholder="you@email.com"
                className="block w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[#172455] mb-1.5">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 700 000 000"
              className="block w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm transition-all duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[#172455] mb-1.5">Message</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
                placeholder="Tell us about your event..."
                className="block w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm transition-all duration-300 resize-none"
              required
            ></textarea>
          </div>
            <div>
              <label htmlFor="mathAnswer" className="block text-sm font-semibold text-[#172455] mb-1.5">
                Security: {mathChallenge.a} + {mathChallenge.b} = ?
              </label>
              <input
                type="number"
                id="mathAnswer"
                name="mathAnswer"
                value={formData.mathAnswer}
                onChange={handleChange}
                placeholder="Answer"
                className="block w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm transition-all duration-300"
                required
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
            <div className="flex flex-col sm:flex-row justify-end gap-2.5 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-md"
              >
                Submit Quote
              </button>
            </div>
          </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteFormModal;
