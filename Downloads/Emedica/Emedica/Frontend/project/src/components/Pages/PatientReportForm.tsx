import React, { useState } from 'react';
import { User, Calendar, Phone, Mail, Home, FileText, HeartPulse, Thermometer, Activity, Droplets, Stethoscope, ClipboardList, AlertTriangle, CheckCircle, Search, BookOpen, UserCheck, Clock, Pill, Eye } from 'lucide-react';

interface PatientReportData {
  // Patient Info
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  patientId: string;
  insuranceCompany: string;
  policyNumber: string;
  groupId: string;
  // Chief Complaint
  chiefComplaint: string;
  onset: string;
  severity: number;
  // Medical History
  pastConditions: string;
  medications: string;
  allergies: string;
  familyHistory: string;
  socialHistory: string;
  // Examination
  bp: string;
  heartRate: string;
  temperature: string;
  spo2: string;
  respRate: string;
  physicalExam: string;
  generalAppearance: string;
  // Investigations
  labTests: string;
  imaging: string;
  otherTests: string;
  // Diagnosis
  provisionalDiagnosis: string;
  confirmedDiagnosis: string;
  // Treatment
  treatmentMeds: string;
  therapies: string;
  followUps: string;
  // Physician Info
  physicianName: string;
  credentials: string;
  physicianContact: string;
  reportDate: string;
  // Legal Consent
  consentPrivacy: boolean;
  consentMedical: boolean;
}

const initialForm: PatientReportData = {
  fullName: '',
  dob: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  patientId: '',
  insuranceCompany: '',
  policyNumber: '',
  groupId: '',
  chiefComplaint: '',
  onset: '',
  severity: 1,
  pastConditions: '',
  medications: '',
  allergies: '',
  familyHistory: '',
  socialHistory: '',
  bp: '',
  heartRate: '',
  temperature: '',
  spo2: '',
  respRate: '',
  physicalExam: '',
  generalAppearance: '',
  labTests: '',
  imaging: '',
  otherTests: '',
  provisionalDiagnosis: '',
  confirmedDiagnosis: '',
  treatmentMeds: '',
  therapies: '',
  followUps: '',
  physicianName: '',
  credentials: '',
  physicianContact: '',
  reportDate: '',
  consentPrivacy: false,
  consentMedical: false,
};

const PatientReportForm: React.FC = () => {
  const [form, setForm] = useState<PatientReportData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Generate Patient ID if empty
  React.useEffect(() => {
    if (!form.patientId) {
      setForm(f => ({ ...f, patientId: 'PID-' + Math.floor(100000 + Math.random() * 900000) }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName) newErrors.fullName = 'Full Name is required.';
    if (!form.dob) newErrors.dob = 'Date of Birth is required.';
    if (!form.gender) newErrors.gender = 'Gender is required.';
    if (!form.phone) newErrors.phone = 'Phone Number is required.';
    if (!form.email) newErrors.email = 'Email Address is required.';
    if (!form.address) newErrors.address = 'Address is required.';
    if (!form.patientId) newErrors.patientId = 'Patient ID is required.';
    if (!form.chiefComplaint) newErrors.chiefComplaint = 'Chief Complaint is required.';
    if (!form.onset) newErrors.onset = 'Onset & Duration is required.';
    if (!form.provisionalDiagnosis) newErrors.provisionalDiagnosis = 'Provisional Diagnosis is required.';
    if (!form.physicianName) newErrors.physicianName = 'Physician Name is required.';
    if (!form.credentials) newErrors.credentials = 'Credentials are required.';
    if (!form.physicianContact) newErrors.physicianContact = 'Physician Contact is required.';
    if (!form.reportDate) newErrors.reportDate = 'Report Date is required.';
    if (!form.consentPrivacy) newErrors.consentPrivacy = 'Privacy Policy agreement is required.';
    if (!form.consentMedical) newErrors.consentMedical = 'Consent to use data is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Report submitted successfully!');
      setForm(initialForm);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FileText className="w-6 h-6 text-blue-600" /> Patient Report Form</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Patient Information Collection */}
        <Section title="1. Patient Information Collection">
          <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} required icon={<User />} />
          <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} error={errors.dob} required icon={<Calendar />} />
          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} error={errors.gender} required options={["Male", "Female", "Other"]} icon={<UserCheck />} />
          <Input label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} required icon={<Phone />} />
          <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} required icon={<Mail />} />
          <Input label="Residential Address" name="address" value={form.address} onChange={handleChange} error={errors.address} required icon={<Home />} />
          <Input label="Patient ID" name="patientId" value={form.patientId} onChange={handleChange} error={errors.patientId} required icon={<UserCheck />} readOnly />
          <Input label="Insurance Company Name" name="insuranceCompany" value={form.insuranceCompany} onChange={handleChange} icon={<FileText />} />
          <Input label="Policy Number" name="policyNumber" value={form.policyNumber} onChange={handleChange} icon={<FileText />} />
          <Input label="Group ID" name="groupId" value={form.groupId} onChange={handleChange} icon={<FileText />} />
        </Section>

        {/* 2. Chief Complaint Section */}
        <Section title="2. Chief Complaint">
          <Textarea label="Reason for Visit (Chief Complaint)" name="chiefComplaint" value={form.chiefComplaint} onChange={handleChange} error={errors.chiefComplaint} required icon={<AlertTriangle />} />
          <Input label="Onset & Duration" name="onset" value={form.onset} onChange={handleChange} error={errors.onset} required icon={<Clock />} />
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="block font-medium mb-1 flex-1">Severity (Pain Scale 1-10)
              <input type="range" name="severity" min={1} max={10} value={form.severity} onChange={handleChange} className="w-full mt-2" />
              <span className="ml-2 text-blue-600 font-bold">{form.severity}</span>
            </label>
          </div>
        </Section>

        {/* 3. Medical History */}
        <Section title="3. Medical History">
          <Textarea label="Past Medical Conditions" name="pastConditions" value={form.pastConditions} onChange={handleChange} icon={<BookOpen />} />
          <Textarea label="Medications (name, dose, frequency)" name="medications" value={form.medications} onChange={handleChange} icon={<Pill />} />
          <Textarea label="Allergies" name="allergies" value={form.allergies} onChange={handleChange} icon={<AlertTriangle />} />
          <Textarea label="Family History" name="familyHistory" value={form.familyHistory} onChange={handleChange} icon={<User />} />
          <Textarea label="Social History (lifestyle, occupation)" name="socialHistory" value={form.socialHistory} onChange={handleChange} icon={<User />} />
        </Section>

        {/* 4. Examination Findings */}
        <Section title="4. Examination Findings">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Input label="Blood Pressure" name="bp" value={form.bp} onChange={handleChange} icon={<HeartPulse />} />
            <Input label="Heart Rate" name="heartRate" value={form.heartRate} onChange={handleChange} icon={<Activity />} />
            <Input label="Temperature" name="temperature" value={form.temperature} onChange={handleChange} icon={<Thermometer />} />
            <Input label="SpO₂" name="spo2" value={form.spo2} onChange={handleChange} icon={<Droplets />} />
            <Input label="Respiratory Rate" name="respRate" value={form.respRate} onChange={handleChange} icon={<Stethoscope />} />
          </div>
          <Textarea label="Physical Exam (per system)" name="physicalExam" value={form.physicalExam} onChange={handleChange} icon={<ClipboardList />} />
          <Textarea label="General Appearance" name="generalAppearance" value={form.generalAppearance} onChange={handleChange} icon={<Eye />} />
        </Section>

        {/* 5. Diagnostic Investigations */}
        <Section title="5. Diagnostic Investigations">
          <Textarea label="Lab Tests (CBC, LFT, etc.)" name="labTests" value={form.labTests} onChange={handleChange} icon={<FileText />} />
          <Textarea label="Imaging (X-ray, CT, MRI)" name="imaging" value={form.imaging} onChange={handleChange} icon={<FileText />} />
          <Textarea label="Other Tests (ECG, EEG, etc.)" name="otherTests" value={form.otherTests} onChange={handleChange} icon={<FileText />} />
        </Section>

        {/* 6. Diagnosis */}
        <Section title="6. Diagnosis">
          <Textarea label="Provisional Diagnosis" name="provisionalDiagnosis" value={form.provisionalDiagnosis} onChange={handleChange} error={errors.provisionalDiagnosis} required icon={<Search />} />
          <Textarea label="Confirmed Diagnosis" name="confirmedDiagnosis" value={form.confirmedDiagnosis} onChange={handleChange} icon={<CheckCircle />} />
        </Section>

        {/* 7. Treatment Plan */}
        <Section title="7. Treatment Plan">
          <Textarea label="Medications (name, dose, route, timing)" name="treatmentMeds" value={form.treatmentMeds} onChange={handleChange} icon={<Pill />} />
          <Textarea label="Therapies (physio, counseling, etc.)" name="therapies" value={form.therapies} onChange={handleChange} icon={<FileText />} />
          <Textarea label="Follow-ups & Referrals" name="followUps" value={form.followUps} onChange={handleChange} icon={<FileText />} />
        </Section>

        {/* 8. Physician Information */}
        <Section title="8. Physician Information">
          <Input label="Physician Name" name="physicianName" value={form.physicianName} onChange={handleChange} error={errors.physicianName} required icon={<User />} />
          <Input label="Credentials (degrees, license)" name="credentials" value={form.credentials} onChange={handleChange} error={errors.credentials} required icon={<UserCheck />} />
          <Input label="Physician Contact (email/phone)" name="physicianContact" value={form.physicianContact} onChange={handleChange} error={errors.physicianContact} required icon={<Mail />} />
          <Input label="Report Date" name="reportDate" type="date" value={form.reportDate} onChange={handleChange} error={errors.reportDate} required icon={<Calendar />} />
        </Section>

        {/* Legal Consent */}
        <Section title="Legal Consent & Privacy">
          <Checkbox label="I agree to the Privacy Policy" name="consentPrivacy" checked={form.consentPrivacy} onChange={handleChange} error={errors.consentPrivacy} required />
          <Checkbox label="I consent to use my data for medical care" name="consentMedical" checked={form.consentMedical} onChange={handleChange} error={errors.consentMedical} required />
        </Section>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Submit Report</button>
      </form>
    </div>
  );
};

// Section wrapper
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h3 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h3>
    <div className="space-y-4">{children}</div>
  </section>
);

// Input component
interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  readOnly?: boolean;
}
const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange, error, required, icon, readOnly }) => (
  <div>
    <label className="block font-medium mb-1 flex items-center gap-2">
      {icon}
      {label}{required && <span className="text-red-500">*</span>}
      <input
        className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? 'border-red-500' : 'border-gray-300'}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
      />
    </label>
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

// Textarea component
interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}
const Textarea: React.FC<TextareaProps> = ({ label, name, value, onChange, error, required, icon }) => (
  <div>
    <label className="block font-medium mb-1 flex items-center gap-2">
      {icon}
      {label}{required && <span className="text-red-500">*</span>}
      <textarea
        className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? 'border-red-500' : 'border-gray-300'}`}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        required={required}
      />
    </label>
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

// Select component
interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  options: string[];
  icon?: React.ReactNode;
}
const Select: React.FC<SelectProps> = ({ label, name, value, onChange, error, required, options, icon }) => (
  <div>
    <label className="block font-medium mb-1 flex items-center gap-2">
      {icon}
      {label}{required && <span className="text-red-500">*</span>}
      <select
        className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? 'border-red-500' : 'border-gray-300'}`}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </label>
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

// Checkbox component
interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}
const Checkbox: React.FC<CheckboxProps> = ({ label, name, checked, onChange, error, required }) => (
  <div>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className={`form-checkbox h-5 w-5 text-blue-600 ${error ? 'border-red-500' : 'border-gray-300'}`}
        required={required}
      />
      <span className="ml-2">{label}{required && <span className="text-red-500">*</span>}</span>
    </label>
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default PatientReportForm; 