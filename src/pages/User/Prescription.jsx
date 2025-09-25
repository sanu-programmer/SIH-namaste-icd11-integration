import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Pill, 
  User, 
  Download, 
  Printer, 
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
// import { userAPI } from '../../api/api';

/**
 * Prescription Page
 * 
 * Purpose: Display detailed prescription information with download/print options
 * 
 * Features:
 * - Detailed prescription view with medication information
 * - Doctor and patient details
 * - Dosage instructions and refill information
 * - Download and print functionality
 * - Medication history and interactions
 * - Responsive design with healthcare theming
 */
const Prescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch prescription data
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock data for demonstration (replace with actual API response)
        const mockPrescription = {
          id: id,
          prescriptionNumber: 'RX-2024-001',
          date: '2024-01-10',
          doctor: {
            name: 'Dr. Priya Sharma',
            specialty: 'Cardiology',
            licenseNumber: 'MH-12345',
            phone: '+91-98765-43210',
            email: 'priya.sharma@hospital.com'
          },
          patient: {
            name: 'John Doe',
            age: 45,
            gender: 'Male',
            phone: '+91-98765-43211',
            address: '123 Main Street, Mumbai, Maharashtra 400001'
          },
          medications: [
            {
              id: 1,
              name: 'Metformin',
              strength: '500mg',
              form: 'Tablet',
              dosage: 'Twice daily',
              frequency: 'After meals',
              duration: '30 days',
              quantity: 60,
              instructions: 'Take with food to reduce stomach upset. Monitor blood sugar levels regularly.',
              refills: 2,
              nextRefillDate: '2024-02-10'
            },
            {
              id: 2,
              name: 'Lisinopril',
              strength: '10mg',
              form: 'Tablet',
              dosage: 'Once daily',
              frequency: 'Morning',
              duration: '30 days',
              quantity: 30,
              instructions: 'Take at the same time each day. Monitor blood pressure regularly.',
              refills: 1,
              nextRefillDate: '2024-02-05'
            }
          ],
          notes: 'Patient is responding well to current treatment. Continue monitoring blood sugar and blood pressure levels. Follow up in 4 weeks.',
          status: 'active',
          validUntil: '2024-04-10'
        };

        setPrescription(mockPrescription);
      } catch (err) {
        console.error('Prescription fetch error:', err);
        setError('Failed to load prescription details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrescription();
    }
  }, [id]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle print prescription
  const handlePrint = () => {
    window.print();
  };

  // Handle download prescription
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading prescription PDF...');
    alert('Downloading prescription PDF...');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Prescription</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="text-center py-12">
        <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Prescription Not Found</h3>
        <p className="text-gray-600 mb-4">The requested prescription could not be found.</p>
        <Link to="/app/prescriptions" className="btn-primary">
          View All Prescriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/app/prescriptions"
            className="flex items-center text-mint-600 hover:text-mint-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Prescriptions
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownload}
            className="flex items-center px-4 py-2 bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Prescription Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              Prescription #{prescription.prescriptionNumber}
            </h1>
            <p className="text-gray-600 mt-1">
              Prescribed on {formatDate(prescription.date)}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              prescription.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {prescription.status}
            </span>
          </div>
        </div>

        {/* Doctor and Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Doctor Information */}
          <div className="bg-mint-50 rounded-lg p-4">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
              Prescribing Doctor
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 text-mint-600 mr-2" />
                <span className="font-medium">{prescription.doctor.name}</span>
              </div>
              <p className="text-sm text-gray-600">{prescription.doctor.specialty}</p>
              <p className="text-sm text-gray-600">License: {prescription.doctor.licenseNumber}</p>
              <p className="text-sm text-gray-600">{prescription.doctor.phone}</p>
              <p className="text-sm text-gray-600">{prescription.doctor.email}</p>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
              Patient Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">{prescription.patient.name}</span>
              </div>
              <p className="text-sm text-gray-600">
                {prescription.patient.age} years, {prescription.patient.gender}
              </p>
              <p className="text-sm text-gray-600">{prescription.patient.phone}</p>
              <p className="text-sm text-gray-600">{prescription.patient.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medications */}
      <div className="card">
        <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
          Prescribed Medications
        </h2>
        
        <div className="space-y-6">
          {prescription.medications.map((medication) => (
            <div key={medication.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Pill className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-gray-900">
                      {medication.name} {medication.strength}
                    </h3>
                    <p className="text-sm text-gray-600">{medication.form}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    Quantity: {medication.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Refills: {medication.refills}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Dosage</p>
                  <p className="text-gray-900">{medication.dosage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Frequency</p>
                  <p className="text-gray-900">{medication.frequency}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Duration</p>
                  <p className="text-gray-900">{medication.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Next Refill</p>
                  <p className="text-gray-900">
                    {medication.nextRefillDate ? formatDate(medication.nextRefillDate) : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Instructions</p>
                <p className="text-gray-900">{medication.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Notes */}
      <div className="card">
        <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
          Additional Notes
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {prescription.notes}
        </p>
      </div>

      {/* Prescription Validity */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-mint-600" />
            <div>
              <p className="font-medium text-gray-900">Prescription Valid Until</p>
              <p className="text-sm text-gray-600">
                {formatDate(prescription.validUntil)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              Valid for {Math.ceil((new Date(prescription.validUntil) - new Date()) / (1000 * 60 * 60 * 24))} more days
            </span>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 mb-2">Important Information</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Take medications exactly as prescribed by your doctor</li>
              <li>• Do not stop taking medications without consulting your doctor</li>
              <li>• Report any side effects or concerns immediately</li>
              <li>• Keep this prescription for your records</li>
              <li>• Store medications in a cool, dry place away from children</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;
