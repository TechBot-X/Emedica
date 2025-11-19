import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Clock, CheckCircle, Star, Target, Award, Calendar, FileText, ArrowRight } from 'lucide-react';

const TraineeDashboard: React.FC = () => {
  const stats = [
    { label: 'Assigned Patients', value: '12', icon: Users, color: 'blue' },
    { label: 'Learning Cases', value: '8', icon: BookOpen, color: 'green' },
    { label: 'Completed Tasks', value: '24', icon: CheckCircle, color: 'purple' },
    { label: 'Supervision Hours', value: '45h', icon: Clock, color: 'orange' },
  ];
  
  const supervisorReports = [
    {
      id: '1',
      title: 'Monthly Performance Review',
      supervisor: 'Dr. Kavita Joshi',
      submissionDate: '2024-01-15',
      dueDate: '2024-01-20',
      status: 'completed',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Clinical Skills Assessment',
      supervisor: 'Dr. Manoj Gupta',
      submissionDate: '2024-01-10',
      dueDate: '2024-01-12',
      status: 'completed',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Patient Interaction Evaluation',
      supervisor: 'Dr. Asha Menon',
      submissionDate: null,
      dueDate: '2024-01-25',
      status: 'pending',
      priority: 'high',
    },
  ];

  const learningCases = [
    { 
      title: 'Cardiology Case Study #3',
      patient: 'Patient #447',
      supervisor: 'Dr. Kavita Joshi',
      status: 'in-progress',
      difficulty: 'intermediate',
      dueDate: '2024-01-18'
    },
    { 
      title: 'Emergency Room Simulation',
      patient: 'Simulation #12',
      supervisor: 'Dr. Manoj Gupta',
      status: 'pending',
      difficulty: 'advanced',
      dueDate: '2024-01-20'
    },
    { 
      title: 'Pediatric Assessment',
      patient: 'Patient #223',
      supervisor: 'Dr. Asha Menon',
      status: 'completed',
      difficulty: 'beginner',
      dueDate: '2024-01-15'
    },
  ];

  const assignedPatients = [
    { name: 'Suresh Nair', age: 45, condition: 'Hypertension', supervisor: 'Dr. Kavita Joshi', priority: 'medium' },
    { name: 'Pooja Desai', age: 62, condition: 'Diabetes', supervisor: 'Dr. Kavita Joshi', priority: 'high' },
    { name: 'Vikram Sinha', age: 38, condition: 'Post-surgery', supervisor: 'Dr. Manoj Gupta', priority: 'low' },
    { name: 'Neha Singh', age: 29, condition: 'Pregnancy', supervisor: 'Dr. Asha Menon', priority: 'medium' },
  ];

  const supervisorFeedback = [
    {
      supervisor: 'Dr. Kavita Joshi',
      feedback: 'Excellent progress in patient communication. Continue working on diagnostic reasoning.',
      rating: 4.5,
      date: '2024-01-12'
    },
    {
      supervisor: 'Dr. Manoj Gupta',
      feedback: 'Good clinical skills demonstrated. Need to improve documentation speed.',
      rating: 4.0,
      date: '2024-01-10'
    },
    {
      supervisor: 'Dr. Asha Menon',
      feedback: 'Outstanding bedside manner. Keep up the excellent work with patient care.',
      rating: 4.8,
      date: '2024-01-08'
    },
  ];

  const upcomingSchedule = [
    { time: '09:00 AM', activity: 'Morning Rounds', supervisor: 'Dr. Kavita Joshi', location: 'Ward 3A' },
    { time: '11:00 AM', activity: 'Case Presentation', supervisor: 'Dr. Manoj Gupta', location: 'Conference Room' },
    { time: '02:00 PM', activity: 'Patient Assessment', supervisor: 'Dr. Asha Menon', location: 'Room 205' },
    { time: '04:00 PM', activity: 'Study Session', supervisor: 'Self-directed', location: 'Library' },
  ];

  const skillProgress = [
    { skill: 'Patient Communication', progress: 85, target: 90 },
    { skill: 'Clinical Diagnosis', progress: 72, target: 80 },
    { skill: 'Procedure Execution', progress: 68, target: 75 },
    { skill: 'Medical Documentation', progress: 78, target: 85 },
    { skill: 'Emergency Response', progress: 65, target: 70 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Trainee Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your learning progress and assignments</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/patient-report" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors">
            <FileText className="w-5 h-5" /> Patient Report Form
          </Link>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
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

      {/* Skill Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Skill Development Progress</h2>
          <Target className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillProgress.map((skill, index) => (
            <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{skill.skill}</h3>
                <span className="text-sm font-semibold text-blue-600">{skill.progress}%</span>
              </div>
              <div className="mb-2">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-600">Target: {skill.target}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Cases */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Learning Cases</h2>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {learningCases.map((case_, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{case_.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                    {case_.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Patient: {case_.patient}</p>
                  <p>Supervisor: {case_.supervisor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(case_.difficulty)}`}>
                      {case_.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">Due: {case_.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                <div className="text-sm font-medium text-green-800 min-w-[70px]">{item.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                  <p className="text-xs text-gray-600">{item.supervisor}</p>
                  <p className="text-xs text-gray-500">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assigned Patients */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Assigned Patients</h2>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {assignedPatients.map((patient, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <p className="text-sm font-medium text-gray-900">{patient.name}, {patient.age}</p>
                  <p className="text-xs text-gray-600">{patient.condition}</p>
                  <p className="text-xs text-gray-500">Supervisor: {patient.supervisor}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(patient.priority)}`}>
                  {patient.priority}
                </span>
              </div>
            ))}
            <Link 
              to="/assigned-patients" 
              className="flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              View all patients <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Supervisor Feedback */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {supervisorFeedback.map((feedback, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">{feedback.supervisor}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-yellow-600">{feedback.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{feedback.feedback}</p>
                <p className="text-xs text-gray-500">{feedback.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Supervisor Reports */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Supervisor Reports</h2>
          <FileText className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {supervisorReports.map((report) => (
            <div key={report.id} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-gray-900">{report.title}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Supervisor: {report.supervisor}</p>
                <p>Due: {report.dueDate}</p>
                {report.submissionDate && (
                  <p>Submitted: {report.submissionDate}</p>
                )}
              </div>
              <div className="mt-3 flex justify-end">
                <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${getPriorityColor(report.priority)}`}>
                  {report.priority} priority
                </span>
              </div>
            </div>
          ))}
          <Link 
            to="/supervisor-reports" 
            className="flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View all reports <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TraineeDashboard;