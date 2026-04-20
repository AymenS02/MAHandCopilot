'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Calendar, LogOut, Activity, ArrowRight, Users, Eye, BarChart3, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0
  });
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/mah-youth/login');
      return;
    }
    
    setUser(JSON.parse(userData));
    fetchStats();
  }, [router]);

  const fetchStats = async () => {
    try {
      // Fetch events
      const eventsRes = await fetch("/api/events");
      const eventsData = await eventsRes.json();

      // Fetch registrations
      const regsRes = await fetch("/api/registrations");
      const regsData = await regsRes.json();

      if (eventsRes.ok && eventsData.events) {
        const now = new Date();
        const upcoming = eventsData.events.filter(event => new Date(event.date) >= now);
        
        // Get actual registration count from registrations API
        const totalRegs = regsData.success ? regsData.count : 0;

        console.log("📊 Dashboard Stats:", {
          totalEvents: eventsData.events.length,
          upcomingEvents: upcoming.length,
          totalRegistrations: totalRegs
        });

        setStats({
          totalEvents: eventsData.events.length,
          upcomingEvents: upcoming.length,
          totalRegistrations: totalRegs
        });
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.scrollTo(0, 0);
    router.push('/mah-youth/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yAccent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-900 text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-yAccent/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-yPrimary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Dashboard Header */}
      <div className="pt-32 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 bg-yPrimary/5 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border-2 border-yAccent/30">
                <Activity className="w-5 h-5 text-yAccent" />
                <span className="text-sm font-bold text-yPrimary tracking-wider uppercase">
                  Admin Panel
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-3">
                Dashboard
              </h1>
              <p className="text-xl text-gray-700">
                Welcome back, <span className="text-yPrimary font-bold">{user.name}</span>
              </p>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-red-50 border-2 border-red-200 text-red-600 px-8 py-4 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300 font-bold flex items-center gap-2 justify-center group"
            >
              <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Total Events */}
          <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yAccent transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-yPrimary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-yAccent" />
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">Total Events</p>
              <p className="text-5xl font-black text-gray-900 mb-2">{stats.totalEvents}</p>
              <p className="text-gray-500 text-sm">All events in system</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  router.push('/mah-youth/dashboard/events');
                }}
                className="text-yPrimary hover:text-yAccent transition-colors duration-300 font-medium flex items-center gap-2 group/link"
              >
                View all events
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-emerald-500 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">Upcoming Events</p>
              <p className="text-5xl font-black text-gray-900 mb-2">{stats.upcomingEvents}</p>
              <p className="text-gray-500 text-sm">Future scheduled events</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-emerald-600 font-medium flex items-center gap-2">
                Active & scheduled
              </p>
            </div>
          </div>

          {/* Total Registrations */}
          <div className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-yAccent/80 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="p-4 bg-purple-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-yAccent" />
              </div>
              <div className="p-3 bg-pink-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">Total Registrations</p>
              <p className="text-5xl font-black text-gray-900 mb-2">{stats.totalRegistrations}</p>
              <p className="text-gray-500 text-sm">Across all events</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-yAccent font-medium">
                Avg: {stats.totalEvents > 0 ? Math.round(stats.totalRegistrations / stats.totalEvents) : 0} per event
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-yPrimary/10 rounded-lg">
              <Activity className="w-6 h-6 text-yAccent" />
            </div>
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Events Management Card */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-yAccent transition-all duration-500 group shadow-lg">
              {/* Header */}
              <div className="bg-yPrimary p-6">
                <div className="flex items-center text-white">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Events Management</h3>
                    <p className="text-white/90">{stats.totalEvents} total events</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Create, edit, and manage all your community events in one place. Keep your audience engaged with up-to-date event information.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      router.push('/mah-youth/dashboard/events/add');
                    }}
                    className="w-full flex items-center justify-center px-6 py-4 bg-yPrimary text-white rounded-xl hover:shadow-lg transition-all duration-300 font-bold group/btn transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/btn:rotate-90" />
                    Add New Event
                  </button>
                  
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      router.push('/mah-youth/dashboard/events');
                    }}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gray-50 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 hover:border-yAccent transition-all duration-300 font-bold group/btn"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Manage All Events
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last updated</span>
                  <span className="text-yPrimary font-medium">Just now</span>
                </div>
              </div>
            </div>

            {/* Registrations Management Card */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:yAccent transition-all duration-500 group shadow-lg">
              {/* Header */}
              <div className="bg-yAccent p-6">
                <div className="flex items-center text-white">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                    <Users className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Registrations</h3>
                    <p className="text-white/90">{stats.totalRegistrations} total registrations</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  View and manage all event registrations. Track attendees, check capacity, and export registration data.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      router.push('/mah-youth/dashboard/registrations');
                    }}
                    className="w-full flex items-center justify-center px-6 py-4 bg-yAccent text-white rounded-xl hover:shadow-lg transition-all duration-300 font-bold group/btn transform hover:scale-105"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View All Registrations
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  <div className="bg-yAccent/90 border-2 border-yAccent/60 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-yAccent text-sm font-medium">Average per event</span>
                      <span className="text-yAccent font-bold text-lg">
                        {stats.totalEvents > 0 ? Math.round(stats.totalRegistrations / stats.totalEvents) : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="text-yAccent font-medium">Active</span>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard Card */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-primary transition-all duration-500 group shadow-lg">
              {/* Header */}
              <div className="bg-primary p-6">
                <div className="flex items-center text-white">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm mr-4">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Analytics</h3>
                    <p className="text-white/90">Data insights & trends</p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  View comprehensive analytics with charts, graphs, and insights. Track demographics, trends, and event performance.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      router.push('/mah-youth/dashboard/analytics');
                    }}
                    className="w-full flex items-center justify-center px-6 py-4 bg-primary text-white rounded-xl hover:shadow-lg transition-all duration-300 font-bold group/btn transform hover:scale-105"
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    View Analytics Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  <div className="bg-primary/10 border-2 border-primary/40 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-sm font-medium">Features</span>
                      <span className="text-primary font-bold text-lg">Charts & Filters</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="bg-gray-50 px-6 py-4 border-t-2 border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Real-time data</span>
                  <span className="text-primary font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}