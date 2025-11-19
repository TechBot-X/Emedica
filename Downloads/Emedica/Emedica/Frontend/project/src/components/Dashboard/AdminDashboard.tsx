import React from 'react';
import { Users, Calendar, Activity, TrendingUp, Clock, UserCheck, Building, AlertTriangle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Staff', value: '156', icon: Users, color: 'blue', trend: '+5.2%' },
    { label: 'Today\'s Appointments', value: '89', icon: Calendar, color: 'green', trend: '+12.1%' },
    { label: 'Active Patients', value: '1,247', icon: UserCheck, color: 'purple', trend: '+8.7%' },
    { label: 'Bed Occupancy', value: '78%', icon: Building, color: 'orange', trend: '-2.1%' },
  ];

  const departmentStats = [
    { name: 'Cardiology', staff: 24, patients: 156, utilization: 85 },
    { name: 'Emergency', staff: 32, patients: 89, utilization: 92 },
    { name: 'Surgery', staff: 28, patients: 67, utilization: 78 },
    { name: 'Pediatrics', staff: 18, patients: 134, utilization: 69 },
    { name: 'Radiology', staff: 12, patients: 45, utilization: 88 },
  ];

  const recentActivities = [
    { time: '10:30 AM', activity: 'New patient registration', user: 'Reception Desk 1', type: 'info' },
    { time: '10:15 AM', activity: 'Emergency admission', user: 'Dr. Sarah Johnson', type: 'urgent' },
    { time: '09:45 AM', activity: 'Surgery scheduled', user: 'Dr. Michael Brown', type: 'scheduled' },
    { time: '09:30 AM', activity: 'Staff shift change', user: 'Nursing Station', type: 'info' },
    { time: '09:00 AM', activity: 'Equipment maintenance', user: 'Maintenance Team', type: 'maintenance' },
  ];

  const alerts = [
    { message: 'ICU bed capacity at 95%', type: 'critical', time: '5 min ago' },
    { message: 'Pharmacy inventory low on insulin', type: 'warning', time: '15 min ago' },
    { message: 'Equipment calibration due for MRI-2', type: 'info', time: '1 hour ago' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'scheduled': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'maintenance': return <Activity className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Administration</h1>
          <p className="text-gray-600 mt-1">Monitor and manage hospital operations</p>
        </div>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
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
                <p className={`text-sm mt-1 ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
          <AlertTriangle className="w-5 h-5 text-red-400" />
        </div>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'critical' ? 'bg-red-50 border-red-500' :
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${
                  alert.type === 'critical' ? 'text-red-800' :
                  alert.type === 'warning' ? 'text-yellow-800' :
                  'text-blue-800'
                }`}>
                  {alert.message}
                </p>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Department Overview</h2>
            <Building className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{dept.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    dept.utilization >= 90 ? 'bg-red-100 text-red-800' :
                    dept.utilization >= 80 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {dept.utilization}% utilization
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{dept.staff} staff members</span>
                  <span>{dept.patients} active patients</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      dept.utilization >= 90 ? 'bg-red-500' :
                      dept.utilization >= 80 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${dept.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;