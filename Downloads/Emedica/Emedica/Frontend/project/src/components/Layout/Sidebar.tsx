import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  FileText, 
  Pill, 
  BarChart3,
  Settings,
  Stethoscope,
  UserCheck,
  Shield,
  BookOpen,
  Activity,
  Clock,
  UserPlus,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/User';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  { to: '/', icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard', roles: ['doctor', 'patient', 'admin', 'superadmin', 'trainee'] },
  
  // Patient specific
  { to: '/appointments', icon: <Calendar className="w-5 h-5" />, label: 'My Appointments', roles: ['patient'] },
  { to: '/medical-records', icon: <FileText className="w-5 h-5" />, label: 'Medical Records', roles: ['patient'] },
  { to: '/prescriptions', icon: <Pill className="w-5 h-5" />, label: 'Prescriptions', roles: ['patient'] },
  
  // Doctor specific
  { to: '/patients', icon: <Users className="w-5 h-5" />, label: 'My Patients', roles: ['doctor'] },
  { to: '/schedule', icon: <Calendar className="w-5 h-5" />, label: 'Schedule', roles: ['doctor'] },
  { to: '/consultations', icon: <Stethoscope className="w-5 h-5" />, label: 'Consultations', roles: ['doctor'] },
  
  // Trainee specific
  { to: '/assigned-patients', icon: <UserCheck className="w-5 h-5" />, label: 'Assigned Patients', roles: ['trainee'] },
  { to: '/learning', icon: <BookOpen className="w-5 h-5" />, label: 'Learning Cases', roles: ['trainee'] },
  { to: '/supervisor-reports', icon: <UserPlus className="w-5 h-5" />, label: 'Supervisor Reports', roles: ['trainee', 'admin', 'superadmin'] },
  
  // Admin specific
  { to: '/staff-management', icon: <Users className="w-5 h-5" />, label: 'Staff Management', roles: ['admin'] },
  { to: '/hospital-analytics', icon: <Activity className="w-5 h-5" />, label: 'Hospital Analytics', roles: ['admin'] },
  { to: '/hospital-resources', icon: <Shield className="w-5 h-5" />, label: 'Hospital Resources', roles: ['admin'] },
  { to: '/appointment-management', icon: <Clock className="w-5 h-5" />, label: 'Appointments', roles: ['admin'] },
  
  // Super Admin specific
  { to: '/overview', icon: <BarChart3 className="w-5 h-5" />, label: 'System Overview', roles: ['superadmin'] },
  { to: '/user-management', icon: <Users className="w-5 h-5" />, label: 'User Management', roles: ['superadmin'] },
  { to: '/hospital-analytics', icon: <Activity className="w-5 h-5" />, label: 'Hospital Analytics', roles: ['superadmin'] },
  { to: '/hospital-resources', icon: <Shield className="w-5 h-5" />, label: 'Hospital Resources', roles: ['superadmin'] },
  { to: '/system-settings', icon: <Settings className="w-5 h-5" />, label: 'System Settings', roles: ['superadmin'] },
  { to: '/security', icon: <Shield className="w-5 h-5" />, label: 'Security', roles: ['superadmin'] },
  { to: '/hospital-map', icon: <MapPin className="w-5 h-5" />, label: 'Hospital Map', roles: ['superadmin'] },
];

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const filteredNavItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;