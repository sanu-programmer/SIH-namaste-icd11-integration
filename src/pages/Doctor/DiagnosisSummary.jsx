import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Stethoscope, FileText, Pill, CheckCircle, AlertCircle } from 'lucide-react';

const DiagnosisSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patientId } = useParams();
  
  console.log('DiagnosisSummary location.state:', location.state);
  
  // Get the diagnosis data from location state
  const diagnosisData = location.state?.diagnosisData;
  const patientData = location.state?.patientData;

  console.log('diagnosisData:', diagnosisData);
  console.log('patientData:', patientData);

  // If no data is passed, show error or redirect
  if (!diagnosisData || !patientData) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Diagnosis Data Found</h3>
        <p className="text-gray-600 mb-4">Please complete a diagnosis first.</p>
        <p className="text-sm text-gray-500 mb-4">Debug: diagnosisData={!!diagnosisData}, patientData={!!patientData}</p>
        <button
          onClick={() => navigate('/app/doctor/patients')}
          className="btn-primary"
        >
          Back to Patients
        </button>
      </div>
    );
  }

  const handleBackToPatients = () => {
    navigate('/app/doctor/patients');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToPatients}
            className="flex items-center text-mint-600 hover:text-mint-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Patients
          </button>
        </div>
        <button
          onClick={handlePrint}
          className="btn-primary flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Print Summary</span>
        </button>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-green-800 font-medium">Diagnosis saved successfully!</p>
        </div>
      </div>

      {/* Patient Information */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-12 w-12 bg-mint-100 rounded-lg flex items-center justify-center">
            <User className="h-6 w-6 text-mint-600" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900">
              Diagnosis Summary
            </h1>
            <p className="text-gray-600">
              for {patientData.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Patient Details</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Name:</span> {patientData.name}</p>
              <p><span className="font-medium">Age:</span> {patientData.age} years</p>
              <p><span className="font-medium">Gender:</span> {patientData.gender}</p>
              <p><span className="font-medium">ABHA ID:</span> {patientData.abhaId}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Encounter Information</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Date:</span> {diagnosisData.encounterDate}</p>
              <p><span className="font-medium">Type:</span> {diagnosisData.encounterType}</p>
              <p><span className="font-medium">Patient ID:</span> {diagnosisData.patientId}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Phone:</span> {patientData.phone}</p>
              <p><span className="font-medium">Emergency:</span> {patientData.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chief Complaint and Clinical Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <Stethoscope className="h-4 w-4 mr-2 text-mint-600" />
            Chief Complaint
          </h3>
          <p className="text-gray-700">{diagnosisData.chiefComplaint}</p>
        </div>

        <div className="card">
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-mint-600" />
            Clinical Notes
          </h3>
          <p className="text-gray-700">{diagnosisData.clinicalNotes}</p>
        </div>
      </div>

      {/* Vitals */}
      {diagnosisData.vitals && (
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-4">Vitals</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(diagnosisData.vitals).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="font-medium text-gray-900">{value || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diagnoses */}
      {diagnosisData.diagnoses && diagnosisData.diagnoses.length > 0 && (
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <Stethoscope className="h-4 w-4 mr-2 text-mint-600" />
            Diagnoses ({diagnosisData.diagnoses.length})
          </h3>
          <div className="space-y-4">
            {diagnosisData.diagnoses.map((diagnosis, index) => (
              <div key={diagnosis.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{diagnosis.namasteName}</h4>
                    <p className="text-xs text-gray-500">
                      NAMASTE: {diagnosis.namasteCode} | ICD: {diagnosis.icdCode}
                    </p>
                  </div>
                  <span className="bg-mint-100 text-mint-800 text-xs px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                </div>
                {diagnosis.notes && (
                  <p className="text-sm text-gray-600 mt-2">{diagnosis.notes}</p>
                )}
                {diagnosis.translatedCodes && diagnosis.translatedCodes.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Biomedical Codes:</p>
                    <div className="text-xs text-gray-600">
                      {diagnosis.translatedCodes.map((code, i) => (
                        <div key={i}>{code.code} - {code.name}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prescriptions */}
      {diagnosisData.prescriptions && diagnosisData.prescriptions.length > 0 && (
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center">
            <Pill className="h-4 w-4 mr-2 text-mint-600" />
            Prescriptions ({diagnosisData.prescriptions.length})
          </h3>
          <div className="space-y-4">
            {diagnosisData.prescriptions.map((prescription, index) => (
              <div key={prescription.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{prescription.medication}</h4>
                    <p className="text-sm text-gray-600">
                      {prescription.strength} {prescription.form} - {prescription.dosage} {prescription.frequency} for {prescription.duration}
                    </p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                </div>
                {prescription.instructions && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Instructions:</span> {prescription.instructions}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attachments */}
      {diagnosisData.attachments && diagnosisData.attachments.length > 0 && (
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-4">Attachments ({diagnosisData.attachments.length})</h3>
          <div className="space-y-2">
            {diagnosisData.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">{attachment.name}</span>
                  <span className="text-xs text-gray-500">({Math.round(attachment.size / 1024)} KB)</span>
                </div>
                <span className="text-xs text-gray-500">{attachment.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleBackToPatients}
          className="btn-secondary"
        >
          Back to Patients
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/app/doctor/diagnose/${patientId}`)}
            className="btn-primary"
          >
            Create New Diagnosis
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisSummary;