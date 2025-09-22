import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import DemoInfo from './components/DemoInfo';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// User Pages
import Dashboard from './pages/User/Dashboard';
import Records from './pages/User/Records';
import Prescription from './pages/User/Prescription';
import Profile from './pages/User/Profile';

// Doctor Pages
import DoctorDashboard from './pages/Doctor/Dashboard';
import DoctorPatients from './pages/Doctor/Patients';
import DoctorDiagnose from './pages/Doctor/Diagnose';

// Admin Pages
import AdminDashboard from './pages/Admin/Dashboard';
import AdminUsers from './pages/Admin/Users';
import AdminDoctors from './pages/Admin/Doctors';

// Shared Pages
import Home from './pages/Home/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import Quizzes from './pages/Quizzes';
import AIConsultant from './pages/AIConsultant';
import Videos from './pages/Videos';
import Bookings from './pages/Bookings';
import PeerSupport from './pages/PeerSupport';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

/* Role-Based Redirect for default /app route */
const RoleBasedRedirect = () => {
  const { getRole, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  const role = getRole();
  switch (role) {
    case 'admin': return <Navigate to="/app/admin/dashboard" replace />;
    case 'doctor': return <Navigate to="/app/doctor/dashboard" replace />;
    default: return <Navigate to="/app/dashboard" replace />;
  }
};

/* App Routes */
const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/articles" element={<Articles />} />
    <Route path="/quizzes" element={<Quizzes />} />
    <Route path="/ai-consultant" element={<AIConsultant />} />
    <Route path="/videos" element={<Videos />} />
    <Route path="/bookings" element={<Bookings />} />
    <Route path="/peer-support" element={<PeerSupport />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* Protected /app Routes */}
    <Route
      path="/app"
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route index element={<RoleBasedRedirect />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="records" element={<Records />} />
      <Route path="records/:id" element={<Records />} />
      <Route path="prescriptions/:id" element={<Prescription />} />
      <Route path="profile" element={<Profile />} />
      <Route path="settings" element={<Settings />} />

      {/* Doctor Routes */}
      <Route
        path="doctor/dashboard"
        element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="doctor/patients"
        element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorPatients />
          </ProtectedRoute>
        }
      />
      <Route
        path="doctor/diagnose"
        element={
          <ProtectedRoute roles={['doctor', 'admin']}>
            <DoctorDiagnose />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="admin/dashboard"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/users"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/doctors"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDoctors />
          </ProtectedRoute>
        }
      />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

function App() {
  return (
    <AuthProvider>
      <DemoInfo />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
