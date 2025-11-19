import React, { useState } from 'react';
import { Users, Search, Filter, Plus, User, Mail, Phone, Badge, Clock } from 'lucide-react';

const StaffManagementPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterRole, setFilterRole] = useState('all');

  const staff = [
    {
      id: '1',
      name: 'Dr. Kavita Joshi',
      role: 'doctor',
      department: 'Cardiology',
      email: 'sarah.johnson@hospital.com',
      phone: '+1 (555) 123-4567',
      specialization: 'Interventional Cardiology',
      licenseNumber: 'MD123456',
      status: 'active',
      shift: 'Day Shift',
      joinDate: '2020-03-15',
      patients: 45,
    },
    {
      id: '2',
      name: 'Dr. Manoj Gupta',
      role: 'doctor',
      department: 'Emergency',
      email: 'michael.brown@hospital.com',
      phone: '+1 (555) 234-5678',
      specialization: 'Emergency Medicine',
      licenseNumber: 'MD234567',
      status: 'active',
      shift: 'Night Shift',
      joinDate: '2019-08-22',
      patients: 32,
    },
    {
      id: '3',
      name: 'Asha Menon',
      role: 'nurse',
      department: 'Pediatrics',
      email: 'emily.wilson@hospital.com',
      phone: '+1 (555) 345-6789',
      specialization: 'Pediatric Nursing',
      licenseNumber: 'RN345678',
      status: 'active',
      shift: 'Day Shift',
      joinDate: '2021-01-10',
      patients: 28,
    },
    {
      id: '4',
      name: 'Pooja Desai',
      role: 'technician',
      department: 'Radiology',
      email: 'james.davis@hospital.com',
      phone: '+1 (555) 456-7890',
      specialization: 'MRI Technician',
      licenseNumber: 'RT456789',
      status: 'active',
      shift: 'Day Shift',
      joinDate: '2022-05-18',
      patients: 0,
    },
    {
      id: '5',
      name: 'Dr. Neha Singh',
      role: 'trainee',
      department: 'Internal Medicine',
      email: 'lisa.anderson@hospital.com',
      phone: '+1 (555) 567-8901',
      specialization: 'Internal Medicine Resident',
      licenseNumber: 'MD567890',
      status: 'active',
      shift: 'Rotating',
      joinDate: '2023-07-01',
      patients: 15,
    },
    {
      id: '6',
      name: 'Vikram Sinha',
      role: 'admin',
      department: 'Administration',
      email: 'robert.martinez@hospital.com',
      phone: '+1 (555) 678-9012',
      specialization: 'Hospital Administration',
      licenseNumber: 'HA678901',
      status: 'active',
      shift: 'Day Shift',
      joinDate: '2018-11-30',
      patients: 0,
    },
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || member.department.toLowerCase() === filterDepartment.toLowerCase();
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'nurse': return 'bg-green-100 text-green-800';
      case 'technician': return 'bg-purple-100 text-purple-800';
      case 'trainee': return 'bg-orange-100 text-orange-800';
      case 'admin': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage hospital staff and their assignments</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search staff by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Departments</option>
              <option value="cardiology">Cardiology</option>
              <option value="emergency">Emergency</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="radiology">Radiology</option>
              <option value="internal medicine">Internal Medicine</option>
              <option value="administration">Administration</option>
            </select>
          </div>
          <div className="relative">
            <Badge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Roles</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="technician">Technician</option>
              <option value="trainee">Trainee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.department}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleColor(member.role)}`}>
                  {member.role}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Badge className="w-4 h-4" />
                <span>{member.licenseNumber}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{member.shift}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-1">Specialization</p>
              <p className="text-sm text-gray-600">{member.specialization}</p>
            </div>

            <div className="mt-4 flex justify-between text-xs text-gray-500">
              <div>
                <p>Joined</p>
                <p className="font-medium text-gray-700">{new Date(member.joinDate).toLocaleDateString()}</p>
              </div>
              {member.patients > 0 && (
                <div className="text-right">
                  <p>Active Patients</p>
                  <p className="font-medium text-gray-700">{member.patients}</p>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Profile
              </button>
              <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No staff members found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default StaffManagementPage;