/**
 * Mock Data for Ayush EMR Demo
 * 
 * This file contains comprehensive mock data for testing all features
 * of the healthcare EMR system without requiring a backend.
 */

// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-98765-43210',
    abhaId: 'ABHA-1234567890',
    dateOfBirth: '1979-05-15',
    gender: 'Male',
    address: '123 Main Street, Mumbai, Maharashtra 400001',
    status: 'active',
    registrationDate: '2023-06-15',
    lastLogin: '2024-01-15T10:30:00Z',
    totalEncounters: 12,
    primaryDiagnosis: 'Type 2 Diabetes',
    emergencyContact: '+91-98765-43211',
    medicalHistory: 'Type 2 Diabetes, Hypertension',
    allergies: 'Penicillin',
    currentMedications: 'Metformin 500mg, Lisinopril 10mg'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-98765-43211',
    abhaId: 'ABHA-0987654321',
    dateOfBirth: '1992-03-22',
    gender: 'Female',
    address: '456 Park Avenue, Delhi, Delhi 110001',
    status: 'active',
    registrationDate: '2023-08-20',
    lastLogin: '2024-01-14T15:45:00Z',
    totalEncounters: 8,
    primaryDiagnosis: 'Hypertension',
    emergencyContact: '+91-98765-43212',
    medicalHistory: 'Hypertension, Migraine',
    allergies: 'None',
    currentMedications: 'Amlodipine 5mg'
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91-98765-43212',
    abhaId: 'ABHA-1122334455',
    dateOfBirth: '1996-11-08',
    gender: 'Male',
    address: '789 Garden Road, Bangalore, Karnataka 560001',
    status: 'inactive',
    registrationDate: '2023-12-01',
    lastLogin: '2023-12-20T09:15:00Z',
    totalEncounters: 3,
    primaryDiagnosis: 'Acute Bronchitis',
    emergencyContact: '+91-98765-43213',
    medicalHistory: 'Acute Bronchitis',
    allergies: 'Dust',
    currentMedications: 'None'
  },
  {
    id: 4,
    name: 'Sunita Devi',
    email: 'sunita.devi@email.com',
    phone: '+91-98765-43213',
    abhaId: 'ABHA-5566778899',
    dateOfBirth: '1969-09-12',
    gender: 'Female',
    address: '321 Temple Street, Chennai, Tamil Nadu 600001',
    status: 'active',
    registrationDate: '2023-04-10',
    lastLogin: '2024-01-13T14:20:00Z',
    totalEncounters: 15,
    primaryDiagnosis: 'Osteoarthritis',
    emergencyContact: '+91-98765-43214',
    medicalHistory: 'Osteoarthritis, Hypertension',
    allergies: 'None',
    currentMedications: 'Ibuprofen 400mg, Amlodipine 5mg'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91-98765-43214',
    abhaId: 'ABHA-9988776655',
    dateOfBirth: '1985-07-30',
    gender: 'Male',
    address: '555 Tech Park, Hyderabad, Telangana 500001',
    status: 'active',
    registrationDate: '2023-09-15',
    lastLogin: '2024-01-12T11:30:00Z',
    totalEncounters: 6,
    primaryDiagnosis: 'Asthma',
    emergencyContact: '+91-98765-43215',
    medicalHistory: 'Asthma, Allergic Rhinitis',
    allergies: 'Pollen, Dust',
    currentMedications: 'Salbutamol inhaler, Cetirizine 10mg'
  }
];

// Mock Doctors Data
export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@hospital.com',
    phone: '+91-98765-43210',
    abhaId: 'ABHA-DOC-001',
    licenseNumber: 'MH-12345',
    specialty: 'Cardiology',
    qualification: 'MD, DM Cardiology',
    experience: '8 years',
    status: 'active',
    abhaApproved: true,
    registrationDate: '2023-06-15',
    lastLogin: '2024-01-15T10:30:00Z',
    totalPatients: 156,
    totalEncounters: 892,
    averageRating: 4.8,
    hospital: 'Apollo Hospital, Mumbai',
    address: '123 Medical Center, Mumbai, Maharashtra 400001'
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@hospital.com',
    phone: '+91-98765-43211',
    abhaId: 'ABHA-DOC-002',
    licenseNumber: 'DL-67890',
    specialty: 'General Medicine',
    qualification: 'MBBS, MD Medicine',
    experience: '12 years',
    status: 'pending_approval',
    abhaApproved: false,
    registrationDate: '2024-01-10',
    lastLogin: '2024-01-14T15:45:00Z',
    totalPatients: 0,
    totalEncounters: 0,
    averageRating: 0,
    hospital: 'Fortis Hospital, Delhi',
    address: '456 Health Plaza, Delhi, Delhi 110001'
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    email: 'amit.patel@hospital.com',
    phone: '+91-98765-43212',
    abhaId: 'ABHA-DOC-003',
    licenseNumber: 'KA-54321',
    specialty: 'Pediatrics',
    qualification: 'MBBS, MD Pediatrics',
    experience: '6 years',
    status: 'active',
    abhaApproved: true,
    registrationDate: '2023-08-20',
    lastLogin: '2024-01-13T14:20:00Z',
    totalPatients: 89,
    totalEncounters: 456,
    averageRating: 4.6,
    hospital: 'Manipal Hospital, Bangalore',
    address: '789 Child Care Center, Bangalore, Karnataka 560001'
  },
  {
    id: 4,
    name: 'Dr. Sunita Devi',
    email: 'sunita.devi@hospital.com',
    phone: '+91-98765-43213',
    abhaId: 'ABHA-DOC-004',
    licenseNumber: 'TN-98765',
    specialty: 'Orthopedics',
    qualification: 'MBBS, MS Orthopedics',
    experience: '15 years',
    status: 'suspended',
    abhaApproved: true,
    registrationDate: '2023-04-10',
    lastLogin: '2023-12-20T09:15:00Z',
    totalPatients: 234,
    totalEncounters: 1200,
    averageRating: 4.9,
    hospital: 'Apollo Hospital, Chennai',
    address: '321 Bone Care Center, Chennai, Tamil Nadu 600001'
  }
];

// Mock System Statistics
export const mockSystemStats = {
  totalUsers: 1256,
  totalDoctors: 89,
  totalEncounters: 3456,
  activeDiagnoses: 892,
  systemUptime: '99.9%',
  avgResponseTime: '120ms',
  dataStorage: '2.4 TB',
  monthlyGrowth: '+12.5%',
  todayAppointments: 45,
  pendingApprovals: 12,
  systemAlerts: 0
};

// Mock Disease Trends Data
export const mockDiseaseTrends = [
  { month: 'Jan', diabetes: 45, hypertension: 38, respiratory: 25, cardiovascular: 32 },
  { month: 'Feb', diabetes: 52, hypertension: 42, respiratory: 28, cardiovascular: 35 },
  { month: 'Mar', diabetes: 48, hypertension: 45, respiratory: 32, cardiovascular: 38 },
  { month: 'Apr', diabetes: 55, hypertension: 48, respiratory: 35, cardiovascular: 42 },
  { month: 'May', diabetes: 58, hypertension: 52, respiratory: 38, cardiovascular: 45 },
  { month: 'Jun', diabetes: 62, hypertension: 55, respiratory: 42, cardiovascular: 48 }
];

// Mock User Activity Data
export const mockUserActivity = [
  { name: 'Patients', value: 1256, color: '#00a884' },
  { name: 'Doctors', value: 89, color: '#00c9a7' },
  { name: 'Admins', value: 12, color: '#7fe7c7' }
];

// Mock System Health Data
export const mockSystemHealth = {
  apiStatus: 'healthy',
  databaseStatus: 'healthy',
  storageStatus: 'healthy',
  lastBackup: '2024-01-15T10:30:00Z',
  securityAlerts: 0,
  performanceScore: 95,
  serverLoad: 'Low',
  memoryUsage: '68%',
  diskUsage: '45%'
};

// Mock Recent Activities
export const mockRecentActivities = [
  {
    id: 1,
    type: 'user_registration',
    message: 'New patient registered: Priya Sharma',
    timestamp: '2024-01-15T14:30:00Z',
    severity: 'info'
  },
  {
    id: 2,
    type: 'doctor_approval',
    message: 'Doctor Dr. Rajesh Kumar approved for ABHA integration',
    timestamp: '2024-01-15T13:45:00Z',
    severity: 'success'
  },
  {
    id: 3,
    type: 'system_alert',
    message: 'High server load detected - monitoring',
    timestamp: '2024-01-15T12:15:00Z',
    severity: 'warning'
  },
  {
    id: 4,
    type: 'data_export',
    message: 'Monthly health report exported successfully',
    timestamp: '2024-01-15T11:00:00Z',
    severity: 'info'
  },
  {
    id: 5,
    type: 'user_login',
    message: 'Admin user logged in from new device',
    timestamp: '2024-01-15T10:30:00Z',
    severity: 'info'
  },
  {
    id: 6,
    type: 'backup_completed',
    message: 'Daily backup completed successfully',
    timestamp: '2024-01-15T09:00:00Z',
    severity: 'success'
  }
];

// Mock Terminology Data
export const mockTerminologyData = [
  {
    id: 1,
    namasteCode: 'NAMASTE-001',
    namasteName: 'Diabetes Mellitus Type 2',
    icdCode: 'E11',
    icdName: 'Type 2 diabetes mellitus',
    category: 'Endocrine disorders',
    description: 'A chronic condition that affects the way the body processes blood sugar'
  },
  {
    id: 2,
    namasteCode: 'NAMASTE-002',
    namasteName: 'Hypertension',
    icdCode: 'I10',
    icdName: 'Essential hypertension',
    category: 'Cardiovascular diseases',
    description: 'High blood pressure condition'
  },
  {
    id: 3,
    namasteCode: 'NAMASTE-003',
    namasteName: 'Acute Myocardial Infarction',
    icdCode: 'I21',
    icdName: 'ST elevation myocardial infarction',
    category: 'Cardiovascular diseases',
    description: 'Heart attack caused by blockage of blood flow to the heart'
  },
  {
    id: 4,
    namasteCode: 'NAMASTE-004',
    namasteName: 'Bronchitis',
    icdCode: 'J40',
    icdName: 'Bronchitis, not specified as acute or chronic',
    category: 'Respiratory diseases',
    description: 'Inflammation of the lining of bronchial tubes'
  },
  {
    id: 5,
    namasteCode: 'NAMASTE-005',
    namasteName: 'Osteoarthritis',
    icdCode: 'M19',
    icdName: 'Other osteoarthritis',
    category: 'Musculoskeletal diseases',
    description: 'Degenerative joint disease affecting cartilage'
  }
];

// Mock Patient Encounters
export const mockEncounters = [
  {
    id: 1,
    patientId: 1,
    patientName: 'Rajesh Kumar',
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
    patientId: 2,
    patientName: 'Priya Sharma',
    date: '2024-01-09',
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
    patientId: 3,
    patientName: 'Amit Patel',
    date: '2024-01-05',
    type: 'Emergency Visit',
    doctor: 'Dr. Amit Patel',
    specialty: 'Pediatrics',
    diagnosis: 'Acute Bronchitis',
    symptoms: ['Cough', 'Chest congestion', 'Fever'],
    treatment: 'Antibiotics, cough syrup, rest',
    notes: 'Patient responding well to treatment. Follow-up in 1 week.',
    attachments: ['x-ray-report.pdf'],
    status: 'completed'
  }
];

// Mock Prescriptions
export const mockPrescriptions = [
  {
    id: 1,
    prescriptionNumber: 'RX-2024-001',
    patientId: 1,
    patientName: 'Rajesh Kumar',
    date: '2024-01-10',
    doctor: {
      name: 'Dr. Priya Sharma',
      specialty: 'Cardiology',
      licenseNumber: 'MH-12345'
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
        instructions: 'Take with food to reduce stomach upset',
        refills: 2
      }
    ],
    notes: 'Continue current treatment. Monitor blood sugar levels regularly.',
    status: 'active',
    validUntil: '2024-04-10'
  }
];

// Mock Chat Messages
export const mockChatMessages = [
  {
    id: 1,
    type: 'bot',
    content: 'Hello! I\'m your healthcare assistant. How can I help you today?',
    timestamp: new Date()
  }
];

// Demo Login Credentials
export const demoCredentials = {
  admin: {
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin'
  },
  doctor: {
    email: 'doctor@demo.com',
    password: 'demo123',
    role: 'doctor'
  },
  user: {
    email: 'user@demo.com',
    password: 'demo123',
    role: 'user'
  }
};

export default {
  mockUsers,
  mockDoctors,
  mockSystemStats,
  mockDiseaseTrends,
  mockUserActivity,
  mockSystemHealth,
  mockRecentActivities,
  mockTerminologyData,
  mockEncounters,
  mockPrescriptions,
  mockChatMessages,
  demoCredentials
};
