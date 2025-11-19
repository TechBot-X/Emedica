import React, { useState } from 'react';
import {
  Filter, 
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  DollarSign,
  Award,
  ChevronDown,
  ChevronUp,
  Star,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConsultationsPage: React.FC = () => {
  // Removed unused state variable searchTerm
  const [filterConsultationType, setFilterConsultationType] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample doctor data
  const doctor = {
    name: 'Amit Sharma',
    specialty: 'Cardiologist',
    experience: '15+ years',
    qualifications: ['MD, Cardiology', 'MBBS', 'Fellowship in Interventional Cardiology'],
    languages: ['English', 'Hindi'],
    certifications: ['National Board of Examinations in Medical Sciences', 'Advanced Cardiac Life Support'],
    awards: ['Excellence in Patient Care 2022', 'Top Cardiologist 2021'],
    bio: 'Dr. Amit Sharma is a board-certified cardiologist with over 15 years of experience in treating complex cardiac conditions. He specializes in preventive cardiology, heart failure management, and interventional procedures.'
  };

  // Sample consultation types
  const consultationTypes = [
    {
      type: 'in-person',
      duration: '30 minutes',
      price: '$150',
      availability: 'Mon, Wed, Fri (9:00 AM - 4:00 PM)'
    },
    {
      type: 'video',
      duration: '20 minutes',
      price: '$100',
      availability: 'Tue, Thu (10:00 AM - 6:00 PM)'
    },
    {
      type: 'home-visit',
      duration: '45 minutes',
      price: '$250',
      availability: 'Sat (10:00 AM - 2:00 PM)'
    }
  ];

  // Sample available time slots
  const availableSlots = [
    { day: 'Monday', date: '2024-01-22', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '3:30 PM'] },
    { day: 'Wednesday', date: '2024-01-24', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
    { day: 'Friday', date: '2024-01-26', slots: ['9:30 AM', '12:00 PM', '2:30 PM'] },
  ];

  // Sample insurance information
  const insuranceInfo = [
    { provider: 'Blue Cross Blue Shield', plans: ['PPO', 'HMO'] },
    { provider: 'Aetna', plans: ['Select', 'Premium'] },
    { provider: 'UnitedHealthcare', plans: ['Choice Plus', 'Options PPO'] },
    { provider: 'Cigna', plans: ['Open Access Plus', 'LocalPlus'] },
  ];

  // Sample testimonials
  const testimonials = [
    {
      id: '1',
      patient: 'Dinesh H.',
      rating: 5,
      comment: 'Dr. Sumit Sharma was thorough and took the time to explain my condition in detail. Highly recommend!',
      date: '2023-12-15'
    },
    {
      id: '2',
      patient: 'Sunita G.',
      rating: 4,
      comment: 'Very professional and knowledgeable. The video consultation was convenient and effective.',
      date: '2023-11-28'
    },
    {
      id: '3',
      patient: 'Nitin S.',
      rating: 5,
      comment: 'Dr. Sumit Sharma helped me understand my heart condition and created a treatment plan that worked for my lifestyle.',
      date: '2023-10-05'
    },
  ];

  // Sample FAQs
  const faqs = [
    {
      id: 'faq1',
      question: 'How long is the consultation?',
      answer: 'In-person consultations typically last 30 minutes, video consultations are 20 minutes, and home visits are 45 minutes. Complex cases may require additional time.'
    },
    {
      id: 'faq2',
      question: 'Can I reschedule my appointment?',
      answer: 'Yes, you can reschedule your appointment up to 24 hours before the scheduled time without any penalty. Please use our online portal or contact our office to reschedule.'
    },
    {
      id: 'faq3',
      question: 'What is the cancellation policy?',
      answer: 'Cancellations made less than 24 hours before the appointment may incur a cancellation fee of 50% of the consultation charge. Emergency situations are considered on a case-by-case basis.'
    },
    {
      id: 'faq4',
      question: 'Are follow-ups charged separately?',
      answer: 'Brief follow-ups within two weeks of your initial consultation are complimentary. Extended follow-ups or those after two weeks are billed at a reduced rate.'
    },
    {
      id: 'faq5',
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring your ID, insurance card, list of current medications, relevant medical records or test results, and a list of questions you may have for the doctor.'
    },
  ];

  // Toggle FAQ expansion
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Render star ratings
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl overflow-hidden">
        <div className="container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Consult with Dr. {doctor.name}</h1>
            <p className="text-xl">{doctor.specialty} • {doctor.experience} Experience</p>
            <p className="text-blue-100 max-w-md">{doctor.bio.substring(0, 120)}...</p>
            <button
              className="mt-4 bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              onClick={() => navigate('/appointments', { state: { openModal: true } })}
            >
              Book Appointment
            </button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-blue-300 rounded-full flex items-center justify-center">
              <User className="w-24 h-24 md:w-32 md:h-32 text-blue-800" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Consultation Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Consultation Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consultationTypes.map((consultation, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                {consultation.type === 'in-person' && (
                  <User className="w-6 h-6 text-blue-600" />
                )}
                {consultation.type === 'video' && (
                  <Video className="w-6 h-6 text-blue-600" />
                )}
                {consultation.type === 'home-visit' && (
                  <MapPin className="w-6 h-6 text-blue-600" />
                )}
                <h3 className="text-lg font-semibold capitalize">{consultation.type} Consultation</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{consultation.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>{consultation.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{consultation.availability}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Availability & Booking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Availability & Booking</h2>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filterConsultationType}
              onChange={(e) => setFilterConsultationType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Consultation Types</option>
              <option value="in-person">In-Person</option>
              <option value="video">Video</option>
              <option value="home-visit">Home Visit</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableSlots.map((day, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{day.day}</h3>
                  <p className="text-sm text-gray-600">{day.date}</p>
                </div>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {day.slots.map((slot, slotIndex) => (
                  <button 
                    key={slotIndex}
                    className="py-2 px-3 text-sm border border-blue-200 text-blue-700 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            View Full Schedule
          </button>
        </div>
      </div>

      {/* 4. Fees & Insurance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Fees & Insurance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Charges</h3>
            <div className="space-y-3">
              {consultationTypes.map((consultation, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="capitalize">{consultation.type} Consultation ({consultation.duration})</span>
                  <span className="font-medium">{consultation.price}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Follow-up (within 2 weeks)</span>
                <span className="font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Extended Follow-up</span>
                <span className="font-medium">$75</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-2">Payment Options</h4>
              <p className="text-gray-600">We accept cash, all major credit/debit cards, and UPI payments.</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Insurance Plans</h3>
            <div className="space-y-4">
              {insuranceInfo.map((insurance, index) => (
                <div key={index} className="border-b border-gray-100 pb-3">
                  <h4 className="font-medium text-gray-900">{insurance.provider}</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Plans: {insurance.plans.join(', ')}
                  </p>
                </div>
              ))}
            </div>
            
            <p className="mt-6 text-sm text-gray-500">
              * Insurance coverage may vary. Please verify with your insurance provider before booking.
            </p>
          </div>
        </div>
      </div>

      {/* 5. About the Doctor */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">About Dr. {doctor.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 leading-relaxed mb-6">{doctor.bio}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Qualifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {doctor.qualifications.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Languages Spoken</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Certifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {doctor.certifications.map((certification, index) => (
                    <li key={index}>{certification}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Awards & Recognition</h3>
                <div className="space-y-2">
                  {doctor.awards.map((award, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-700">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Patient Testimonials */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center space-x-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.comment}"
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{testimonial.patient}</span>
                <span>{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. FAQs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b border-gray-100 pb-4">
              <button
                className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 focus:outline-none"
                onClick={() => toggleFaq(faq.id)}
              >
                <span>{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>
              {expandedFaq === faq.id && (
                <div className="mt-2 text-gray-700 text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 italic">Please arrive 10 minutes early for your consultation.</p>
    </div>
  );
};

export default ConsultationsPage;