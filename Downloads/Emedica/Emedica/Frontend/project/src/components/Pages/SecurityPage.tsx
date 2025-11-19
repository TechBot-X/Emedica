import React, { useState } from 'react';
import { Shield, Lock, Eye, Clock, UserCheck, AlertCircle, KeyRound, UserCog } from 'lucide-react';

const SecurityPage: React.FC = () => {
  // Example state for toggles/inputs
  const [twoFA, setTwoFA] = useState(true);
  const [passwordExpiry, setPasswordExpiry] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordRules, setPasswordRules] = useState('Min 8 chars, 1 special char');

  // Example security events
  const securityEvents = [
    { time: '14:32', event: 'Failed login attempts detected', severity: 'medium', source: 'Authentication System' },
    { time: '13:15', event: 'Unusual data access pattern', severity: 'high', source: 'Database Monitor' },
    { time: '11:45', event: 'Firewall rule triggered', severity: 'low', source: 'Network Security' },
    { time: '10:20', event: 'Admin privilege escalation', severity: 'high', source: 'Access Control' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6"><Shield className="w-7 h-7 text-red-600" /> Security Settings</h1>

      {/* Security Options */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Password Rules */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2"><KeyRound className="w-4 h-4 text-blue-600" /> Password Rules</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              value={passwordRules}
              onChange={e => setPasswordRules(e.target.value)}
              placeholder="e.g. Min 8 chars, 1 special char"
            />
          </div>
          {/* Session Timeout */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-600" /> Session Timeout (minutes)</label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2"
              value={sessionTimeout}
              min={1}
              onChange={e => setSessionTimeout(Number(e.target.value))}
              placeholder="e.g. 30"
            />
          </div>
          {/* 2FA Toggle */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2"><UserCheck className="w-4 h-4 text-green-600" /> Two-Factor Authentication (2FA)</label>
            <label className="inline-flex items-center cursor-pointer mt-2">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={twoFA} onChange={() => setTwoFA(v => !v)} />
              <span className="ml-2 text-gray-700">Require 2FA for all users</span>
            </label>
          </div>
          {/* Password Expiry Toggle */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2"><Lock className="w-4 h-4 text-purple-600" /> Password Expiry</label>
            <label className="inline-flex items-center cursor-pointer mt-2">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={passwordExpiry} onChange={() => setPasswordExpiry(v => !v)} />
              <span className="ml-2 text-gray-700">Require password change every 90 days</span>
            </label>
          </div>
          {/* Audit Logs Viewer */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2"><Eye className="w-4 h-4 text-gray-700" /> Audit Logs Viewer</label>
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors mt-2">
              <Eye className="w-4 h-4" /> View Logs
            </button>
          </div>
          {/* Role-based Permissions */}
          <div>
            <label className="block text-sm font-medium mb-1 flex items-center gap-2"><UserCog className="w-4 h-4 text-orange-600" /> Role-based Permissions</label>
            <div className="text-gray-700 text-sm mt-2">Permissions are managed per user role in the User Management section.</div>
          </div>
        </div>
      </section>

      {/* Security Events Summary */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2"><AlertCircle className="w-5 h-5 text-red-600" /> Recent Security Events</h2>
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
      </section>
    </div>
  );
};

export default SecurityPage;