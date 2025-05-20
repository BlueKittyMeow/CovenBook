import React from 'react';

const SimplePage = ({ page, showMagic, revealMagic, triggerEmojiEffect }) => {
  switch (page.type) {
    case 'blank':
      return <div className="blank-page"></div>;
      
    case 'cover':
      return (
        <div className="simple-cover-page">
          <div className="title">{page.title}</div>
          <div className="subtitle">{page.subtitle}</div>
          <div className="publisher-info">
            <div>{page.publisher}</div>
            <div>{page.year}</div>
          </div>
        </div>
      );
    
    case 'contents':
      return (
        <div className="simple-contents-page">
          <h2 className="contents-title">{page.title}</h2>
          <div className="contents-sections">
            {page.sections.map((section, idx) => (
              <div key={idx} className="contents-section">
                <span>{section.name}</span>
                <span>p. {section.page}</span>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'chapter':
      return (
        <div className="simple-chapter-page">
          <div className="chapter-number">Chapter {page.number}</div>
          <h2 className="chapter-title">{page.title}</h2>
          <div className="chapter-content">
            {page.content}
          </div>
          {page.hasHiddenContent && (
            <div 
              className={`hidden-content ${showMagic['chapter'] ? 'revealed' : ''}`}
              onClick={() => revealMagic('chapter')}
            >
              {showMagic['chapter'] ? (
                <div className="magical-content">
                  "{page.hiddenContent}"
                </div>
              ) : (
                <div className="content-placeholder">
                  [Touch here if you can see this note]
                </div>
              )}
            </div>
          )}
        </div>
      );
    
    case 'section':
      return (
        <div className="simple-section-page">
          <h2 className="section-title">{page.title}</h2>
          <p className="section-content">{page.content}</p>
          <div className="section-note">{page.note}</div>
          <div className="equation-container">
            {page.equations.map((eq, idx) => (
              <div 
                key={idx} 
                className={`equation ${showMagic[`eq-${idx}`] ? 'revealed' : ''}`}
                onClick={() => revealMagic(`eq-${idx}`)}
              >
                {showMagic[`eq-${idx}`] ? eq.hidden : eq.visible}
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'interactive':
      return (
        <div className="simple-interactive-page">
          <h2 className="interactive-title">{page.title}</h2>
          <p className="interactive-content">{page.content}</p>
          <p className="interactive-instruction">{page.instruction}</p>
          <div className="emoji-container">
            {page.emojis.map((emoji, idx) => (
              <span 
                key={idx} 
                className="emoji"
                onClick={() => triggerEmojiEffect(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      );
    
    case 'notes':
      return (
        <div className="simple-notes-page">
          <h2 className="notes-title">{page.title}</h2>
          <div className="handwritten-notes">
            {page.handwritten.map((note, idx) => (
              <div key={idx} className="note" style={{
                transform: `rotate(${(idx % 3) - 1}deg)`
              }}>
                {note}
              </div>
            ))}
          </div>
        </div>
      );
    
    default:
      return <div>Page content not available</div>;
  }
};

export default SimplePage; 