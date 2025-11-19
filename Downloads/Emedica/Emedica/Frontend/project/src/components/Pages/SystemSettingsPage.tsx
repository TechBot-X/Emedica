import React from 'react';
import { Settings, Users, Building, Calendar, CreditCard, Bell, Stethoscope, Shield, Link2, Database, Mail, Phone, MapPin, FilePlus, FileMinus, Eye, Download, Upload } from 'lucide-react';

const SystemSettingsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6"><Settings className="w-7 h-7 text-blue-600" /> System Settings</h1>

      {/* General Settings */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Settings className="w-5 h-5 text-blue-500" /> General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Hospital Name</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. City Hospital" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo Upload</label>
            <input type="file" className="w-full border rounded-lg px-4 py-2" />
          </div>
          <div className="col-span-2 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><input type="email" className="w-full border rounded-lg px-4 py-2" placeholder="info@hospital.com" /></div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Contact Phone</label>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><input type="tel" className="w-full border rounded-lg px-4 py-2" placeholder="9999999999" /></div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Address</label>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /><input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="123 Main St, City" /></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Timezone</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Asia/Kolkata</option>
              <option>UTC</option>
              <option>America/New_York</option>
            </select>
          </div>
        </div>
      </section>

      {/* User Management */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Users className="w-5 h-5 text-green-600" /> User Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Roles & Permissions</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Admin</option>
              <option>Doctor</option>
              <option>Nurse</option>
              <option>Patient</option>
              <option>Receptionist</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Login Settings</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2"><input type="checkbox" /> 2FA Required</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Password Expiry (90 days)</label>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Configuration */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Building className="w-5 h-5 text-purple-600" /> Hospital Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Departments</label>
            <div className="flex gap-2">
              <input type="text" className="border rounded-lg px-4 py-2 flex-1" placeholder="Add department" />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-lg"><FilePlus className="w-4 h-4" /></button>
            </div>
            <div className="flex gap-2 mt-2">
              <span className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">Cardiology <FileMinus className="w-3 h-3 text-red-500 cursor-pointer" /></span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1">Neurology <FileMinus className="w-3 h-3 text-red-500 cursor-pointer" /></span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Doctor Shifts</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Dr. Smith: Mon-Fri 10am-2pm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Room/Bed Setup</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. ICU-101, General-201" />
          </div>
        </div>
      </section>

      {/* Appointment Settings */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-700" /> Appointment Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Slot Duration (min)</label>
            <input type="number" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. 30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Booking Rules</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Max 10 per day" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Approval Flow</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option>Auto-approval</option>
              <option>Manual approval</option>
            </select>
          </div>
        </div>
      </section>

      {/* Billing & Payments */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><CreditCard className="w-5 h-5 text-pink-600" /> Billing & Payments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Consultation Charges</label>
            <input type="number" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. 500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Taxes</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. 18% GST" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Methods</label>
            <select className="w-full border rounded-lg px-4 py-2" multiple>
              <option>UPI</option>
              <option>Card</option>
              <option>Insurance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Invoice Template</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="Invoice template name" />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Bell className="w-5 h-5 text-yellow-500" /> Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email Template</label>
            <textarea className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="Appointment reminder template..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SMS Template</label>
            <textarea className="w-full border rounded-lg px-4 py-2" rows={2} placeholder="SMS reminder template..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Enable Alerts</label>
            <label className="flex items-center gap-2"><input type="checkbox" /> Enable</label>
          </div>
        </div>
      </section>

      {/* Medical Settings */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Stethoscope className="w-5 h-5 text-green-700" /> Medical Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Lab Test Codes</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. CBC, LFT, KFT" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prescription Format</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Standard" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pharmacy Stock Threshold</label>
            <input type="number" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. 10" />
          </div>
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Shield className="w-5 h-5 text-red-600" /> Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Password Rules</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Min 8 chars, 1 special char" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Session Timeout (minutes)</label>
            <input type="number" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. 30" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Audit Logs Viewer</label>
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg"><Eye className="w-4 h-4" /> View Logs</button>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Link2 className="w-5 h-5 text-blue-500" /> Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">APIs</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="API key or endpoint" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Government Health IDs</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="ABHA, Ayushman, etc." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Insurance Systems</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Star Health, ICICI" />
          </div>
        </div>
      </section>

      {/* Backup & Restore */}
      <section className="bg-white rounded-xl shadow p-6 border space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Database className="w-5 h-5 text-gray-800" /> Backup & Restore</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Backup Schedule</label>
            <input type="text" className="w-full border rounded-lg px-4 py-2" placeholder="e.g. Daily at 2am" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Manual Backup</label>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"><Download className="w-4 h-4" /> Download Backup</button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Restore Data</label>
            <input type="file" className="w-full border rounded-lg px-4 py-2" />
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg mt-2"><Upload className="w-4 h-4" /> Restore</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemSettingsPage; 