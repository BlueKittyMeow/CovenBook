import { useEffect, useState } from 'react';
import '../styles/BookBasic.css';

const BookBasic = () => {
  const [initialized, setInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  
  // Book pages data
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

  // Render the initial HTML structure for the book
  const renderBookHTML = () => {
    const bookElement = document.getElementById('flipbook');
    if (!bookElement) return;
    
    // Clear any existing content
    bookElement.innerHTML = '';
    
    // Create pages
    pages.forEach((page, index) => {
      const pageElement = document.createElement('div');
      
      // Add 'hard' class to cover pages
      if (index === 0 || index === pages.length - 1) {
        pageElement.className = 'hard';
      }
      
      // Add content based on page type
      const contentElement = document.createElement('div');
      contentElement.className = 'page-content';
      
      switch (page.type) {
        case 'cover':
          contentElement.innerHTML = `
            <div class="cover">
              <div class="title">${page.title}</div>
              <div class="subtitle">${page.subtitle}</div>
              <div class="publisher-info">
                <div>${page.publisher}</div>
                <div>${page.year}</div>
              </div>
            </div>
          `;
          break;
          
        case 'blank':
          contentElement.innerHTML = '<div class="blank-page"></div>';
          break;
          
        case 'contents':
          let sectionsHTML = '';
          page.sections.forEach(section => {
            sectionsHTML += `
              <div class="contents-section">
                <span>${section.name}</span>
                <span>p. ${section.page}</span>
              </div>
            `;
          });
          
          contentElement.innerHTML = `
            <div class="contents">
              <h2 class="contents-title">${page.title}</h2>
              <div class="contents-sections">
                ${sectionsHTML}
              </div>
            </div>
          `;
          break;
          
        case 'chapter':
          contentElement.innerHTML = `
            <div class="chapter">
              <div class="chapter-number">Chapter ${page.number}</div>
              <h2 class="chapter-title">${page.title}</h2>
              <div class="chapter-content">${page.content}</div>
              ${page.hasHiddenContent ? `
                <div class="hidden-content" data-magic="chapter-${index}">
                  <div class="content-placeholder">
                    [Touch here if you can see this note]
                  </div>
                </div>
              ` : ''}
            </div>
          `;
          break;
          
        case 'section':
          let equationsHTML = '';
          page.equations.forEach((eq, i) => {
            equationsHTML += `
              <div class="equation" data-magic="equation-${index}-${i}">
                ${eq.visible}
              </div>
            `;
          });
          
          contentElement.innerHTML = `
            <div class="section">
              <h2 class="section-title">${page.title}</h2>
              <p class="section-content">${page.content}</p>
              <div class="section-note">${page.note}</div>
              <div class="equation-container">
                ${equationsHTML}
              </div>
            </div>
          `;
          break;
          
        case 'interactive':
          let emojisHTML = '';
          page.emojis.forEach(emoji => {
            emojisHTML += `<span class="emoji" data-emoji="${emoji}">${emoji}</span>`;
          });
          
          contentElement.innerHTML = `
            <div class="interactive">
              <h2 class="interactive-title">${page.title}</h2>
              <p class="interactive-content">${page.content}</p>
              <p class="interactive-instruction">${page.instruction}</p>
              <div class="emoji-container">
                ${emojisHTML}
              </div>
            </div>
          `;
          break;
          
        case 'notes':
          let notesHTML = '';
          page.handwritten.forEach((note, i) => {
            notesHTML += `
              <div class="note" style="transform: rotate(${(i % 3) - 1}deg)">
                ${note}
              </div>
            `;
          });
          
          contentElement.innerHTML = `
            <div class="notes">
              <h2 class="notes-title">${page.title}</h2>
              <div class="handwritten-notes">
                ${notesHTML}
              </div>
            </div>
          `;
          break;
          
        default:
          contentElement.innerHTML = `<div>Page ${index + 1}</div>`;
      }
      
      pageElement.appendChild(contentElement);
      bookElement.appendChild(pageElement);
    });
    
    setTotalPages(pages.length);
    return true;
  };

  // Load Turn.js from alternative sources if needed
  const loadTurnJs = () => {
    if (window.jQuery && window.jQuery.fn.turn) {
      console.log('Turn.js already loaded!');
      return Promise.resolve(true);
    }
    
    console.log('Loading Turn.js from alternative sources...');
    
    // Try to load jQuery first if needed
    const loadJQuery = () => {
      if (window.jQuery) {
        console.log('jQuery already loaded!');
        return Promise.resolve(true);
      }
      
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
        script.onload = () => {
          console.log('jQuery loaded successfully!');
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load jQuery!');
          reject(new Error('Failed to load jQuery'));
        };
        document.head.appendChild(script);
      });
    };
    
    // Then load Turn.js from different sources
    const loadTurnJsFromSources = () => {
      const sources = [
        'https://cdnjs.cloudflare.com/ajax/libs/turn.js/3/turn.min.js',
        'https://raw.githack.com/blasten/turn.js/master/turn.min.js',
        'https://cdn.jsdelivr.net/gh/blasten/turn.js/turn.min.js'
      ];
      
      return new Promise((resolve, reject) => {
        function trySource(index) {
          if (index >= sources.length) {
            reject(new Error('Failed to load Turn.js from all sources'));
            return;
          }
          
          const script = document.createElement('script');
          script.src = sources[index];
          
          script.onload = () => {
            if (window.jQuery.fn.turn) {
              console.log(`Turn.js loaded successfully from ${sources[index]}`);
              resolve(true);
            } else {
              console.warn(`Loaded script from ${sources[index]} but Turn.js not available, trying next source...`);
              trySource(index + 1);
            }
          };
          
          script.onerror = () => {
            console.warn(`Failed to load Turn.js from ${sources[index]}, trying next source...`);
            trySource(index + 1);
          };
          
          document.head.appendChild(script);
        }
        
        trySource(0);
      });
    };
    
    // Chain the loading process
    return loadJQuery().then(loadTurnJsFromSources);
  };

  // Initialize Turn.js
  const initializeTurnJs = () => {
    if (!window.jQuery || !window.jQuery.fn.turn) {
      console.error('jQuery or Turn.js is not available!');
      setError('Required libraries not loaded. Please try refreshing the page.');
      return false;
    }
    
    const $ = window.jQuery;
    try {
      console.log('Initializing Turn.js...');
      
      // Initialize Turn.js
      $("#flipbook").turn({
        width: 922,
        height: 600,
        autoCenter: true,
        display: 'double',
        acceleration: true,
        gradients: true,
        elevation: 50,
        when: {
          turning: function(event, page, view) {
            console.log(`Turning to page ${page}`);
            setCurrentPage(page);
          },
          turned: function(event, page, view) {
            console.log(`Now on page ${page}`);
            setCurrentPage(page);
          }
        }
      });
      
      // Start at page 1 (the cover)
      $("#flipbook").turn("page", 1);
      
      // Set up click handlers for hidden content
      $(document).on('click', '[data-magic]', function() {
        const magicId = $(this).data('magic');
        
        if ($(this).hasClass('revealed')) {
          // Hide the content
          $(this).removeClass('revealed');
          
          if (magicId.startsWith('chapter')) {
            $(this).html('<div class="content-placeholder">[Touch here if you can see this note]</div>');
          } else if (magicId.startsWith('equation')) {
            const parts = magicId.split('-');
            const pageIndex = parseInt(parts[1]);
            const eqIndex = parseInt(parts[2]);
            $(this).text(pages[pageIndex].equations[eqIndex].visible);
          }
        } else {
          // Show the content
          $(this).addClass('revealed');
          
          if (magicId.startsWith('chapter')) {
            const parts = magicId.split('-');
            const pageIndex = parseInt(parts[1]);
            $(this).html(`<div class="magical-content">${pages[pageIndex].hiddenContent}</div>`);
          } else if (magicId.startsWith('equation')) {
            const parts = magicId.split('-');
            const pageIndex = parseInt(parts[1]);
            const eqIndex = parseInt(parts[2]);
            $(this).text(pages[pageIndex].equations[eqIndex].hidden);
          }
        }
      });
      
      // Set up emoji effects
      $(document).on('click', '.emoji', function() {
        const emoji = $(this).data('emoji');
        
        // Create effect element
        const effectElement = document.createElement('div');
        effectElement.className = 'emoji-effect';
        effectElement.textContent = emoji;
        
        // Random position, rotation and scale
        const left = Math.random() * 70 + 15; // percentage
        const top = Math.random() * 70 + 5;   // percentage
        const rotation = Math.random() * 40 - 20;
        const scale = Math.random() * 1.5 + 0.8;
        
        effectElement.style.left = `${left}%`;
        effectElement.style.top = `${top}%`;
        effectElement.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        
        // Add to container
        document.querySelector('.book-container').appendChild(effectElement);
        
        // Remove after animation completes
        setTimeout(() => {
          effectElement.remove();
        }, 2000);
      });
      
      console.log('Turn.js initialized successfully!');
      return true;
    } catch (error) {
      console.error('Error initializing Turn.js:', error);
      setError(`Error initializing the book: ${error.message}`);
      return false;
    }
  };

  // Set up the book when the component mounts
  useEffect(() => {
    // Only run once
    if (initialized) return;
    
    // Initialize book
    const initializeBook = async () => {
      try {
        // Step 1: Try to load Turn.js if needed
        await loadTurnJs();
        
        // Step 2: Render the book HTML
        if (renderBookHTML()) {
          // Step 3: Initialize Turn.js
          if (initializeTurnJs()) {
            setInitialized(true);
            console.log('Book fully initialized!');
            // Signal to the window that the book is initialized (for parent components)
            if (window.bookInitialized) {
              window.bookInitialized();
            }
          }
        }
      } catch (error) {
        console.error('Error during book initialization:', error);
        setError(`Failed to initialize the book: ${error.message}`);
      }
    };
    
    // Give the DOM a moment to be ready
    setTimeout(initializeBook, 500);
    
    // Clean up when component unmounts
    return () => {
      if (window.jQuery && window.jQuery.fn.turn) {
        try {
          window.jQuery("#flipbook").turn("destroy");
          console.log('Turn.js instance destroyed');
        } catch (error) {
          console.error('Error destroying Turn.js instance:', error);
        }
      }
    };
  }, [initialized]);

  // Next page function
  const nextPage = () => {
    if (window.jQuery && window.jQuery.fn.turn) {
      window.jQuery("#flipbook").turn("next");
    }
  };

  // Previous page function
  const prevPage = () => {
    if (window.jQuery && window.jQuery.fn.turn) {
      window.jQuery("#flipbook").turn("previous");
    }
  };

  return (
    <div className="book-container">
      {/* Loading message */}
      {!initialized && !error && (
        <div className="loading-message">
          Loading book... Please wait.
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {/* Book */}
      <div className="book-wrapper">
        <div className="flipbook-container">
          <div id="flipbook"></div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="controls">
        <button onClick={prevPage} disabled={!initialized || currentPage <= 1}>
          Previous
        </button>
        <span className="page-number">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={nextPage} disabled={!initialized || currentPage >= totalPages}>
          Next
        </button>
      </div>
      
      {/* Instructions */}
      {initialized && (
        <div className="instructions">
          Click the buttons to turn pages. Touch highlighted elements to reveal hidden magical content. Click emojis to see them manifest!
        </div>
      )}
    </div>
  );
};

export default BookBasic; 