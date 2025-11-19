import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Stethoscope } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp-phone'>('password');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (loginMethod === 'password') {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const success = login(email);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
      setIsLoading(false);
    } else if (loginMethod === 'otp-phone') {
      if (otp === generatedOtp && otp.length === 6) {
        // Find user by phone (simulate)
        const foundUser = mockUsers.find(u => u.phone === phone);
        if (foundUser) {
          const success = login(foundUser.email);
          if (success) {
            navigate('/');
          } else {
            setError('Invalid phone number for OTP login');
          }
        } else {
          setError('Invalid phone number for OTP login');
        }
      } else {
        setError('Invalid OTP');
      }
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and max 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
  };

  const handleSendOtp = async () => {
    setError('');
    if (phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const otpCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    setGeneratedOtp(otpCode);
    setOtpStep('verify');
    setIsLoading(false);
    alert(`Simulated OTP sent to phone ${phone}: ${otpCode}`);
  };

  // Demo users for phone lookup
  const mockUsers = [
    { role: 'Doctor', email: 'doctor@hospital.com', phone: '9999999991', password: 'password' },
    { role: 'Patient', email: 'patient@email.com', phone: '9999999992', password: 'password' },
    { role: 'Admin', email: 'admin@hospital.com', phone: '9999999993', password: 'password' },
    { role: 'Super Admin', email: 'superadmin@hospital.com', phone: '9999999994', password: 'password' },
    { role: 'Trainee', email: 'trainee@hospital.com', phone: '9999999995', password: 'password' },
  ];

  // Find user name for display
  const matchedUser = loginMethod === 'otp-phone'
    ? mockUsers.find(u => u.phone === phone)
    : mockUsers.find(u => u.email === email);
  const userName = matchedUser ? matchedUser.role : '';

  useEffect(() => {
    setPhone('9999999991');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Logo with Transparency */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-100 pointer-events-none select-none"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}src/components/Layout/images/EMedicaLogo.png)`,
          backgroundSize: '60%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transform: 'scale(1.5)',
          width: '100%',
          height: '100%'
        }}
      />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-green-900">eMedica</h2>
          <p className="mt-2 text-green-700">Sign in to your account</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100">
          <div className="flex justify-center mb-6 space-x-2">
            <button
              type="button"
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${loginMethod === 'password' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'}`}
              onClick={() => { setLoginMethod('password'); setError(''); setOtpStep('request'); }}
            >
              Email/Password
            </button>
            <button
              type="button"
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${loginMethod === 'otp-phone' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700'}`}
              onClick={() => { setLoginMethod('otp-phone'); setError(''); setOtpStep('request'); }}
            >
              Phone OTP
            </button>
          </div>

          {loginMethod === 'password' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
              {userName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                  <input
                    type="text"
                    value={userName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          )}

          {loginMethod === 'otp-phone' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  id="otp-phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your 10-digit phone number"
                  required
                  disabled={otpStep === 'verify'}
                  maxLength={10}
                  pattern="[0-9]{10}"
                />
              </div>
              {userName && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                  <input
                    type="text"
                    value={userName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              )}
              {otpStep === 'request' && (
                <button
                  type="button"
                  disabled={isLoading || phone.length !== 10}
                  onClick={handleSendOtp}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              )}
              {otpStep === 'verify' && (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 tracking-widest text-center"
                      placeholder="6-digit OTP"
                      maxLength={6}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 text-green-600 underline text-sm"
                    onClick={() => { setOtpStep('request'); setOtp(''); setGeneratedOtp(''); }}
                  >
                    Resend OTP
                  </button>
                </>
              )}
              {error && (
                <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </form>
          )}
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="text-sm font-medium text-green-900 mb-3">Demo Credentials:</h3>
          <div className="space-y-2">
            {mockUsers.map((cred, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="font-medium text-green-700">{cred.role}:</span>
                <span className="text-green-600">{cred.email} / {cred.phone}</span>
              </div>
            ))}
            <p className="text-xs text-green-500 mt-2">Password for all: "password"</p>
            <p className="text-xs text-green-500 mt-1">Phone OTP for Doctor: 9999999991<br/>Patient: 9999999992<br/>Admin: 9999999993<br/>Super Admin: 9999999994<br/>Trainee: 9999999995</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;