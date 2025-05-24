import React from 'react';
import TextbookImage from './TextbookImage';
import '../styles/EquipmentEntry.css';

const EquipmentEntry = ({
  name,
  designation,
  imageSrc,
  imageAlt,
  imageCaption,
  securityLevel = 'standard', // 'standard', 'advanced', or 'restricted'
  children,
  figureNumber
}) => {
  return (
    <div className={`equipment-entry security-level-${securityLevel}`}>
      <div className="equipment-header">
        <h3 className="equipment-name">{name}</h3>
        {designation && <div className="equipment-designation">{designation}</div>}
      </div>
      
      {imageSrc && (
        <TextbookImage
          src={imageSrc}
          alt={imageAlt || name}
          caption={imageCaption}
          align="right"
          width="35%"
          border={true}
          numbered={true}
          figureNumber={figureNumber}
        />
      )}
      
      <div className="equipment-description">
        {children}
      </div>
      
      <div className="entry-separator"></div>
    </div>
  );
};

export default EquipmentEntry; 