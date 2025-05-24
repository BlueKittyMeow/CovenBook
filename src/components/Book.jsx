import { useState, useEffect, useRef } from 'react';
// No need to import jQuery or turn.js as they are loaded globally in index.html
import SimplePage from './SimplePage';
import '../styles/Book.css';

// Declare variable to store the Turn.js instance
let turnInstance = null;

const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showMagic, setShowMagic] = useState({});
  const [emojiEffects, setEmojiEffects] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);
  const bookRef = useRef(null);

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

  // Force manual initialization after DOM is ready
  useEffect(() => {
    // Create proper DOM structure for Turn.js
    const setupTurnJsStructure = () => {
      if (!bookRef.current) return false;

      try {
        // Clear any existing content first to avoid duplication
        while (bookRef.current.firstChild) {
          bookRef.current.removeChild(bookRef.current.firstChild);
        }

        // Create pages with proper structure for Turn.js
        pages.forEach((page, index) => {
          const pageDiv = document.createElement('div');
          
          // Add hard class to cover pages
          if (index === 0 || index === pages.length - 1) {
            pageDiv.className = 'hard';
          }
          
          // Add even/odd classes for proper shadows
          pageDiv.className += index % 2 === 0 ? ' odd' : ' even';
          
          // Create page content container
          const contentDiv = document.createElement('div');
          contentDiv.className = 'page-content';
          
          // Create a react root for this element to render the content
          const pageContentContainer = document.createElement('div');
          pageContentContainer.className = 'react-page-content';
          pageContentContainer.dataset.pageIndex = index;
          contentDiv.appendChild(pageContentContainer);
          
          pageDiv.appendChild(contentDiv);
          bookRef.current.appendChild(pageDiv);
        });

        return true;
      } catch (error) {
        console.error('Error setting up Turn.js structure:', error);
        return false;
      }
    };

    // Initialize Turn.js directly
    const initializeTurnJs = () => {
      if (!window.jQuery || !window.jQuery.fn.turn || !bookRef.current) {
        return false;
      }

      try {
        console.log('🚀 Initializing Turn.js manually');
        const $ = window.jQuery;
        
        turnInstance = $(bookRef.current).turn({
          display: 'double', // Important: display two pages side by side
          width: 922,
          height: 600,
          elevation: 50,
          gradients: true,
          autoCenter: true,
          acceleration: true, // Enables hardware acceleration
          when: {
            turning: function(event, page, view) {
              // Update the current page state
              setCurrentPage(page);
              // Reset magic state when turning page
              setShowMagic({});
            },
            turned: function(event, page, view) {
              // Update current page after turning is complete
              setCurrentPage(page);
              console.log('📖 Page turned to:', page, 'View:', view);
            }
          }
        });

        // Force first page (cover) to be displayed alone
        $(bookRef.current).turn('page', 1);
        
        return true;
      } catch (error) {
        console.error('❌ Error during Turn.js manual initialization:', error);
        return false;
      }
    };

    // Only try to initialize if we haven't succeeded yet
    if (!initialized && initAttempts < 5) {
      console.log(`📚 Turn.js initialization attempt ${initAttempts + 1}`);
      setInitAttempts(prev => prev + 1);
      
      // Need a delay to make sure the DOM is fully rendered
      const initTimer = setTimeout(() => {
        // First ensure DOM structure is correct
        if (setupTurnJsStructure()) {
          // Try to initialize Turn.js
          if (initializeTurnJs()) {
            setInitialized(true);
            console.log('✅ Turn.js initialized successfully');
            // Signal to the window that the book is initialized
            if (window.bookInitialized) {
              window.bookInitialized();
            }
          } else {
            console.error('❌ Turn.js initialization failed');
            if (initAttempts >= 4) {
              setLoadError(true);
            }
          }
        } else {
          console.error('❌ Failed to set up Turn.js structure');
          if (initAttempts >= 4) {
            setLoadError(true);
          }
        }
      }, 1000 + (initAttempts * 500));
      
      return () => clearTimeout(initTimer);
    }
    
    // Cleanup when component unmounts
    return () => {
      if (turnInstance && window.jQuery) {
        try {
          const $ = window.jQuery;
          $(bookRef.current).turn('destroy');
          turnInstance = null;
        } catch (error) {
          console.error('Error destroying Turn.js:', error);
        }
      }
    };
  }, [initialized, initAttempts]);

  // Effect to render page content
  useEffect(() => {
    if (initialized && bookRef.current) {
      // Render React content into each page container
      document.querySelectorAll('.react-page-content').forEach(container => {
        const pageIndex = parseInt(container.dataset.pageIndex, 10);
        if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < pages.length) {
          // We're not using ReactDOM.render here as it's deprecated
          // Instead, we'll manually set the HTML content
          container.innerHTML = '';
          const contentWrapper = document.createElement('div');
          container.appendChild(contentWrapper);
          
          // Create a simple representation of the page content
          switch(pages[pageIndex].type) {
            case 'blank':
              contentWrapper.innerHTML = '<div class="blank-page"></div>';
              break;
            case 'cover':
              contentWrapper.innerHTML = `
                <div class="cover-page">
                  <div class="title">${pages[pageIndex].title}</div>
                  <div class="subtitle">${pages[pageIndex].subtitle}</div>
                  <div class="publisher-info">
                    <div>${pages[pageIndex].publisher}</div>
                    <div>${pages[pageIndex].year}</div>
                  </div>
                </div>
              `;
              break;
            case 'contents':
              let sectionsHTML = '';
              pages[pageIndex].sections.forEach(section => {
                sectionsHTML += `
                  <div class="contents-section">
                    <span>${section.name}</span>
                    <span>p. ${section.page}</span>
                  </div>
                `;
              });
              contentWrapper.innerHTML = `
                <div class="contents-page">
                  <h2 class="contents-title">${pages[pageIndex].title}</h2>
                  <div class="contents-sections">
                    ${sectionsHTML}
                  </div>
                </div>
              `;
              break;
            case 'chapter':
              contentWrapper.innerHTML = `
                <div class="chapter-page">
                  <div class="chapter-number">Chapter ${pages[pageIndex].number}</div>
                  <h2 class="chapter-title">${pages[pageIndex].title}</h2>
                  <div class="chapter-content">${pages[pageIndex].content}</div>
                  ${pages[pageIndex].hasHiddenContent ? `
                    <div class="hidden-content" data-magic-index="chapter">
                      <div class="content-placeholder">
                        [Touch here if you can see this note]
                      </div>
                    </div>
                  ` : ''}
                </div>
              `;
              break;
            // Add cases for other page types here...
            default:
              contentWrapper.innerHTML = `<div>Content for page ${pageIndex + 1}</div>`;
          }
          
          // Add click handlers for magic content
          contentWrapper.querySelectorAll('[data-magic-index]').forEach(el => {
            const magicIndex = el.dataset.magicIndex;
            el.addEventListener('click', () => revealMagic(magicIndex));
          });
        }
      });
    }
  }, [initialized, showMagic]);

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

  // Manual page turn function
  const turnPage = (direction) => {
    if (initialized && turnInstance && window.jQuery) {
      try {
        const $ = window.jQuery;
        const currentPage = $(bookRef.current).turn('page');
        if (direction > 0) {
          $(bookRef.current).turn('next');
        } else {
          $(bookRef.current).turn('previous');
        }
      } catch (error) {
        console.error('Error turning page:', error);
      }
    } else {
      // Fallback page navigation
      setCurrentPage(prev => {
        const newPage = prev + direction;
        return newPage >= 0 && newPage < pages.length ? newPage : prev;
      });
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
      
      {/* Simple Fallback View when Turn.js isn't loaded */}
      {!initialized || loadError ? (
        <>
          <div className="simple-book">
            <SimplePage 
              page={pages[currentPage]} 
              showMagic={showMagic} 
              revealMagic={revealMagic} 
              triggerEmojiEffect={triggerEmojiEffect} 
            />
          </div>
          
          <div className="fallback-navigation">
            <button
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>Page {currentPage + 1} / {pages.length}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(pages.length - 1, prev + 1))}
              disabled={currentPage === pages.length - 1}
            >
              Next
            </button>
          </div>
          
          {loadError && (
            <div className="error-message">
              <p>We're having trouble loading the page-turning effect. You can still navigate using the buttons above.</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Page edge click areas */}
          <div className="page-edge left" onClick={() => turnPage(-1)}></div>
          <div className="page-edge right" onClick={() => turnPage(1)}></div>
          
          {/* Book with Turn.js */}
          <div className="book-wrapper">
            <div className="flipbook-container">
              <div id="flipbook" ref={bookRef} className="flipbook">
                {/* Pages will be added dynamically in the useEffect */}
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Instructions */}
      <div className="instructions">
        {initialized && !loadError
          ? "Click the left or right edge of the book to turn pages. Touch highlighted elements to reveal hidden magical content. Click emojis to see them manifest!"
          : "Touch highlighted elements to reveal hidden magical content. Click emojis to see them manifest!"
        }
      </div>
    </div>
  );
};

export default Book; 