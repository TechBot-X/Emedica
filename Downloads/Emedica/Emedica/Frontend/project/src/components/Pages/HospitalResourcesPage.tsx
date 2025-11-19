import React, { useState } from 'react';
import { Bed, Activity, AlertTriangle, FileText, Download, Users, Cpu, Server, Bell, BookOpen, ClipboardList, TrendingUp, Leaf, ArrowRight } from 'lucide-react'; // Added ArrowRight for buttons

const HospitalResourcesPage: React.FC = () => {
  const [resources] = useState({
    beds: 120,
    bedsAvailable: 18,
    icu: 20,
    icuAvailable: 2,
    ventilators: 15,
    ventilatorsAvailable: 3,
    oxygen: '78%',
    staffOnDuty: 56,
  });
  const alerts = [
    { type: 'Shortage', message: 'Oxygen level below 80% – Refill required soon.' },
    { type: 'Maintenance', message: 'Ventilator #4 scheduled for maintenance.' },
  ];
  const docs = [
    { name: 'Resource Management Policy', url: '#', type: 'Policy' },
    { name: 'Room Booking Form', url: '#', type: 'Form' },
    { name: 'Eco-Friendly Practices Infographic', url: '#', type: 'Infographic' },
  ];
  const guidelines = [
    { title: 'SOP: Bed Allocation', url: '#' },
    { title: 'Training: Equipment Handling', url: '#' },
    { title: 'Manual: IoT Dashboard', url: '#' },
  ];
  const analytics = [
    { label: 'Bed Occupancy Rate', value: '85%' },
    { label: 'ICU Utilization', value: '90%' },
    { label: 'Ventilator Usage', value: '80%' },
    { label: 'Energy Savings (YTD)', value: '12%' },
  ];

  // Helper to determine status for visual indicators (e.g., for oxygen)
  const getOxygenStatusColor = (level: string) => {
    const numericLevel = parseInt(level, 10);
    if (numericLevel < 50) return 'text-red-500';
    if (numericLevel < 80) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-8 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Hospital Smart Resources</h1>
          <nav>
            {/* Add navigation links here if needed */}
          </nav>
        </div>
      </header>

      <main className="space-y-12 p-6 max-w-6xl mx-auto py-10">
        {/* Overview Section */}
        <section className="text-center mt-6 mb-12">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our hospital leverages <strong className="text-blue-600">smart resource management</strong> to optimize patient care, reduce waste, and ensure sustainability. Real-time monitoring, automation, and predictive analytics help us deliver efficient, eco-friendly healthcare services.
          </p>
        </section>

        {/* Live Resource Dashboard */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-800">
            <Activity className="w-6 h-6 text-blue-600" /> Live Resource Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-sm">
              <Bed className="w-10 h-10 text-blue-600 mb-2" />
              <span className="font-extrabold text-3xl text-blue-800">{resources.bedsAvailable}</span>
              <span className="text-gray-600 text-sm">/ {resources.beds} Beds Available</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-sm">
              <Server className="w-10 h-10 text-purple-600 mb-2" />
              <span className="font-extrabold text-3xl text-purple-800">{resources.icuAvailable}</span>
              <span className="text-gray-600 text-sm">/ {resources.icu} ICU Beds</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-sm">
              <Cpu className="w-10 h-10 text-green-600 mb-2" />
              <span className="font-extrabold text-3xl text-green-800">{resources.ventilatorsAvailable}</span>
              <span className="text-gray-600 text-sm">/ {resources.ventilators} Ventilators</span>
            </div>
            <div className={`flex flex-col items-center p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-sm ${parseInt(resources.oxygen) < 80 ? 'bg-orange-50' : 'bg-cyan-50'}`}>
              <Bell className="w-10 h-10 text-cyan-600 mb-2" />
              <span className={`font-extrabold text-3xl ${getOxygenStatusColor(resources.oxygen)}`}>{resources.oxygen}</span>
              <span className="text-gray-600 text-sm">Oxygen Level</span>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* Resource Categories */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-800">
            <ClipboardList className="w-6 h-6 text-green-600" /> Resource Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <Bed className="w-8 h-8 mb-3 text-blue-700" />
              <span className="font-semibold text-lg text-blue-900">Equipment</span>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <Server className="w-8 h-8 mb-3 text-purple-700" />
              <span className="font-semibold text-lg text-purple-900">Infrastructure</span>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-100 to-green-50 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <Users className="w-8 h-8 mb-3 text-green-700" />
              <span className="font-semibold text-lg text-green-900">Staff</span>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
              <FileText className="w-8 h-8 mb-3 text-yellow-700" />
              <span className="font-semibold text-lg text-yellow-900">Medicines</span>
            </div>
          </div>
        </section>

        {/* --- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Alerts & Notifications */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-700">
              <AlertTriangle className="w-6 h-6 text-red-600" /> Alerts & Notifications
            </h2>
            <ul className="space-y-4">
              {alerts.map((alert, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200 text-red-800">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-base leading-relaxed">{alert.message}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Technology Used */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-indigo-800">
              <Cpu className="w-6 h-6 text-indigo-600" /> Technology Used
            </h2>
            <ul className="list-inside list-disc pl-4 text-gray-700 space-y-3 text-lg">
              <li><strong className="text-indigo-700">Hospital Management System (HMS)</strong> for integrated operations.</li>
              <li><strong className="text-indigo-700">IoT Sensors</strong> for real-time monitoring and data collection.</li>
              <li><strong className="text-indigo-700">AI-driven analytics & predictions</strong> for optimal resource allocation.</li>
              <li><strong className="text-indigo-700">Automation</strong> for streamlined scheduling and critical alerts.</li>
            </ul>
          </section>
        </div>

        {/* --- */}

        {/* Booking/Request System */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-pink-700">
            <BookOpen className="w-6 h-6 text-pink-600" /> Booking & Request System
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <input
              type="text"
              placeholder="Equipment or Room Name"
              className="border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
            />
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
            />
            <input
              type="time"
              className="border border-gray-300 rounded-lg px-5 py-3 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Request Booking <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4 italic">* This system is for internal staff use only.</p>
        </section>

        {/* --- */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sustainability Info */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-700">
              <Leaf className="w-6 h-6 text-green-600" /> Sustainability Initiatives
            </h2>
            <ul className="list-inside list-disc pl-4 text-gray-700 space-y-3 text-lg">
              <li>Implementing <strong className="text-green-700">smart energy management</strong> systems (solar, LED, automation).</li>
              <li>Promoting effective <strong className="text-green-700">water conservation & recycling</strong> programs.</li>
              <li>Adhering to <strong className="text-green-700">eco-friendly waste disposal</strong> practices.</li>
              <li>Adopting <strong className="text-green-700">green procurement policies</strong> for all supplies.</li>
            </ul>
          </section>

          {/* Reports & Analytics */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-blue-700">
              <TrendingUp className="w-6 h-6 text-blue-600" /> Reports & Analytics
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {analytics.map((item, idx) => (
                <div key={idx} className="bg-blue-50 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm border border-blue-100">
                  <span className="font-extrabold text-3xl text-blue-800">{item.value}</span>
                  <span className="text-gray-600 text-sm text-center mt-1">{item.label}</span>
                  {/* Could add a small progress bar here */}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Staff Guidelines */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-orange-700">
              <BookOpen className="w-6 h-6 text-orange-600" /> Staff Guidelines & SOPs
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-3">
              {guidelines.map((g, idx) => (
                <li key={idx} className="text-lg">
                  <a href={g.url} className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 flex items-center gap-2">
                    {g.title} <ArrowRight className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Downloadable Docs */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
              <Download className="w-6 h-6 text-gray-600" /> Downloadable Documents
            </h2>
            <ul className="space-y-4">
              {docs.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <FileText className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  <a href={doc.url} className="text-blue-600 hover:text-blue-800 underline font-medium text-base truncate flex-grow">
                    {doc.name}
                  </a>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">{doc.type}</span>
                  <Download className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-700 transition-colors duration-200" />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6 text-center mt-12">
        <p>&copy; {new Date().getFullYear()} Hospital Smart Resource Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HospitalResourcesPage;