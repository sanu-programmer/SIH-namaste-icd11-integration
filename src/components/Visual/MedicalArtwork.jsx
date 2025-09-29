import React from 'react';
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Shield, 
  Zap, 
  Star,
  Sparkles,
  Droplets,
  Brain,
  Eye,
  Pill,
  Microscope
} from 'lucide-react';

/**
 * MedicalArtwork Component
 * 
 * Purpose: Beautiful visual elements and artwork for healthcare UI
 * 
 * Features:
 * - Animated medical icons
 * - Floating elements
 * - Gradient backgrounds
 * - Interactive hover effects
 * - Healthcare-themed illustrations
 */
const MedicalArtwork = ({ type = 'default', size = 'medium', animated = true }) => {
  const getSizeClasses = (size) => {
    switch (size) {
      case 'small': return 'w-8 h-8';
      case 'medium': return 'w-12 h-12';
      case 'large': return 'w-16 h-16';
      case 'xl': return 'w-20 h-20';
      default: return 'w-12 h-12';
    }
  };

  const getAnimationClasses = (animated) => {
    return animated ? 'animate-float' : '';
  };

  const renderIcon = (iconType) => {
    const iconProps = {
      className: `${getSizeClasses(size)} ${getAnimationClasses(animated)} text-primary-500`,
    };

    switch (iconType) {
      case 'heart':
        return <Heart {...iconProps} />;
      case 'stethoscope':
        return <Stethoscope {...iconProps} />;
      case 'activity':
        return <Activity {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      case 'star':
        return <Star {...iconProps} />;
      case 'sparkles':
        return <Sparkles {...iconProps} />;
      case 'droplets':
        return <Droplets {...iconProps} />;
      case 'brain':
        return <Brain {...iconProps} />;
      case 'eye':
        return <Eye {...iconProps} />;
      case 'pill':
        return <Pill {...iconProps} />;
      case 'microscope':
        return <Microscope {...iconProps} />;
      default:
        return <Heart {...iconProps} />;
    }
  };

  const renderPattern = () => {
    return (
      <div className="absolute inset-0 healthcare-pattern opacity-20"></div>
    );
  };

  const renderFloatingElements = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating medical icons */}
        <div className="absolute top-4 left-4 animate-float" style={{ animationDelay: '0s' }}>
          <Heart className="w-6 h-6 text-primary-300 opacity-60" />
        </div>
        <div className="absolute top-8 right-8 animate-float" style={{ animationDelay: '1s' }}>
          <Stethoscope className="w-5 h-5 text-secondary-300 opacity-60" />
        </div>
        <div className="absolute bottom-6 left-8 animate-float" style={{ animationDelay: '2s' }}>
          <Activity className="w-4 h-4 text-success-300 opacity-60" />
        </div>
        <div className="absolute bottom-4 right-4 animate-float" style={{ animationDelay: '3s' }}>
          <Shield className="w-5 h-5 text-warning-300 opacity-60" />
        </div>
        <div className="absolute top-1/2 left-2 animate-float" style={{ animationDelay: '4s' }}>
          <Pill className="w-4 h-4 text-primary-300 opacity-60" />
        </div>
        <div className="absolute top-1/3 right-2 animate-float" style={{ animationDelay: '5s' }}>
          <Brain className="w-5 h-5 text-secondary-300 opacity-60" />
        </div>
      </div>
    );
  };

  const renderGradientBackground = () => {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-50"></div>
    );
  };

  const renderSparkleEffect = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-primary-400 opacity-40" />
          </div>
        ))}
      </div>
    );
  };

  const renderMedicalGrid = () => {
    return (
      <div className="absolute inset-0 medical-grid opacity-10"></div>
    );
  };

  switch (type) {
    case 'hero':
      return (
        <div className="relative w-full h-64 rounded-2xl overflow-hidden">
          {renderGradientBackground()}
          {renderPattern()}
          {renderFloatingElements()}
          {renderSparkleEffect()}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Heart className="w-16 h-16 text-primary-500 animate-pulse-slow" />
                  <div className="absolute inset-0 bg-primary-500 rounded-full opacity-20 animate-ping"></div>
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold gradient-text">
                Healthcare Excellence
              </h2>
            </div>
          </div>
        </div>
      );

    case 'card':
      return (
        <div className="relative w-full h-32 rounded-xl overflow-hidden">
          {renderGradientBackground()}
          {renderMedicalGrid()}
          {renderFloatingElements()}
          <div className="relative z-10 flex items-center justify-center h-full">
            {renderIcon('heart')}
          </div>
        </div>
      );

    case 'sidebar':
      return (
        <div className="relative w-full h-20 rounded-lg overflow-hidden">
          {renderGradientBackground()}
          {renderPattern()}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="flex space-x-2">
              <Heart className="w-6 h-6 text-primary-500 animate-pulse-slow" />
              <Stethoscope className="w-6 h-6 text-secondary-500 animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      );

    case 'dashboard':
      return (
        <div className="relative w-full h-40 rounded-2xl overflow-hidden">
          {renderGradientBackground()}
          {renderPattern()}
          {renderFloatingElements()}
          {renderSparkleEffect()}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Activity className="w-12 h-12 text-primary-500 animate-pulse-slow" />
              </div>
              <p className="text-sm font-medium text-primary-700">
                System Health
              </p>
            </div>
          </div>
        </div>
      );

    case 'icon':
      return (
        <div className="relative">
          {renderIcon(type)}
        </div>
      );

    case 'background':
      return (
        <div className="absolute inset-0 pointer-events-none">
          {renderGradientBackground()}
          {renderPattern()}
          {renderFloatingElements()}
        </div>
      );

    default:
      return (
        <div className="relative w-full h-24 rounded-lg overflow-hidden">
          {renderGradientBackground()}
          {renderPattern()}
          <div className="relative z-10 flex items-center justify-center h-full">
            {renderIcon('heart')}
          </div>
        </div>
      );
  }
};

export default MedicalArtwork;
