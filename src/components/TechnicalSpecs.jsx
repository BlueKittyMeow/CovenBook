import React from 'react';
import '../styles/TechnicalSpecs.css';

const TechnicalSpecs = ({ title, specs }) => {
  return (
    <div className="technical-specs">
      {title && <div className="specs-title">{title}</div>}
      <div className="specs-content">
        <table className="specs-table">
          <tbody>
            {specs.map((spec, index) => (
              <tr key={index} className="spec-row">
                <td className="spec-label">{spec.label}</td>
                <td className="spec-value">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicalSpecs; 