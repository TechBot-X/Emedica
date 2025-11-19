import React from 'react';
import { Link } from 'react-router-dom';
import { User,Settings, Calendar, FileText, Stethoscope, Pill, CreditCard, Bell, TrendingUp, Lock, Globe, Database, Server, Zap, Languages, Accessibility, AlertTriangle, BookOpen, ArrowRight } from 'lucide-react';

const SystemOverviewPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* 1. Purpose of the System */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-3 mb-2"><Settings className="w-7 h-7 text-blue-600" /> System Overview</h1>
        <p className="text-lg text-gray-700">An all-in-one digital platform for managing hospital operations, doctor consultations, and patient health records.</p>
      </section>

      {/* 3. Key Features/Modules */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-pink-600" /> Key Features & Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Feature icon={<Calendar className="w-5 h-5 text-blue-600" />} label="Appointment Booking System" to="/appointments" />
          <Feature icon={<FileText className="w-5 h-5 text-green-600" />} label="Electronic Medical Records (EMR)" to="/medical-records" />
          <Feature icon={<Stethoscope className="w-5 h-5 text-purple-600" />} label="Online Consultation / Telemedicine" to="/consultations" />
          <Feature icon={<User className="w-5 h-5 text-blue-400" />} label="Doctor Profile Management" to="/user-management" />
          <Feature icon={<User className="w-5 h-5 text-green-400" />} label="Patient Profile Management" to="/patients" />
          <Feature icon={<Pill className="w-5 h-5 text-pink-600" />} label="Prescription Management" to="/prescriptions" />
          <Feature icon={<CreditCard className="w-5 h-5 text-yellow-600" />} label="Billing and Payment" onClick={() => alert('Billing and Payment module coming soon!')} />
          <Feature icon={<FileText className="w-5 h-5 text-indigo-600" />} label="Lab Reports Upload and View" onClick={() => alert('Lab Reports module coming soon!')} />
          <Feature icon={<Bell className="w-5 h-5 text-orange-600" />} label="Notifications (SMS/Email)" onClick={() => alert('Notifications module coming soon!')} />
          <Feature icon={<TrendingUp className="w-5 h-5 text-blue-600" />} label="Dashboard with Analytics" to="/hospital-analytics" />
        </div>
      </section>

      {/* 4. Security & Privacy */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Lock className="w-5 h-5 text-red-600" /> Security & Privacy</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>User authentication (Login, OTP, Role-based access)</li>
          <li>Data encryption and HIPAA/GDPR compliance (if applicable)</li>
          <li>Role-based permissions</li>
        </ul>
      </section>

      {/* 5. Technology Stack */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Server className="w-5 h-5 text-gray-700" /> Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TechItem icon={<Globe className="w-5 h-5 text-blue-600" />} label="Frontend: React / Angular / HTML-CSS" />
          <TechItem icon={<Database className="w-5 h-5 text-green-600" />} label="Database: MongoDB / MySQL / PostgreSQL" />
          <TechItem icon={<Server className="w-5 h-5 text-purple-600" />} label="Backend: Node.js / Django / Laravel" />
          <TechItem icon={<Zap className="w-5 h-5 text-yellow-600" />} label="Hosting: AWS / Azure / Firebase, etc." />
        </div>
      </section>

      {/* 6. Workflow Overview */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><ArrowRight className="w-5 h-5 text-blue-600" /> Workflow Overview</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700 text-base flex-wrap">
            <span>Patient registers</span>
            <ArrowRight className="w-4 h-4" />
            <span>Books appointment</span>
            <ArrowRight className="w-4 h-4" />
            <span>Gets confirmed</span>
            <ArrowRight className="w-4 h-4" />
            <span>Consults doctor</span>
            <ArrowRight className="w-4 h-4" />
            <span>Receives prescription</span>
            <ArrowRight className="w-4 h-4" />
            <span>Pays online</span>
            <ArrowRight className="w-4 h-4" />
            <span>Views history in dashboard</span>
          </div>
        </div>
      </section>

      {/* 7. Benefits */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><TrendingUp className="w-5 h-5 text-green-600" /> Benefits</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Saves time for both patients and doctors</li>
          <li>Reduces paperwork</li>
          <li>Improves patient care and data access</li>
          <li>Enables remote consultation</li>
          <li>Keeps all records centralized</li>
        </ul>
      </section>

      {/* Optional Add-ons */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" /> Optional Add-ons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddOn icon={<Languages className="w-5 h-5 text-purple-600" />} label="Multilingual support" onClick={() => alert('Multilingual support coming soon!')} />
          <AddOn icon={<Accessibility className="w-5 h-5 text-green-600" />} label="Accessibility features (for differently-abled users)" onClick={() => alert('Accessibility features coming soon!')} />
          <AddOn icon={<AlertTriangle className="w-5 h-5 text-red-600" />} label="Emergency SOS or ambulance request button" onClick={() => alert('Emergency SOS coming soon!')} />
          <AddOn icon={<BookOpen className="w-5 h-5 text-blue-600" />} label="Health tips / Blog section" onClick={() => alert('Health tips / Blog coming soon!')} />
        </div>
      </section>
    </div>
  );
};

// Feature component for reusability
const Feature: React.FC<{ icon: React.ReactNode; label: string; to?: string; onClick?: () => void }> = ({ icon, label, to, onClick }) => {
  const className = "flex items-center gap-3 bg-gray-50 rounded-lg p-3 transition hover:bg-blue-100 focus:bg-blue-100 cursor-pointer outline-none";
  if (to) {
    return (
      <Link to={to} className={className} tabIndex={0}>
        {icon}
        <span className="text-gray-800 font-medium">{label}</span>
      </Link>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick} tabIndex={0}>
      {icon}
      <span className="text-gray-800 font-medium">{label}</span>
    </button>
  );
};

// AddOn component for optional add-ons
const AddOn: React.FC<{ icon: React.ReactNode; label: string; to?: string; onClick?: () => void }> = ({ icon, label, to, onClick }) => {
  const className = "flex items-center gap-3 bg-gray-50 rounded-lg p-3 transition hover:bg-blue-100 focus:bg-blue-100 cursor-pointer outline-none";
  if (to) {
    return (
      <Link to={to} className={className} tabIndex={0}>
        {icon}
        <span className="text-gray-800 font-medium">{label}</span>
      </Link>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick} tabIndex={0}>
      {icon}
      <span className="text-gray-800 font-medium">{label}</span>
    </button>
  );
};

// TechItem for tech stack (not clickable)
const TechItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
    {icon}
    <span className="text-gray-800 font-medium">{label}</span>
  </div>
);

export default SystemOverviewPage;
