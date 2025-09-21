import React, { useState } from 'react';
import { 
  Stethoscope, 
  Plus, 
  Trash2, 
  Save, 
  Upload,
  FileText,
  AlertCircle
} from 'lucide-react';
import AutoComplete from './AutoComplete';
import { doctorAPI } from '../../api/api';

/**
 * DiagnosisForm Component
 * 
 * Purpose: Form for doctors to create diagnoses and prescriptions with NAMASTE/ICD terminology
 * 
 * Features:
 * - AutoComplete search for NAMASTE/ICD codes
 * - Translate functionality for code mapping
 * - Clinical notes and vitals input
 * - Prescription management with multiple medications
 * - File attachments support
 * - FHIR Bundle composition and upload
 * - Form validation and error handling
 * - Accessibility support with proper labels
 */
const DiagnosisForm = ({ patientId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: patientId || '',
    encounterDate: new Date().toISOString().split('T')[0],
    encounterType: 'consultation',
    chiefComplaint: '',
    clinicalNotes: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      height: '',
      oxygenSaturation: ''
    },
    diagnoses: [],
    prescriptions: [],
    attachments: []
  });
  
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
  const [translatedCodes, setTranslatedCodes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('vitals.')) {
      const vitalField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          [vitalField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear field-specific error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle diagnosis selection from AutoComplete
  const handleDiagnosisSelect = (diagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setTranslatedCodes([]);
  };

  // Handle diagnosis translation
  const handleDiagnosisTranslate = (translatedDiagnosis) => {
    setTranslatedCodes(translatedDiagnosis.translatedIcdCodes || []);
  };

  // Add diagnosis to form
  const addDiagnosis = () => {
    if (!selectedDiagnosis) return;

    const newDiagnosis = {
      id: Date.now(),
      namasteCode: selectedDiagnosis.namasteCode,
      namasteName: selectedDiagnosis.namasteName,
      icdCode: selectedDiagnosis.icdCode,
      icdName: selectedDiagnosis.icdName,
      translatedCodes: translatedCodes,
      includeBiomedical: true,
      notes: ''
    };

    setFormData(prev => ({
      ...prev,
      diagnoses: [...prev.diagnoses, newDiagnosis]
    }));

    // Reset selection
    setSelectedDiagnosis(null);
    setTranslatedCodes([]);
  };

  // Remove diagnosis
  const removeDiagnosis = (diagnosisId) => {
    setFormData(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.filter(d => d.id !== diagnosisId)
    }));
  };

  // Update diagnosis notes
  const updateDiagnosisNotes = (diagnosisId, notes) => {
    setFormData(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.map(d => 
        d.id === diagnosisId ? { ...d, notes } : d
      )
    }));
  };

  // Toggle biomedical code inclusion
  const toggleBiomedicalCode = (diagnosisId) => {
    setFormData(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.map(d => 
        d.id === diagnosisId ? { ...d, includeBiomedical: !d.includeBiomedical } : d
      )
    }));
  };

  // Add prescription
  const addPrescription = () => {
    const newPrescription = {
      id: Date.now(),
      medication: '',
      strength: '',
      form: 'tablet',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      quantity: ''
    };

    setFormData(prev => ({
      ...prev,
      prescriptions: [...prev.prescriptions, newPrescription]
    }));
  };

  // Update prescription
  const updatePrescription = (prescriptionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.map(p => 
        p.id === prescriptionId ? { ...p, [field]: value } : p
      )
    }));
  };

  // Remove prescription
  const removePrescription = (prescriptionId) => {
    setFormData(prev => ({
      ...prev,
      prescriptions: prev.prescriptions.filter(p => p.id !== prescriptionId)
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  // Remove attachment
  const removeAttachment = (attachmentId) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(a => a.id !== attachmentId)
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }

    if (!formData.chiefComplaint.trim()) {
      newErrors.chiefComplaint = 'Chief complaint is required';
    }

    if (!formData.clinicalNotes.trim()) {
      newErrors.clinicalNotes = 'Clinical notes are required';
    }

    if (formData.diagnoses.length === 0) {
      newErrors.diagnoses = 'At least one diagnosis is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Compose FHIR Bundle
  const composeFhirBundle = () => {
    // This would compose a proper FHIR Bundle in a real implementation
    const bundle = {
      resourceType: 'Bundle',
      type: 'collection',
      timestamp: new Date().toISOString(),
      entry: [
        {
          resource: {
            resourceType: 'Encounter',
            status: 'finished',
            class: {
              system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
              code: 'AMB',
              display: 'ambulatory'
            },
            subject: {
              reference: `Patient/${formData.patientId}`
            },
            period: {
              start: formData.encounterDate
            }
          }
        }
      ]
    };

    // Add Condition resources for diagnoses
    formData.diagnoses.forEach(diagnosis => {
      bundle.entry.push({
        resource: {
          resourceType: 'Condition',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/icd-10',
                code: diagnosis.icdCode,
                display: diagnosis.icdName
              }
            ]
          },
          subject: {
            reference: `Patient/${formData.patientId}`
          },
          onsetDateTime: formData.encounterDate,
          note: [
            {
              text: diagnosis.notes
            }
          ]
        }
      });
    });

    // Add MedicationRequest resources for prescriptions
    formData.prescriptions.forEach(prescription => {
      if (prescription.medication.trim()) {
        bundle.entry.push({
          resource: {
            resourceType: 'MedicationRequest',
            status: 'active',
            intent: 'order',
            medicationCodeableConcept: {
              text: prescription.medication
            },
            subject: {
              reference: `Patient/${formData.patientId}`
            },
            dosageInstruction: [
              {
                text: `${prescription.dosage} ${prescription.frequency} for ${prescription.duration}`,
                additionalInstruction: [
                  {
                    text: prescription.instructions
                  }
                ]
              }
            ]
          }
        });
      }
    });

    return bundle;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // Compose FHIR Bundle
      const fhirBundle = composeFhirBundle();
      
      // Upload bundle to server
      const response = await doctorAPI.uploadBundle(fhirBundle);
      
      if (response.data.success) {
        onSuccess && onSuccess(response.data);
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setErrors({
        submit: 'Failed to save diagnosis. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Form Header */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 bg-mint-100 rounded-lg flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-mint-600" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              Diagnosis & Prescription Form
            </h2>
            <p className="text-gray-600">
              Create a new medical encounter with diagnosis and prescriptions
            </p>
          </div>
        </div>

        {/* Global Error */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID *
              </label>
              <input
                id="patientId"
                name="patientId"
                type="text"
                value={formData.patientId}
                onChange={handleChange}
                className={`input-field ${errors.patientId ? 'border-red-300' : ''}`}
                placeholder="Enter patient ID or ABHA"
                required
              />
              {errors.patientId && (
                <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>
              )}
            </div>

            <div>
              <label htmlFor="encounterDate" className="block text-sm font-medium text-gray-700 mb-1">
                Encounter Date
              </label>
              <input
                id="encounterDate"
                name="encounterDate"
                type="date"
                value={formData.encounterDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          {/* Chief Complaint */}
          <div>
            <label htmlFor="chiefComplaint" className="block text-sm font-medium text-gray-700 mb-1">
              Chief Complaint *
            </label>
            <textarea
              id="chiefComplaint"
              name="chiefComplaint"
              rows={3}
              value={formData.chiefComplaint}
              onChange={handleChange}
              className={`input-field ${errors.chiefComplaint ? 'border-red-300' : ''}`}
              placeholder="Describe the patient's main complaint..."
              required
            />
            {errors.chiefComplaint && (
              <p className="mt-1 text-sm text-red-600">{errors.chiefComplaint}</p>
            )}
          </div>

          {/* Clinical Notes */}
          <div>
            <label htmlFor="clinicalNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Clinical Notes *
            </label>
            <textarea
              id="clinicalNotes"
              name="clinicalNotes"
              rows={4}
              value={formData.clinicalNotes}
              onChange={handleChange}
              className={`input-field ${errors.clinicalNotes ? 'border-red-300' : ''}`}
              placeholder="Enter detailed clinical observations and findings..."
              required
            />
            {errors.clinicalNotes && (
              <p className="mt-1 text-sm text-red-600">{errors.clinicalNotes}</p>
            )}
          </div>

          {/* Vitals */}
          <div className="card">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
              Vital Signs
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Pressure
                </label>
                <input
                  id="bloodPressure"
                  name="vitals.bloodPressure"
                  type="text"
                  value={formData.vitals.bloodPressure}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="120/80"
                />
              </div>
              <div>
                <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Heart Rate
                </label>
                <input
                  id="heartRate"
                  name="vitals.heartRate"
                  type="text"
                  value={formData.vitals.heartRate}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="72 bpm"
                />
              </div>
              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  id="temperature"
                  name="vitals.temperature"
                  type="text"
                  value={formData.vitals.temperature}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="98.6°F"
                />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <input
                  id="weight"
                  name="vitals.weight"
                  type="text"
                  value={formData.vitals.weight}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="70 kg"
                />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  id="height"
                  name="vitals.height"
                  type="text"
                  value={formData.vitals.height}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="170 cm"
                />
              </div>
              <div>
                <label htmlFor="oxygenSaturation" className="block text-sm font-medium text-gray-700 mb-1">
                  O2 Saturation
                </label>
                <input
                  id="oxygenSaturation"
                  name="vitals.oxygenSaturation"
                  type="text"
                  value={formData.vitals.oxygenSaturation}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="98%"
                />
              </div>
            </div>
          </div>

          {/* Diagnosis Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-gray-900">
                Diagnoses
              </h3>
              {errors.diagnoses && (
                <p className="text-sm text-red-600">{errors.diagnoses}</p>
              )}
            </div>

            {/* Diagnosis Search */}
            <div className="mb-4">
              <AutoComplete
                placeholder="Search for NAMASTE/ICD codes..."
                onSelect={handleDiagnosisSelect}
                onTranslate={handleDiagnosisTranslate}
              />
            </div>

            {/* Add Diagnosis Button */}
            {selectedDiagnosis && (
              <div className="mb-4 p-4 bg-mint-50 border border-mint-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {selectedDiagnosis.namasteName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      NAMASTE: {selectedDiagnosis.namasteCode} | ICD: {selectedDiagnosis.icdCode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addDiagnosis}
                    className="flex items-center px-3 py-1 bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </button>
                </div>
              </div>
            )}

            {/* Selected Diagnoses */}
            <div className="space-y-4">
              {formData.diagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {diagnosis.namasteName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        NAMASTE: {diagnosis.namasteCode} | ICD: {diagnosis.icdCode}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDiagnosis(diagnosis.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diagnosis Notes
                    </label>
                    <textarea
                      rows={2}
                      value={diagnosis.notes}
                      onChange={(e) => updateDiagnosisNotes(diagnosis.id, e.target.value)}
                      className="input-field"
                      placeholder="Additional notes for this diagnosis..."
                    />
                  </div>

                  {diagnosis.translatedCodes.length > 0 && (
                    <div className="mb-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={diagnosis.includeBiomedical}
                          onChange={() => toggleBiomedicalCode(diagnosis.id)}
                          className="rounded border-gray-300 text-mint-600 focus:ring-mint-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Include biomedical codes
                        </span>
                      </label>
                      <div className="mt-2 space-y-1">
                        {diagnosis.translatedCodes.map((code, index) => (
                          <div key={index} className="text-xs text-gray-600">
                            {code.code} - {code.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-gray-900">
                Prescriptions
              </h3>
              <button
                type="button"
                onClick={addPrescription}
                className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Medication
              </button>
            </div>

            <div className="space-y-4">
              {formData.prescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Medication</h4>
                    <button
                      type="button"
                      onClick={() => removePrescription(prescription.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medication Name
                      </label>
                      <input
                        type="text"
                        value={prescription.medication}
                        onChange={(e) => updatePrescription(prescription.id, 'medication', e.target.value)}
                        className="input-field"
                        placeholder="e.g., Metformin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Strength
                      </label>
                      <input
                        type="text"
                        value={prescription.strength}
                        onChange={(e) => updatePrescription(prescription.id, 'strength', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 500mg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Form
                      </label>
                      <select
                        value={prescription.form}
                        onChange={(e) => updatePrescription(prescription.id, 'form', e.target.value)}
                        className="input-field"
                      >
                        <option value="tablet">Tablet</option>
                        <option value="capsule">Capsule</option>
                        <option value="syrup">Syrup</option>
                        <option value="injection">Injection</option>
                        <option value="cream">Cream</option>
                        <option value="drops">Drops</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosage
                      </label>
                      <input
                        type="text"
                        value={prescription.dosage}
                        onChange={(e) => updatePrescription(prescription.id, 'dosage', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 1 tablet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Frequency
                      </label>
                      <input
                        type="text"
                        value={prescription.frequency}
                        onChange={(e) => updatePrescription(prescription.id, 'frequency', e.target.value)}
                        className="input-field"
                        placeholder="e.g., Twice daily"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={prescription.duration}
                        onChange={(e) => updatePrescription(prescription.id, 'duration', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 30 days"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instructions
                    </label>
                    <textarea
                      rows={2}
                      value={prescription.instructions}
                      onChange={(e) => updatePrescription(prescription.id, 'instructions', e.target.value)}
                      className="input-field"
                      placeholder="Special instructions for taking this medication..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="card">
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
              Attachments
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Files
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="input-field"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, JPG, PNG, DOC, DOCX
              </p>
            </div>

            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Diagnosis
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosisForm;
