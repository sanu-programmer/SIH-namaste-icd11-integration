import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Stethoscope, Eye, EyeOff, User, Crown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MedicalBackground from '../../components/Common/MedicalBackground';
import Navbar from '../../components/Layout/Navbar';

/**
 * Login Page
 * 
 * Purpose: Authentication page offering both custom login and ABHA login options
 * 
 * Features:
 * - Custom email/password login form
 * - ABHA login button for healthcare professionals
 * - Form validation and error handling
 * - Responsive design with healthcare theming
 * - Auto-redirect after successful login based on user role
 * - Password visibility toggle
 * - Accessibility support with proper labels and ARIA attributes
 */
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, abhaLogin, demoLogin, error, clearError, isAuthenticated, getRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get intended destination from location state
  const from = location.state?.from || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const role = getRole();
      switch (role) {
        case 'doctor':
          navigate('/app/doctor/dashboard', { replace: true });
          break;
        case 'admin':
          navigate('/app/admin/dashboard', { replace: true });
          break;
        case 'user':
        default:
          navigate('/app/dashboard', { replace: true });
          break;
      }
    }
  }, [isAuthenticated, getRole, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    clearError();

    try {
      const result = await login(formData);

      if (result.success) {
        // Redirect based on user role
        const role = getRole();
        switch (role) {
          case 'doctor':
            navigate('/app/doctor/dashboard', { replace: true });
            break;
          case 'admin':
            navigate('/app/admin/dashboard', { replace: true });
            break;
          case 'user':
          default:
            navigate(from, { replace: true });
            break;
        }
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle ABHA login
  const handleAbhaLogin = () => {
    clearError();
    abhaLogin();
  };

  // Handle demo login
  const handleDemoLogin = (role) => {
    clearError();
    const result = demoLogin(role);

    if (result.success) {
      // Redirect based on the role parameter directly
      switch (role) {
        case 'doctor':
          navigate('/app/doctor/dashboard', { replace: true });
          break;
        case 'admin':
          navigate('/app/admin/dashboard', { replace: true });
          break;
        case 'user':
          navigate('/app/dashboard', { replace: true });
          break;
        default:
          navigate('/app/dashboard', { replace: true });
          break;
      }
    } else {
      // Error will be handled by the auth context
      console.error('Demo login failed:', result.error);
    }
  };

  return (
    <div>

      <div>
        <Navbar />
      </div>
      <div className="mt-8 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex justify-center items-center relative">
        {/* Medical Background Elements */}
        <MedicalBackground variant="login" />


        {/* Left side - SVG Illustration */}
        <div className="hidden lg:flex ml-5 lg:w-1/2 bg-gradient-to-br from-primary-800 justify-center items-center rounded-2xl h-[145vh] to-primary-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
            {/* Medical Illustration */}
            <div className="mb-8">
              <svg className="w-80 h-80 text-white/90" fill="currentColor" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                    <stop offset="100%" style={{ stopColor: "#ffffff", stopOpacity: 0.6 }} />
                  </linearGradient>
                </defs>
                {/* Doctor with stethoscope */}
                <circle cx="200" cy="120" r="60" fill="url(#grad1)" />
                <path d="M140 200 Q200 160 260 200 L280 220 Q200 180 120 220 Z" fill="url(#grad1)" />
                <path d="M200 180 L200 300 M180 300 L220 300" stroke="url(#grad1)" strokeWidth="8" strokeLinecap="round" />
                <path d="M200 200 Q220 220 240 200" stroke="url(#grad1)" strokeWidth="4" fill="none" />
                {/* Stethoscope */}
                <path d="M160 140 Q180 120 200 140 Q220 120 240 140" stroke="url(#grad1)" strokeWidth="6" fill="none" />
                <circle cx="160" cy="140" r="8" fill="url(#grad1)" />
                <circle cx="240" cy="140" r="8" fill="url(#grad1)" />
                {/* Medical cross */}
                <path d="M320 80 L340 80 L340 100 L360 100 L360 120 L340 120 L340 140 L320 140 L320 120 L300 120 L300 100 L320 100 Z" fill="url(#grad1)" />
                {/* Heart */}
                <path d="M80 120 Q60 100 80 80 Q100 100 120 80 Q140 100 120 120 Q100 140 80 120" fill="url(#grad1)" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Ayush EMR</h1>
            <p className="text-xl text-white/90 text-center max-w-md">
              Your comprehensive healthcare management system for modern medical practice
            </p>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo and Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Sign in to Ayush EMR
              </h2>
              <p className="text-slate-600 text-sm">
                Access your healthcare records and manage your health
              </p>
            </div>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-slate-200">
              {/* Global Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-medium" role="alert">
                    {error}
                  </p>
                </div>
              )}

              {/* Custom Login Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Enter your email"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Enter your password"
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-slate-50 rounded-r-lg transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-slate-500">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* ABHA Login Button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleAbhaLogin}
                  className="w-full flex justify-center items-center px-4 py-3 border-2 border-primary-300 text-primary-700 bg-primary-50 hover:bg-primary-100 hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg transition-all duration-200"
                >
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Sign in with ABHA
                </button>
                <p className="mt-2 text-xs text-slate-500 text-center">
                  Healthcare professionals can use ABHA for secure authentication
                </p>
              </div>

              {/* Demo Login Section */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-slate-500">Demo Access</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                  <Crown className="h-5 w-5 mr-2" />
                  Demo Admin Login
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('doctor')}
                  className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Demo Doctor Login
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('user')}
                  className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                  <User className="h-5 w-5 mr-2" />
                  Demo Patient Login
                </button>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 text-center font-medium">
                  <strong>Demo Credentials:</strong> Use any email with password &quot;demo123&quot; or click demo buttons above
                </p>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 underline decoration-2 underline-offset-2"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
