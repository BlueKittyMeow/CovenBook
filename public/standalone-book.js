/**
 * Standalone Turn.js Book Implementation
 * This script handles the book initialization independently of React
 */

// Book pages data (hardcoded for simplicity)
const bookPages = [
  // Cover
  `<div class="cover-page">
    <div class="title">Modern Applications of Theoretical Science</div>
    <div class="subtitle">Advanced Physics and Chemistry</div>
    <div class="publisher-info">
      <div>Devil's Den High School District</div>
      <div>2024 Edition</div>
    </div>
  </div>`,

  // Blank page
  `<div class="blank-page"></div>`,

  // Contents
  `<div class="contents-page">
    <h2 class="contents-title">Table of Contents</h2>
    <div class="contents-sections">
      <div class="contents-section">
        <span>Unit 1: Fundamentals of Energy Transfer</span>
        <span>p. 4</span>
      </div>
      <div class="contents-section">
        <span>Unit 2: Subatomic Particle Behavior</span>
        <span>p. 36</span>
      </div>
      <div class="contents-section">
        <span>Unit 3: Advanced Wave Mechanics</span>
        <span>p. 68</span>
      </div>
      <div class="contents-section">
        <span>Unit 4: Theoretical Appli█ations of Ener█y</span>
        <span>p. 110</span>
      </div>
      <div class="contents-section">
        <span>Unit 5: Technomag█c Principles</span>
        <span>p. 144</span>
      </div>
      <div class="contents-section">
        <span>Unit 6: Laboratory Protocols</span>
        <span>p. 200</span>
      </div>
    </div>
  </div>`,

  // Blank page
  `<div class="blank-page"></div>`,

  // Chapter
  `<div class="chapter-page">
    <div class="chapter-number">Chapter 5</div>
    <h2 class="chapter-title">Technomagic Principles</h2>
    <div class="chapter-content">
      This chapter has been removed from the curriculum per school board decision #458-B.
    </div>
    <div class="hidden-content" data-magic-index="chapter">
      <div class="content-placeholder">
        [Touch here if you can see this note]
      </div>
    </div>
  </div>`,

  // Section
  `<div class="section-page">
    <h2 class="section-title">5.2 Symbolic Representation and Manifestation</h2>
    <p class="section-content">
      The use of standardized symbolic language enables consistent results across varied practitioner skill levels. 
      Modern computing devices provide an ideal medium for symbolic transfer.
    </p>
    <div class="section-note">try touching the equations below</div>
    <div class="equation-container">
      <div class="equation" data-magic-index="eq-0">
        E = mc²
      </div>
      <div class="equation" data-magic-index="eq-1">
        F = ma
      </div>
      <div class="equation" data-magic-index="eq-2">
        PV = nRT
      </div>
    </div>
  </div>`,

  // Interactive
  `<div class="interactive-page">
    <h2 class="interactive-title">5.3 Practical Applications: Digital Symbolism</h2>
    <p class="interactive-content">
      Contemporary symbolic language includes digital ideograms ("emojis") which have proven 
      exceptionally effective as conduits for technomagic manifestation.
    </p>
    <p class="interactive-instruction">Touch any emoji to observe manifestation properties:</p>
    <div class="emoji-container">
      <span class="emoji" data-emoji="✨">✨</span>
      <span class="emoji" data-emoji="🔮">🔮</span>
      <span class="emoji" data-emoji="⚡">⚡</span>
      <span class="emoji" data-emoji="🌙">🌙</span>
      <span class="emoji" data-emoji="🌊">🌊</span>
      <span class="emoji" data-emoji="🔥">🔥</span>
    </div>
  </div>`,

  // Notes
  `<div class="notes-page">
    <h2 class="notes-title">Student Notes</h2>
    <div class="handwritten-notes">
      <div class="note" style="transform: rotate(-1deg)">
        tried the emoji thing with Maddie & Kyle yesterday. IT WORKED!!
      </div>
      <div class="note" style="transform: rotate(0deg)">
        apparently complex sequences create stronger effects
      </div>
      <div class="note" style="transform: rotate(1deg)">
        Mr. Peterson totally knows about this stuff - saw him using 🔮🌙 combo after school
      </div>
      <div class="note" style="transform: rotate(-1deg)">
        DO NOT try the fire emoji indoors!!! disaster in the chem lab
      </div>
      <div class="note" style="transform: rotate(0deg)">
        meeting at the den tonight to test more sequences - bring your phone CHARGED
      </div>
    </div>
  </div>`
];

// Magic content for revealing
const magicContent = {
  'chapter': 'Technomagic represents the intersection of modern technology with ancient arcane principles. When properly aligned, electronic signals can be transmuted into physical manifestations through sympathetic resonance.',
  'eq-0': '🔥 = manifestation coefficient × clarity²',
  'eq-1': '💧 = magical amplitude × attunement',
  'eq-2': '🌪️ = natural resonance × technoflow'
};

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // First check if jQuery and Turn.js are available
  if (!window.jQuery || !window.jQuery.fn.turn) {
    console.error('❌ jQuery or Turn.js not available');
    document.getElementById('standalone-error').style.display = 'block';
    return;
  }

  const $ = window.jQuery;
  const flipbook = $('#standalone-flipbook');
  
  // Show the standalone container
  document.getElementById('standalone-container').style.display = 'block';
  document.getElementById('react-container').style.display = 'none';
  
  // Create pages
  bookPages.forEach((content, index) => {
    // Create page div
    const pageDiv = document.createElement('div');
    
    // Add hard class to cover and back pages
    if (index === 0 || index === bookPages.length - 1) {
      pageDiv.className = 'hard';
    }
    
    // Add page content
    pageDiv.innerHTML = content;
    
    // Add to flipbook
    flipbook.append(pageDiv);
  });
  
  // Initialize Turn.js
  try {
    flipbook.turn({
      display: 'double',
      width: 922,
      height: 600,
      elevation: 50,
      gradients: true,
      autoCenter: true,
      acceleration: true,
      when: {
        turning: function(event, page, view) {
          console.log('Turning to page', page);
        },
        turned: function(event, page, view) {
          console.log('Turned to page', page);
        }
      }
    });
    
    // Start on the first page
    flipbook.turn('page', 1);
    
    console.log('✅ Standalone Turn.js initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing standalone Turn.js:', error);
    document.getElementById('standalone-error').style.display = 'block';
    return;
  }
  
  // Add event listeners for interactivity
  
  // Magic content reveal
  document.addEventListener('click', function(event) {
    const magicElement = event.target.closest('[data-magic-index]');
    if (magicElement) {
      const index = magicElement.getAttribute('data-magic-index');
      
      if (magicElement.classList.contains('revealed')) {
        if (index.startsWith('eq-')) {
          magicElement.textContent = index === 'eq-0' ? 'E = mc²' : 
                                     index === 'eq-1' ? 'F = ma' : 
                                     'PV = nRT';
        } else if (index === 'chapter') {
          magicElement.innerHTML = '<div class="content-placeholder">[Touch here if you can see this note]</div>';
        }
        magicElement.classList.remove('revealed');
      } else {
        if (magicContent[index]) {
          if (index.startsWith('eq-')) {
            magicElement.textContent = magicContent[index];
          } else if (index === 'chapter') {
            magicElement.innerHTML = `<div class="magical-content">${magicContent[index]}</div>`;
          }
          magicElement.classList.add('revealed');
        }
      }
    }
  });
  
  // Emoji effects
  document.addEventListener('click', function(event) {
    const emojiElement = event.target.closest('.emoji');
    if (emojiElement) {
      const emoji = emojiElement.getAttribute('data-emoji');
      
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
      document.getElementById('standalone-container').appendChild(effectElement);
      
      // Remove after animation completes
      setTimeout(() => {
        effectElement.remove();
      }, 2000);
    }
  });
  
  // Page turning controls
  document.getElementById('prev-button').addEventListener('click', function() {
    flipbook.turn('previous');
  });
  
  document.getElementById('next-button').addEventListener('click', function() {
    flipbook.turn('next');
  });
}); 