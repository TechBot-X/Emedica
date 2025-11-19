import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Eye, Calendar, User } from 'lucide-react';

const MedicalRecordsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const medicalRecords = [
    {
      id: '1',
      date: '2024-01-10',
      type: 'Consultation',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension Management',
      treatment: 'Medication adjustment, lifestyle counseling',
      prescription: 'Lisinopril 10mg daily',
      notes: 'Patient reports good compliance with medication. Blood pressure well controlled.',
      attachments: ['blood_test_results.pdf', 'ecg_report.pdf'],
    },
    {
      id: '2',
      date: '2024-01-05',
      type: 'Lab Results',
      doctor: 'Dr. Michael Smith',
      diagnosis: 'Annual Physical - Lab Work',
      treatment: 'No immediate treatment required',
      prescription: null,
      notes: 'All lab values within normal limits. Continue current health maintenance.',
      attachments: ['complete_blood_count.pdf', 'lipid_panel.pdf'],
    },
    {
      id: '3',
      date: '2023-12-28',
      type: 'Procedure',
      doctor: 'Dr. Emily Wilson',
      diagnosis: 'Cardiac Stress Test',
      treatment: 'Diagnostic procedure completed',
      prescription: null,
      notes: 'Stress test results normal. No signs of coronary artery disease.',
      attachments: ['stress_test_report.pdf', 'ecg_strips.pdf'],
    },
    {
      id: '4',
      date: '2023-12-15',
      type: 'Emergency',
      doctor: 'Dr. James Brown',
      diagnosis: 'Acute Bronchitis',
      treatment: 'Supportive care, bronchodilator therapy',
      prescription: 'Albuterol inhaler, Dextromethorphan cough syrup',
      notes: 'Patient presented with acute cough and chest congestion. Responded well to treatment.',
      attachments: ['chest_xray.pdf'],
    },
  ];

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || record.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'lab results': return 'bg-green-100 text-green-800';
      case 'procedure': return 'bg-purple-100 text-purple-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">View and manage your medical history</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export All</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search records by diagnosis, doctor, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="consultation">Consultation</option>
              <option value="lab results">Lab Results</option>
              <option value="procedure">Procedure</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Medical Records List */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{record.diagnosis}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(record.type)}`}>
                      {record.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(record.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{record.doctor}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex items-center space-x-1 bg-gray-50 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Treatment</h4>
                <p className="text-sm text-gray-600 mb-4">{record.treatment}</p>
                
                {record.prescription && (
                  <>
                    <h4 className="font-medium text-gray-900 mb-2">Prescription</h4>
                    <p className="text-sm text-gray-600 mb-4">{record.prescription}</p>
                  </>
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                <p className="text-sm text-gray-600 mb-4">{record.notes}</p>
                
                {record.attachments.length > 0 && (
                  <>
                    <h4 className="font-medium text-gray-900 mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {record.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                            {attachment}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medical records found</h3>
          <p className="text-gray-600">Try adjusting your search criteria to find specific records.</p>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;