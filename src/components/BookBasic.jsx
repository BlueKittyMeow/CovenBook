import { useEffect, useState } from 'react';
import '../styles/BookBasic.css';

// Declare the turnInstance variable at the module level
let turnInstance = null;

const BookBasic = () => {
  const [initialized, setInitialized] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [emojiEffects, setEmojiEffects] = useState([]);
  
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
    if (!bookElement) return false;

    try {
      // Clear any existing content
      bookElement.innerHTML = '';
      
      // Create pages with proper structure for Turn.js
      pages.forEach((page, index) => {
        const pageDiv = document.createElement('div');
        
        // Add hard class to cover and back pages
        if (index === 0 || index === pages.length - 1) {
          pageDiv.className = 'hard';
        }
        
        // Set specific page number class for Turn.js
        pageDiv.className += ` p${index + 1}`;
        
        // Add even/odd classes for proper shadows and positioning
        // In a book, even pages are on the left (verso), odd pages are on the right (recto)
        // But p1 (cover) is special and needs to be odd
        const pageNumber = index + 1;
        if (pageNumber === 1) {
          pageDiv.className += ' odd';
        } else if (pageNumber % 2 === 0) {
          pageDiv.className += ' even'; // Left pages
          pageDiv.style.left = '0';
          pageDiv.style.transformOrigin = 'right center';
        } else {
          pageDiv.className += ' odd'; // Right pages 
          pageDiv.style.left = '50%';
          pageDiv.style.transformOrigin = 'left center';
        }
        
        // Set proper dimensions and positioning for all pages
        pageDiv.style.position = 'absolute';
        pageDiv.style.top = '0';
        pageDiv.style.height = '100%';
        pageDiv.style.width = pageNumber === 1 ? '100%' : '50%';
        
        // Create content container with improved containment
        const contentDiv = document.createElement('div');
        contentDiv.className = 'page-content';
        contentDiv.style.overflow = 'hidden'; // Prevent content overflow
        contentDiv.style.isolation = 'isolate'; // Create a stacking context
        contentDiv.style.position = 'relative';
        contentDiv.style.boxSizing = 'border-box';
        contentDiv.style.width = '100%';
        contentDiv.style.height = '100%';
        
        // Create appropriate content based on page type
        let contentHTML = '';
        
        switch(page.type) {
          case 'cover':
            contentHTML = `
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
            contentHTML = '<div class="blank-page"></div>';
            break;
            
          case 'contents':
            contentHTML = `
              <div class="contents">
                <h2 class="contents-title">${page.title}</h2>
                <div class="contents-sections">
                  ${page.sections.map(section => `
                    <div class="contents-section">
                      <span>${section.name}</span>
                      <span>p. ${section.page}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
            break;
            
          case 'chapter':
            contentHTML = `
              <div class="chapter">
                <div class="chapter-number">Chapter ${page.number}</div>
                <h2 class="chapter-title">${page.title}</h2>
                <div class="chapter-content">${page.content}</div>
                ${page.hasHiddenContent ? `
                  <div class="hidden-content" data-magic-index="chapter${index}">
                    <div class="content-placeholder">
                      [Touch here if you can see this note]
                    </div>
                  </div>
                ` : ''}
              </div>
            `;
            break;
            
          case 'section':
            contentHTML = `
              <div class="section">
                <h2 class="section-title">${page.title}</h2>
                <p class="section-content">${page.content}</p>
                <div class="section-note">${page.note}</div>
                <div class="equation-container">
                  ${page.equations.map((eq, eqIndex) => `
                    <div class="equation" data-magic-index="eq-${index}-${eqIndex}">
                      ${eq.visible}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
            break;
            
          case 'interactive':
            contentHTML = `
              <div class="interactive">
                <h2 class="interactive-title">${page.title}</h2>
                <p class="interactive-content">${page.content}</p>
                <p class="interactive-instruction">${page.instruction}</p>
                <div class="emoji-container">
                  ${page.emojis.map(emoji => `
                    <span class="emoji" data-emoji="${emoji}">${emoji}</span>
                  `).join('')}
                </div>
              </div>
            `;
            break;
            
          case 'notes':
            contentHTML = `
              <div class="notes">
                <h2 class="notes-title">${page.title}</h2>
                <div class="handwritten-notes">
                  ${page.handwritten.map((note, noteIndex) => `
                    <div class="note" style="transform: rotate(${(noteIndex % 3) - 1}deg)">
                      ${note}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
            break;
            
          default:
            contentHTML = `<div>Content for page ${index + 1}</div>`;
        }
        
        contentDiv.innerHTML = contentHTML;
        
        // Add event listeners for interactive elements
        setTimeout(() => {
          const magicElements = contentDiv.querySelectorAll('[data-magic-index]');
          magicElements.forEach(el => {
            const magicIndex = el.dataset.magicIndex;
            el.addEventListener('click', () => {
              // Toggle magic content visibility
              if (el.classList.contains('revealed')) {
                el.classList.remove('revealed');
                if (el.dataset.originalContent) {
                  el.innerHTML = el.dataset.originalContent;
                }
              } else {
                el.classList.add('revealed');
                el.dataset.originalContent = el.innerHTML;
                
                // Find the hidden content for this element
                if (magicIndex.startsWith('eq-')) {
                  const [, pageIndex, eqIndex] = magicIndex.split('-').map(Number);
                  if (pages[pageIndex] && pages[pageIndex].equations && pages[pageIndex].equations[eqIndex]) {
                    el.textContent = pages[pageIndex].equations[eqIndex].hidden;
                  }
                } else if (magicIndex.startsWith('chapter')) {
                  const pageIndex = parseInt(magicIndex.replace('chapter', ''), 10);
                  if (pages[pageIndex] && pages[pageIndex].hiddenContent) {
                    el.innerHTML = `<div class="magical-content">${pages[pageIndex].hiddenContent}</div>`;
                  }
                }
              }
            });
          });
          
          // Add event listeners for emoji elements
          const emojiElements = contentDiv.querySelectorAll('[data-emoji]');
          emojiElements.forEach(el => {
            const emoji = el.dataset.emoji;
            el.addEventListener('click', () => {
              // Trigger the emoji effect animation
              triggerEmojiEffect(emoji);
            });
          });
        }, 0);
        
        // Ensure interactive elements are properly contained
        const pageType = page.type;
        if (pageType === 'section' || pageType === 'interactive' || pageType === 'notes') {
          // These page types have more complex interactive elements
          contentDiv.style.overflow = 'hidden';
          contentDiv.style.contain = 'content';
          
          // Add a wrapper to contain the interactive elements if needed
          const interactiveWrapper = document.createElement('div');
          interactiveWrapper.className = 'interactive-content-wrapper';
          interactiveWrapper.style.position = 'relative';
          interactiveWrapper.style.width = '100%';
          interactiveWrapper.style.height = '100%';
          interactiveWrapper.style.overflow = 'hidden';
          interactiveWrapper.style.isolation = 'isolate';
          interactiveWrapper.style.zIndex = '1';
          
          // Move content to wrapper
          while (contentDiv.firstChild) {
            interactiveWrapper.appendChild(contentDiv.firstChild);
          }
          
          contentDiv.appendChild(interactiveWrapper);
        }
        
        pageDiv.appendChild(contentDiv);
        bookElement.appendChild(pageDiv);
      });

      return true;
    } catch (error) {
      console.error('Error creating flipbook HTML:', error);
      return false;
    }
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
    if (!window.jQuery || !window.jQuery.fn.turn || !document.getElementById('flipbook')) {
      console.error('jQuery, Turn.js, or flipbook element not found');
      return false;
    }
    
    try {
      const $ = window.jQuery;
      const flipbook = $('#flipbook');
      
      // First, check if Turn.js is already initialized on this element and destroy it
      try {
        // Check if the flipbook has Turn.js data
        if (flipbook.data() && typeof flipbook.data().turn !== 'undefined') {
          // Proper way to destroy the Turn.js instance
          flipbook.turn('destroy');
          console.log('Previous Turn.js instance destroyed');
        }
      } catch (destroyError) {
        console.error('Error destroying existing Turn.js instance:', destroyError.message);
        // Continue anyway as we'll reinitialize
      }
      
      // Calculate book dimensions based on container width
      const container = $('.flipbook-container');
      const containerWidth = container.width();
      
      // Base width and height for the book at full size (4:3 aspect ratio)
      const baseWidth = 800;
      const baseHeight = 600;
      
      // Calculate scale factor based on container width
      const scaleFactor = containerWidth / baseWidth;
      
      // Apply scale factor to get actual dimensions
      const scaledWidth = Math.floor(containerWidth);
      const scaledHeight = Math.floor(baseHeight * scaleFactor);
      
      console.log('Initializing Turn.js with dimensions:', {
        containerWidth,
        scaleFactor,
        scaledWidth,
        scaledHeight
      });
      
      // Apply outer size to container for proper positioning
      container.css({
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`
      });
      
      // Initialize Turn.js with calculated dimensions
      turnInstance = flipbook.turn({
        width: scaledWidth,
        height: scaledHeight,
        elevation: 50,
        gradients: true,
        autoCenter: true,
        acceleration: true,
        display: 'double', // Start with double page display by default
        direction: 'ltr',  // Left-to-right page direction
        page: 1, // Set the starting page to 1 (cover) after initialization
        duration: 600, // Slightly slower page turns for better rendering
        inclination: 30, // Angle during page turns
        when: {
          start: function(event, pageObject) {
            // Called at the beginning of page turn
            console.log("Starting page turn to page:", pageObject.next);
          },
          turning: function(event, page, view) {
            // Don't let the user turn past the cover in single display mode
            if (page === 1) {
              $(this).turn('display', 'single');
            } else {
              $(this).turn('display', 'double');
            }
            
            // Fix z-index stacking during page turns
            $(this).find('.page').each(function() {
              const pageClass = $(this).attr('class').match(/p(\d+)/);
              if (pageClass && pageClass[1]) {
                const pageNum = parseInt(pageClass[1], 10);
                // Higher page number = lower z-index
                $(this).css('z-index', 21 - pageNum);
              }
            });
            
            // Update page counter
            setCurrentPage(page);
            console.log('Turning to page:', page, 'View:', view);
          },
          turned: function(event, page, view) {
            // Ensure proper display mode after turning
            if (page === 1) {
              $(this).turn('display', 'single');
            } else {
              $(this).turn('display', 'double');
            }
            
            // After page turn, ensure z-index and positioning is correct
            $(this).find('.page').each(function() {
              const $page = $(this);
              const classes = $page.attr('class') || '';
              
              // Fix transform origin based on odd/even
              if (classes.includes('odd')) {
                $page.css('transform-origin', 'left center');
                $page.css('left', '50%'); // Right side pages
              } else if (classes.includes('even')) {
                $page.css('transform-origin', 'right center');
                $page.css('left', '0'); // Left side pages
              }
              
              // Ensure the page has appropriate positioning
              $page.css({
                'position': 'absolute',
                'top': '0',
                'height': '100%',
                'width': page === 1 ? '100%' : '50%'
              });
            });
            
            // Hide loading message once book is initialized
            const loadingMessage = document.querySelector('.loading-message');
            if (loadingMessage) {
              loadingMessage.style.display = 'none';
            }
            
            // Enable navigation buttons after initialization
            const prevButton = document.querySelector('.prev-button');
            const nextButton = document.querySelector('.next-button');
            if (prevButton) prevButton.disabled = false;
            if (nextButton) nextButton.disabled = false;
            
            console.log('Turned to page:', page, 'View:', view);
          }
        }
      });
      
      // Apply specific styles to the turn.js generated elements to ensure proper positioning
      flipbook.find('.turn-page-wrapper').each(function() {
        const $wrapper = $(this);
        const classes = $wrapper.attr('class') || '';
        
        // Set width and proper transform origin
        $wrapper.css('width', '50%');
        
        if (classes.includes(' odd') || classes.includes('p1 ') || classes.includes('p3 ') || 
            classes.includes('p5 ') || classes.includes('p7 ') || classes.includes('p9 ')) {
          $wrapper.css({
            'left': '50%',
            'transform-origin': 'left center'
          });
        } else {
          $wrapper.css({
            'left': '0',
            'transform-origin': 'right center'
          });
        }
      });
      
      // Force the cover page to display at full width when visible
      flipbook.on('turned', function(event, page) {
        if (page === 1) {
          flipbook.find('.p1').css({
            'width': '100%',
            'left': '0'
          });
        }
      });
      
      // Add resize handler to maintain proper scaling
      const handleResize = () => {
        if (turnInstance) {
          // Get new container width
          const newContainerWidth = container.width();
          
          // Calculate new dimensions
          const newScaleFactor = newContainerWidth / baseWidth;
          const newScaledWidth = Math.floor(newContainerWidth);
          const newScaledHeight = Math.floor(baseHeight * newScaleFactor);
          
          // Apply new dimensions to the container
          container.css({
            width: `${newScaledWidth}px`,
            height: `${newScaledHeight}px`
          });
          
          // Apply new dimensions to the book
          flipbook.turn('size', newScaledWidth, newScaledHeight);
          
          // Fix page positions after resize
          flipbook.find('.page').each(function() {
            const $page = $(this);
            const classes = $page.attr('class') || '';
            
            // Ensure correct width, especially for cover page
            const isOdd = classes.includes('odd');
            const isEven = classes.includes('even');
            const isCover = classes.includes('p1');
            
            $page.css({
              'width': isCover && flipbook.turn('display') === 'single' ? '100%' : '50%',
              'left': isOdd ? '50%' : '0'
            });
          });
        }
      };
      
      // Add window resize event listener
      $(window).on('resize', handleResize);
      
      return true;
    } catch (error) {
      console.error('Error initializing Turn.js:', error);
      return false;
    }
  };

  // Helper to format the current page display
  const getPageLabel = () => {
    // Cover page (page 1) shows as Cover instead of a page number
    if (currentPage === 1) {
      return 'Cover';
    } 
    // For any other page, we show the current spread (e.g., Pages 2-3)
    else {
      // For double page display, we show both visible pages in the spread
      // In Turn.js with our page ordering:
      // - Page 2 is a spread with pages 2-3 (blank + TOC)
      // - Page 4 is a spread with pages 4-5 (blank + Chapter 5)
      // And so on...
      
      // Calculate the actual page numbers in the book (not Turn.js's internal numbers)
      const leftPage = currentPage;
      const rightPage = currentPage + 1;
      
      // If we're at the last page and it's odd, then there's no right page
      if (rightPage > totalPages) {
        return `Page ${leftPage}`;
      }
      
      return `Pages ${leftPage}-${rightPage}`;
    }
  };

  // Set up the book when the component mounts
  useEffect(() => {
    // Only run once
    if (initialized) return;
    
    // Initialize book
    const initializeBook = async () => {
      try {
        // Show loading message
        const loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
          loadingMessage.style.display = 'block';
        }
        
        // Disable navigation buttons until book is ready
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        if (prevButton) prevButton.disabled = true;
        if (nextButton) nextButton.disabled = true;
        
        // Step 1: Try to load Turn.js if needed
        await loadTurnJs();
        
        // Step 2: Render the book HTML
        if (renderBookHTML()) {
          // Step 3: Initialize Turn.js
          if (initializeTurnJs()) {
            setInitialized(true);
            setTotalPages(pages.length);
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
        
        // Hide loading and show error message
        const loadingMessage = document.querySelector('.loading-message');
        if (loadingMessage) {
          loadingMessage.style.display = 'none';
        }
      }
    };
    
    // Give the DOM a moment to be ready
    setTimeout(initializeBook, 500);
    
    // Clean up when component unmounts
    return () => {
      if (window.jQuery && turnInstance) {
        try {
          // Use proper method to destroy Turn.js instance
          const $ = window.jQuery;
          const flipbook = $("#flipbook");
          if (flipbook.data() && typeof flipbook.data().turn !== 'undefined') {
            flipbook.turn("destroy");
            console.log('Turn.js instance destroyed');
            
            // Remove resize event listener
            $(window).off('resize');
            
            // Reset the turnInstance variable
            turnInstance = null;
          }
        } catch (error) {
          console.error('Error destroying Turn.js instance:', error);
        }
      }
    };
  }, [initialized]);

  // Next page function
  const nextPage = () => {
    if (turnInstance && window.jQuery) {
      try {
        window.jQuery(document.getElementById('flipbook')).turn('next');
      } catch (error) {
        console.error('Error turning to next page:', error);
      }
    }
  };

  // Previous page function
  const prevPage = () => {
    if (turnInstance && window.jQuery) {
      try {
        window.jQuery(document.getElementById('flipbook')).turn('previous');
      } catch (error) {
        console.error('Error turning to previous page:', error);
      }
    }
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

  return (
    <div className="book-container">
      {/* Add loading message */}
      <div className="loading-message">Loading book... please wait</div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="book-wrapper">
        <div className="flipbook-container">
          <div id="flipbook"></div>
        </div>
      </div>
      
      <div className="controls">
        <button onClick={prevPage} className="prev-button">Previous</button>
        <div className="page-number">
          {getPageLabel()} {totalPages > 0 ? `of ${totalPages}` : ''}
        </div>
        <button onClick={nextPage} className="next-button">Next</button>
      </div>
      
      {/* Emoji effect container for animations */}
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

export default BookBasic; 