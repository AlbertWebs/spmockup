import React, { useMemo, useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Send, Clock, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import useOnScreen from '../hooks/useOnScreen';
import { API_BASE_URL } from '../config/api';

const Contact = ({ data }) => {
  const { toast } = useToast();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    mathAnswer: '',
    honeypot: '', // Honeypot field - must remain empty
  });
  const [mathChallenge, setMathChallenge] = useState({ a: 0, b: 0, operator: '+' });
  const [formTimestamp, setFormTimestamp] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Generate math challenge when component mounts or form is reset
  useEffect(() => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 2;
    const operator = Math.random() > 0.5 ? '+' : '-';
    setMathChallenge({ a, b, operator });
    setFormTimestamp(Date.now());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Client-side honeypot check
    if (formData.honeypot) {
      console.log('Spam detected via honeypot');
      setIsSubmitting(false);
      return;
    }

    // Client-side math validation
    const expectedAnswer = mathChallenge.operator === '+' 
      ? mathChallenge.a + mathChallenge.b 
      : mathChallenge.a - mathChallenge.b;
    
    if (Number(formData.mathAnswer) !== expectedAnswer) {
      setError('Please solve the math challenge correctly.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          math_answer: formData.mathAnswer,
          math_challenge: `${mathChallenge.a}${mathChallenge.operator}${mathChallenge.b}`,
          honeypot: formData.honeypot,
          form_timestamp: Math.floor(formTimestamp / 1000), // Convert to seconds
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message. Please try again.');
      }

      // Success
      toast({
        title: "Message Sent!",
        description: result.message || "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '', mathAnswer: '', honeypot: '' });
      
      // Generate new math challenge
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const operator = Math.random() > 0.5 ? '+' : '-';
      setMathChallenge({ a, b, operator });
      setFormTimestamp(Date.now());
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      toast({
        title: "Error",
        description: err.message || 'Failed to send message. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const section = data?.section;
  const iconMap = useMemo(() => ({
    MapPin,
    Phone,
    Mail,
    Clock,
  }), []);

  const details = useMemo(() => {
    if (data?.details?.length) {
      return data.details.map((detail) => ({
        label: detail.label,
        value: detail.value,
        Icon: iconMap[detail.icon] || MapPin,
        gradient: detail.icon === 'Phone' || detail.icon === 'Clock'
          ? 'from-[#172455] to-[#1e3a8a]'
          : 'from-yellow-400 to-yellow-600',
        iconColor: detail.icon === 'Phone' || detail.icon === 'Clock' ? 'text-yellow-400' : 'text-white',
      }));
    }
    return [
      {
        label: 'Location',
        value: 'Paa ya Paa Lane, Off Ridgeways Road\nNairobi, Kenya',
        Icon: MapPin,
        gradient: 'from-yellow-400 to-yellow-600',
        iconColor: 'text-white',
      },
      {
        label: 'Phone',
        value: '+254 729 171 351',
        Icon: Phone,
        gradient: 'from-[#172455] to-[#1e3a8a]',
        iconColor: 'text-yellow-400',
      },
      {
        label: 'Email',
        value: 'info@stagepass.co.ke',
        Icon: Mail,
        gradient: 'from-yellow-400 to-yellow-600',
        iconColor: 'text-white',
      },
      {
        label: 'Business Hours',
        value: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM',
        Icon: Clock,
        gradient: 'from-[#172455] to-[#1e3a8a]',
        iconColor: 'text-yellow-400',
      },
    ];
  }, [data, iconMap]);

  const badgeLabel = section?.badge_label || 'Get In Touch';
  const title = section?.title || "Let's Create Something Amazing Together";
  const description = section?.description
    || 'Ready to elevate your next event? Contact us today for a quote or consultation.';

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
              <span className="text-sm font-bold text-yellow-600 tracking-wider uppercase bg-yellow-100 px-4 py-2 rounded-full">{badgeLabel}</span>
              <h2 className="text-5xl lg:text-6xl font-black text-[#172455] mt-6 mb-8 leading-tight">
                {title}
              </h2>
              <div className="h-2 w-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mb-8"></div>
              <p className="text-xl text-gray-700 font-medium">
                {description}
              </p>
            </div>

            <div className="space-y-6">
              {details.map((detail, index) => (
                <div key={index} className="flex items-start space-x-5 group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${detail.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <detail.Icon className={detail.iconColor} size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-[#172455] mb-2 text-lg">{detail.label}</h3>
                    <p className="text-gray-700 font-medium whitespace-pre-line">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className={`bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-10 lg:p-14 border-2 border-gray-100 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
                  disabled={isSubmitting}
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl disabled:opacity-50"
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
                  disabled={isSubmitting}
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl disabled:opacity-50"
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
                  disabled={isSubmitting}
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl disabled:opacity-50"
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
                  disabled={isSubmitting}
                  className="w-full text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl disabled:opacity-50"
                />
              </div>

              {/* Arithmetic Captcha */}
              <div>
                <label className="block text-sm font-bold text-[#172455] mb-3">
                  Security Check: {mathChallenge.a} {mathChallenge.operator} {mathChallenge.b} = ?
                </label>
                <Input
                  type="number"
                  name="mathAnswer"
                  value={formData.mathAnswer}
                  onChange={handleChange}
                  placeholder="Enter answer"
                  required
                  disabled={isSubmitting}
                  className="w-full h-14 text-base border-2 border-gray-200 focus:border-yellow-500 rounded-xl disabled:opacity-50"
                />
                <p className="text-xs text-gray-500 mt-2">Please solve this simple math problem to verify you're human.</p>
              </div>

              {/* Honeypot Field - Hidden from users */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <label htmlFor="honeypot">Leave this field empty</label>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white py-7 text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 font-bold group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message 
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
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