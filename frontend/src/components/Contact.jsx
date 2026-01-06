import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
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
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="text-sm font-semibold text-yellow-600 tracking-wider uppercase">Get In Touch</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
                Let's Create Something Amazing Together
              </h2>
              <p className="text-xl text-gray-600">
                Ready to elevate your next event? Contact us today for a quote or consultation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">Paa ya Paa Lane, Off Ridgeways Road<br />Nairobi, Kenya</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+254 729 171 351</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-yellow-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@stagepass.co.ke</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 700 000 000"
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your event..."
                  rows={4}
                  required
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Send Message <Send className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;