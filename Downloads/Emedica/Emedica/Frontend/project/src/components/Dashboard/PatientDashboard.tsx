import React from 'react';
import { Calendar, FileText, Pill, Heart, Activity, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Upcoming Appointments', value: '3', icon: Calendar, color: 'blue' },
    { label: 'Active Prescriptions', value: '2', icon: Pill, color: 'green' },
    { label: 'Medical Records', value: '18', icon: FileText, color: 'purple' },
    { label: 'Last Check-up', value: '5 days ago', icon: Heart, color: 'red' },
  ];

  const upcomingAppointments = [
    { date: '2024-01-15, 10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Regular Checkup', status: 'confirmed' },
    { date: '2024-01-18, 2:30 PM', doctor: 'Dr. Michael Smith', type: 'Cardiology', status: 'confirmed' },
    { date: '2024-01-22, 11:15 AM', doctor: 'Dr. Sarah Johnson', type: 'Follow-up', status: 'pending' },
  ];

  const recentRecords = [
    { date: '2024-01-10', doctor: 'Dr. Sarah Johnson', diagnosis: 'Annual Physical', status: 'completed' },
    { date: '2024-01-05', doctor: 'Dr. Michael Smith', diagnosis: 'Cardiology Consultation', status: 'completed' },
    { date: '2023-12-28', doctor: 'Dr. Sarah Johnson', diagnosis: 'Blood Work Review', status: 'completed' },
  ];

  const activePrescriptions = [
    { medication: 'Lisinopril 10mg', doctor: 'Dr. Michael Smith', frequency: 'Once daily', expires: '2024-02-15' },
    { medication: 'Metformin 500mg', doctor: 'Dr. Sarah Johnson', frequency: 'Twice daily', expires: '2024-01-30' },
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Activity },
    { label: 'Weight', value: '165 lbs', status: 'normal', icon: Activity },
    { label: 'BMI', value: '24.3', status: 'normal', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name.split(' ')[0]}!</h1>
          <p className="text-gray-600 mt-1">Here's your health overview</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link to="/patient-form" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors"> Patient Form </Link>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-start justify-between p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all">
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.doctor}</p>
                  <p className="text-xs text-gray-500 mt-1">{appointment.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Health Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Health Metrics</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <metric.icon className="w-5 h-5 text-gray-400" />
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-lg font-semibold text-gray-900 mt-2">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Medical Records */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Medical Records</h2>
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{record.diagnosis}</p>
                  <p className="text-xs text-gray-500">{record.doctor}</p>
                  <p className="text-xs text-gray-400">{record.date}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Active Prescriptions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Prescriptions</h2>
            <Pill className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {activePrescriptions.map((prescription, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{prescription.medication}</p>
                    <p className="text-xs text-gray-600">{prescription.doctor}</p>
                    <p className="text-xs text-gray-500 mt-1">{prescription.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Expires</p>
                    <p className="text-xs font-medium text-gray-700">{prescription.expires}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;