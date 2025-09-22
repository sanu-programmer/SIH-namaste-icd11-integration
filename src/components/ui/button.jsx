import React from 'react';
import './button.css';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    default: 'btn-default',
    cta: 'btn-cta',
    nav: 'btn-nav',
    login: 'btn-login',
    primary: 'btn-primary',
    secondary: 'btn-secondary'
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.md,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
