import React, { useState } from 'react';

// Types for form data
interface PatientFormData {
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  physician: string;
  medications: string;
  allergies: string;
  surgeries: string;
  conditions: string;
  familyHistory: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  subscriberName: string;
  subscriberDOB: string;
  signature: File | null;
  consentDate: string;
  consentRelease: boolean;
  consentTreatment: boolean;
  consentPrivacy: boolean;
}

const initialForm: PatientFormData = {
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    physician: '',
    medications: '',
    allergies: '',
    surgeries: '',
    conditions: '',
    familyHistory: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
    subscriberDOB: '',
  signature: null,
    consentDate: '',
  consentRelease: false,
  consentTreatment: false,
  consentPrivacy: false,
};

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState<PatientFormData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      if (file && file.size > 100 * 1024 * 1024) { // 100MB
        setErrors(prev => ({ ...prev, signature: 'File size must be less than 100MB.' }));
        setFormData(prev => ({ ...prev, signature: null }));
      } else if (file && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrors(prev => ({ ...prev, signature: 'Only PDF or DOC/DOCX files are allowed.' }));
        setFormData(prev => ({ ...prev, signature: null }));
      } else {
        setErrors(prev => ({ ...prev, signature: '' }));
        setFormData(prev => ({ ...prev, signature: file }));
      }
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.phone) newErrors.phone = 'Phone Number is required.';
    if (!formData.email) newErrors.email = 'Email Address is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.emergencyName) newErrors.emergencyName = 'Emergency Contact Name is required.';
    if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency Contact Phone is required.';
    if (!formData.consentRelease) newErrors.consentRelease = 'Authorization of Medical Info Release is required.';
    if (!formData.consentTreatment) newErrors.consentTreatment = 'Consent to Treatment is required.';
    if (!formData.consentPrivacy) newErrors.consentPrivacy = 'Acknowledgement of Privacy Policy is required.';
    if (!formData.signature) newErrors.signature = 'Signature file is required.';
    if (!formData.consentDate) newErrors.consentDate = 'Date is required.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted successfully!');
      // Submit logic here
      setFormData(initialForm);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8 mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">Patient Information Form</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* I. Personal Information */}
        <Section title="I. Personal Information">
          <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} required />
          <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} error={errors.gender} required options={["Male", "Female", "Other"]} />
          <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} required />
          <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
          <Textarea label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} required />
          <Input label="Emergency Contact Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} error={errors.emergencyName} required />
          <Input label="Emergency Contact Phone" name="emergencyPhone" type="tel" value={formData.emergencyPhone} onChange={handleChange} error={errors.emergencyPhone} required />
        </Section>

        {/* II. Medical History */}
        <Section title="II. Medical History">
          <Input label="Primary Care Physician" name="physician" value={formData.physician} onChange={handleChange} />
          <Textarea label="Current Medications" name="medications" value={formData.medications} onChange={handleChange} />
          <Textarea label="Allergies" name="allergies" value={formData.allergies} onChange={handleChange} />
          <Textarea label="Past Surgeries" name="surgeries" value={formData.surgeries} onChange={handleChange} />
          <Textarea label="Chronic Conditions" name="conditions" value={formData.conditions} onChange={handleChange} />
          <Textarea label="Family History of Illnesses" name="familyHistory" value={formData.familyHistory} onChange={handleChange} />
        </Section>

        {/* III. Insurance Information */}
        <Section title="III. Insurance Information">
          <Input label="Insurance Provider" name="insuranceProvider" value={formData.insuranceProvider} onChange={handleChange} />
          <Input label="Policy Number" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
          <Input label="Group Number" name="groupNumber" value={formData.groupNumber} onChange={handleChange} />
          <Input label="Subscriber Name" name="subscriberName" value={formData.subscriberName} onChange={handleChange} />
          <Input label="Subscriber Date of Birth" name="subscriberDOB" type="date" value={formData.subscriberDOB} onChange={handleChange} />
        </Section>

        {/* IV. Consent and Acknowledgement */}
        <Section title="IV. Consent and Acknowledgement">
          <Checkbox label="I hereby authorize the release of my medical information to necessary healthcare providers." name="consentRelease" checked={formData.consentRelease} onChange={handleChange} error={errors.consentRelease} required />
          <Checkbox label="I consent to treatment as deemed necessary by the healthcare provider." name="consentTreatment" checked={formData.consentTreatment} onChange={handleChange} error={errors.consentTreatment} required />
          <Checkbox label="I acknowledge that I have read and understand the privacy policy of this practice." name="consentPrivacy" checked={formData.consentPrivacy} onChange={handleChange} error={errors.consentPrivacy} required />
          <div className="flex gap-4 mt-4">
            <FileInput label="Signature File (PDF/DOC, max 100MB)" name="signature" file={formData.signature} onChange={handleChange} error={errors.signature} required />
            <Input label="Date" name="consentDate" type="date" value={formData.consentDate} onChange={handleChange} error={errors.consentDate} required />
          </div>
        </Section>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Submit</button>
      </form>
    </div>
  );
};

// Section wrapper
interface SectionProps {
  title: string;
  children: React.ReactNode;
}
const Section: React.FC<SectionProps> = ({ title, children }) => (
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
}
const Input: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange, error, required }) => (
  <div>
    <label className="block font-medium mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    <input
        className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? 'border-red-500' : 'border-gray-300'}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
        required={required}
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
}
const Textarea: React.FC<TextareaProps> = ({ label, name, value, onChange, error, required }) => (
  <div>
    <label className="block font-medium mb-1">
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
}
const Select: React.FC<SelectProps> = ({ label, name, value, onChange, error, required, options }) => (
  <div>
    <label className="block font-medium mb-1">
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

// Add FileInput component
interface FileInputProps {
  label: string;
  name: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}
const FileInput: React.FC<FileInputProps> = ({ label, name, file, onChange, error, required }) => (
  <div>
    <label className="block font-medium mb-1">
      {label}{required && <span className="text-red-500">*</span>}
      <input
        className={`mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? 'border-red-500' : 'border-gray-300'}`}
        type="file"
        name={name}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onChange}
        required={required}
      />
    </label>
    {file && <div className="text-xs text-gray-600 mt-1">Selected: {file.name}</div>}
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default PatientForm;