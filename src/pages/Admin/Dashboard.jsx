import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Stethoscope, 
  Activity, 
  TrendingUp,
  AlertCircle,
  FileText,
  Heart,
  Shield,
  Zap
} from 'lucide-react';
import MedicalBackground from '../../components/Common/MedicalBackground';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { useAuth } from '../../contexts/AuthContext';
// import { adminAPI } from '../../api/api';
import { 
  mockSystemStats, 
  mockDiseaseTrends, 
  mockUserActivity, 
  mockSystemHealth, 
  mockRecentActivities 
} from '../../data/mockData';

/**
 * Admin Dashboard Page
 * 
 * Purpose: System overview and analytics for administrators
 * 
 * Features:
 * - System statistics and key metrics
 * - Disease trends and terminology usage charts
 * - User and doctor activity overview
 * - Recent system activities and alerts
 * - Performance metrics and health indicators
 * - Responsive charts using Recharts library
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    stats: {},
    diseaseTrends: [],
    userActivity: [],
    systemHealth: {},
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart colors
  const COLORS = ['#00a884', '#00c9a7', '#7fe7c7', '#00695c', '#003233'];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 500));

        // Use comprehensive mock data directly
        const mockData = {
          stats: mockSystemStats,
          diseaseTrends: mockDiseaseTrends,
          userActivity: mockUserActivity,
          systemHealth: mockSystemHealth,
          recentActivities: mockRecentActivities
        };

        setDashboardData(mockData);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
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
    <div className="space-y-8 relative">
      {/* Medical Background Elements */}
      <MedicalBackground variant="dashboard" />
      
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome, {user?.name || 'Administrator'}!
            </h1>
            <p className="text-slate-600">
              System overview and analytics dashboard
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-20 w-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardData.stats.totalUsers?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+12.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Doctors</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardData.stats.totalDoctors}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600">
                <Heart className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Encounters</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardData.stats.totalEncounters?.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-slate-600">
                <Zap className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+8.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">System Uptime</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardData.stats.systemUptime}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600">
                <Shield className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Healthy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Disease Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Disease Trends (Last 6 Months)
            </h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary-500" />
              <span className="text-sm text-primary-600 font-medium">Growing</span>
            </div>
          </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.diseaseTrends}>
                  <defs>
                    <linearGradient id="diabetesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="hypertensionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d946ef" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="respiratoryGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="cardiovascularGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="diabetes" stroke="#0ea5e9" strokeWidth={3} fill="url(#diabetesGradient)" />
                  <Area type="monotone" dataKey="hypertension" stroke="#d946ef" strokeWidth={3} fill="url(#hypertensionGradient)" />
                  <Area type="monotone" dataKey="respiratory" stroke="#22c55e" strokeWidth={3} fill="url(#respiratoryGradient)" />
                  <Area type="monotone" dataKey="cardiovascular" stroke="#f59e0b" strokeWidth={3} fill="url(#cardiovascularGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
        </div>

        {/* User Distribution Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              User Distribution
            </h3>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-slate-600 font-medium">Active</span>
            </div>
          </div>
          <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.userActivity}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dashboardData.userActivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            {dashboardData.userActivity.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="card">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            System Health
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">API Status</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                dashboardData.systemHealth.apiStatus === 'healthy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {dashboardData.systemHealth.apiStatus}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Database Status</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                dashboardData.systemHealth.databaseStatus === 'healthy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {dashboardData.systemHealth.databaseStatus}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Storage Status</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                dashboardData.systemHealth.storageStatus === 'healthy' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {dashboardData.systemHealth.storageStatus}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Performance Score</span>
              <span className="text-sm font-semibold text-gray-900">
                {dashboardData.systemHealth.performanceScore}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Last Backup</span>
              <span className="text-sm text-gray-600">
                {formatTimestamp(dashboardData.systemHealth.lastBackup)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Security Alerts</span>
              <span className={`text-sm font-semibold ${
                dashboardData.systemHealth.securityAlerts === 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {dashboardData.systemHealth.securityAlerts}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            Recent Activities
          </h3>
          
          <div className="space-y-3">
            {dashboardData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.severity === 'success' ? 'bg-green-500' :
                  activity.severity === 'warning' ? 'bg-yellow-500' :
                  activity.severity === 'error' ? 'bg-red-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTimestamp(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-2xl font-heading font-bold text-mint-600 mb-2">
            {dashboardData.stats.avgResponseTime}
          </div>
          <p className="text-sm text-gray-600">Average Response Time</p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-heading font-bold text-blue-600 mb-2">
            {dashboardData.stats.dataStorage}
          </div>
          <p className="text-sm text-gray-600">Data Storage Used</p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-heading font-bold text-green-600 mb-2">
            {dashboardData.stats.monthlyGrowth}
          </div>
          <p className="text-sm text-gray-600">Monthly Growth</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
