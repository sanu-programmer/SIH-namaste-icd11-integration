import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Pill, 
  User, 
  Users, 
  Stethoscope, 
  Activity,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Sidebar Component
 * 
 * Purpose: Provides role-based navigation sidebar with different menu items for each user role
 * 
 * Features:
 * - Role-aware navigation (user, doctor, admin)
 * - Active state highlighting
 * - Responsive design with mobile support
 * - Healthcare-themed icons from lucide-react
 */
const Sidebar = () => {
  const { getRole } = useAuth();
  // const location = useLocation();
  const role = getRole();

  // Navigation items for different roles
  const getNavigationItems = () => {
    switch (role) {
      case 'doctor':
        return [
          {
            name: 'Dashboard',
            href: '/doctor/dashboard',
            icon: Home,
            description: 'Overview of appointments and patients'
          },
          {
            name: 'Patients',
            href: '/doctor/patients',
            icon: Users,
            description: 'Manage and search patients'
          },
          {
            name: 'Diagnose',
            href: '/doctor/diagnose',
            icon: Stethoscope,
            description: 'Create diagnoses and prescriptions'
          },
          {
            name: 'Records',
            href: '/doctor/records',
            icon: FileText,
            description: 'View patient medical records'
          }
        ];

      case 'admin':
        return [
          {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: BarChart3,
            description: 'System overview and analytics'
          },
          {
            name: 'Users',
            href: '/admin/users',
            icon: Users,
            description: 'Manage patient accounts'
          },
          {
            name: 'Doctors',
            href: '/admin/doctors',
            icon: Stethoscope,
            description: 'Manage doctor accounts'
          },
          {
            name: 'Analytics',
            href: '/admin/analytics',
            icon: Activity,
            description: 'System statistics and trends'
          }
        ];

      case 'user':
      default:
        return [
          {
            name: 'Dashboard',
            href: '/dashboard',
            icon: Home,
            description: 'Your health overview'
          },
          {
            name: 'Records',
            href: '/records',
            icon: FileText,
            description: 'Medical history and records'
          },
          {
            name: 'Prescriptions',
            href: '/prescriptions',
            icon: Pill,
            description: 'Current and past prescriptions'
          },
          {
            name: 'Profile',
            href: '/profile',
            icon: User,
            description: 'Personal information and settings'
          }
        ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="bg-blue-300 w-64 inset-shadow-sm inset-shadow-blue-900 border-r border-blue-200 h-full">
      <div className="p-6">
        {/* Logo and Brand */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Ayush EMR</h1>
              <p className="text-xs text-slate-500 capitalize">{role} Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            // const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                  }`
                }
                title={item.description}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Additional links */}
        <div className="mt-8 pt-6 border-t border-blue-900/20">
          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
              }`
            }
          >
            <Settings className="h-5 w-5 mr-3" />
            <span className="font-medium">Settings</span>
          </NavLink>

          {/* Admin-only security link */}
          {role === 'admin' && (
            <NavLink
              to="/app/admin/security"
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                }`
              }
            >
              <Shield className="h-5 w-5 mr-3" />
              <span className="font-medium">Security</span>
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
