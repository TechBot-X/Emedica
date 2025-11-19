import React, { useState } from 'react';

// Types for form data
interface DoctorFormData {
  // 1. Personal Information
  fullName: string;
  dob: string;
  gender: string;
  nationality: string;
  maritalStatus: string;
  languages: string;
  address: string;
  phone: string;
  email: string;
  // 2. Medical Qualifications
  medicalDegree: string;
  institution: string;
  graduationYear: string;
  specializations: string;
  licenseNumber: string;
  issuingAuthority: string;
  qualificationDocs?: File[];
  // 3. Professional Experience
  currentPosition: string;
  currentInstitution: string;
  currentStartDate: string;
  previousPositions: string;
  hospitalAffiliations: string;
  // 4. Contact Information
  officePhone: string;
  officeEmail: string;
  website: string;
  socialLinks: string;
  // 5. Other Information
  memberships: string;
  awards: string;
  researchInterests: string;
  publications: string;
  // 6. Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyEmail: string;
  // 7. Consent
  consent: boolean;
  signature: File | null;
  consentDate: string;
}

const initialForm: DoctorFormData = {
  fullName: '',
  dob: '',
  gender: '',
  nationality: '',
  maritalStatus: '',
  languages: '',
  address: '',
  phone: '',
  email: '',
  medicalDegree: '',
  institution: '',
  graduationYear: '',
  specializations: '',
  licenseNumber: '',
  issuingAuthority: '',
  qualificationDocs: [],
  currentPosition: '',
  currentInstitution: '',
  currentStartDate: '',
  previousPositions: '',
  hospitalAffiliations: '',
  officePhone: '',
  officeEmail: '',
  website: '',
  socialLinks: '',
  memberships: '',
  awards: '',
  researchInterests: '',
  publications: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  emergencyEmail: '',
  consent: false,
  signature: null,
  consentDate: '',
};

const DoctorForm: React.FC = () => {
  const [formData, setFormData] = useState<DoctorFormData>(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      if (name === 'qualificationDocs') {
        const validFiles: File[] = [];
        let errorMsg = '';
        Array.from((e.target as HTMLInputElement).files || []).forEach(file => {
          if (file.size > 100 * 1024 * 1024) {
            errorMsg = 'Each file must be less than 100MB.';
          } else if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
            errorMsg = 'Only PDF or DOC/DOCX files are allowed.';
          } else {
            validFiles.push(file);
          }
        });
        setErrors(prev => ({ ...prev, qualificationDocs: errorMsg }));
        setFormData(prev => ({ ...prev, qualificationDocs: errorMsg ? [] : validFiles }));
        return;
      }
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      if (file && file.size > 100 * 1024 * 1024) {
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
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    // Personal Info
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required.';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital Status is required.';
    if (!formData.languages) newErrors.languages = 'Languages Spoken is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.phone) newErrors.phone = 'Phone Number is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    // Medical Qualifications
    if (!formData.medicalDegree) newErrors.medicalDegree = 'Medical Degree is required.';
    if (!formData.institution) newErrors.institution = 'Institution is required.';
    if (!formData.graduationYear) newErrors.graduationYear = 'Year of Graduation is required.';
    if (!formData.specializations) newErrors.specializations = 'Specialization(s) is required.';
    if (!formData.licenseNumber) newErrors.licenseNumber = 'Medical License Number is required.';
    if (!formData.issuingAuthority) newErrors.issuingAuthority = 'Issuing Authority is required.';
    if (!formData.qualificationDocs || formData.qualificationDocs.length === 0) newErrors.qualificationDocs = 'Medical qualification documents are required.';
    // Professional Experience
    if (!formData.currentPosition) newErrors.currentPosition = 'Current Position is required.';
    if (!formData.currentInstitution) newErrors.currentInstitution = 'Current Institution/Clinic is required.';
    if (!formData.currentStartDate) newErrors.currentStartDate = 'Start Date is required.';
    // Contact Info
    if (!formData.officePhone) newErrors.officePhone = 'Office Phone is required.';
    if (!formData.officeEmail) newErrors.officeEmail = 'Office Email is required.';
    // Emergency Contact
    if (!formData.emergencyName) newErrors.emergencyName = 'Emergency Contact Name is required.';
    if (!formData.emergencyRelationship) newErrors.emergencyRelationship = 'Relationship is required.';
    if (!formData.emergencyPhone) newErrors.emergencyPhone = 'Emergency Contact Phone is required.';
    if (!formData.emergencyEmail) newErrors.emergencyEmail = 'Emergency Contact Email is required.';
    // Consent
    if (!formData.consent) newErrors.consent = 'Consent is required.';
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
      <h2 className="text-2xl font-bold text-center mb-6">Doctor Information Form</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Personal Information */}
        <Section title="1. Personal Information">
          <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} required />
          <Select label="Gender" name="gender" value={formData.gender} onChange={handleChange} error={errors.gender} required options={["Male", "Female", "Other"]} />
          <Input label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} error={errors.nationality} required />
          <Select label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} error={errors.maritalStatus} required options={["Single", "Married", "Other"]} />
          <Input label="Languages Spoken" name="languages" value={formData.languages} onChange={handleChange} error={errors.languages} required />
          <Textarea label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} required />
          <Input label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
        </Section>

        {/* 2. Medical Qualifications */}
        <Section title="2. Medical Qualifications">
          <Input label="Medical Degree" name="medicalDegree" value={formData.medicalDegree} onChange={handleChange} error={errors.medicalDegree} required />
          <Input label="Institution" name="institution" value={formData.institution} onChange={handleChange} error={errors.institution} required />
          <Input label="Year of Graduation" name="graduationYear" type="number" value={formData.graduationYear} onChange={handleChange} error={errors.graduationYear} required />
          <Input label="Specialization(s)" name="specializations" value={formData.specializations} onChange={handleChange} error={errors.specializations} required />
          <Input label="Medical License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} error={errors.licenseNumber} required />
          <Input label="Issuing Authority" name="issuingAuthority" value={formData.issuingAuthority} onChange={handleChange} error={errors.issuingAuthority} required />
          {/* New: Medical Qualification Documents Upload */}
          <FileInputMultiple label="Upload Degree Certificate(s) & Other Medical Documents (PDF/DOC, max 100MB each)" name="qualificationDocs" files={formData.qualificationDocs || []} onChange={handleChange} error={errors.qualificationDocs} required />
          {formData.qualificationDocs && formData.qualificationDocs.length > 0 && (
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              {formData.qualificationDocs.map((file: File, idx: number) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </Section>

        {/* 3. Professional Experience */}
        <Section title="3. Professional Experience">
          <Input label="Current Position" name="currentPosition" value={formData.currentPosition} onChange={handleChange} error={errors.currentPosition} required />
          <Input label="Institution/Clinic" name="currentInstitution" value={formData.currentInstitution} onChange={handleChange} error={errors.currentInstitution} required />
          <Input label="Start Date" name="currentStartDate" type="date" value={formData.currentStartDate} onChange={handleChange} error={errors.currentStartDate} required />
          <Textarea label="Previous Positions (if any)" name="previousPositions" value={formData.previousPositions} onChange={handleChange} error={errors.previousPositions} />
          <Textarea label="Hospital Affiliations" name="hospitalAffiliations" value={formData.hospitalAffiliations} onChange={handleChange} error={errors.hospitalAffiliations} />
        </Section>

        {/* 4. Contact Information */}
        <Section title="4. Contact Information">
          <Input label="Office Phone" name="officePhone" type="tel" value={formData.officePhone} onChange={handleChange} error={errors.officePhone} required />
          <Input label="Office Email" name="officeEmail" type="email" value={formData.officeEmail} onChange={handleChange} error={errors.officeEmail} required />
          <Input label="Website (if any)" name="website" value={formData.website} onChange={handleChange} error={errors.website} />
          <Input label="Social Media Links (if any)" name="socialLinks" value={formData.socialLinks} onChange={handleChange} error={errors.socialLinks} />
        </Section>

        {/* 5. Other Information */}
        <Section title="5. Other Information">
          <Textarea label="Membership in Medical Associations" name="memberships" value={formData.memberships} onChange={handleChange} error={errors.memberships} />
          <Textarea label="Awards and Honors" name="awards" value={formData.awards} onChange={handleChange} error={errors.awards} />
          <Textarea label="Research Interests" name="researchInterests" value={formData.researchInterests} onChange={handleChange} error={errors.researchInterests} />
          <Textarea label="Publications (if any)" name="publications" value={formData.publications} onChange={handleChange} error={errors.publications} />
        </Section>

        {/* 6. Emergency Contact Information */}
        <Section title="6. Emergency Contact Information">
          <Input label="Name" name="emergencyName" value={formData.emergencyName} onChange={handleChange} error={errors.emergencyName} required />
          <Input label="Relationship" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} error={errors.emergencyRelationship} required />
          <Input label="Phone Number" name="emergencyPhone" type="tel" value={formData.emergencyPhone} onChange={handleChange} error={errors.emergencyPhone} required />
          <Input label="Email" name="emergencyEmail" type="email" value={formData.emergencyEmail} onChange={handleChange} error={errors.emergencyEmail} required />
        </Section>

        {/* 7. Consent */}
        <Section title="7. Consent">
          <Checkbox label="I confirm that the information provided is accurate and may be used for professional purposes." name="consent" checked={formData.consent} onChange={handleChange} error={errors.consent} required />
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

// FileInput component
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

interface FileInputMultipleProps {
  label: string;
  name: string;
  files: File[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}
const FileInputMultiple: React.FC<FileInputMultipleProps> = ({ label, name, onChange, error, required }) => (
  <div>
    <label className="block font-medium mb-1">{label}{required && <span className="text-red-500">*</span>}</label>
    <input
      type="file"
      name={name}
      multiple
      onChange={onChange}
      className={`block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
      required={required}
      accept=".pdf,.doc,.docx"
    />
    {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
  </div>
);

export default DoctorForm; 