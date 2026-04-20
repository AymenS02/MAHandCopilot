'use client';
import React from 'react';
import { Calendar, Users, Book, Heart, Trophy, Sparkles, ArrowRight } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: Calendar,
      title: "Weekly Events",
      description: "Join us for Jumu'ah circles, study groups, and youth nights throughout the week",
      features: ["Friday Circles", "Study Sessions", "Social Activities"]
    },
    {
      icon: Book,
      title: "Islamic Education",
      description: "Deepen your knowledge through Quran studies, Tafseer sessions, and Islamic courses",
      features: ["Quran Memorization", "Tafseer Classes", "Islamic History"]
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connect with fellow youth through sports, retreats, and community service projects",
      features: ["Sports Leagues", "Annual Retreats", "Service Projects"]
    },
    {
      icon: Heart,
      title: "Youth Leadership",
      description: "Develop your leadership skills and become an active voice in our community",
      features: ["Leadership Training", "Event Planning", "Mentorship"]
    },
    {
      icon: Trophy,
      title: "Sports & Recreation",
      description: "Stay active with basketball, soccer, and other recreational activities",
      features: ["Basketball League", "Soccer Tournaments", "Gym Access"]
    },
    {
      icon: Sparkles,
      title: "Special Events",
      description: "Experience memorable moments with iftars, Eid celebrations, and cultural events",
      features: ["Ramadan Iftars", "Eid Celebrations", "Cultural Nights"]
    }
  ];

  return (
    <section className="min-h-screen py-24 bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">

          {/* Title */}
          <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              What We Offer
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Discover programs designed to strengthen your faith, build lasting friendships, and empower you as a leader
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-yAccent transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl shadow-lg"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yPrimary/5 to-yAccent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    {/* Icon Background Glow */}
                    <div className="absolute inset-0 bg-yAccent/20 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                    
                    {/* Icon Circle */}
                    <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-yPrimary/10 border-2 border-yPrimary/20 group-hover:border-yAccent transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-md">
                      <IconComponent className="w-10 h-10 text-yAccent" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yPrimary transition-colors duration-300">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>

                  {/* Divider */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                        <div className="w-1.5 h-1.5 bg-yAccent rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Link */}
                  <button className="text-yPrimary hover:text-yAccent transition-colors duration-300 font-bold text-sm flex items-center gap-2 group/link">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-yAccent rounded-2xl border-2 border-yAccent p-12 max-w-4xl mx-auto shadow-xl">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Get Involved?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Join us for our next event and become part of our vibrant community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => {window.location.href = './mah-youth/events'}} className="bg-white text-yPrimary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group border-2 border-white">
              <span>View Events</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button onClick={() => {window.location.href = './mah-youth/contact'}} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-yPrimary transition-all duration-300 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;