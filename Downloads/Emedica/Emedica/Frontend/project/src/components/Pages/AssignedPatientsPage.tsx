import React, { useState } from 'react';
import { Search, Filter, User, Phone, Mail, Calendar, MapPin, Users, AlertCircle } from 'lucide-react';

const AssignedPatientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterSupervisor, setFilterSupervisor] = useState('all');

  // Sample data for assigned patients
  const assignedPatients = [
    { 
      id: '1', 
      name: 'John Smith', 
      age: 45, 
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'john.smith@email.com',
      address: '123 Oak Street, Springfield',
      condition: 'Hypertension', 
      supervisor: 'Dr. Sarah Johnson', 
      priority: 'medium',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-01-20',
      notes: 'Patient is responding well to medication. Continue monitoring blood pressure.'
    },
    { 
      id: '2', 
      name: 'Mary Davis', 
      age: 62, 
      gender: 'Female',
      phone: '+1 (555) 987-6543',
      email: 'mary.davis@email.com',
      address: '456 Pine Avenue, Springfield',
      condition: 'Diabetes', 
      supervisor: 'Dr. Sarah Johnson', 
      priority: 'high',
      lastVisit: '2024-01-08',
      nextAppointment: '2024-01-15',
      notes: 'Blood sugar levels unstable. Requires close monitoring and possible medication adjustment.'
    },
    { 
      id: '3', 
      name: 'Robert Wilson', 
      age: 38, 
      gender: 'Male',
      phone: '+1 (555) 456-7890',
      email: 'robert.wilson@email.com',
      address: '789 Elm Drive, Springfield',
      condition: 'Post-surgery', 
      supervisor: 'Dr. Michael Brown', 
      priority: 'low',
      lastVisit: '2024-01-12',
      nextAppointment: '2024-01-25',
      notes: 'Recovery progressing as expected. Continue with prescribed physical therapy.'
    },
    { 
      id: '4', 
      name: 'Lisa Anderson', 
      age: 29, 
      gender: 'Female',
      phone: '+1 (555) 321-0987',
      email: 'lisa.anderson@email.com',
      address: '321 Maple Street, Springfield',
      condition: 'Pregnancy', 
      supervisor: 'Dr. Emily Wilson', 
      priority: 'medium',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-01-19',
      notes: 'Routine pregnancy checkup. All vitals normal. Schedule ultrasound for next visit.'
    },
    { 
      id: '5', 
      name: 'James Taylor', 
      age: 55, 
      gender: 'Male',
      phone: '+1 (555) 789-0123',
      email: 'james.taylor@email.com',
      address: '567 Birch Lane, Springfield',
      condition: 'Cardiac Rehabilitation', 
      supervisor: 'Dr. Michael Brown', 
      priority: 'high',
      lastVisit: '2024-01-11',
      nextAppointment: '2024-01-18',
      notes: 'Post-cardiac event rehabilitation. Monitor exercise tolerance and heart rate response.'
    },
  ];

  // Get unique supervisors for filter dropdown
  const supervisors = [...new Set(assignedPatients.map(patient => patient.supervisor))];

  // Filter patients based on search term and filters
  const filteredPatients = assignedPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || patient.priority === filterPriority;
    const matchesSupervisor = filterSupervisor === 'all' || patient.supervisor === filterSupervisor;
    return matchesSearch && matchesPriority && matchesSupervisor;
  });

  // Helper function to get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Patients</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your assigned patients</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-400" />
            <select
              value={filterSupervisor}
              onChange={(e) => setFilterSupervisor(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Supervisors</option>
              {supervisors.map((supervisor, index) => (
                <option key={index} value={supervisor}>{supervisor}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(patient.priority)}`}>
                {patient.priority} priority
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{patient.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span className="text-xs">{patient.address}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-1">Current Condition</p>
              <p className="text-sm text-gray-600">{patient.condition}</p>
            </div>

            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-1">Supervisor</p>
              <p className="text-sm text-blue-700">{patient.supervisor}</p>
            </div>

            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-medium text-yellow-900 mb-1">Notes</p>
              <p className="text-sm text-yellow-700">{patient.notes}</p>
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <div>
                <p>Last Visit</p>
                <p className="font-medium text-gray-700">{patient.lastVisit}</p>
              </div>
              {patient.nextAppointment && (
                <div className="text-right">
                  <p>Next Appointment</p>
                  <p className="font-medium text-gray-700">{patient.nextAppointment}</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Details
              </button>
              <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned patients found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default AssignedPatientsPage;