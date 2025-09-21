import React, { useState } from 'react';
import { Info, X, Copy, Check } from 'lucide-react';

/**
 * DemoInfo Component
 * 
 * Purpose: Display demo credentials and testing information for the application
 * 
 * Features:
 * - Shows demo login credentials
 * - Copy to clipboard functionality
 * - Collapsible information panel
 * - Only shows in development/demo mode
 */
const DemoInfo = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [copiedField, setCopiedField] = useState(null);

  const demoCredentials = [
    {
      role: 'Admin',
      email: 'admin@demo.com',
      password: 'demo123',
      description: 'Full system access, user management, analytics',
      color: 'purple'
    },
    {
      role: 'Doctor',
      email: 'doctor@demo.com',
      password: 'demo123',
      description: 'Patient management, diagnosis, prescriptions',
      color: 'blue'
    },
    {
      role: 'Patient',
      email: 'user@demo.com',
      password: 'demo123',
      description: 'View records, prescriptions, appointments',
      color: 'green'
    }
  ];

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'purple':
        return 'border-secondary-200 bg-gradient-to-br from-secondary-50 to-secondary-100/50';
      case 'blue':
        return 'border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100/50';
      case 'green':
        return 'border-success-200 bg-gradient-to-br from-success-50 to-success-100/50';
      default:
        return 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100/50';
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md transition-colors duration-200"
        title="Show demo info"
      >
        <Info className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-heading font-bold text-gray-900">
            Demo Credentials
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {demoCredentials.map((cred, index) => (
            <div key={index} className={`p-4 rounded-xl border-2 ${getColorClasses(cred.color)} relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-gray-900">{cred.role}</h4>
                  <span className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded-full">{cred.description}</span>
                </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      {cred.email}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cred.email, `email-${index}`)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copy email"
                    >
                      {copiedField === `email-${index}` ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Password:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      {cred.password}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cred.password, `password-${index}`)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Copy password"
                    >
                      {copiedField === `password-${index}` ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> This is a demo application with mock data. 
            All features are functional but use simulated data.
          </p>
        </div>

        <div className="mt-3 text-center">
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs text-mint-600 hover:text-mint-700 font-medium"
          >
            Hide Demo Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoInfo;
