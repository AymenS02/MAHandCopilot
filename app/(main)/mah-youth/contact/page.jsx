"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, Send, MapPin, Instagram, Check } from 'lucide-react';
import Swal from 'sweetalert2';

const twelveHours = 12 * 60 * 60 * 1000;

const ContactPage = () => {
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const successRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    reason: '',
    number: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastSubmitted = localStorage.getItem('contactFormSubmittedAt');
      if (lastSubmitted && Date.now() - parseInt(lastSubmitted, 10) < twelveHours) {
        setSubmitted(true);
      }
    }
  }, []);

  useEffect(() => {
    const loadGSAP = async () => {
      if (typeof window !== 'undefined' && !window.gsap) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = initAnimations;
        document.head.appendChild(script);
      } else if (typeof window !== 'undefined' && window.gsap) {
        initAnimations();
      }
    };

    const initAnimations = () => {
      const tl = window.gsap.timeline({ delay: 0.3 });
      window.gsap.set([headerRef.current, formRef.current, infoRef.current], { opacity: 0, y: 50 });
      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to([formRef.current, infoRef.current], { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 }, "-=0.4");
    };

    loadGSAP();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ 
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, 
          ...formData 
        })
      });

      const result = await response.json();
      if (result.success) {
        localStorage.setItem('contactFormSubmittedAt', Date.now());
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', reason: '', number: '' });

        if (successRef.current && window.gsap) {
          window.gsap.fromTo(
            successRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
          );

          setTimeout(() => {
            window.gsap.to(successRef.current, { opacity: 0, y: -20, duration: 0.6, ease: "power3.in" });
          }, 4000);
        }

        Swal.fire({ 
          title: 'Success!', 
          text: 'Your message has been sent successfully.', 
          icon: 'success', 
          confirmButtonColor: '#10b981'
        });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      Swal.fire({ 
        title: 'Error!', 
        text: error.message, 
        icon: 'error', 
        confirmButtonColor: '#10b981'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: Mail, 
      title: "Email Us", 
      details: "youth@hamiltonmosque.com", 
      description: "Send us an email anytime", 
      link: "mailto:youth@hamiltonmosque.com"
    },
    { 
      icon: MapPin, 
      title: "Visit Us", 
      details: "Muslim Association of Hamilton", 
      description: "1545 Stone Church Rd E, Hamilton, ON", 
      link: "https://maps.google.com"
    },
    { 
      icon: Instagram, 
      title: "Instagram", 
      details: "@themahyouth", 
      description: "Follow us for updates", 
      link: "https://www.instagram.com/themahyouth/"
    },
  ];

  return (
    <>
      <div className="min-h-screen pt-32 pb-20 bg-white relative overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-16">

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light mb-8">
              Have questions, suggestions, or want to get involved? We&apos;d love to hear from you.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Form Section */}
            <div ref={formRef} className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-gray-200 hover:border-yAccent/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-yPrimary/10 rounded-lg">
                    <Send className="w-6 h-6 text-yAccent" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
                </div>

                {/* Success Message */}
                {submitted && (
                  <div 
                    ref={successRef} 
                    className="px-4 py-3 rounded-xl mb-6 flex items-center gap-3 bg-emerald-50 border-2 border-emerald-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-emerald-800 text-sm font-medium">Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-yAccent focus:border-yAccent outline-none transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-yAccent focus:border-yAccent outline-none transition-all" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="number" className="block text-sm font-medium mb-2 text-gray-700">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      id="number" 
                      name="number" 
                      value={formData.number} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-yAccent focus:border-yAccent outline-none transition-all" 
                      placeholder="(555) 123-4567" 
                    />
                  </div>

                  {/* Reason */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium mb-2 text-gray-700">
                      Reason for Contact *
                    </label>
                    <select 
                      id="reason" 
                      name="reason" 
                      value={formData.reason} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-yAccent focus:border-yAccent outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a reason</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Event Information">Event Information</option>
                      <option value="Volunteer Opportunity">Volunteer Opportunity</option>
                      <option value="Youth Leadership">Youth Leadership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                      Message *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      rows={6} 
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-yAccent focus:border-yAccent outline-none transition-all resize-none" 
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  {!submitted && (
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-full bg-yAccent text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  {submitted && (
                    <div className="text-center py-4 px-6 bg-yPrimary/10 rounded-xl border-2 border-yAccent/30">
                      <p className="text-yPrimary font-medium">
                        You&apos;ve already submitted. Please wait 12 hours before submitting again.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Info Section */}
            <div ref={infoRef} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-200 hover:border-yAccent/50 transition-all duration-300">
                <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-yPrimary/10 rounded-lg">
                    <Phone className="w-5 h-5 text-yAccent" />
                  </div>
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <a 
                        key={index} 
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-yPrimary/5 border-2 border-gray-200 hover:border-yAccent transition-all duration-300"
                      >
                        <div className="p-3 rounded-lg bg-yPrimary/10 group-hover:bg-yAccent group-hover:scale-110 transition-all duration-300 shadow-md">
                          <IconComponent className="w-5 h-5 text-yAccent group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 group-hover:text-yPrimary transition-colors mb-1">
                            {info.title}
                          </h4>
                          <p className="font-medium text-gray-700 mb-1 break-words">
                            {info.details}
                          </p>
                          <p className="text-sm text-gray-600">
                            {info.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-yPrimary/10 to-yAccent/10 rounded-2xl p-6 border-2 border-yAccent/30 shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  💡 Quick Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yAccent mt-0.5 font-bold">•</span>
                    <span>We typically respond within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yAccent mt-0.5 font-bold">•</span>
                    <span>For urgent matters, please email us directly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yAccent mt-0.5 font-bold">•</span>
                    <span>Follow us on Instagram for instant updates</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
