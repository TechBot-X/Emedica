import React, { useState } from 'react';
import { Calendar, Clock,Search, Filter, Plus, CheckCircle, XCircle, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AppointmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    patient: '',
    type: 'Regular Checkup',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 30,
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      time: '09:00 AM',
      patient: 'John Smith',
      type: 'Regular Checkup',
      status: 'scheduled',
      date: '2024-01-15',
      duration: 30,
      notes: 'Annual physical examination',
    },
    {
      id: '2',
      time: '10:30 AM',
      patient: 'Sarah Wilson',
      type: 'Follow-up',
      status: 'completed',
      date: '2024-01-15',
      duration: 20,
      notes: 'Blood pressure monitoring',
    },
    {
      id: '3',
      time: '11:00 AM',
      patient: 'Mike Johnson',
      type: 'Consultation',
      status: 'in-progress',
      date: '2024-01-15',
      duration: 45,
      notes: 'Cardiac consultation',
    },
    {
      id: '4',
      time: '02:00 PM',
      patient: 'Emily Davis',
      type: 'Follow-up',
      status: 'scheduled',
      date: '2024-01-15',
      duration: 25,
      notes: 'Diabetes management',
    },
    {
      id: '5',
      time: '03:30 PM',
      patient: 'Robert Brown',
      type: 'Emergency',
      status: 'cancelled',
      date: '2024-01-15',
      duration: 60,
      notes: 'Patient unable to attend',
    },
  ]);

  // Sample patients data
  const patients = [
    { id: 'p1', name: 'John Smith' },
    { id: 'p2', name: 'Sarah Wilson' },
    { id: 'p3', name: 'Mike Johnson' },
    { id: 'p4', name: 'Emily Davis' },
    { id: 'p5', name: 'Robert Brown' },
    { id: 'p6', name: 'Lisa Anderson' },
  ];

  // Sample appointment types
  const appointmentTypes = [
    'Regular Checkup',
    'Follow-up',
    'Consultation',
    'Emergency',
    'Vaccination',
    'Lab Test',
    'Surgery Consultation'
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDate = appointment.date === selectedDate;
    return matchesSearch && matchesFilter && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) : value
    }));
    
    // Clear error when field is edited
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
    if (!formData.type) errors.type = 'Appointment type is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Format time for display (e.g., "09:00" to "09:00 AM")
    const formatTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    };
    
    // Create new appointment
    const newAppointment = {
      id: `${appointments.length + 1}`,
      patient: formData.patient,
      type: formData.type,
      date: formData.date,
      time: formatTime(formData.time),
      duration: formData.duration,
      notes: formData.notes,
      status: 'scheduled'
    };
    
    // Add to appointments list
    setAppointments([...appointments, newAppointment]);
    
    // Reset form and close modal
    setFormData({
      patient: '',
      type: 'Regular Checkup',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      notes: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your appointment schedule</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Appointment</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
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
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{appointment.patient}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600">{appointment.type}</p>
                    <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 text-gray-900 font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{appointment.duration} minutes</p>
                  
                  <div className="flex space-x-2 mt-3">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded hover:bg-green-100 transition-colors">
                          Start
                        </button>
                        <button className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded hover:bg-red-100 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'in-progress' && (
                      <button className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded hover:bg-blue-100 transition-colors">
                        Complete
                      </button>
                    )}
                    <button className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded hover:bg-gray-100 transition-colors">
                      Details
                    </button>
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
          <p className="text-gray-600">No appointments scheduled for the selected date and filters.</p>
        </div>
      )}

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900">New Appointment</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.name}>{patient.name}</option>
                  ))}
                </select>
                {formErrors.patient && <p className="text-red-500 text-xs mt-1">{formErrors.patient}</p>}
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
                  {appointmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formErrors.type && <p className="text-red-500 text-xs mt-1">{formErrors.type}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Appointment
                </button>
              </div>
            </form>
            <div className="px-6 pb-6">
              <a href="/consultations" className="block w-full text-center mt-2 bg-blue-100 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                Book a Consultation Instead
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;