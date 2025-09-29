import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Stethoscope } from 'lucide-react';
import MedicalBackground from '../components/Common/MedicalBackground';

/**
 * NotFound Page (404)
 * 
 * Purpose: Healthcare-themed 404 error page for invalid routes
 * 
 * Features:
 * - Healthcare-themed design with medical icons
 * - Clear navigation options to return to main areas
 * - Responsive design with helpful messaging
 * - Accessibility support with proper heading structure
 */
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Medical Background Elements */}
      <MedicalBackground variant="default" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          {/* Medical Icon */}
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Stethoscope className="h-12 w-12 text-white" />
          </div>
          
          {/* Error Code */}
          <h1 className="text-6xl font-bold text-primary-600 mb-4">
            404
          </h1>
          
          {/* Error Message */}
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for seems to have wandered off. 
            Don&apos;t worry, our medical team is here to help you find your way back.
          </p>
          
          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
          
          {/* Additional Help */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-soft border border-gray-200">
            <h3 className="text-lg font-heading font-medium text-gray-900 mb-3">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              If you believe this is an error, please contact our support team.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                <span className="font-medium">Support:</span> support@ayushemr.com
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> +91-XXX-XXX-XXXX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
