import React, { useState } from 'react';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImage from './images/EMedicaLogo.png';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'superadmin': return 'bg-red-100 text-red-800';
      case 'trainee': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section with logo and title */}
        <div className="flex items-center space-x-3">
          <img
            src={logoImage}
            alt="EMedica Logo"
            className="w-25 h-10 object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900"></h1>
        </div>

        {/* Right section with notifications and profile */}
        <div className="flex items-center space-x-4">
          <button
            aria-label="Notifications"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Guest'}</p>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full capitalize ${getRoleColor(user?.role || '')}`}
              >
                {user?.role || 'visitor'}
              </span>
            </div>

            {/* User icon and dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
