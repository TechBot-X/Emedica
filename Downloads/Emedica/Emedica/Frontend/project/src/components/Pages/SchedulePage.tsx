import React, { useState } from 'react';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, User } from 'lucide-react';

const SchedulePage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const appointments = [
    { id: '1', date: '2024-01-15', time: '09:00', duration: 30, patient: 'Suresh Nair', type: 'Consultation' },
    { id: '2', date: '2024-01-15', time: '10:30', duration: 45, patient: 'Pooja Desai', type: 'Follow-up' },
    { id: '3', date: '2024-01-15', time: '14:00', duration: 60, patient: 'Vikram Sinha', type: 'Surgery Consultation' },
    { id: '4', date: '2024-01-16', time: '09:30', duration: 30, patient: 'Neha Singh', type: 'Checkup' },
    { id: '5', date: '2024-01-16', time: '11:00', duration: 45, patient: 'Meena Sharma', type: 'Follow-up' },
    { id: '6', date: '2024-01-17', time: '10:00', duration: 30, patient: 'Asha Menon', type: 'Consultation' },
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  };

  const getAppointmentAtTime = (date: Date, time: string) => {
    const dateAppointments = getAppointmentsForDate(date);
    return dateAppointments.find(apt => apt.time === time);
  };

  const weekDays = getWeekDays(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600 mt-1">Manage your appointment calendar</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'week' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'day' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Day
            </button>
          </div>
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Week View */}
        <div className="grid grid-cols-8 gap-1">
          {/* Time column header */}
          <div className="p-2 text-sm font-medium text-gray-500">Time</div>
          
          {/* Day headers */}
          {weekDays.map((day, index) => (
            <div key={index} className="p-2 text-center">
              <div className={`text-sm font-medium ${
                day.toDateString() === new Date().toDateString() 
                  ? 'text-blue-600' 
                  : 'text-gray-900'
              }`}>
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-lg font-bold mt-1 ${
                day.toDateString() === new Date().toDateString() 
                  ? 'text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto' 
                  : 'text-gray-900'
              }`}>
                {day.getDate()}
              </div>
            </div>
          ))}

          {/* Time slots and appointments */}
          {timeSlots.map((time, timeIndex) => (
            <React.Fragment key={timeIndex}>
              {/* Time column */}
              <div className="p-2 text-xs text-gray-500 border-t border-gray-100">
                {time}
              </div>
              
              {/* Day columns */}
              {weekDays.map((day, dayIndex) => {
                const appointment = getAppointmentAtTime(day, time);
                return (
                  <div key={dayIndex} className="p-1 border-t border-gray-100 min-h-[40px]">
                    {appointment && (
                      <div className="bg-blue-100 border border-blue-200 rounded p-2 text-xs hover:bg-blue-200 transition-colors cursor-pointer">
                        <div className="font-medium text-blue-900 truncate">
                          {appointment.patient}
                        </div>
                        <div className="text-blue-700 truncate">
                          {appointment.type}
                        </div>
                        <div className="text-blue-600">
                          {appointment.duration}min
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments Summary */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {getAppointmentsForDate(new Date()).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 text-gray-900 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
                <p className="text-sm text-gray-500">{appointment.duration} minutes</p>
              </div>
            </div>
          ))}
          
          {getAppointmentsForDate(new Date()).length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No appointments scheduled for today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;