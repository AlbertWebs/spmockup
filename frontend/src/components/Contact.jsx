import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import useOnScreen from '../hooks/useOnScreen';

const Contact = () => {
  const { toast } = useToast();
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                  <p className="text-gray-700 font-medium">Paa ya Paa Lane, Off Ridgeways Road<br />Nairobi, Kenya</p>
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#172455] to-[#1e3a8a] hover:from-[#0f1b3d] hover:to-[#172455] text-white py-7 text-lg rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 font-bold group"
              >
                Send Message 
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