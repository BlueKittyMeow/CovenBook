import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

const TechnomagicTextbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showMagic, setShowMagic] = useState({});
  const [emojiEffects, setEmojiEffects] = useState([]);

  // Book content
  const pages = [
    {
      type: 'cover',
      title: 'Modern Applications of Theoretical Science',
      subtitle: 'Advanced Physics and Chemistry',
      publisher: 'Devil\'s Den High School District',
      year: '2024 Edition'
    },
    {
      type: 'contents',
      title: 'Table of Contents',
      sections: [
        { name: 'Unit 1: Fundamentals of Energy Transfer', page: 2 },
        { name: 'Unit 2: Subatomic Particle Behavior', page: 34 },
        { name: 'Unit 3: Advanced Wave Mechanics', page: 67 },
        { name: 'Unit 4: Theoretical Appli█ations of Ener█y', page: 108 },
        { name: 'Unit 5: Technomag█c Principles', page: 142 },
        { name: 'Unit 6: Laboratory Protocols', page: 198 }
      ]
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

  // Handle page turning
  const turnPage = (direction) => {
    const newPage = currentPage + direction;
    if (newPage >= 0 && newPage < pages.length) {
      setCurrentPage(newPage);
      setShowMagic({});
    }
  };

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

  // Render current page content
  const renderPage = (page) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-8 text-xl font-bold">{page.title}</div>
            <div className="mb-12 text-lg">{page.subtitle}</div>
            <div className="mt-24 text-sm">
              <div>{page.publisher}</div>
              <div className="mt-2">{page.year}</div>
            </div>
          </div>
        );
      
      case 'contents':
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-6 text-center">{page.title}</h2>
            <div className="space-y-3">
              {page.sections.map((section, idx) => (
                <div key={idx} className="flex justify-between border-b border-gray-200 pb-1">
                  <span>{section.name}</span>
                  <span>p. {section.page}</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'chapter':
        return (
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">Chapter {page.number}</div>
            <h2 className="text-xl font-bold mb-4">{page.title}</h2>
            <div className="text-red-600 uppercase text-sm font-bold mb-6">
              {page.content}
            </div>
            {page.hasHiddenContent && (
              <div 
                className={`mt-8 p-3 border ${showMagic['chapter'] ? 'border-purple-400 bg-purple-50' : 'border-gray-200'} rounded`}
                onClick={() => revealMagic('chapter')}
              >
                {showMagic['chapter'] ? (
                  <div className="text-purple-800 font-medium italic">
                    "{page.hiddenContent}"
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">
                    [Touch here if you can see this note]
                  </div>
                )}
              </div>
            )}
          </div>
        );
      
      case 'section':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">{page.title}</h2>
            <p className="mb-6">{page.content}</p>
            <div className="text-sm text-purple-600 italic mb-2">{page.note}</div>
            <div className="space-y-4 mt-4">
              {page.equations.map((eq, idx) => (
                <div 
                  key={idx} 
                  className={`p-2 text-center cursor-pointer transition-all duration-300 ${showMagic[`eq-${idx}`] ? 'bg-purple-50 text-purple-700' : 'bg-gray-50'}`}
                  onClick={() => revealMagic(`eq-${idx}`)}
                >
                  {showMagic[`eq-${idx}`] ? eq.hidden : eq.visible}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'interactive':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">{page.title}</h2>
            <p className="mb-6">{page.content}</p>
            <p className="text-sm font-medium mb-4">{page.instruction}</p>
            <div className="flex justify-center space-x-6 text-3xl">
              {page.emojis.map((emoji, idx) => (
                <span 
                  key={idx} 
                  className="cursor-pointer hover:scale-125 transition-transform duration-200"
                  onClick={() => triggerEmojiEffect(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        );
      
      case 'notes':
        return (
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">{page.title}</h2>
            <div className="space-y-4 font-handwriting">
              {page.handwritten.map((note, idx) => (
                <div key={idx} className="p-2 bg-yellow-50 rotate-1 shadow-sm text-gray-800" style={{
                  fontFamily: 'cursive',
                  transform: `rotate(${(idx % 3) - 1}deg)`
                }}>
                  {note}
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return <div>Page content not available</div>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      {/* Emoji effects layer (positioned absolutely) */}
      {emojiEffects.map(effect => (
        <div 
          key={effect.id}
          className="absolute text-4xl animate-float"
          style={{
            left: `${effect.left}%`,
            top: `${effect.top}%`,
            transform: `rotate(${effect.rotation}deg) scale(${effect.scale})`,
            animation: 'float 2s ease-out forwards'
          }}
        >
          {effect.emoji}
        </div>
      ))}
      
      {/* Book container */}
      <div className="relative w-full aspect-[4/3] bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden">
        {/* Page content */}
        <div className="absolute inset-0 p-6 bg-slate-50">
          {renderPage(pages[currentPage])}
        </div>
        
        {/* Page navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-8">
          <button 
            onClick={() => turnPage(-1)} 
            disabled={currentPage === 0}
            className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <BookOpen size={16} className="mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{currentPage + 1} / {pages.length}</span>
          </div>
          <button 
            onClick={() => turnPage(1)} 
            disabled={currentPage === pages.length - 1}
            className={`p-2 rounded-full ${currentPage === pages.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-6 text-sm text-gray-500 text-center max-w-md">
        Navigate through the textbook using the arrows. Touch highlighted elements to reveal hidden magical content. Click emojis to see them manifest!
      </div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0% { opacity: 0; transform: translateY(0) rotate(0) scale(0.5); }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100px) rotate(10deg) scale(1.5); }
        }
        .animate-float {
          animation: float 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TechnomagicTextbook;