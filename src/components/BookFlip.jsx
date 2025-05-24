'use strict';

import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../styles/BookFlip.css';

/**
 * Simplified Book component using react-pageflip
 */
const BookFlip = () => {
  // State
  const [showMagic, setShowMagic] = useState({});
  const [emojiEffects, setEmojiEffects] = useState([]);
  // Set initial dimensions for portrait orientation (width: 350, height: 467 for 3:4 ratio)
  const [dimensions, setDimensions] = useState({ width: 350, height: 467 });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs
  const book = useRef(null);
  const containerRef = useRef(null);

  // Book pages data
  const pages = [
    // Cover page
    {
      type: 'cover',
      title: 'Modern Applications of Theoretical Science',
      subtitle: 'Advanced Physics and Chemistry',
      publisher: 'Devil\'s Den High School District',
      year: '2024 Edition'
    },
    // Blank page
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
    {
      type: 'back'
    }
  ];

  // Animation parameters (consistent for all page turns)
  const ANIMATION_PARAMS = {
    corner: "top",
    duration: 1000,
    easing: "ease-out"
  };

  // Specific animation parameters for different page types
  const getAnimationParams = (fromIndex, toIndex) => {
    // Use consistent animation parameters for all transitions
    return ANIMATION_PARAMS;
  };

  // Page density determination - function to get correct density for consistent animations
  const getPageDensity = (page, index) => {
    // The cover and final page are always hard
    if (index === 0 || index === pages.length - 1) {
      return "hard";
    }
    
    // Make all pages soft for consistent animations
    return "soft";
  };

  // Update dimensions based on the container size
  const updateDimensions = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Portrait orientation - height should be greater than width
    // For a 3:4 ratio, width should be 75% of height
    const maxHeight = Math.min(containerHeight - 40, 700);
    const idealWidth = Math.floor(maxHeight * 0.75); // width is 75% of height for 3:4
    
    let width, height;
    
    // If the ideal width fits within container width
    if (idealWidth <= containerWidth - 40) {
      width = idealWidth;
      height = maxHeight;
    } else {
      // Otherwise, calculate based on available width
      width = Math.min(containerWidth - 40, 350);
      height = Math.floor(width * (4/3)); // height is 133% of width for 3:4
    }
    
    console.log(`Container: ${containerWidth}x${containerHeight}, Book: ${width}x${height}`);
    setDimensions({ width, height });
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

  // Simple page navigation handlers
  const handlePrevPage = () => {
    if (book.current) {
      try {
        const currentIdx = book.current.pageFlip().getCurrentPageIndex();
        const params = getAnimationParams(currentIdx, currentIdx - 1);
        book.current.pageFlip().flipPrev(params);
      } catch (e) {
        console.error("Error navigating to previous page:", e);
      }
    }
  };

  const handleNextPage = () => {
    if (book.current) {
      try {
        const currentIdx = book.current.pageFlip().getCurrentPageIndex();
        const params = getAnimationParams(currentIdx, currentIdx + 1);
        book.current.pageFlip().flipNext(params);
      } catch (e) {
        console.error("Error navigating to next page:", e);
      }
    }
  };

  // Render page content based on page type
  const renderPageContent = (page, index) => {
    switch (page.type) {
      case 'blank':
        return <div className="blank-page"></div>;
        
      case 'cover':
        // Use a div with inline background image
        return (
          <div 
            className="cover-page"
            style={{
              width: '100%',
              height: '100%',
              background: 'url("/assets/Cover.png") no-repeat center',
              backgroundSize: 'contain',
            }}
          />
        );
      
      case 'back':
        // Use a div with inline background image
        return (
          <div 
            className="back-page"
            style={{
              width: '100%',
              height: '100%',
              background: 'url("/assets/back.jpg") no-repeat center',
              backgroundSize: 'contain',
            }}
          />
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
                className={`hidden-content ${showMagic[`chapter-${index}`] ? 'revealed' : ''}`}
                onClick={(e) => revealMagic(`chapter-${index}`, e)}
                data-magic-index={`chapter-${index}`}
              >
                {showMagic[`chapter-${index}`] ? (
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
              {page.equations.map((eq, eqIdx) => (
                <div 
                  key={eqIdx} 
                  className={`equation ${showMagic[`eq-${index}-${eqIdx}`] ? 'revealed' : ''}`}
                  onClick={(e) => revealMagic(`eq-${index}-${eqIdx}`, e)}
                >
                  {showMagic[`eq-${index}-${eqIdx}`] ? eq.hidden : eq.visible}
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
              {page.emojis.map((emoji, emojiIdx) => (
                <span 
                  key={emojiIdx} 
                  className="emoji"
                  onClick={(e) => triggerEmojiEffect(emoji, e)}
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
              {page.handwritten.map((note, noteIdx) => (
                <div 
                  key={noteIdx} 
                  className="note"
                  style={{
                    transform: `rotate(${(noteIdx % 3) - 1}deg)`
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div>Page {index + 1}</div>;
    }
  };

  // Log dimensions changes
  useEffect(() => {
    console.log('Dimensions updated:', dimensions);
  }, [dimensions]);

  // Initialize dimensions and handle window resize
  useEffect(() => {
    // Initial dimensions update
    updateDimensions();
    
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener("resize", handleResize);
    
    // Force a dimensions update after a short delay to ensure everything is rendered
    const timeoutId = setTimeout(() => {
      updateDimensions();
    }, 500);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Set loading state
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="book-container">
      <div className="book-wrapper" ref={containerRef}>
        {/* Navigation areas */}
        <div
          className="book-nav-area book-nav-prev"
          onClick={handlePrevPage}
        ></div>
        <div
          className="book-nav-area book-nav-next"
          onClick={handleNextPage}
        ></div>

        {/* Simple loading indicator */}
        {isLoading && <div className="loading">Loading book...</div>}

        {/* Book component */}
        <HTMLFlipBook
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={200}
          maxWidth={500}
          minHeight={300}
          maxHeight={800}
          maxShadowOpacity={0.3}
          showCover={false}
          mobileScrollSupport={true}
          useMouseEvents={true}
          flippingTime={1000}
          orientation="portrait"
          className="book"
          style={{ 
            touchAction: "none"
          }}
          clickEventForward={true}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
          ref={book}
          onFlip={(e) => {
            setCurrentPage(e.data + 1);
          }}
          onInit={(e) => {
            if (e.data) {
              setTotalPages(e.data.pages);
              setIsLoading(false);
            }
          }}
          startZIndex={500}
          renderOnlyPageLengthChange={false}
        >
          {/* Render each page */}
          {pages.map((page, index) => (
            <div
              key={index}
              className={`page-container page-${index}`}
              data-density={getPageDensity(page, index)}
              data-page-number={index}
            >
              <div className="page-content">
                {renderPageContent(page, index)}
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span className="page-number">
          {currentPage === 1 ? "Cover" : `Page ${currentPage}`} 
          {totalPages > 0 ? ` of ${totalPages}` : ""}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>

      {/* Instructions */}
      <div className="instructions">
        Click the left or right side of the book to turn pages. Touch
        highlighted elements to reveal hidden magical content. Click emojis to
        see them manifest!
      </div>

      {/* Emoji effects container */}
      <div className="emoji-effects-container">
        {emojiEffects.map((effect) => (
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
};

export default BookFlip; 