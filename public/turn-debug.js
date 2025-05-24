/**
 * Turn.js Debug Helper
 * This script helps detect and debug Turn.js initialization issues.
 */
window.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 Turn.js Debug Helper loaded');
  
  // Check if jQuery is loaded
  if (window.jQuery) {
    console.log('✅ jQuery detected: version', jQuery.fn.jquery);
    
    // Check if Turn.js is loaded
    if (jQuery.fn.turn) {
      console.log('✅ Turn.js detected and loaded correctly');
    } else {
      console.error('❌ Turn.js not detected. jQuery is loaded, but Turn.js plugin is missing');
    }
  } else {
    console.error('❌ jQuery not detected. Turn.js requires jQuery to function');
  }
  
  // Monitor for dynamic flipbook creation
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        for (let i = 0; i < mutation.addedNodes.length; i++) {
          const node = mutation.addedNodes[i];
          if (node.id === 'flipbook') {
            console.log('🔄 #flipbook element detected in the DOM');
            
            // Check if it has turn.js initialized
            setTimeout(() => {
              if (window.jQuery && jQuery.fn.turn) {
                try {
                  const flipbook = jQuery('#flipbook');
                  const data = flipbook.data();
                  if (data && data.turn) {
                    console.log('✅ Turn.js successfully initialized on #flipbook');
                  } else {
                    console.warn('⚠️ #flipbook is in the DOM but Turn.js is not initialized on it');
                  }
                } catch (e) {
                  console.error('❌ Error checking Turn.js initialization:', e);
                }
              }
            }, 1000);
          }
        }
      }
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}); 