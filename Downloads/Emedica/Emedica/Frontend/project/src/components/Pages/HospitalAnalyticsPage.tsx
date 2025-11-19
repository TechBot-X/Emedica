import React, { useState, useEffect } from 'react';
import { Activity, Users, Calendar, TrendingUp, Layers, Filter, Download, RefreshCw } from 'lucide-react';

// Define interfaces for better type safety
interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient' | 'admin';
  specialization?: string;
  department?: string;
}

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: 'completed' | 'cancelled' | 'scheduled';
  patientName: string;
  doctorName: string;
}

// Mock data for analytics
const mockUsers: User[] = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', role: 'doctor', specialization: 'Cardiology', department: 'Cardiology' },
  { id: '2', name: 'Dr. Michael Brown', email: 'michael@example.com', role: 'doctor', specialization: 'Neurology', department: 'Neurology' },
  { id: '3', name: 'Dr. Emily Wilson', email: 'emily@example.com', role: 'doctor', specialization: 'Pediatrics', department: 'Pediatrics' },
  { id: '4', name: 'Dr. James Davis', email: 'james@example.com', role: 'doctor', specialization: 'Orthopedics', department: 'Orthopedics' },
  { id: '5', name: 'Dr. Lisa Anderson', email: 'lisa@example.com', role: 'doctor', specialization: 'Dermatology', department: 'Dermatology' },
  { id: '6', name: 'John Smith', email: 'john@example.com', role: 'patient' },
  { id: '7', name: 'Emma Johnson', email: 'emma@example.com', role: 'patient' },
  { id: '8', name: 'Robert Martinez', email: 'robert@example.com', role: 'admin' },
];

const mockAppointments: Appointment[] = [
  { id: '1', patientId: '6', doctorId: '1', date: '2023-06-20', time: '09:00', type: 'Checkup', status: 'completed', patientName: 'John Smith', doctorName: 'Dr. Sarah Johnson' },
  { id: '2', patientId: '7', doctorId: '2', date: '2023-06-21', time: '10:30', type: 'Consultation', status: 'completed', patientName: 'Emma Johnson', doctorName: 'Dr. Michael Brown' },
  { id: '3', patientId: '6', doctorId: '3', date: '2023-06-22', time: '14:00', type: 'Follow-up', status: 'cancelled', patientName: 'John Smith', doctorName: 'Dr. Emily Wilson' },
  { id: '4', patientId: '7', doctorId: '4', date: '2023-06-23', time: '11:15', type: 'Checkup', status: 'scheduled', patientName: 'Emma Johnson', doctorName: 'Dr. James Davis' },
  { id: '5', patientId: '6', doctorId: '5', date: '2023-06-24', time: '15:45', type: 'Consultation', status: 'scheduled', patientName: 'John Smith', doctorName: 'Dr. Lisa Anderson' },
  { id: '6', patientId: '7', doctorId: '1', date: '2023-06-25', time: '09:30', type: 'Follow-up', status: 'scheduled', patientName: 'Emma Johnson', doctorName: 'Dr. Sarah Johnson' },
  { id: '7', patientId: '6', doctorId: '2', date: '2023-06-26', time: '13:00', type: 'Checkup', status: 'scheduled', patientName: 'John Smith', doctorName: 'Dr. Michael Brown' },
  { id: '8', patientId: '7', doctorId: '3', date: '2023-06-27', time: '16:30', type: 'Consultation', status: 'scheduled', patientName: 'Emma Johnson', doctorName: 'Dr. Emily Wilson' },
  { id: '9', patientId: '6', doctorId: '4', date: '2023-06-28', time: '10:00', type: 'Follow-up', status: 'scheduled', patientName: 'John Smith', doctorName: 'Dr. James Davis' },
  { id: '10', patientId: '7', doctorId: '5', date: '2023-06-29', time: '14:45', type: 'Checkup', status: 'scheduled', patientName: 'Emma Johnson', doctorName: 'Dr. Lisa Anderson' },
];

const HospitalAnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate analytics data
  const totalDoctors = mockUsers.filter(user => user.role === 'doctor').length;
  const totalPatients = mockUsers.filter(user => user.role === 'patient').length;
  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter(app => app.status === 'completed').length;
  const cancelledAppointments = mockAppointments.filter(app => app.status === 'cancelled').length;
  const scheduledAppointments = mockAppointments.filter(app => app.status === 'scheduled').length;

  // Department distribution
  const departmentCounts: Record<string, number> = {};
  mockUsers
    .filter(user => user.role === 'doctor' && user.department)
    .forEach(doctor => {
      const dept = doctor.department as string;
      departmentCounts[dept] = (departmentCounts[dept] || 0) + 1;
    });

  // Appointment types distribution (not used in current JSX, but good to keep if needed later)
  const appointmentTypes: Record<string, number> = {};
  mockAppointments.forEach(app => {
    appointmentTypes[app.type] = (appointmentTypes[app.type] || 0) + 1;
  });

  // Generate random data for charts
  const generateRandomData = (count: number, max: number) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * max) + 1);
  };

  const patientAdmissionData = generateRandomData(7, 20);
  const revenueData = generateRandomData(7, 10000).map(val => val * 100);

  // Format currency - CORRECTED CURRENCY CODE TO 'INR'
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { // Changed locale to 'en-IN' for India specific formatting
      style: 'currency',
      currency: 'INR', // Corrected: Use 'INR' for Indian Rupees
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total revenue
  const totalRevenue = revenueData.reduce((sum, val) => sum + val, 0);

  // Pie chart data for visual representation
  const appointmentStatusData = [
    { name: 'Completed', value: completedAppointments, color: 'bg-green-500' },
    { name: 'Cancelled', value: cancelledAppointments, color: 'bg-red-500' },
    { name: 'Scheduled', value: scheduledAppointments, color: 'bg-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans antialiased">
      <div className="container mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hospital Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2 text-lg">Overview of hospital performance and key statistics</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-0">
            <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={timeRange}
                onChange={(e) => { setLoading(true); setTimeRange(e.target.value); }} // Set loading and update time range
                className="text-base border-none focus:ring-0 focus:outline-none bg-transparent appearance-none pr-6"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <button className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition-colors">
              <Download className="w-5 h-5 text-gray-500" />
              <span className="text-base font-medium">Export</span>
            </button>
            <button
              className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm hover:bg-gray-50 transition-colors"
              onClick={() => setLoading(true)} // This triggers the loading overlay
            >
              <RefreshCw className="w-5 h-5 text-gray-500" />
              <span className="text-base font-medium">Refresh</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{totalPatients}</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
            <div className="mt-5 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="font-medium text-green-500">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{totalDoctors}</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <Activity className="w-7 h-7 text-green-600" />
              </div>
            </div>
            <div className="mt-5 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="font-medium text-green-500">+5% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{totalAppointments}</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center shadow-inner">
                <Calendar className="w-7 h-7 text-purple-600" />
              </div>
            </div>
            <div className="mt-5 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="font-medium text-green-500">+8% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold mt-1 text-gray-900">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center shadow-inner">
                <Layers className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
            <div className="mt-5 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="font-medium text-green-500">+15% from last month</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Admissions Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl text-gray-900">Patient Admissions</h3>
              <div className="text-sm font-medium text-gray-500">Last 7 days</div>
            </div>
            <div className="h-64 flex items-end space-x-3 p-2">
              {patientAdmissionData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full bg-blue-500 rounded-t-md transition-all duration-300 ease-out hover:bg-blue-600"
                    style={{ height: `${(value / 20) * 100}%` }}
                    title={`Admissions: ${value}`}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-xl text-gray-900">Revenue</h3>
              <div className="text-sm font-medium text-gray-500">Last 7 days</div>
            </div>
            <div className="h-64 flex items-end space-x-3 p-2">
              {revenueData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div
                    className="w-full bg-green-500 rounded-t-md transition-all duration-300 ease-out hover:bg-green-600"
                    style={{ height: `${(value / 10000) * 100}%` }}
                    title={`Revenue: ${formatCurrency(value)}`}
                  ></div>
                  <div className="text-xs text-gray-500 mt-2 font-medium">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Status and Department Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointment Status Pie Chart (Simplified) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-xl text-gray-900 mb-6">Appointment Status</h3>
            <div className="flex flex-col items-center justify-center">
              {totalAppointments > 0 ? (
                <div className="w-64 h-64 relative rounded-full overflow-hidden flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                        #10B981 0% ${((completedAppointments / totalAppointments) * 100).toFixed(2)}%, /* Green for Completed */
                        #EF4444 ${((completedAppointments / totalAppointments) * 100).toFixed(2)}% ${(((completedAppointments + cancelledAppointments) / totalAppointments) * 100).toFixed(2)}%, /* Red for Cancelled */
                        #3B82F6 ${(((completedAppointments + cancelledAppointments) / totalAppointments) * 100).toFixed(2)}% 100% /* Blue for Scheduled */
                      )`
                    }}
                  ></div>
                  <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-gray-800 text-center leading-tight">
                      {totalAppointments}
                      <br/>
                      <span className="text-sm font-medium text-gray-500">Total</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 text-center text-lg">
                  No Appointment Data
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
                {appointmentStatusData.map((status, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`${status.color} w-4 h-4 rounded-full mb-1`}></div>
                    <p className="text-xs font-medium text-gray-600">{status.name}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {totalAppointments > 0 ? `${((status.value / totalAppointments) * 100).toFixed(0)}%` : '0%'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Department Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-xl text-gray-900 mb-6">Department Distribution</h3>
            <div className="space-y-5">
              {Object.entries(departmentCounts).map(([dept, count]) => (
                <div key={dept} className="space-y-2">
                  <div className="flex justify-between text-base">
                    <span className="font-medium text-gray-800">{dept}</span>
                    <span className="text-gray-500">{count} doctors</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${(count / totalDoctors) * 100}%` }}
                      title={`${((count / totalDoctors) * 100).toFixed(1)}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-xl text-gray-900 mb-6">Recent Appointment Activity</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAppointments.slice(0, 8).map((appointment) => ( // Displaying top 8 recent appointments
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.patientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.doctorName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${
                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {mockAppointments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 text-sm">No recent appointment activity.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-600 border-opacity-75"></div>
              <p className="text-gray-700 font-medium text-lg">Loading analytics data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalAnalyticsPage;