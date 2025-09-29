import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  User, 
  Stethoscope, 
  Download, 
  Eye,
  Search,
  Filter,
  ArrowLeft,
  X
} from 'lucide-react';
// import { userAPI } from '../../api/api';

/**
 * Records Page
 * 
 * Purpose: Display patient's medical records and encounter history
 * 
 * Features:
 * - Chronological list of medical encounters
 * - Search and filter functionality
 * - Detailed view of individual records
 * - Download/print options for records
 * - Responsive grid/card layout
 * - Loading states and error handling
 * - Support for both user view and doctor view (when patientId is provided)
 */
const Records = () => {
  const { patientId } = useParams(); // For doctor viewing patient records
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Fetch records data
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock data for demonstration (replace with actual API response)
        const mockRecords = [
          {
            id: 1,
            date: '2024-01-10',
            type: 'Follow-up Visit',
            doctor: 'Dr. Priya Sharma',
            specialty: 'Cardiology',
            diagnosis: 'Type 2 Diabetes',
            symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue'],
            treatment: 'Metformin 500mg twice daily, lifestyle modifications',
            notes: 'Patient responding well to treatment. Blood sugar levels improving.',
            attachments: ['lab-report-001.pdf', 'prescription-001.pdf'],
            status: 'completed'
          },
          {
            id: 2,
            date: '2024-01-05',
            type: 'Initial Consultation',
            doctor: 'Dr. Rajesh Kumar',
            specialty: 'General Medicine',
            diagnosis: 'Hypertension',
            symptoms: ['High blood pressure', 'Headaches'],
            treatment: 'Lisinopril 10mg once daily, regular monitoring',
            notes: 'Newly diagnosed hypertension. Patient educated about lifestyle changes.',
            attachments: ['blood-pressure-chart.pdf'],
            status: 'completed'
          },
          {
            id: 3,
            date: '2023-12-20',
            type: 'Annual Checkup',
            doctor: 'Dr. Priya Sharma',
            specialty: 'Cardiology',
            diagnosis: 'Routine Checkup',
            symptoms: [],
            treatment: 'Continue current medications, annual follow-up recommended',
            notes: 'Overall health good. All vitals within normal range.',
            attachments: ['annual-checkup-report.pdf'],
            status: 'completed'
          }
        ];

        setRecords(mockRecords);
        setFilteredRecords(mockRecords);
      } catch (err) {
        console.error('Records fetch error:', err);
        setError('Failed to load medical records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [patientId]);

  // Filter and search records
  useEffect(() => {
    let filtered = records;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(record => record.type === selectedFilter);
    }

    setFilteredRecords(filtered);
  }, [records, searchTerm, selectedFilter]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get record type options for filter
  const getRecordTypes = () => {
    const types = [...new Set(records.map(record => record.type))];
    return types;
  };

  // Handle record download
  const handleDownload = (recordId, attachment) => {
    // In a real app, this would trigger a download from the server
    console.log(`Downloading ${attachment} for record ${recordId}`);
    // Mock download
    alert(`Downloading ${attachment}...`);
  };

  // Handle record view
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Records</h3>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Medical Records
          </h1>
          <p className="text-gray-600 mt-1">
            {patientId ? 'Patient medical history' : 'Your medical history and encounters'}
          </p>
        </div>
        
        {patientId && (
          <Link
            to="/app/doctor/patients"
            className="flex items-center text-mint-600 hover:text-mint-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Patients
          </Link>
        )}
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records by doctor, diagnosis, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="sm:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="all">All Types</option>
                {getRecordTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length > 0 ? (
          filteredRecords.map((record) => (
            <div key={record.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-mint-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-mint-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-heading font-semibold text-gray-900">
                        {record.type}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {record.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(record.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {record.doctor}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Stethoscope className="h-4 w-4 mr-2" />
                        {record.specialty}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Diagnosis:</span> {record.diagnosis}
                      </div>
                    </div>
                    
                    {record.symptoms.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Symptoms:</p>
                        <div className="flex flex-wrap gap-1">
                          {record.symptoms.map((symptom, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Treatment:</span> {record.treatment}
                    </p>
                    
                    {record.attachments.length > 0 && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                        <div className="flex flex-wrap gap-2">
                          {record.attachments.map((attachment, index) => (
                            <button
                              key={index}
                              onClick={() => handleDownload(record.id, attachment)}
                              className="flex items-center px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              {attachment}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleViewRecord(record)}
                    className="p-2 text-mint-600 hover:bg-mint-50 rounded-lg transition-colors duration-200"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No medical records available yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-semibold text-gray-900">
                  Record Details
                </h2>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Visit Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">{formatDate(selectedRecord.date)}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <p className="font-medium">{selectedRecord.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Doctor:</span>
                      <p className="font-medium">{selectedRecord.doctor}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Specialty:</span>
                      <p className="font-medium">{selectedRecord.specialty}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Diagnosis</h3>
                  <p className="text-gray-700">{selectedRecord.diagnosis}</p>
                </div>
                
                {selectedRecord.symptoms.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Symptoms</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedRecord.symptoms.map((symptom, index) => (
                        <li key={index}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Treatment</h3>
                  <p className="text-gray-700">{selectedRecord.treatment}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-gray-700">{selectedRecord.notes}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle print/download all attachments
                    selectedRecord.attachments.forEach(attachment => 
                      handleDownload(selectedRecord.id, attachment)
                    );
                  }}
                  className="btn-primary"
                >
                  Download All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;
