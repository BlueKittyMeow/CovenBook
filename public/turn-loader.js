/**
 * Turn.js Loader
 * This script attempts to load Turn.js using alternate methods if the main loading fails
 */

(function() {
  // Check if Turn.js is already loaded
  function isTurnJsLoaded() {
    return window.jQuery && window.jQuery.fn && window.jQuery.fn.turn;
  }

  // Try to load Turn.js from different CDNs
  function loadTurnJs() {
    console.log('🔄 Attempting to load Turn.js from alternative sources...');

    // Array of potential Turn.js sources
    const sources = [
      'https://raw.githack.com/blasten/turn.js/master/turn.min.js',
      'https://cdn.jsdelivr.net/gh/blasten/turn.js/turn.min.js',
      'https://unpkg.com/turn.js/turn.min.js'
    ];

    // Function to create and append script tag
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          console.log(`✅ Successfully loaded Turn.js from ${src}`);
          resolve(true);
        };
        script.onerror = () => {
          console.warn(`⚠️ Failed to load Turn.js from ${src}`);
          reject();
        };
        document.head.appendChild(script);
      });
    }

    // Try loading from each source until one succeeds
    async function tryLoadingSources() {
      for (const src of sources) {
        try {
          await loadScript(src);
          return true;
        } catch (e) {
          continue;
        }
      }
      console.error('❌ Failed to load Turn.js from all alternative sources');
      return false;
    }

    // Check if jQuery is available before trying to load Turn.js
    if (!window.jQuery) {
      console.error('❌ jQuery is not available, cannot load Turn.js');
      return Promise.resolve(false);
    }

    return tryLoadingSources();
  }

  // Initialize checking for Turn.js
  function initTurnJsCheck() {
    console.log('🔍 Checking Turn.js availability...');
    
    // Check if Turn.js is already loaded
    if (isTurnJsLoaded()) {
      console.log('✅ Turn.js is already loaded');
      return Promise.resolve(true);
    }
    
    // If not loaded after 2 seconds, try loading it
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isTurnJsLoaded()) {
          console.log('✅ Turn.js loaded successfully after delay');
          resolve(true);
        } else {
          console.warn('⚠️ Turn.js not loaded after delay, trying alternative sources');
          loadTurnJs().then(resolve);
        }
      }, 2000);
    });
  }

  // Make functions available globally
  window.turnJsLoader = {
    check: initTurnJsCheck,
    load: loadTurnJs,
    isLoaded: isTurnJsLoaded
  };
  
  // Auto-run the check when the page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTurnJsCheck);
  } else {
    initTurnJsCheck();
  }
})(); 