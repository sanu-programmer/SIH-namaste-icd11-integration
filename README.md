# Ayush EMR Frontend

A comprehensive healthcare management system frontend built with React, featuring role-based access control, NAMASTE/ICD terminology integration, and ABHA authentication support.

## 🏥 Features

### Authentication & Authorization
- **Custom Login**: Email/password authentication with JWT tokens
- **ABHA Integration**: Healthcare professional authentication via ABHA
- **Role-based Access**: Three user roles (Patient, Doctor, Administrator)
- **Protected Routes**: Automatic redirection based on user roles

### User Roles & Dashboards

#### 👤 Patient (User) Portal
- **Dashboard**: Health overview, upcoming appointments, recent prescriptions
- **Medical Records**: Chronological encounter history with search/filter
- **Prescriptions**: Detailed medication information with download/print
- **Profile Management**: Personal info, ABHA linking, consent history

#### 👨‍⚕️ Doctor Portal
- **Dashboard**: Patient queue, appointment overview, performance metrics
- **Patient Management**: Search patients by ABHA ID, view medical history
- **Diagnosis Form**: NAMASTE/ICD terminology search with translation
- **FHIR Integration**: Bundle composition and upload for medical records

#### 👨‍💼 Admin Portal
- **System Analytics**: Charts and metrics using Recharts
- **User Management**: Patient account management and status updates
- **Doctor Management**: ABHA approval workflow and performance tracking
- **System Health**: Monitoring and activity logs

### Healthcare-Specific Features
- **Terminology Search**: AutoComplete component for NAMASTE/ICD codes
- **Code Translation**: NAMASTE to ICD mapping functionality
- **FHIR Compliance**: Medical record bundles for interoperability
- **Chatbot Widget**: Healthcare assistance and FAQ support
- **Responsive Design**: Mobile-first healthcare UI with accessibility

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend API server running (see API Integration section)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd ayush-emr-frontend
   npm install
   ```

2. **Environment Configuration**
   Create `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_ABHA_CLIENT_ID=your_abha_client_id
   VITE_ABHA_REDIRECT_URI=http://localhost:3000/auth/abha/callback
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🎭 Demo Access

The application includes demo users for testing all features:

**Demo Admin (Full Access):**
- Email: `admin@demo.com`
- Password: `demo123`
- Access: All system features, user management, analytics

**Demo Doctor:**
- Email: `doctor@demo.com`
- Password: `demo123`
- Access: Patient management, diagnosis, prescriptions

**Demo Patient:**
- Email: `user@demo.com`
- Password: `demo123`
- Access: View records, prescriptions, appointments

**Quick Demo Login:**
- Use the demo buttons on the login page for instant access
- Or use any email with password `demo123`
- Demo info panel shows credentials and can be toggled

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── api/
│   └── api.js                 # API client with authentication
├── components/
│   ├── Auth/
│   │   ├── AuthProvider.jsx   # Authentication context
│   │   └── ProtectedRoute.jsx # Route protection & role guards
│   ├── Forms/
│   │   ├── AutoComplete.jsx   # NAMASTE/ICD search component
│   │   └── DiagnosisForm.jsx  # Doctor diagnosis form
│   └── Layout/
│       ├── Layout.jsx         # Main app layout
│       ├── Topbar.jsx         # Navigation header
│       ├── Sidebar.jsx        # Role-based navigation
│       └── ChatbotWidget.jsx  # Healthcare chatbot
├── contexts/
│   └── AuthContext.jsx        # Authentication state management
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx          # Login page with ABHA option
│   │   └── Signup.jsx         # User registration
│   ├── User/
│   │   ├── Dashboard.jsx      # Patient dashboard
│   │   ├── Records.jsx        # Medical records
│   │   ├── Prescription.jsx   # Prescription details
│   │   └── Profile.jsx        # Profile management
│   ├── Doctor/
│   │   ├── Dashboard.jsx      # Doctor dashboard
│   │   ├── Patients.jsx       # Patient management
│   │   └── Diagnose.jsx       # Diagnosis form
│   ├── Admin/
│   │   ├── Dashboard.jsx      # Admin analytics
│   │   ├── Users.jsx          # User management
│   │   └── Doctors.jsx        # Doctor management
│   └── NotFound.jsx           # 404 page
├── App.jsx                    # Main app with routing
└── main.jsx                   # Application entry point
```

## 🔌 API Integration

### Backend Endpoints Required

The frontend expects the following API endpoints:

#### Authentication
- `POST /api/auth/login` - Custom login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/abha/login` - ABHA OAuth redirect
- `GET /api/auth/abha/callback` - ABHA callback handler
- `GET /api/user/me` - Get current user profile

#### User/Patient APIs
- `GET /api/user/encounters` - Patient encounters
- `GET /api/user/prescriptions` - Patient prescriptions
- `GET /api/user/records` - Medical records
- `PUT /api/user/me` - Update profile
- `POST /api/user/link-abha` - Link ABHA ID

#### Doctor APIs
- `GET /api/doctor/patients` - Doctor's patients
- `GET /api/doctor/stats` - Doctor statistics
- `GET /api/patients?q=...` - Search patients
- `GET /api/patients/:id/records` - Patient records
- `POST /api/bundles/upload` - Upload FHIR bundle

#### Admin APIs
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/doctors` - All doctors
- `PUT /api/admin/users/:id` - Update user
- `PUT /api/admin/doctors/:id/approve` - Approve doctor

#### Terminology APIs
- `GET /api/terminology/search?q=...` - Search NAMASTE/ICD codes
- `POST /api/terminology/translate` - Translate NAMASTE to ICD

#### Chat API
- `POST /api/chat` - Chatbot messages

### Mock Data

The application includes mock data for development. Replace mock responses in components with actual API calls:

1. **AutoComplete Component**: Replace mock terminology data
2. **Dashboard Components**: Replace mock statistics and user data
3. **Form Components**: Update API endpoints for form submissions

### ABHA Integration

For ABHA authentication:

1. **Configure ABHA Client**:
   ```javascript
   // In your backend
   const ABHA_CONFIG = {
     clientId: process.env.ABHA_CLIENT_ID,
     redirectUri: process.env.ABHA_REDIRECT_URI,
     baseUrl: process.env.ABHA_BASE_URL
   };
   ```

2. **Update Frontend Environment**:
   ```env
   VITE_ABHA_CLIENT_ID=your_abha_client_id
   VITE_ABHA_REDIRECT_URI=http://localhost:3000/auth/abha/callback
   ```

## 🎨 Design System

### Color Palette (Midnight Mint)
- **Primary**: `#00a884` (Mint 500)
- **Secondary**: `#00c9a7` (Accent)
- **Dark**: `#003233` (Mint 900)
- **Light**: `#7fe7c7` (Mint 300)

### Typography
- **Headings**: Space Grotesk (Google Fonts)
- **Body**: Inter (Google Fonts)

### Components
- **Cards**: Rounded corners with soft shadows
- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Accessible inputs with validation
- **Charts**: Recharts integration for analytics

## 🔒 Security Considerations

### Production Deployment
1. **JWT Storage**: Replace localStorage with httpOnly cookies
2. **HTTPS**: Ensure all API communication is encrypted
3. **CORS**: Configure proper CORS policies
4. **Environment Variables**: Secure API keys and secrets

### ABHA Security
- Validate ABHA tokens server-side
- Implement proper session management
- Use secure redirect URIs
- Follow ABHA security guidelines

## 🧪 Testing

### Development Testing
```bash
# Run linter
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Role-based navigation
- [ ] ABHA authentication flow
- [ ] Terminology search and translation
- [ ] Form submissions and validation
- [ ] Responsive design on mobile
- [ ] Accessibility with screen readers

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the existing code style
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@ayushemr.com
- **Documentation**: [Link to documentation]
- **Issues**: [GitHub Issues](link-to-issues)

## 🔄 Version History

- **v1.0.0**: Initial release with core features
  - User authentication and role management
  - Patient, doctor, and admin portals
  - NAMASTE/ICD terminology integration
  - FHIR bundle support
  - Responsive healthcare UI

---

**Note**: This is a demo application. For production use, ensure proper security measures, data validation, and compliance with healthcare regulations.
