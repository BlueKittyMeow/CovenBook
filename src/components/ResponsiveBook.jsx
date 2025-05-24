import React, { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../styles/ResponsiveBook.css';
// Import Cover and Back images directly
import CoverImage from '../assets/images/Cover.png';
import BackImage from '../assets/images/back.jpg';
// Import the new appendix components
import AppendixPage from './AppendixPage';
import TextbookImage from './TextbookImage';
import EquipmentEntry from './EquipmentEntry';
import WarningBox from './WarningBox';
import TechnicalSpecs from './TechnicalSpecs';

// Use existing images as placeholders for equipment images until actual images are created
// These will be replaced with actual equipment images later
const StandardEquipmentImage = CoverImage;
const AdvancedEquipmentImage = CoverImage;
const RestrictedEquipmentImage = CoverImage;

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
        { name: 'Unit 6: Laboratory Protocols', page: 200 },
        { name: 'Appendix B: Equipment Reference', page: 246 }
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
    // Appendix Intro Page
    {
      type: 'appendix-intro',
      title: 'Appendix B: Equipment Reference',
      sectionNumber: 'B',
      content: 'This reference guide provides specifications and usage guidelines for standard, advanced, and restricted equipment used in technomagic implementation. Equipment is classified by security clearance level and intended application.'
    },
    // Standard Equipment Page (B.1)
    {
      type: 'appendix-standard',
      title: 'B.1 Standard Equipment',
      sectionNumber: 'B.1',
      content: 'Standard equipment is available to all practitioners with basic certification. These items pose minimal risk when used according to guidelines.'
    },
    // Advanced Equipment Page (B.2)
    {
      type: 'appendix-advanced',
      title: 'B.2 Advanced Equipment',
      sectionNumber: 'B.2',
      content: 'Advanced equipment requires intermediate certification and supervision during initial usage periods. These items may pose moderate risk if misused.'
    },
    // Restricted Equipment Page (B.3)
    {
      type: 'appendix-restricted',
      title: 'B.3 Restricted Equipment',
      sectionNumber: 'B.3',
      content: 'Restricted equipment is available only to practitioners with advanced certification and special clearance. These items pose significant risk if misused and must be secured when not in use.'
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
    
    // Use a more natural aspect ratio (4:5 instead of 2:3)
    // Mobile-first approach with increased padding to prevent content clipping
    let width, height;
    
    if (viewportWidth <= 480) {
      // Mobile: Use maximum available width with minimal padding
      width = Math.min(containerWidth - 30, 320); // Reduce padding from 60 to 30
      height = Math.floor(width * 1.25); // 4:5 aspect ratio
    } else if (viewportWidth <= 768) {
      // Tablet: Medium size with increased width
      width = Math.min(containerWidth - 60, 400); // Increase max width from 340 to 400
      height = Math.floor(width * 1.25);
    } else {
      // Desktop: Larger but still comfortable with generous padding
      width = Math.min(containerWidth - 80, 460); // Increase max width from 380 to 460
      height = Math.floor(width * 1.25);
    }
    
    // Ensure height doesn't exceed viewport height with more appropriate margins
    if (height > viewportHeight - 150) {  // Reduced from 220 to 150 for more space
      height = viewportHeight - 150;
      width = Math.floor(height / 1.25);
    }
    
    console.log(`Setting book dimensions: ${width}x${height}`);
    // Set CSS variable for the book width that our corner click areas can use
    document.documentElement.style.setProperty('--book-width', `${width}px`);
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

  // Enhanced navigation handlers with validation
  const handleNavClick = (direction) => {
    if (!bookRef.current) return;
    
    if (direction === 'prev' && currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
    } else if (direction === 'next' && currentPage < totalPages - 1) {
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
            <div className="page-spacer"></div>
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
            <div className="page-spacer"></div>
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
            <div className="page-spacer"></div>
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
            <div className="page-spacer"></div>
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
              <div className="notes-spacer"></div>
            </div>
          </div>
        );
        
      // New appendix page rendering
      case 'appendix-intro':
        return (
          <AppendixPage sectionNumber={page.sectionNumber} title={page.title}>
            <p>{page.content}</p>
            
            <WarningBox type="note">
              <p>Equipment classification is determined by the Technomagic Safety Board under regulation 42-C.</p>
            </WarningBox>
            
            <TextbookImage 
              src={StandardEquipmentImage}
              alt="Equipment Storage Cabinet"
              caption="The standard equipment storage cabinet in Laboratory 3B"
              align="center"
              width="70%"
              numbered={true}
              figureNumber="B.1"
            />
          </AppendixPage>
        );
        
      case 'appendix-standard':
        return (
          <AppendixPage sectionNumber={page.sectionNumber} title={page.title}>
            <p>{page.content}</p>
            
            <EquipmentEntry
              name="Digital Resonance Amplifier"
              designation="TM-101-S"
              imageSrc={StandardEquipmentImage}
              imageCaption="Standard Digital Resonance Amplifier"
              securityLevel="standard"
              figureNumber="B.2"
            >
              <p>The Digital Resonance Amplifier enhances the manifestation properties of digital symbols by providing a stable resonance field. Standard model TM-101-S is suitable for classroom demonstrations and basic practice.</p>
              
              <TechnicalSpecs title="Technical Specifications" specs={[
                { label: "Power Source", value: "USB-C (5V/2A)" },
                { label: "Resonance Range", value: "2.4GHz - 5.0GHz" },
                { label: "Field Radius", value: "3 meters maximum" },
                { label: "Certification", value: "Basic (Level 1)" }
              ]} />
              
              <WarningBox type="caution">
                <p>Keep device at least 30cm from sensitive electronics. Do not operate near medical equipment.</p>
              </WarningBox>
            </EquipmentEntry>
          </AppendixPage>
        );
        
      case 'appendix-advanced':
        return (
          <AppendixPage sectionNumber={page.sectionNumber} title={page.title}>
            <p>{page.content}</p>
            
            <EquipmentEntry
              name="Symbolic Manifestation Enhancer"
              designation="TM-205-A"
              imageSrc={AdvancedEquipmentImage}
              imageCaption="Advanced Symbolic Manifestation Enhancer with protective case"
              securityLevel="advanced"
              figureNumber="B.3"
            >
              <p>The Symbolic Manifestation Enhancer dramatically increases the physicality of manifested digital symbols, allowing for prolonged duration and enhanced stability of effects. This device requires intermediate certification and should be operated under supervision until practitioner demonstrates competence.</p>
              
              <TechnicalSpecs title="Technical Specifications" specs={[
                { label: "Power Source", value: "Lithium battery (12V)" },
                { label: "Enhancement Factor", value: "7x standard baseline" },
                { label: "Field Radius", value: "8 meters maximum" },
                { label: "Certification", value: "Intermediate (Level 2)" }
              ]} />
              
              <WarningBox type="warning">
                <p>Device generates significant heat during operation. Allow proper ventilation and cooling periods between uses. Do not operate for more than 15 minutes continuously.</p>
              </WarningBox>
            </EquipmentEntry>
          </AppendixPage>
        );
        
      case 'appendix-restricted':
        return (
          <AppendixPage sectionNumber={page.sectionNumber} title={page.title}>
            <p>{page.content}</p>
            
            <EquipmentEntry
              name="Multi-Symbol Synchronization Array"
              designation="TM-307-R"
              imageSrc={RestrictedEquipmentImage}
              imageCaption="Restricted Multi-Symbol Synchronization Array (shown in secure configuration)"
              securityLevel="restricted"
              figureNumber="B.4"
            >
              <p>The Multi-Symbol Synchronization Array enables the coordinated manifestation of multiple digital symbols simultaneously, creating composite effects with <span className="redacted">amplified resonance patterns</span>. This device requires advanced certification and special clearance.</p>
              
              <p>Potential applications include <span className="redacted">atmospheric manipulation</span>, <span className="redacted">barrier generation</span>, and <span className="redacted">long-distance symbol projection</span>.</p>
              
              <TechnicalSpecs title="Technical Specifications" specs={[
                { label: "Power Source", value: "Dedicated circuit (110V/10A)" },
                { label: "Sync Capacity", value: "Up to 12 symbols simultaneously" },
                { label: "Field Radius", value: "██ meters maximum" },
                { label: "Certification", value: "Advanced (Level 3)" }
              ]} />
              
              <WarningBox type="danger">
                <p>Improper use may result in <span className="redacted">uncontrolled manifestations</span> and potential <span className="redacted">reality instability</span>. Always operate with a spotter. Report any anomalies immediately to faculty supervisor.</p>
              </WarningBox>
            </EquipmentEntry>
          </AppendixPage>
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
    <div className="book-container" ref={containerRef}>
      {isLoading ? (
        <div className="loading">Loading book...</div>
      ) : (
        <>
          <div className="book-wrapper">
            {/* Navigation touch areas */}
            <div className="book-nav-area prev" onClick={() => handleNavClick('prev')}>
              <span className="nav-indicator">←</span>
            </div>
            <div className="book-nav-area next" onClick={() => handleNavClick('next')}>
              <span className="nav-indicator">→</span>
            </div>
            
            {/* Corner click areas */}
            <div className="corner-click-area top-left" onClick={() => handleNavClick('prev')}></div>
            <div className="corner-click-area bottom-left" onClick={() => handleNavClick('prev')}></div>
            <div className="corner-click-area top-right" onClick={() => handleNavClick('next')}></div>
            <div className="corner-click-area bottom-right" onClick={() => handleNavClick('next')}></div>
            
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
              maxShadowOpacity={0.2}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={handlePageFlip}
              className="book"
              startPage={0}
              drawShadow={true}
              flippingTime={400}
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
              onClick={() => handleNavClick('prev')} 
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <div className="page-number">
              {currentPage + 1} / {totalPages}
            </div>
            <button 
              onClick={() => handleNavClick('next')} 
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