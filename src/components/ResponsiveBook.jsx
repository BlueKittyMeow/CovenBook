import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../styles/ResponsiveBook.css';
// Import Cover and Back images directly
import CoverImage from '../assets/images/Cover.png';
import BackImage from '../assets/images/back.jpg';

const ResponsiveBook = () => {
  // References
  const bookRef = useRef(null);
  const containerRef = useRef(null);
  
  // State management
  const [dimensions, setDimensions] = useState({ width: 320, height: 480 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showMagic, setShowMagic] = useState({});
  const [emojiEffects, setEmojiEffects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Book content data
  const pages = [
    // Cover page
    {
      type: 'cover',
      title: 'Modern Applications of Theoretical Science',
      subtitle: 'Advanced Physics and Chemistry',
      publisher: 'Devil\'s Den High School District',
      year: '2024 Edition'
    },
    // Inside front cover / blank page
    { type: 'blank' },
    // Contents page
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
    // Blank page
    { type: 'blank' },
    // Chapter page
    {
      type: 'chapter',
      number: 5,
      title: 'Technomagic Principles',
      content: 'This chapter has been removed from the curriculum per school board decision #458-B.',
      hasHiddenContent: true,
      hiddenContent: 'Technomagic represents the intersection of modern technology with ancient arcane principles. When properly aligned, electronic signals can be transmuted into physical manifestations through sympathetic resonance.'
    },
    // Section page
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
    // Interactive page
    {
      type: 'interactive',
      title: '5.3 Practical Applications: Digital Symbolism',
      content: 'Contemporary symbolic language includes digital ideograms ("emojis") which have proven exceptionally effective as conduits for technomagic manifestation.',
      instruction: 'Touch any emoji to observe manifestation properties:',
      emojis: ['✨', '🔮', '⚡', '🌙', '🌊', '🔥']
    },
    // Notes page
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
    },
    // Back cover
    { type: 'back' }
  ];

  // Calculate responsive dimensions based on viewport
  const updateDimensions = () => {
    if (!containerRef.current) return;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const containerWidth = containerRef.current.clientWidth;
    
    // Use a 2:3 aspect ratio (standard book proportion)
    // Mobile-first approach
    let width, height;
    
    if (viewportWidth <= 480) {
      // Mobile: Use almost full width
      width = Math.min(containerWidth - 40, 280);
      height = Math.floor(width * 1.5); // 2:3 aspect ratio
    } else if (viewportWidth <= 768) {
      // Tablet: Medium size
      width = Math.min(containerWidth - 60, 360);
      height = Math.floor(width * 1.5);
    } else {
      // Desktop: Larger but still comfortable
      width = Math.min(containerWidth - 100, 420);
      height = Math.floor(width * 1.5);
    }
    
    // Ensure height doesn't exceed viewport height
    if (height > viewportHeight - 180) {
      height = viewportHeight - 180;
      width = Math.floor(height / 1.5);
    }
    
    console.log(`Setting book dimensions: ${width}x${height}`);
    setDimensions({ width, height });
  };

  // Handle window resize events
  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Set total pages
    setTotalPages(pages.length);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  // Page turn event handlers
  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  // Navigation handlers
  const handlePrevPage = () => {
    if (bookRef.current && currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (bookRef.current && currentPage < totalPages - 1) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  // Handle revealing hidden magical content
  const revealMagic = (index, event) => {
    event?.stopPropagation();
    setShowMagic(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Handle emoji effects
  const triggerEmojiEffect = (emoji, event) => {
    event?.stopPropagation();
    
    // Create a new effect
    const newEffect = {
      id: Date.now(),
      emoji,
      left: Math.random() * 70 + 15,
      top: Math.random() * 70 + 5,
      rotation: Math.random() * 40 - 20,
      scale: Math.random() * 1.5 + 0.8,
    };

    setEmojiEffects(prev => [...prev, newEffect]);

    // Remove effect after animation completes
    setTimeout(() => {
      setEmojiEffects(prev => prev.filter(effect => effect.id !== newEffect.id));
    }, 2000);
  };

  // Render page content based on type
  const renderPageContent = (page, index) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="cover-page">
            <img 
              src={CoverImage} 
              alt="Book Cover" 
              className="cover-image" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        );
        
      case 'blank':
        return <div className="blank-page"></div>;
        
      case 'contents':
        return (
          <div className="contents-page">
            <h2 className="contents-title">{page.title}</h2>
            <div className="contents-sections">
              {page.sections.map((section, idx) => (
                <div key={idx} className="contents-section">
                  <span className="section-name">{section.name}</span>
                  <span className="section-page">{section.page}</span>
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
            <p className="chapter-content">{page.content}</p>
            {page.hasHiddenContent && (
              <div 
                className={`hidden-content ${showMagic[index] ? 'revealed' : ''}`}
                onClick={(e) => revealMagic(index, e)}
              >
                {showMagic[index] ? page.hiddenContent : 
                  <div className="content-placeholder">
                    <span className="reveal-instruction">Touch to reveal hidden content</span>
                  </div>
                }
              </div>
            )}
          </div>
        );
        
      case 'section':
        return (
          <div className="section-page">
            <h3 className="section-title">{page.title}</h3>
            <p className="section-content">{page.content}</p>
            <p className="section-note">{page.note}</p>
            <div className="equation-container">
              {page.equations.map((eq, idx) => (
                <div 
                  key={idx}
                  className={`equation ${showMagic[`${index}-${idx}`] ? 'revealed' : ''}`}
                  onClick={(e) => revealMagic(`${index}-${idx}`, e)}
                >
                  {showMagic[`${index}-${idx}`] ? eq.hidden : eq.visible}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'interactive':
        return (
          <div className="interactive-page">
            <h3 className="interactive-title">{page.title}</h3>
            <p className="interactive-content">{page.content}</p>
            <p className="interactive-instruction">{page.instruction}</p>
            <div className="emoji-container">
              {page.emojis.map((emoji, idx) => (
                <span 
                  key={idx}
                  className="emoji"
                  onClick={(e) => triggerEmojiEffect(emoji, e)}
                >
                  {emoji}
                </span>
              ))}
            </div>
            <div className="emoji-effects-container">
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
            </div>
          </div>
        );
        
      case 'notes':
        return (
          <div className="notes-page">
            <h3 className="notes-title">{page.title}</h3>
            <div className="handwritten-notes">
              {page.handwritten.map((note, idx) => (
                <p key={idx} className="note">{note}</p>
              ))}
            </div>
          </div>
        );
        
      case 'back':
        return (
          <div className="back-page">
            <img 
              src={BackImage} 
              alt="Book Back" 
              className="back-image" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        );
        
      default:
        return <div className="blank-page"></div>;
    }
  };

  return (
    <div className="responsive-book-container" ref={containerRef}>
      {isLoading ? (
        <div className="loading">Loading book...</div>
      ) : (
        <>
          <div className="book-wrapper">
            {/* Navigation touch areas */}
            <div className="book-nav-area book-nav-prev" onClick={handlePrevPage}></div>
            <div className="book-nav-area book-nav-next" onClick={handleNextPage}></div>
            
            {/* Book component */}
            <HTMLFlipBook
              ref={bookRef}
              width={dimensions.width}
              height={dimensions.height}
              size="fixed"
              minWidth={280}
              maxWidth={800}
              minHeight={420}
              maxHeight={1200}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={handlePageFlip}
              className="book"
              startPage={0}
              drawShadow={true}
              flippingTime={1000}
              usePortrait={false}
              startZIndex={0}
              autoSize={false}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {pages.map((page, index) => (
                <div 
                  key={index}
                  className={`page-wrapper ${index % 2 === 0 ? 'even-page' : 'odd-page'}`}
                  data-density={index === 0 || index === pages.length - 1 ? "hard" : "soft"}
                  data-page-number={index + 1}
                >
                  <div className="page-content">
                    {renderPageContent(page, index)}
                  </div>
                </div>
              ))}
            </HTMLFlipBook>
          </div>
          
          {/* Page controls */}
          <div className="controls">
            <button 
              onClick={handlePrevPage} 
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <div className="page-number">
              {currentPage + 1} / {totalPages}
            </div>
            <button 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResponsiveBook; 