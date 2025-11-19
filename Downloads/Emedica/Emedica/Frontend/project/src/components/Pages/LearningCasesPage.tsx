import React, { useState } from 'react';
import { BookOpen, User, Calendar, Star, CheckCircle, AlertCircle, ArrowRight, Filter, GraduationCap, PlayCircle } from 'lucide-react';

const mockCourses = [
  {
    title: 'Cardiology Essentials',
    description: 'Learn the fundamentals of cardiology, ECG interpretation, and common cardiac emergencies.',
    link: '#',
  },
  {
    title: 'Emergency Medicine Basics',
    description: 'Covers trauma, acute care, and rapid response protocols for ER settings.',
    link: '#',
  },
  {
    title: 'Pediatric Assessment',
    description: 'Master pediatric patient evaluation, growth charts, and common childhood illnesses.',
    link: '#',
  },
];

const mockCases = [
  {
    title: 'Cardiology Case Study #3',
    patient: 'Patient #447',
    supervisor: 'Dr. Sarah Johnson',
    status: 'in-progress',
    difficulty: 'intermediate',
    dueDate: '2024-01-18',
  },
  {
    title: 'Emergency Room Simulation',
    patient: 'Simulation #12',
    supervisor: 'Dr. Michael Brown',
    status: 'pending',
    difficulty: 'advanced',
    dueDate: '2024-01-20',
  },
  {
    title: 'Pediatric Assessment',
    patient: 'Patient #223',
    supervisor: 'Dr. Emily Wilson',
    status: 'completed',
    difficulty: 'beginner',
    dueDate: '2024-01-15',
  },
  {
    title: 'Neurology Case Review',
    patient: 'Patient #512',
    supervisor: 'Dr. Michael Brown',
    status: 'in-progress',
    difficulty: 'advanced',
    dueDate: '2024-01-22',
  },
];

const statusColors = {
  completed: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
};
const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

const LearningCasesPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredCases = mockCases.filter((c) => {
    const statusMatch = statusFilter === 'all' || c.status === statusFilter;
    const diffMatch = difficultyFilter === 'all' || c.difficulty === difficultyFilter;
    return statusMatch && diffMatch;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-7 h-7 text-green-600" /> Learning Cases</h1>
      </div>

      {/* Courses Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><GraduationCap className="w-6 h-6 text-blue-600" /> Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCourses.map((course, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-5 border flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2"><PlayCircle className="w-5 h-5 text-blue-500" /> {course.title}</h3>
                <p className="text-gray-700 mb-4">{course.description}</p>
              </div>
              <a href={course.link} className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold transition-colors w-max">
                Start Course <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded-lg px-2 py-1">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)} className="border rounded-lg px-2 py-1">
            <option value="all">All Difficulty</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <SummaryCard icon={<BookOpen className="w-6 h-6 text-green-600" />} label="Total Cases" value={mockCases.length} />
        <SummaryCard icon={<CheckCircle className="w-6 h-6 text-green-600" />} label="Completed" value={mockCases.filter(c => c.status === 'completed').length} />
        <SummaryCard icon={<AlertCircle className="w-6 h-6 text-yellow-600" />} label="Pending" value={mockCases.filter(c => c.status === 'pending').length} />
      </div>

      {/* Cases List */}
      <div className="space-y-6">
        {filteredCases.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No learning cases found for the selected filters.</p>
          </div>
        )}
        {filteredCases.map((c, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">{c.title}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {c.patient}</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> {c.supervisor}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[c.status as keyof typeof statusColors]}`}>{c.status}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[c.difficulty as keyof typeof difficultyColors]}`}>{c.difficulty}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Due: {c.dueDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                View Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SummaryCard: React.FC<{ icon: React.ReactNode; label: string; value: number }> = ({ icon, label, value }) => (
  <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border">
    {icon}
    <div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  </div>
);

export default LearningCasesPage;
