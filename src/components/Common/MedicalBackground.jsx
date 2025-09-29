import React from 'react';

/**
 * MedicalBackground Component
 * 
 * Purpose: Provides animated medical-themed SVG illustrations as background elements
 * Features:
 * - Floating medical icons with various animations
 * - Theme-consistent colors (blue, green, slate)
 * - Responsive positioning
 * - Performance optimized with CSS animations
 */
const MedicalBackground = ({ variant = 'default' }) => {
  const getBackgroundElements = () => {
    switch (variant) {
      case 'login':
        return (
          <>
            {/* Large Medical Cross */}
            <div className="absolute top-16 left-16 animate-float">
              <svg className="w-16 h-16 text-primary-300/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            
            {/* Stethoscope */}
            <div className="absolute top-24 right-20 animate-float-delayed">
              <svg className="w-20 h-20 text-green-400/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l1 1c1.5 1.5 3 2.5 5.5 2.5s4-.5 5.5-2.5l1-1z"/>
              </svg>
            </div>
            
            {/* Heart with Pulse */}
            <div className="absolute top-40 left-1/4 animate-pulse-slow">
              <svg className="w-12 h-12 text-red-400/25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            {/* Medical Pill */}
            <div className="absolute bottom-32 right-24 animate-bounce-slow">
              <svg className="w-14 h-14 text-primary-300/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            {/* DNA Helix */}
            <div className="absolute bottom-40 left-16 animate-float-slow">
              <svg className="w-16 h-16 text-green-400/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"/>
              </svg>
            </div>
            
            {/* Medical Shield */}
            <div className="absolute top-1/2 left-8 animate-float">
              <svg className="w-18 h-18 text-primary-300/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
            </div>
            
            {/* Activity Graph */}
            <div className="absolute top-1/3 right-8 animate-float-delayed">
              <svg className="w-20 h-20 text-slate-400/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
          </>
        );
      
      case 'dashboard':
        return (
          <>
            {/* Medical Cross */}
            <div className="absolute top-20 left-20 animate-float">
              <svg className="w-24 h-24 text-primary-300/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            
            {/* Heart */}
            <div className="absolute top-40 right-32 animate-float-delayed">
              <svg className="w-20 h-20 text-red-400/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            {/* Stethoscope */}
            <div className="absolute bottom-32 left-1/4 animate-float-slow">
              <svg className="w-28 h-28 text-green-400/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l1 1c1.5 1.5 3 2.5 5.5 2.5s4-.5 5.5-2.5l1-1z"/>
              </svg>
            </div>
            
            {/* Medical Pill */}
            <div className="absolute bottom-20 right-20 animate-bounce-slow">
              <svg className="w-16 h-16 text-primary-300/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            
            {/* Activity Graph */}
            <div className="absolute top-1/2 right-16 animate-float">
              <svg className="w-32 h-32 text-slate-400/8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            </div>
            
            {/* DNA Helix */}
            <div className="absolute top-1/3 left-8 animate-float-delayed">
              <svg className="w-24 h-24 text-green-400/12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 2c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 2c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z"/>
              </svg>
            </div>
            
            {/* Medical Chart */}
            <div className="absolute top-1/4 right-1/4 animate-float-slow">
              <svg className="w-20 h-20 text-primary-300/12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </div>
            
            {/* Medical Bag */}
            <div className="absolute bottom-1/3 left-1/3 animate-float">
              <svg className="w-18 h-18 text-green-400/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
              </svg>
            </div>
          </>
        );
      
      case 'form':
        return (
          <>
            {/* Medical Cross */}
            <div className="absolute top-10 right-10 animate-float">
              <svg className="w-12 h-12 text-primary-300/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            
            {/* Heart */}
            <div className="absolute bottom-10 left-10 animate-float-delayed">
              <svg className="w-10 h-10 text-red-400/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            {/* Medical Pill */}
            <div className="absolute top-1/2 right-1/4 animate-bounce-slow">
              <svg className="w-8 h-8 text-green-400/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </>
        );
      
      default:
        return (
          <>
            {/* Medical Cross */}
            <div className="absolute top-20 left-20 animate-float">
              <svg className="w-16 h-16 text-primary-300/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </div>
            
            {/* Heart */}
            <div className="absolute top-40 right-32 animate-float-delayed">
              <svg className="w-12 h-12 text-red-400/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            {/* Medical Pill */}
            <div className="absolute bottom-32 right-20 animate-bounce-slow">
              <svg className="w-14 h-14 text-green-400/15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </>
        );
    }
  };

  return (
    <div className=" absolute inset-0 overflow-hidden pointer-events-none">
      {getBackgroundElements()}
    </div>
  );
};

export default MedicalBackground;
