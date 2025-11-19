import React from 'react';
import { Calendar, Users, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const DoctorDashboard: React.FC = () => {
  const stats = [
    { label: 'Today\'s Appointments', value: '12', icon: Calendar, color: 'blue' },
    { label: 'Total Patients', value: '248', icon: Users, color: 'green' },
    { label: 'Pending Reviews', value: '6', icon: Clock, color: 'yellow' },
    { label: 'Completed Today', value: '8', icon: CheckCircle, color: 'purple' },
  ];

  const appointments = [
    { time: '09:00 AM', patient: 'Suresh Nair', type: 'Consultation', status: 'scheduled' },
    { time: '10:30 AM', patient: 'Pooja Desai', type: 'Follow-up', status: 'in-progress' },
    { time: '11:00 AM', patient: 'Manoj Gupta', type: 'Check-up', status: 'scheduled' },
    { time: '02:00 PM', patient: 'Asha Menon', type: 'Consultation', status: 'scheduled' },
  ];

  const recentPatients = [
    { name: 'Meena Pillai', lastVisit: '2024-01-10', condition: 'Hypertension', priority: 'high' },
    { name: 'Vikram Sinha', lastVisit: '2024-01-08', condition: 'Diabetes', priority: 'medium' },
    { name: 'Shreya Rao', lastVisit: '2024-01-05', condition: 'Regular Checkup', priority: 'low' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <div className="flex flex-col items-end gap-2">
          <Link to="/doctor-form" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors">Doctor Form</Link>
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
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                    <p className="text-xs text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  appointment.status === 'in-progress' 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {appointment.status === 'in-progress' ? 'In Progress' : 'Scheduled'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.condition}</p>
                  <p className="text-xs text-gray-400">Last visit: {patient.lastVisit}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    patient.priority === 'high' ? 'bg-red-500' :
                    patient.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  {patient.priority === 'high' && <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;