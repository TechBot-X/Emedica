import React, { useState } from 'react';
import { Search, Filter, Plus, User, Phone, Mail, MapPin } from 'lucide-react';

const PatientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const patients = [
    {
      id: '1',
      name: 'Samarth Girase',
      age: 21,
      gender: 'Male',
      phone: '+1 (555) 123-4567',
      email: 'samarth.girase@email.com',
      address: '123 Oak Street, Springfield',
      lastVisit: '2024-01-10',
      condition: 'Hypertension',
      status: 'active',
      nextAppointment: '2024-01-20',
    },
    {
      id: '2',
      name: 'Rohan Iyer',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 987-6543',
      email: 'rohan.iyer@email.com',
      address: '456 Pine Avenue, Springfield',
      lastVisit: '2024-01-08',
      condition: 'Diabetes Type 2',
      status: 'active',
      nextAppointment: '2024-01-25',
    },
    {
      id: '3',
      name: 'Meena Pillai',
      age: 28,
      gender: 'Female',
      phone: '+1 (555) 456-7890',
      email: 'meena.pillai@email.com',
      address: '789 Elm Drive, Springfield',
      lastVisit: '2023-12-15',
      condition: 'Regular Checkup',
      status: 'inactive',
      nextAppointment: null,
    },
    {
      id: '4',
      name: 'Vikram Sinha',
      age: 52,
      gender: 'Male',
      phone: '+1 (555) 321-0987',
      email: 'vikram.sinha@email.com',
      address: '321 Maple Street, Springfield',
      lastVisit: '2024-01-12',
      condition: 'Cardiology Follow-up',
      status: 'active',
      nextAppointment: '2024-01-18',
    },
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-600 mt-1">Manage and monitor your patient list</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                patient.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {patient.status}
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
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or add a new patient.</p>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;