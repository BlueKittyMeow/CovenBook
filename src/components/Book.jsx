import { useState, useEffect } from 'react';
import '../styles/Book.css';

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showMagic, setShowMagic] = useState({});
  const [emojiEffects, setEmojiEffects] = useState([]);

  // Book content - placeholder content
  const pages = [
    {
      type: 'cover',
      title: 'Modern Applications of Theoretical Science',
      subtitle: 'Advanced Physics and Chemistry',
      publisher: 'Devil\'s Den High School District',
      year: '2024 Edition'
    },
    {
      type: 'contents',
      title: 'Table of Contents',
      sections: [
        { name: 'Unit 1: Fundamentals of Energy Transfer', page: 2 },
        { name: 'Unit 2: Subatomic Particle Behavior', page: 34 },
        { name: 'Unit 3: Advanced Wave Mechanics', page: 67 },
        { name: 'Unit 4: Theoretical Appli█ations of Ener█y', page: 108 },
        { name: 'Unit 5: Technomag█c Principles', page: 142 },
        { name: 'Unit 6: Laboratory Protocols', page: 198 }
      ]
    },
    {
      type: 'chapter',
      number: 5,
      title: 'Technomagic Principles',
      content: 'This chapter has been removed from the curriculum per school board decision #458-B.',
      hasHiddenContent: true,
      hiddenContent: 'Technomagic represents the intersection of modern technology with ancient arcane principles. When properly aligned, electronic signals can be transmuted into physical manifestations through sympathetic resonance.'
    },
    {
      type: 'section',
      title: '5.2 Symbolic Representation and Manifestation',
      content: 'The use of standardized symbolic language enables consistent results across varied practitioner skill levels. Modern computing devices provide an ideal medium for symbolic transfer.',
      note: 'try touching the equations below',
      equations: [
        { visible: 'E = mc²', hidden: '🔥 = manifestation coefficient × clarity²' },
        { visible: 'F = ma', hidden: '💧 = magical amplitude × attunement' },
        { visible: 'PV = nRT', hidden: '🌪️ = natural resonance × technoflow' }
      ]
    },
    {
      type: 'interactive',
      title: '5.3 Practical Applications: Digital Symbolism',
      content: 'Contemporary symbolic language includes digital ideograms ("emojis") which have proven exceptionally effective as conduits for technomagic manifestation.',
      instruction: 'Touch any emoji to observe manifestation properties:',
      emojis: ['✨', '🔮', '⚡', '🌙', '🌊', '🔥']
    },
    {
      type: 'notes',
      title: 'Student Notes',
      handwritten: [
        'tried the emoji thing with Maddie & Kyle yesterday. IT WORKED!!',
        'apparently complex sequences create stronger effects',
        'Mr. Peterson totally knows about this stuff - saw him using 🔮🌙 combo after school',
        'DO NOT try the fire emoji indoors!!! disaster in the chem lab',
        'meeting at the den tonight to test more sequences - bring your phone CHARGED'
      ]
    }
  ];

  // Handle page turning
  const turnPage = (direction) => {
    const newPage = currentPage + direction;
    if (newPage >= 0 && newPage < pages.length) {
      setCurrentPage(newPage);
      setShowMagic({});
    }
  };

  // Handle revealing hidden content
  const revealMagic = (index) => {
    setShowMagic(prev => ({...prev, [index]: !prev[index]}));
  };

  // Handle emoji effects
  const triggerEmojiEffect = (emoji) => {
    // Create a new effect
    const newEffect = {
      id: Date.now(),
      emoji,
      left: Math.random() * 70 + 15, // percentage
      top: Math.random() * 70 + 5,   // percentage
      rotation: Math.random() * 40 - 20,
      scale: Math.random() * 1.5 + 0.8
    };
    
    setEmojiEffects(prev => [...prev, newEffect]);
    
    // Remove effect after animation completes
    setTimeout(() => {
      setEmojiEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 2000);
  };

  // Render current page content
  const renderPage = (page) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="cover-page">
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
          <div className="contents-page">
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
          <div className="chapter-page">
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
          <div className="section-page">
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
          <div className="interactive-page">
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
          <div className="notes-page">
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

  return (
    <div className="book-container">
      {/* Emoji effects layer */}
      {emojiEffects.map(effect => (
        <div 
          key={effect.id}
          className="emoji-effect"
          style={{
            left: `${effect.left}%`,
            top: `${effect.top}%`,
            transform: `rotate(${effect.rotation}deg) scale(${effect.scale})`,
          }}
        >
          {effect.emoji}
        </div>
      ))}
      
      {/* Book container */}
      <div className="book">
        {/* Page content */}
        <div className="page">
          {renderPage(pages[currentPage])}
        </div>
        
        {/* Page navigation */}
        <div className="page-navigation">
          <button 
            onClick={() => turnPage(-1)} 
            disabled={currentPage === 0}
            className={`nav-button ${currentPage === 0 ? 'disabled' : ''}`}
          >
            &larr;
          </button>
          <div className="page-indicator">
            <span className="page-number">{currentPage + 1} / {pages.length}</span>
          </div>
          <button 
            onClick={() => turnPage(1)} 
            disabled={currentPage === pages.length - 1}
            className={`nav-button ${currentPage === pages.length - 1 ? 'disabled' : ''}`}
          >
            &rarr;
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="instructions">
        Navigate through the textbook using the arrows. Touch highlighted elements to reveal hidden magical content. Click emojis to see them manifest!
      </div>
    </div>
  );
};

export default Book; 