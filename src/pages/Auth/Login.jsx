import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Stethoscope,
  Eye,
  EyeOff,
  User,
  Crown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import MedicalBackground from "../../components/Common/MedicalBackground";
import Navbar from "../../components/Layout/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, abhaLogin, demoLogin, error, clearError, isAuthenticated, getRole } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  useEffect(() => {
    if (isAuthenticated()) {
      const role = getRole();
      switch (role) {
        case "doctor":
          navigate("/app/doctor/dashboard", { replace: true });
          break;
        case "admin":
          navigate("/app/admin/dashboard", { replace: true });
          break;
        default:
          navigate("/app/dashboard", { replace: true });
          break;
      }
    }
  }, [isAuthenticated, getRole, navigate]);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    clearError();
    try {
      const result = await login(formData);
      if (result.success) {
        const role = getRole();
        switch (role) {
          case "doctor":
            navigate("/app/doctor/dashboard", { replace: true });
            break;
          case "admin":
            navigate("/app/admin/dashboard", { replace: true });
            break;
          default:
            navigate(from, { replace: true });
            break;
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAbhaLogin = () => {
    clearError();
    abhaLogin();
  };

  const handleDemoLogin = (role) => {
    clearError();
    const result = demoLogin(role);
    if (result.success) {
      switch (role) {
        case "doctor":
          navigate("/app/doctor/dashboard", { replace: true });
          break;
        case "admin":
          navigate("/app/admin/dashboard", { replace: true });
          break;
        default:
          navigate("/app/dashboard", { replace: true });
          break;
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen flex">
        {/* Fullscreen Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hospital ke bache.webp')" }}
        >
          <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm"></div>
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col lg:flex-row w-full">
          {/* Left text/illustration */}
          <div className="hidden lg:flex w-1/2 flex-col justify-center items-center text-white p-12">
            <Stethoscope className="w-24 h-24 mb-6 text-white/90 animate-pulse" />
            <h1 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
              Welcome to Ayush EMR
            </h1>
            <p className="text-lg text-blue-100 text-center max-w-md">
              Modern healthcare management system for doctors, patients, and administrators.
            </p>
          </div>

          {/* Right form */}
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-md mt-6">
              <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-2xl sm:px-10 border border-slate-200 hover:shadow-blue-200/50 transition">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.email ? "border-red-300" : "border-slate-300"
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                          errors.password ? "border-red-300" : "border-slate-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-700"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </form>

                {/* Divider */}
                <div className="mt-6 flex items-center">
                  <div className="flex-grow border-t border-slate-200" />
                  <span className="px-3 text-sm text-slate-500">
                    Or continue with
                  </span>
                  <div className="flex-grow border-t border-slate-200" />
                </div>

                {/* ABHA login */}
                <div className="mt-6">
                  <button
                    onClick={handleAbhaLogin}
                    className="w-full flex justify-center items-center px-4 py-3 border-2 border-blue-400 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all shadow-sm hover:shadow-blue-200/60"
                  >
                    <Stethoscope className="h-5 w-5 mr-2" /> Sign in with ABHA
                  </button>
                </div>

                {/* Demo Logins */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => handleDemoLogin("admin")}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white hover:scale-105 transition-all shadow-md flex justify-center items-center"
                  >
                    <Crown className="h-5 w-5 mr-2" /> Demo Admin
                  </button>
                  <button
                    onClick={() => handleDemoLogin("doctor")}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105 transition-all shadow-md flex justify-center items-center"
                  >
                    <Stethoscope className="h-5 w-5 mr-2" /> Demo Doctor
                  </button>
                  <button
                    onClick={() => handleDemoLogin("user")}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white hover:scale-105 transition-all shadow-md flex justify-center items-center"
                  >
                    <User className="h-5 w-5 mr-2" /> Demo Patient
                  </button>
                </div>

                <p className="mt-4 text-xs text-center text-slate-500">
                  <strong>Demo Credentials:</strong> Use any email with password{" "}
                  <code>demo123</code>
                </p>

                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Login;