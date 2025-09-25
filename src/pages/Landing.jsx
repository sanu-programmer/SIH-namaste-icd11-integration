import React from 'react';
import { useNavigate } from 'react-router-dom';

const Feature = ({ title, desc }) => (
  <div className="p-6 bg-white/70 backdrop-blur rounded-2xl shadow-sm border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="mt-2 text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <header className="fixed top-0 left-0 w-full bg-blue-900/90 backdrop-blur-md text-white shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center font-bold text-2xl tracking-wide">
              <span className="text-blue-200">Ved</span>
              <span className="text-white">EMR</span>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#features" className="hover:text-blue-300">Features</a>
              <a href="#about" className="hover:text-blue-300">About</a>
              <a href="#contact" className="hover:text-blue-300">Contact</a>
            </nav>
            <div className="hidden md:flex">
              <button onClick={() => navigate('/login')} className="px-6 py-2 font-medium bg-gradient-to-r from-blue-600 to-blue-500 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">Unified, smart, and secure EMR with ICD-11 integration</h1>
              <p className="mt-6 text-lg text-slate-700 max-w-2xl">Streamline clinical workflows, standardize diagnoses with ICD-11, and deliver better care with a modern, privacy-first EMR.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={() => navigate('/login')} className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition">Login</button>
                <button onClick={() => navigate('/signup')} className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium border border-slate-200 hover:bg-slate-50 transition">Sign Up</button>
              </div>
              <div className="mt-6 text-sm text-slate-600">Demo logins available for Admin, Doctor, and User</div>
            </div>
            <div>
              <div className="aspect-[16/10] rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 overflow-hidden flex items-center justify-center text-blue-700 font-semibold">
                VedEMR
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Everything you need to run your practice</h2>
            <p className="mt-3 text-slate-700 max-w-2xl">A modern toolkit for clinicians, staff, and patients with built-in ICD-11 mapping.</p>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Feature title="ICD-11 Diagnosis" desc="Search, map, and validate diagnoses using ICD-11 for clean analytics and interoperability." />
              <Feature title="Role-based Dashboards" desc="Tailored views and permissions for admins, doctors, and patients to stay focused." />
              <Feature title="Patient Records" desc="Comprehensive patient timelines, prescriptions, and reports, securely accessible." />
              <Feature title="ABHA Integration" desc="Seamlessly link ABHA IDs to patient profiles and enable secure data exchange." />
              <Feature title="Smart Forms" desc="Guided forms, auto-complete, and error prevention for faster, safer documentation." />
              <Feature title="Privacy-first" desc="Session security, granular access controls, and audit logs built-in." />
            </div>
          </div>
        </section>

        <section id="about" className="py-16 sm:py-24 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Built for Indian healthcare</h2>
              <p className="mt-4 text-slate-700">Interoperate using open standards, align with national programs, and support clinicians with a delightful experience.</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 ring-1 ring-slate-200">
              <ul className="grid sm:grid-cols-2 gap-4 text-slate-700">
                <li>ICD-11 coding</li>
                <li>ABHA linking</li>
                <li>Secure auth</li>
                <li>Audit logs</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Ready to experience VedEMR?</h2>
            <p className="mt-3 text-slate-700">Use demo accounts or sign up to get started.</p>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => navigate('/login')} className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition">Login</button>
              <button onClick={() => navigate('/signup')} className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium border border-slate-200 hover:bg-slate-50 transition">Sign Up</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-slate-600">
        <p>© {new Date().getFullYear()} VedEMR. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;


