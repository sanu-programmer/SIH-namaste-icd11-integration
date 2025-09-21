import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import ChatbotWidget from './ChatbotWidget';
import MedicalBackground from '../Common/MedicalBackground';

/**
 * Layout Component
 * 
 * Purpose: Main application layout wrapper that provides consistent structure
 * 
 * Features:
 * - Responsive sidebar with mobile toggle
 * - Top navigation bar
 * - Main content area with outlet for page content
 * - Floating chatbot widget
 * - Mobile-first responsive design
 */
const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex relative">
      {/* Medical Background Elements */}
      <MedicalBackground variant="dashboard" />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top navigation */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Page content */}
        <main className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Floating Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
