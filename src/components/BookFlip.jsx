import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../styles/BookFlip.css';

const BookFlip = () => {
  const book = useRef(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [emojiEffects, setEmojiEffects] = useState([]);
  const [showMagic, setShowMagic] = useState({});
  const [dimensions, setDimensions] = useState({
    width: 462,
    height: 600
  });

  // Book content
  const pages = [
    {
      type: 'cover',
      title: 'Modern Applications of Theoretical Science',
      subtitle: 'Advanced Physics and Chemistry',
      publisher: 'Devil\'s Den High School District',
      year: '2024 Edition'
    },
    {
      type: 'blank',
    },
    {
      type: 'contents',
      title: 'Table of Contents',
      sections: [
        { name: 'Unit 1: Fundamentals of Energy Transfer', page: 4 },
        { name: 'Unit 2: Subatomic Particle Behavior', page: 36 },
        { name: 'Unit 3: Advanced Wave Mechanics', page: 68 },
        { name: 'Unit 4: Theoretical Appli█ations of Ener█y', page: 110 },
        { name: 'Unit 5: Technomag█c Principles', page: 144 },
        { name: 'Unit 6: Laboratory Protocols', page: 200 }
      ]
    },
    {
      type: 'blank',
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

  // Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      // Base dimensions for the book (4:3 aspect ratio)
      const baseWidth = 462;
      const baseHeight = 600;
      
      // Get container width
      const container = document.querySelector('.book-wrapper');
      if (!container) return;
      
      const containerWidth = container.clientWidth;
      
      // Calculate new dimensions maintaining aspect ratio
      let newWidth = containerWidth > baseWidth ? baseWidth : containerWidth;
      let newHeight = (newWidth / baseWidth) * baseHeight;
      
      setDimensions({
        width: newWidth,
        height: newHeight
      });
    };

    // Update dimensions on mount and when window resizes
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Set total pages after component mounts
  useEffect(() => {
    setTotalPages(pages.length);
  }, [pages]);

  // Handle revealing hidden content
  const revealMagic = (index) => {
    setShowMagic(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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

  // Get page label (adjust for single vs double view)
  const getPageLabel = () => {
    if (page === 0) {
      return 'Cover';
    } else {
      return `Page ${page} of ${totalPages - 1}`;
    }
  };

  // Render different page types
  const renderPageContent = (page, index) => {
    switch(page.type) {
      case 'blank':
        return <div className="blank-page"></div>;
        
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
                  data-emoji={emoji}
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
      
      <div className="book-wrapper">
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1000}
          maxShadowOpacity={0.7}
          showCover={true}
          mobileScrollSupport={true}
          className="book"
          onFlip={(e) => setPage(e.data)}
          ref={book}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {pages.map((pageData, index) => (
            <div 
              key={index} 
              className={`page-container ${pageData.type === 'cover' ? 'page-cover' : ''}`}
              data-density={index === 0 || index === pages.length - 1 ? "hard" : "soft"}
            >
              <div className="page-content">
                {renderPageContent(pageData, index)}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      
      <div className="controls">
        <button 
          onClick={() => book.current.pageFlip().flipPrev()}
          disabled={page === 0}
        >
          Previous
        </button>
        <span className="page-number">{getPageLabel()}</span>
        <button 
          onClick={() => book.current.pageFlip().flipNext()}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
      
      <div className="instructions">
        Click the left or right edge of the book to turn pages. 
        Touch highlighted elements to reveal hidden magical content. 
        Click emojis to see them manifest!
      </div>
    </div>
  );
};

export default BookFlip; 