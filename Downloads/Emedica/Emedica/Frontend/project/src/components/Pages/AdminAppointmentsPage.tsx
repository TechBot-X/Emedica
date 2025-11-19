import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle, 
  XCircle, 
  X,
  Stethoscope,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Download,
  Printer
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Appointment {
  id: string;
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    gender: string;
    address: string;
  };
  doctor: {
    id: string;
    name: string;
    specialization: string;
    email: string;
    phone: string;
  };
  type: string;
  status: 'scheduled' | 'completed' | 'in-progress' | 'cancelled' | 'no-show';
  date: string;
  time: string;
  duration: number;
  notes: string;
  room: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  insurance: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
}

const AdminAppointmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    patient: '',
    doctor: '',
    department: '',
    type: 'Regular Checkup',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 30,
    room: '',
    notes: '',
    priority: 'normal'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sample comprehensive appointments data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patient: {
        id: 'p1',
        name: 'Suresh Nair',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        age: 45,
        gender: 'Male',
        address: '123 Main St, City, State 12345'
      },
      doctor: {
        id: 'd1',
        name: 'Dr. Kavita Joshi',
        specialization: 'Cardiology',
        email: 'sarah.johnson@hospital.com',
        phone: '+1 (555) 987-6543'
      },
      type: 'Regular Checkup',
      status: 'scheduled' as const,
      date: '2024-01-15',
      time: '09:00 AM',
      duration: 30,
      notes: 'Annual physical examination. Patient has history of hypertension.',
      room: 'Cardiology-101',
      priority: 'medium',
      insurance: 'Blue Cross Blue Shield',
      cost: 150.00,
      createdAt: '2024-01-10T10:30:00Z',
      updatedAt: '2024-01-10T10:30:00Z'
    },
    {
      id: '2',
      patient: {
        id: 'p2',
        name: 'Pooja Desai',
        email: 'sarah.wilson@email.com',
        phone: '+1 (555) 234-5678',
        age: 32,
        gender: 'Female',
        address: '456 Oak Ave, City, State 12345'
      },
      doctor: {
        id: 'd2',
        name: 'Dr. Manoj Gupta',
        specialization: 'Internal Medicine',
        email: 'michael.brown@hospital.com',
        phone: '+1 (555) 876-5432'
      },
      type: 'Follow-up',
      status: 'completed',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: 20,
      notes: 'Blood pressure monitoring. BP: 120/80 - Normal range.',
      room: 'Internal-205',
      priority: 'low',
      insurance: 'Aetna',
      cost: 120.00,
      createdAt: '2024-01-08T14:20:00Z',
      updatedAt: '2024-01-15T10:50:00Z'
    },
    {
      id: '3',
      patient: {
        id: 'p3',
        name: 'Vikram Sinha',
        email: 'mike.johnson@email.com',
        phone: '+1 (555) 345-6789',
        age: 58,
        gender: 'Male',
        address: '789 Pine Rd, City, State 12345'
      },
      doctor: {
        id: 'd3',
        name: 'Dr. Asha Menon',
        specialization: 'Neurology',
        email: 'emily.davis@hospital.com',
        phone: '+1 (555) 765-4321'
      },
      type: 'Consultation',
      status: 'in-progress',
      date: '2024-01-15',
      time: '11:00 AM',
      duration: 45,
      notes: 'Cardiac consultation. Patient experiencing chest pain.',
      room: 'Neurology-301',
      priority: 'high',
      insurance: 'Cigna',
      cost: 200.00,
      createdAt: '2024-01-12T09:15:00Z',
      updatedAt: '2024-01-15T11:15:00Z'
    },
    {
      id: '4',
      patient: {
        id: 'p4',
        name: 'Pooja Desai',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 456-7890',
        age: 28,
        gender: 'Female',
        address: '321 Elm St, City, State 12345'
      },
      doctor: {
        id: 'd4',
        name: 'Dr. Vikram Sinha',
        specialization: 'Endocrinology',
        email: 'robert.wilson@hospital.com',
        phone: '+1 (555) 654-3210'
      },
      type: 'Follow-up',
      status: 'scheduled' as const,
      date: '2024-01-15',
      time: '02:00 PM',
      duration: 25,
      notes: 'Diabetes management. Blood sugar levels need monitoring.',
      room: 'Endocrinology-401',
      priority: 'medium',
      insurance: 'UnitedHealth',
      cost: 180.00,
      createdAt: '2024-01-09T16:45:00Z',
      updatedAt: '2024-01-09T16:45:00Z'
    },
    {
      id: '5',
      patient: {
        id: 'p5',
        name: 'Robert Brown',
        email: 'robert.brown@email.com',
        phone: '+1 (555) 567-8901',
        age: 67,
        gender: 'Male',
        address: '654 Maple Dr, City, State 12345'
      },
      doctor: {
        id: 'd1',
        name: 'Dr. Kavita Joshi',
        specialization: 'Cardiology',
        email: 'sarah.johnson@hospital.com',
        phone: '+1 (555) 987-6543'
      },
      type: 'Emergency',
      status: 'cancelled',
      date: '2024-01-15',
      time: '03:30 PM',
      duration: 60,
      notes: 'Patient unable to attend due to transportation issues.',
      room: 'Emergency-001',
      priority: 'emergency',
      insurance: 'Medicare',
      cost: 350.00,
      createdAt: '2024-01-14T20:30:00Z',
      updatedAt: '2024-01-15T14:00:00Z'
    },
    {
      id: '6',
      patient: {
        id: 'p6',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@email.com',
        phone: '+1 (555) 678-9012',
        age: 39,
        gender: 'Female',
        address: '987 Cedar Ln, City, State 12345'
      },
      doctor: {
        id: 'd5',
        name: 'Dr. Manoj Gupta',
        specialization: 'Orthopedics',
        email: 'james.miller@hospital.com',
        phone: '+1 (555) 543-2109'
      },
      type: 'Surgery Consultation',
      status: 'scheduled' as const,
      date: '2024-01-16',
      time: '09:00 AM',
      duration: 90,
      notes: 'Knee replacement consultation. Patient has severe arthritis.',
      room: 'Orthopedics-501',
      priority: 'high',
      insurance: 'Humana',
      cost: 250.00,
      createdAt: '2024-01-11T11:20:00Z',
      updatedAt: '2024-01-11T11:20:00Z'
    }
  ]);

  // Sample doctors for filter
  const doctors = [
    { id: 'd1', name: 'Dr. Kavita Joshi', specialization: 'Cardiology' },
    { id: 'd2', name: 'Dr. Manoj Gupta', specialization: 'Internal Medicine' },
    { id: 'd3', name: 'Dr. Asha Menon', specialization: 'Neurology' },
    { id: 'd4', name: 'Dr. Vikram Sinha', specialization: 'Endocrinology' },
    { id: 'd5', name: 'Dr. Manoj Gupta', specialization: 'Orthopedics' },
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDoctor = filterDoctor === 'all' || appointment.doctor.id === filterDoctor;
    const matchesDate = !filterDate || appointment.date === filterDate;
    
    return matchesSearch && matchesStatus && matchesDoctor && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <Calendar className="w-4 h-4 text-blue-600" />;
    }
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: newStatus, updatedAt: new Date().toISOString() }
        : apt
    ));
  };

  const deleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  const exportAppointments = () => {
    // In a real app, this would generate and download a CSV/PDF
    console.log('Exporting appointments...');
  };

  const printAppointments = () => {
    // In a real app, this would open print dialog
    window.print();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.patient) errors.patient = 'Patient is required';
    if (!formData.doctor) errors.doctor = 'Doctor is required';
    if (!formData.department) errors.department = 'Department is required';
    if (!formData.type) errors.type = 'Appointment type is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    if (!formData.room) errors.room = 'Room is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const formatTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    };
    
    const selectedPatient = appointments.find(p => p.patient.id === formData.patient);
    const selectedDoctor = appointments.find(d => d.doctor.id === formData.doctor);
    
    const newAppointment = {
      id: `${appointments.length + 1}`,
      patient: {
        name: selectedPatient?.patient.name || '',
        id: selectedPatient?.patient.id || '',
        phone: '+1 (555) 000-0000',
        email: 'patient@email.com',
        age: 30,
        gender: 'Unknown',
        address: '123 Main St, City, State 12345'
      },
      doctor: {
        name: selectedDoctor?.doctor.name || '',
        id: selectedDoctor?.doctor.id || '',
        department: formData.department,
        specialization: 'Specialist',
        email: 'doctor@hospital.com',
        phone: '+1 (555) 000-0000'
      },
      type: formData.type,
      date: formData.date,
      time: formatTime(formData.time),
      duration: formData.duration,
      room: formData.room,
      notes: formData.notes,
      status: 'scheduled' as const,
      priority: formData.priority as 'low' | 'medium' | 'high' | 'emergency',
      insurance: 'Standard Insurance',
      cost: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAppointments([...appointments, newAppointment]);
    
    setFormData({
      patient: '',
      doctor: '',
      department: '',
      type: 'Regular Checkup',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      room: '',
      notes: '',
      priority: 'normal'
    });
    setIsModalOpen(false);
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Management</h1>
          <p className="text-gray-600 mt-1">Manage all hospital appointments and schedules</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={exportAppointments}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button 
            onClick={printAppointments}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{appointments.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {appointments.filter(apt => apt.status === 'scheduled').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {appointments.filter(apt => apt.status === 'completed' && apt.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          </div>
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Doctors</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Appointments ({filteredAppointments.length})
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    {getStatusIcon(appointment.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.patient.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(appointment.priority)}`}>
                        {appointment.priority}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Stethoscope className="w-4 h-4" />
                        <span>{appointment.doctor.name} ({appointment.doctor.specialization})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date} at {appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Room {appointment.room}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">${appointment.cost}</span>
                        <span className="text-xs">({appointment.insurance})</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{appointment.notes}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-3">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsDetailsModalOpen(true);
                      }}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit Appointment"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteAppointment(appointment.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Appointment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button 
                          onClick={() => updateAppointmentStatus(appointment.id, 'in-progress')}
                          className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded hover:bg-green-100 transition-colors"
                        >
                          Start
                        </button>
                        <button 
                          onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                          className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded hover:bg-red-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'in-progress' && (
                      <button 
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-600">No appointments match the current filters.</p>
        </div>
      )}

      {/* Appointment Details Modal */}
      {isDetailsModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Appointment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Appointment Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium">{selectedAppointment.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{selectedAppointment.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedAppointment.status)}`}>
                        {selectedAppointment.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedAppointment.priority)}`}>
                        {selectedAppointment.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium">{selectedAppointment.date} at {selectedAppointment.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{selectedAppointment.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Room:</span>
                      <span className="font-medium">{selectedAppointment.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost:</span>
                      <span className="font-medium">${selectedAppointment.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-medium">{selectedAppointment.insurance}</span>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Patient Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedAppointment.patient.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{selectedAppointment.patient.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium">{selectedAppointment.patient.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedAppointment.patient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedAppointment.patient.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-medium text-right max-w-xs">{selectedAppointment.patient.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Doctor Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedAppointment.doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">{selectedAppointment.doctor.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedAppointment.doctor.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedAppointment.doctor.phone}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Notes</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedAppointment.notes}</p>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Created:</span> {new Date(selectedAppointment.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {new Date(selectedAppointment.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New/Edit Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedAppointment ? 'Edit Appointment' : 'New Appointment'}
              </h3>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedAppointment(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patient" className="block text-sm font-medium text-gray-700 mb-1">
                    Patient
                  </label>
                  <select
                    id="patient"
                    name="patient"
                    value={formData.patient}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.patient ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select a patient</option>
                    {appointments.map(apt => (
                      <option key={apt.patient.id} value={apt.patient.id}>{apt.patient.name}</option>
                    ))}
                  </select>
                  {formErrors.patient && <p className="text-red-500 text-xs mt-1">{formErrors.patient}</p>}
                </div>
                
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.doctor ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>
                    ))}
                  </select>
                  {formErrors.doctor && <p className="text-red-500 text-xs mt-1">{formErrors.doctor}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.department ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select department</option>
                    {appointments.map(apt => (
                      <option key={apt.doctor.specialization} value={apt.doctor.specialization}>{apt.doctor.specialization}</option>
                    ))}
                  </select>
                  {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.type ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    {appointments.map(apt => (
                      <option key={apt.type} value={apt.type}>{apt.type}</option>
                    ))}
                  </select>
                  {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.date ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.date && <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>}
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.time ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.time && <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>}
                </div>
                
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="5"
                    max="120"
                    step="5"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.duration ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors.duration && <p className="text-red-500 text-xs mt-1">{formErrors.duration}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <input
                    type="text"
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.room ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g., Cardiology-101"
                  />
                  {formErrors.room && <p className="text-red-500 text-xs mt-1">{formErrors.room}</p>}
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any additional notes here..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedAppointment(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedAppointment ? 'Update Appointment' : 'Create Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointmentsPage; 