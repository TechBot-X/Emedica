import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Calendar, User, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const SupervisorReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const reports = [
    {
      id: '1',
      title: 'Monthly Department Performance Review',
      department: 'Cardiology',
      supervisor: 'Dr. Sarah Johnson',
      submissionDate: '2024-01-15',
      dueDate: '2024-01-20',
      status: 'completed',
      priority: 'high',
      summary: 'Comprehensive review of department KPIs, staff performance metrics, and patient satisfaction scores for January 2024.',
      findings: ['Improved patient wait times by 15%', 'Staff efficiency increased by 8%', 'Two equipment maintenance issues identified'],
      recommendations: ['Schedule additional training for new equipment', 'Implement new patient flow system']
    },
    {
      id: '2',
      title: 'Quarterly Staff Evaluation Summary',
      department: 'Emergency',
      supervisor: 'Dr. Michael Brown',
      submissionDate: '2024-01-10',
      dueDate: '2024-01-12',
      status: 'completed',
      priority: 'medium',
      summary: 'Evaluation of emergency department staff performance, training completion status, and certification renewals needed.',
      findings: ['Three staff members due for certification renewal', 'Positive patient feedback on night shift team', 'Need for additional trauma training identified'],
      recommendations: ['Schedule certification renewal workshops', 'Recognize night shift team achievements', 'Organize trauma response training']
    },
    {
      id: '3',
      title: 'Equipment Maintenance and Replacement Plan',
      department: 'Radiology',
      supervisor: 'James Davis',
      submissionDate: null,
      dueDate: '2024-01-25',
      status: 'pending',
      priority: 'high',
      summary: 'Assessment of current equipment status, maintenance schedule, and recommendations for replacements in the upcoming fiscal year.',
      findings: [],
      recommendations: []
    },
    {
      id: '4',
      title: 'New Staff Onboarding Progress Report',
      department: 'Pediatrics',
      supervisor: 'Emily Wilson',
      submissionDate: '2024-01-18',
      dueDate: '2024-01-18',
      status: 'completed',
      priority: 'low',
      summary: 'Status update on the onboarding progress of five new staff members who joined the pediatrics department in December 2023.',
      findings: ['All new staff completed required training modules', 'Two staff members excelling in patient interaction', 'One staff member needs additional support with EMR system'],
      recommendations: ['Provide additional EMR training for identified staff', 'Consider fast-tracking two high-performing staff members']
    },
    {
      id: '5',
      title: 'Patient Satisfaction Improvement Plan',
      department: 'Internal Medicine',
      supervisor: 'Dr. Lisa Anderson',
      submissionDate: null,
      dueDate: '2024-01-30',
      status: 'pending',
      priority: 'medium',
      summary: 'Analysis of recent patient feedback and proposed action plan to address areas of concern and improve overall satisfaction scores.',
      findings: [],
      recommendations: []
    },
    {
      id: '6',
      title: 'Budget Utilization and Resource Allocation Review',
      department: 'Administration',
      supervisor: 'Robert Martinez',
      submissionDate: '2024-01-05',
      dueDate: '2024-01-10',
      status: 'completed',
      priority: 'high',
      summary: 'Detailed analysis of Q4 2023 budget utilization across all departments and recommendations for Q1 2024 resource allocation.',
      findings: ['Three departments under budget', 'Two departments over budget by 5-10%', 'Identified potential cost-saving opportunities in supply chain'],
      recommendations: ['Reallocate unused funds from under-budget departments', 'Implement new approval process for high-cost items', 'Negotiate with top three suppliers for better rates']
    },
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || report.department.toLowerCase() === filterDepartment.toLowerCase();
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Supervisor Reports</h1>
          <p className="text-gray-600 mt-1">View and manage department supervisor reports</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Create Report</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports by title or supervisor..."
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
            <CheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.department}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityColor(report.priority)}`}>
                  {report.priority} priority
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Supervisor: {report.supervisor}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Due: {report.dueDate}</span>
              </div>
              {report.submissionDate && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Submitted: {report.submissionDate}</span>
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900 mb-1">Summary</p>
              <p className="text-sm text-gray-600 line-clamp-2">{report.summary}</p>
            </div>

            {report.findings.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Key Findings</p>
                <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
                  {report.findings.slice(0, 2).map((finding, index) => (
                    <li key={index} className="line-clamp-1">{finding}</li>
                  ))}
                  {report.findings.length > 2 && (
                    <li className="text-blue-600">+{report.findings.length - 2} more findings</li>
                  )}
                </ul>
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Full Report
              </button>
              {report.status === 'pending' && (
                <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  Edit
                </button>
              )}
              {report.status === 'completed' && (
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                  Download
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default SupervisorReportsPage;