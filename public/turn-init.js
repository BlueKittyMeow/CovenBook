/**
 * Turn.js Direct Initialization Script
 * This provides a backup method to initialize Turn.js
 */

window.initTurnJS = function(elementId, options) {
  console.log('📚 Direct Turn.js initialization requested for', elementId);
  
  if (!window.jQuery) {
    console.error('❌ jQuery not available for direct Turn.js initialization');
    return false;
  }
  
  if (!window.jQuery.fn.turn) {
    console.error('❌ Turn.js plugin not available for direct initialization');
    return false;
  }
  
  try {
    const element = window.jQuery('#' + elementId);
    if (!element.length) {
      console.error('❌ Element #' + elementId + ' not found in DOM');
      return false;
    }
    
    // Check if already initialized
    const data = element.data();
    if (data && data.turn) {
      console.warn('⚠️ Turn.js already initialized on #' + elementId);
      return true;
    }
    
    // Initialize with provided options
    element.turn(options || {});
    console.log('✅ Direct Turn.js initialization successful for #' + elementId);
    return true;
  } catch (error) {
    console.error('❌ Error during direct Turn.js initialization:', error);
    return false;
  }
};

// Function to check if an element exists in the DOM
window.checkElementExists = function(selector) {
  return !!document.querySelector(selector);
};

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
  console.log('📚 Turn.js direct initialization helper loaded');
}); 