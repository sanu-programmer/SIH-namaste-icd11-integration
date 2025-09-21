import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * Purpose: Protects routes that require authentication and optionally specific roles
 * 
 * Props:
 * - children: The component to render if access is granted
 * - roles: Array of allowed roles (optional, if not provided, any authenticated user can access)
 * - requireAbha: Boolean to require ABHA authentication (for doctors/admins)
 * 
 * Behavior:
 * - Redirects to login if user is not authenticated
 * - Redirects to appropriate dashboard if user doesn't have required role
 * - Preserves intended destination in location state for post-login redirect
 */
const ProtectedRoute = ({ children, roles = null, requireAbha = false }) => {
  const { isAuthenticated, getRole, user, loading } = useAuth();
  const location = useLocation();

  // Show loading while authentication is being initialized
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return path
  if (!isAuthenticated()) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  const userRole = getRole();

  // If specific roles are required, check if user has one of them
  if (roles && !roles.includes(userRole)) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (userRole) {
      case 'doctor':
        return <Navigate to="/doctor/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'user':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  // If ABHA is required but user doesn't have ABHA linked
  if (requireAbha && !user?.abhaId) {
    // For demo purposes, we'll allow access but show a warning
    // In production, this should redirect to ABHA linking flow
    console.warn('ABHA authentication required for this route');
  }

  // Access granted, render the protected component
  return children;
};

/**
 * RoleGuard Higher-Order Component
 * 
 * Purpose: Wraps components to enforce role-based access control
 * 
 * Usage:
 * const DoctorOnlyComponent = RoleGuard(SomeComponent, ['doctor']);
 * const AdminOnlyComponent = RoleGuard(SomeComponent, ['admin']);
 */
export const RoleGuard = (Component, allowedRoles) => {
  return function RoleGuardedComponent(props) {
    const { hasRole } = useAuth();
    
    // Check if user has any of the allowed roles
    const hasAccess = allowedRoles.some(role => hasRole(role));
    
    if (!hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};

export default ProtectedRoute;
