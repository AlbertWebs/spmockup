import React, { useEffect, useMemo, useState } from 'react';

const QuoteFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    mathAnswer: '',
    honeypot: '', // Honeypot field for spam protection
  });
  const [mathChallenge, setMathChallenge] = useState({ a: 0, b: 0 });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    setMathChallenge({ a, b });
    setFormData((prev) => ({ ...prev, mathAnswer: '' }));
    setError('');
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-xl mx-4 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 h-32 w-32 bg-yellow-200/50 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 -left-16 h-32 w-32 bg-blue-200/40 rounded-full blur-2xl"></div>
        <div className="relative">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-14 w-14 rounded-full border-4 border-yellow-200 border-t-yellow-500 animate-spin"></div>
              <p className="mt-4 text-sm font-semibold text-[#172455]">Preparing your quote form...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold mb-2 text-center text-[#172455]">Get Your AV Quote</h2>
              <p className="text-center text-gray-600 mb-8">Tell us about your event and we’ll respond quickly.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          <div>
            <label htmlFor="name" className="block text-base font-semibold text-[#172455] mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
                placeholder="Your full name"
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
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
                placeholder="you@email.com"
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
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
                placeholder="Tell us about your event..."
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
              required
            ></textarea>
          </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="mathAnswer" className="block text-base font-semibold text-[#172455] mb-2">
                  Quick check: {mathChallenge.a} + {mathChallenge.b} =
                </label>
                <input
                  type="number"
                  id="mathAnswer"
                  name="mathAnswer"
                  value={formData.mathAnswer}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base transition-all duration-300"
                  required
                />
              </div>
              <div className="flex items-end text-sm text-gray-500"></div>
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
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-base font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-lg"
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
