# CovenBook

Project Scope: Interactive Technomagic Textbook for Sister's Birthday

## Overview

An interactive web-based "Technomagic Textbook" based on the novel "The Coven at Devil's Den." The project simulates a high school textbook with hidden magical content that reveals itself through interaction, focusing on the technomagic concept where emojis manifest physically when sent via digital devices.

## Current Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Build System**: Vite
- **Libraries**:
  - react-pageflip (for realistic page-turning effects)
  - Custom CSS animations and effects
  - React state management for interactive elements

## Implementation Details

This project features a custom-built interactive book component (`ResponsiveBook`) that provides:

- Realistic page-turning with 3D effects
- Responsive design that adapts to different screen sizes
- Interactive elements including hidden content, equations, and emoji effects
- An aged textbook appearance with careful attention to typography and styling

## Key Features

### 1. Book Interface

- Realistic page-turning animations using react-pageflip
- Responsive design that works on desktop and mobile devices
- Aged textbook appearance with "school textbook" styling
- Navigation controls (page turning, table of contents)
- Interactive elements for magical content

### 2. Interactive Elements

- Hidden Content: Censored sections that reveal magical content when interacted with
- Interactive Equations: Formulas that transform when clicked
- Emoji Manifestation: Interactive emoji elements that create visual effects
- Student Notes: Handwritten notes styled to look like student annotations

### 3. Special Effects

- Glowing animations for magical elements
- Floating effects for emoji manifestations
- Smooth transitions between "normal" and "magical" content

## Technical Implementation Details

### Responsive Book Component

The core of the project is the `ResponsiveBook` component which handles:

- Dynamic sizing based on viewport dimensions
- Proper page rendering with correct aspect ratios
- Touch and mouse interactions for page turning
- State management for interactive elements

### CSS Architecture

The project uses a carefully structured CSS architecture with:

- Component-specific styles in `ResponsiveBook.css`
- Responsive breakpoints for different screen sizes
- 3D transforms for page-turning effects
- Flex layouts for content positioning

### Key Technical Challenges Solved

1. **Page Turning Animation**: Implemented smooth, realistic page turning with proper 3D perspective and no diagonal distortion.
2. **Responsive Sizing**: Created a responsive book that maintains proper proportions across different device sizes.
3. **Content Alignment**: Ensured content is properly aligned and centered both horizontally and vertically.
4. **Cover and Back Pages**: Special handling for cover and back pages with proper image rendering.
5. **Interactive Elements**: State management for revealing hidden content and triggering animations.

## Future Enhancements

Potential areas for future development:

- Sound effects for page turns and magical interactions
- Draggable prism element to reveal hidden content
- Advanced emoji combinations that trigger special effects
- Full implementation of all planned book sections

## Development Notes

### Important CSS Classes

- `.responsive-book-container`: Main container for the book component
- `.page-wrapper`: Wrapper for each page
- `.page-content`: Content container for page content
- `.stf__parent`, `.stf__wrapper`, `.stf__block`: Internal react-pageflip classes that have been customized

### Browser Compatibility

- Tested and optimized for modern browsers (Chrome, Firefox, Safari, Edge)
- Uses modern CSS features like flex, CSS variables, and 3D transforms
- May require additional work for older browser support

### Performance Considerations

- Uses CSS transitions instead of JavaScript animations where possible
- Optimized image loading for cover and back pages
- Careful management of reflows and repaints during page turns

---

## Content Structure

The book contains various page types:

1. **Cover & Introduction**: Textbook cover with school district branding
2. **Table of Contents**: With partially redacted entries 
3. **Chapter Pages**: Introducing each main section
4. **Section Pages**: With interactive equations and content
5. **Interactive Pages**: With emoji manifestation functionality
6. **Notes Pages**: Showing handwritten student notes
7. **Back Cover**: Closing the book

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:5173/`

## Building for Production

1. Run `npm run build` to create a production build
2. The built files will be in the `dist` directory
3. Deploy these files to your hosting service of choice