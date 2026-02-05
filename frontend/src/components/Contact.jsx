import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import useOnScreen from '../hooks/useOnScreen';
import { API_BASE_URL } from '../config/api';

const Contact = () => {
  const { toast } = useToast();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
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

  // Generate math challenge when component mounts or form is reset
  useEffect(() => {
    generateMathChallenge();
    setFormTimestamp(Math.floor(Date.now() / 1000));
  }, []);

  const generateMathChallenge = () => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const operator = Math.random() > 0.5 ? '+' : '-';
    setMathChallenge({ a, b, operator });
    setMathAnswer('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic honeypot check
    if (formData.honeypot) {
      return; // Silent fail for bots
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
      console.log('Submitting contact form to:', `${API_BASE_URL}/api/contact/submit`);
      
      const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
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

      // Check if response is ok
      if (!response.ok) {
        let errorMessage = `Server error (${response.status}): ${response.statusText}`;
        let errorData = null;
        
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } else {
            const text = await response.text();
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
        
        console.error('Contact form submission error:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: `${API_BASE_URL}/api/contact/submit`,
        });
        
        setError(errorMessage);
        setIsSubmitting(false);
        return;
      }

      // Parse JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        setError('Invalid response from server. Please try again.');
        setIsSubmitting(false);
        return;
      }

      if (data.success) {
        toast({
          title: "Message Sent!",
          description: data.message || "We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
        setMathAnswer('');
        generateMathChallenge();
        setFormTimestamp(Math.floor(Date.now() / 1000));
      } else {
        setError(data.message || data.error || 'Failed to submit message. Please try again.');
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
        apiUrl: `${API_BASE_URL}/api/contact/submit`,
      });
      
      let errorMessage = 'Unable to connect to server. ';
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        errorMessage += 'This could be due to:\n';
        errorMessage += '• CORS policy blocking the request\n';
        errorMessage += '• Server is not responding\n';
        errorMessage += '• Network connectivity issue\n';
        errorMessage += `\nAPI URL: ${API_BASE_URL}/api/contact/submit\n`;
        errorMessage += 'Please check the browser console for more details.';
      } else {
        errorMessage += err.message || 'Please check your internet connection and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  return (
    <>
    <section id="contact" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-[700px] h-[700px] bg-yellow-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#172455] rounded-full blur-3xl opacity-5 animate-pulse-slower"></div>
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left - Contact Info */}
          <div className={`space-y-10 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div>
              <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">Get In Touch</span>
              <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8 leading-tight">
                Let's Create Something Amazing Together
              </h2>
              <div className="h-2 w-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mb-8"></div>
              <p className="text-xl text-gray-700 font-medium">
                Ready to elevate your next event? <span className="text-[#172455] font-bold">Contact us today</span> for a quote or consultation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-5 group">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MapPin className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="font-black text-[#172455] mb-2 text-lg">Location</h3>
                  <p className="text-gray-700 font-medium">Jacaranda Close, Ridgeways, <br />Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="text-yellow-400" size={28} />
                </div>
                <div>
                  <h3 className="font-black text-[#172455] mb-2 text-lg">Phone</h3>
                  <p className="text-gray-700 font-medium">+254 729 171 351</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="font-black text-[#172455] mb-2 text-lg">Email</h3>
                  <p className="text-gray-700 font-medium">info@stagepass.co.ke</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#172455] to-[#1e3a8a] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Clock className="text-yellow-400" size={28} />
                </div>
                <div>
                  <h3 className="font-black text-[#172455] mb-2 text-lg">Business Hours</h3>
                  <p className="text-gray-700 font-medium">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-10 lg:p-14 border-2 border-gray-100 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-[#172455] mb-3">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#172455] mb-3">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#172455] mb-3">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 700 000 000"
                  required
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#172455] mb-3">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event..."
                  rows={5}
                  required
                  className="w-full text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              {/* Math Challenge */}
              <div>
                <label className="block text-sm font-bold text-[#172455] mb-3">
                  Math Challenge: {mathChallenge.a} {mathChallenge.operator} {mathChallenge.b} = ?
                </label>
                <Input
                  type="number"
                  value={mathAnswer}
                  onChange={(e) => setMathAnswer(e.target.value)}
                  placeholder="Enter answer"
                  required
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl"
                />
              </div>

              {/* Honeypot field - hidden */}
              <div style={{ display: 'none' }}>
                <label htmlFor="honeypot">Do not fill this field</label>
                <Input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white py-7 text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 font-bold group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </> // Closing Fragment tag
  );
};

export default Contact;