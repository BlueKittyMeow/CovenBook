import React from 'react';
import '../styles/AppendixPage.css';

const AppendixPage = ({ children, title, sectionNumber }) => {
  return (
    <div className="appendix-page">
      {sectionNumber && <div className="appendix-section-number">Appendix {sectionNumber}</div>}
      {title && <h2 className="appendix-title">{title}</h2>}
      <div className="appendix-content">
        {children}
      </div>
    </div>
  );
};

export default AppendixPage; 