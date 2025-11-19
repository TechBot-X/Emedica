import React, { useState } from 'react';
import { Pill, Search, Filter, Calendar, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const PrescriptionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const prescriptions = [
    {
      id: '1',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      prescribedBy: 'Dr. Sarah Johnson',
      prescribedDate: '2024-01-10',
      startDate: '2024-01-11',
      endDate: '2024-02-10',
      status: 'active',
      refillsRemaining: 2,
      instructions: 'Take with water, preferably in the morning. Monitor blood pressure regularly.',
      sideEffects: 'Dizziness, dry cough, fatigue',
    },
    {
      id: '2',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      prescribedBy: 'Dr. Michael Smith',
      prescribedDate: '2024-01-05',
      startDate: '2024-01-06',
      endDate: '2024-04-05',
      status: 'active',
      refillsRemaining: 1,
      instructions: 'Take with meals to reduce stomach upset. Continue regular exercise and diet.',
      sideEffects: 'Nausea, diarrhea, metallic taste',
    },
    {
      id: '3',
      medication: 'Albuterol Inhaler',
      dosage: '90mcg',
      frequency: 'As needed',
      duration: '30 days',
      prescribedBy: 'Dr. Emily Wilson',
      prescribedDate: '2023-12-15',
      startDate: '2023-12-16',
      endDate: '2024-01-15',
      status: 'expired',
      refillsRemaining: 0,
      instructions: 'Use as needed for shortness of breath. Shake well before use.',
      sideEffects: 'Tremor, nervousness, headache',
    },
    {
      id: '4',
      medication: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Once daily',
      duration: '14 days',
      prescribedBy: 'Dr. James Brown',
      prescribedDate: '2024-01-08',
      startDate: '2024-01-09',
      endDate: '2024-01-23',
      status: 'completed',
      refillsRemaining: 0,
      instructions: 'Take 30 minutes before breakfast. Complete the full course.',
      sideEffects: 'Headache, nausea, diarrhea',
    },
  ];

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || prescription.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const isNearExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Prescriptions</h1>
          <p className="text-gray-600 mt-1">Track and manage your medications</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Request Refill
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by medication name or doctor..."
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Prescriptions Alert */}
      {filteredPrescriptions.some(p => p.status === 'active' && isNearExpiry(p.endDate)) && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-yellow-800 font-medium">
              You have prescriptions expiring soon. Consider requesting refills.
            </p>
          </div>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {prescription.medication} {prescription.dosage}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                    {isNearExpiry(prescription.endDate) && prescription.status === 'active' && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                        Expires Soon
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="font-medium">{prescription.frequency}</span>
                    <span>•</span>
                    <span>{prescription.duration}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{prescription.prescribedBy}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Prescribed: {new Date(prescription.prescribedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {prescription.status === 'active' && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">Refills remaining</p>
                    <p className="text-lg font-semibold text-blue-600">{prescription.refillsRemaining}</p>
                  </div>
                )}
                <div className="flex space-x-2">
                  {prescription.status === 'active' && prescription.refillsRemaining > 0 && (
                    <button className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded hover:bg-green-100 transition-colors">
                      Request Refill
                    </button>
                  )}
                  <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Instructions</h4>
                <p className="text-sm text-gray-600 mb-4">{prescription.instructions}</p>
                
                <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Start: {new Date(prescription.startDate).toLocaleDateString()}</span>
                  <span>End: {new Date(prescription.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Possible Side Effects</h4>
                <p className="text-sm text-gray-600">{prescription.sideEffects}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or status filter.</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionsPage;