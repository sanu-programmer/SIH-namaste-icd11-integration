import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, AlertCircle } from 'lucide-react';
import DiagnosisForm from '../../components/Forms/DiagnosisForm';
// import { doctorAPI } from '../../api/api';

/**
 * Doctor Diagnose Page
 * 
 * Purpose: Page for doctors to create diagnoses and prescriptions for patients
 * 
 * Features:
 * - Patient information display
 * - Diagnosis form with NAMASTE/ICD terminology
 * - Prescription management
 * - FHIR Bundle composition and upload
 * - Form validation and error handling
 * - Success/error feedback
 * - Navigation back to patient list
 */
const Diagnose = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient information
  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Mock patient data (replace with actual API call)
        const mockPatient = {
          id: patientId,
          name: 'Rajesh Kumar',
          age: 45,
          gender: 'Male',
          abhaId: 'ABHA-1234567890',
          phone: '+91-98765-43210',
          address: '123 Main Street, Mumbai, Maharashtra 400001',
          medicalHistory: 'Type 2 Diabetes, Hypertension',
          allergies: 'Penicillin',
          emergencyContact: '+91-98765-43211'
        };

        setPatient(mockPatient);
      } catch (err) {
        console.error('Patient fetch error:', err);
        setError('Failed to load patient information');
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  // Handle successful diagnosis submission
  const handleSuccess = () => {
    // Show success message and redirect
    alert('Diagnosis saved successfully!');
    navigate('/app/doctor/patients');
  };

  // Handle form cancellation
  const handleCancel = () => {
    navigate('/app/doctor/patients');
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Patient</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/app/doctor/patients')}
          className="btn-primary"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/app/doctor/patients')}
            className="flex items-center text-mint-600 hover:text-mint-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Patients
          </button>
        </div>
      </div>

      {/* Patient Information */}
      {patient && (
        <div className="card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-12 w-12 bg-mint-100 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-mint-600" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                Diagnose Patient
              </h1>
              <p className="text-gray-600">
                Creating diagnosis for {patient.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Patient Details</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {patient.name}</p>
                <p><span className="font-medium">Age:</span> {patient.age} years</p>
                <p><span className="font-medium">Gender:</span> {patient.gender}</p>
                <p><span className="font-medium">ABHA ID:</span> {patient.abhaId}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">Phone:</span> {patient.phone}</p>
                <p><span className="font-medium">Emergency:</span> {patient.emergencyContact}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Medical Information</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-medium">History:</span> {patient.medicalHistory}</p>
                <p><span className="font-medium">Allergies:</span> {patient.allergies}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Diagnosis Form */}
      <DiagnosisForm
        patientId={patientId}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Diagnose;
