import React from 'react';
import '../styles/WarningBox.css';

const WarningBox = ({ 
  type = 'warning', // 'warning', 'caution', 'note', 'danger'
  title,
  icon,
  children 
}) => {
  // Default icons based on type
  const defaultIcons = {
    warning: '⚠️',
    caution: '🔔',
    note: '📝',
    danger: '⛔'
  };
  
  // Default titles based on type
  const defaultTitles = {
    warning: 'WARNING',
    caution: 'CAUTION',
    note: 'NOTE',
    danger: 'DANGER'
  };
  
  const displayIcon = icon || defaultIcons[type];
  const displayTitle = title || defaultTitles[type];
  
  return (
    <div className={`warning-box ${type}`}>
      <div className="warning-header">
        <span className="warning-icon">{displayIcon}</span>
        <span className="warning-title">{displayTitle}</span>
      </div>
      <div className="warning-content">
        {children}
      </div>
    </div>
  );
};

export default WarningBox; 