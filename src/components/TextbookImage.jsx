import React from 'react';
import '../styles/TextbookImage.css';

const TextbookImage = ({ 
  src, 
  alt, 
  caption, 
  align = 'right', 
  width = '40%',
  border = true,
  numbered = false,
  figureNumber
}) => {
  return (
    <figure className={`textbook-image ${align} ${border ? 'bordered' : ''}`} style={{ width }}>
      <img src={src} alt={alt} className="image" />
      {caption && (
        <figcaption className="caption">
          {numbered && <span className="figure-number">Figure {figureNumber || 'B.1'}: </span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default TextbookImage; 