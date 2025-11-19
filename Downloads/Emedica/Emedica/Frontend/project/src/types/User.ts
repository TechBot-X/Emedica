export type UserRole = 'patient' | 'doctor' | 'admin' | 'superadmin' | 'trainee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialization?: string;
  department?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  emergencyContact?: string;
  licenseNumber?: string;
  supervisorId?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  patientName?: string;
  doctorName?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  prescription?: string;
  notes?: string;
  doctorName?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  date: string;
  status: 'active' | 'completed' | 'cancelled';
}