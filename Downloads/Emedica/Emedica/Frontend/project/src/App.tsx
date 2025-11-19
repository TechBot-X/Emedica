import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Layout from './components/Layout/Layout';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import PatientDashboard from './components/Dashboard/PatientDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import SuperAdminDashboard from './components/Dashboard/SuperAdminDashboard';
import TraineeDashboard from './components/Dashboard/TraineeDashboard';
import PatientsPage from './components/Pages/PatientsPage';
import AppointmentsPage from './components/Pages/AppointmentsPage';
import MedicalRecordsPage from './components/Pages/MedicalRecordsPage';
import PrescriptionsPage from './components/Pages/PrescriptionsPage';
import SchedulePage from './components/Pages/SchedulePage';
import StaffManagementPage from './components/Pages/StaffManagementPage';
import UserManagementPage from './components/Pages/UserManagementPage';
import SupervisorReportsPage from './components/Pages/SupervisorReportsPage';
import AssignedPatientsPage from './components/Pages/AssignedPatientsPage';
import ConsultationsPage from './components/Pages/ConsultationsPage';
import HospitalAnalyticsPage from './components/Pages/HospitalAnalyticsPage';
import AdminAppointmentsPage from './components/Pages/AdminAppointmentsPage';
import HospitalResourcesPage from './components/Pages/HospitalResourcesPage';
import SystemSettingsPage from './components/Pages/SystemSettingsPage';
import PatientForm from './components/Pages/PatientForm';
import DoctorForm from './components/Pages/DoctorForm';
import SystemOverviewPage from './components/Pages/SystemOverviewPage';
import SecurityPage from './components/Pages/SecurityPage';
import PatientReportForm from './components/Pages/PatientReportForm';
import LearningCasesPage from './components/Pages/LearningCasesPage';
import HospitalMapPage from './components/Pages/HospitalMapPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const DashboardRouter: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'superadmin':
      return <SuperAdminDashboard />;
    case 'trainee':
      return <TraineeDashboard />;
    default:
      return <DoctorDashboard />;
  }
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardRouter />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="medical-records" element={<MedicalRecordsPage />} />
        <Route path="prescriptions" element={<PrescriptionsPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="staff-management" element={<StaffManagementPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="supervisor-reports" element={<SupervisorReportsPage />} />
        <Route path="assigned-patients" element={<AssignedPatientsPage />} />
        <Route path="consultations" element={<ConsultationsPage />} />
        <Route path="hospital-analytics" element={<HospitalAnalyticsPage />} />
        <Route path="learning" element={<LearningCasesPage />} />
        <Route path="appointment-management" element={<AdminAppointmentsPage />} />
        <Route path="hospital-resources" element={<HospitalResourcesPage />} />
        <Route path="system-settings" element={<SystemSettingsPage />} />
        <Route path="patient-form" element={<PatientForm />} />
        <Route path="doctor-form" element={<DoctorForm />} />
        <Route path="overview" element={<SystemOverviewPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="patient-report" element={<PatientReportForm />} />
        <Route path="hospital-map" element={<HospitalMapPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;