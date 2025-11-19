import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Server, 
  Users, 
  Shield, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Settings
} from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const systemStats = [
    { label: 'System Uptime', value: '99.98%', icon: Server, color: 'green', status: 'excellent' },
    { label: 'Total Users', value: '2,456', icon: Users, color: 'blue', trend: '+12.3%' },
    { label: 'Security Events', value: '3', icon: Shield, color: 'red', priority: 'high' },
    { label: 'System Load', value: '67%', icon: Activity, color: 'orange', status: 'normal' },
  ];

  const performanceMetrics = [
    { metric: 'Database Response Time', value: '45ms', status: 'good' },
    { metric: 'API Response Time', value: '125ms', status: 'good' },
    { metric: 'Memory Usage', value: '72%', status: 'warning' },
    { metric: 'CPU Usage', value: '45%', status: 'good' },
    { metric: 'Storage Usage', value: '83%', status: 'warning' },
    { metric: 'Network Bandwidth', value: '34%', status: 'good' },
  ];

  const securityEvents = [
    { time: '14:32', event: 'Failed login attempts detected', severity: 'medium', source: 'Authentication System' },
    { time: '13:15', event: 'Unusual data access pattern', severity: 'high', source: 'Database Monitor' },
    { time: '11:45', event: 'Firewall rule triggered', severity: 'low', source: 'Network Security' },
    { time: '10:20', event: 'Admin privilege escalation', severity: 'high', source: 'Access Control' },
  ];

  const systemHealth = [
    { component: 'Web Servers', status: 'online', uptime: '99.99%' },
    { component: 'Database Cluster', status: 'online', uptime: '99.95%' },
    { component: 'Authentication Service', status: 'online', uptime: '100%' },
    { component: 'File Storage', status: 'warning', uptime: '98.2%' },
    { component: 'Backup System', status: 'online', uptime: '99.8%' },
    { component: 'Monitoring Service', status: 'online', uptime: '99.9%' },
  ];

  const userAnalytics = [
    { role: 'Patients', count: 1247, percentage: 78.2, growth: '+5.2%' },
    { role: 'Doctors', count: 89, percentage: 5.6, growth: '+2.1%' },
    { role: 'Admins', count: 45, percentage: 2.8, growth: '+1.2%' },
    { role: 'Trainees', count: 34, percentage: 2.1, growth: '+8.7%' },
    { role: 'Super Admins', count: 12, percentage: 0.8, growth: '0%' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error':
      case 'offline':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Administration</h1>
          <p className="text-gray-600 mt-1">Monitor and manage system-wide operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/system-settings" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Settings className="w-5 h-5" />
            System Settings
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">System Online</span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                {stat.trend && (
                  <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                )}
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Events Alert */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-lg font-semibold text-red-900">Security Events</h2>
          </div>
          <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-medium rounded-full">
            {securityEvents.length} Active
          </span>
        </div>
        <div className="space-y-3">
          {securityEvents.map((event, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(event.severity)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{event.event}</p>
                  <p className="text-xs opacity-75">{event.source}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs">{event.time}</span>
                  <div className={`text-xs font-medium mt-1 ${
                    event.severity === 'high' ? 'text-red-700' :
                    event.severity === 'medium' ? 'text-yellow-700' :
                    'text-blue-700'
                  }`}>
                    {event.severity.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">System Health</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {systemHealth.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(component.status)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{component.component}</p>
                    <p className="text-xs text-gray-500">Uptime: {component.uptime}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                  component.status === 'online' ? 'bg-green-100 text-green-800' :
                  component.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {component.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  {getStatusIcon(metric.status)}
                  <span className="text-lg font-semibold text-gray-900">{metric.value}</span>
                </div>
                <p className="text-xs text-gray-600">{metric.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">User Analytics</h2>
          <TrendingUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {userAnalytics.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.role}</p>
                  <p className="text-sm text-gray-600">{user.count} users ({user.percentage}%)</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  user.growth.startsWith('+') ? 'text-green-600' : 
                  user.growth === '0%' ? 'text-gray-600' : 'text-red-600'
                }`}>
                  {user.growth}
                </span>
                <p className="text-xs text-gray-500">this month</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;