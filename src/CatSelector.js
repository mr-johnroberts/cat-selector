import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

const CatSelector = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [spinProgress, setSpinProgress] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  const catBreeds = [
    "Persian",
    "Siamese",
    "Ragdoll",
    "Sphynx",
    "Bengal",
    "Maine Coon",
    "British Shorthair",
    "Russian Blue",
    "Siberian",
    "Abyssinian"
  ];

  // Define exact colors for each breed
  const breedColors = {
    "Persian": { 
      bg: "rgb(255, 200, 200)", 
      text: "rgb(220, 50, 50)" 
    },
    "Siamese": { 
      bg: "rgb(255, 230, 200)", 
      text: "rgb(220, 100, 0)" 
    },
    "Ragdoll": { 
      bg: "rgb(255, 255, 200)", 
      text: "rgb(180, 150, 0)" 
    },
    "Sphynx": { 
      bg: "rgb(200, 255, 200)", 
      text: "rgb(0, 150, 50)" 
    },
    "Bengal": { 
      bg: "rgb(200, 255, 230)", 
      text: "rgb(0, 150, 100)" 
    },
    "Maine Coon": { 
      bg: "rgb(200, 230, 255)", 
      text: "rgb(50, 100, 220)" 
    },
    "British Shorthair": { 
      bg: "rgb(220, 220, 255)", 
      text: "rgb(80, 80, 220)" 
    },
    "Russian Blue": { 
      bg: "rgb(230, 200, 255)", 
      text: "rgb(120, 50, 220)" 
    },
    "Siberian": { 
      bg: "rgb(255, 200, 255)", 
      text: "rgb(200, 50, 200)" 
    },
    "Abyssinian": { 
      bg: "rgb(255, 180, 180)", 
      text: "rgb(220, 50, 100)" 
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinProgress(0);
    
    const duration = 3000;
    const resetDelay = 10000;
    const resetDuration = 1500;
    const randomRotation = 1800 + (Math.random() * 360);

    const wheel = document.getElementById('cat-wheel');
    if (wheel) {
      wheel.style.transition = `transform ${duration}ms cubic-bezier(0.4, 2, 0.2, 1)`;
      wheel.style.transform = `rotate(${randomRotation}deg)`;

      // Show resetting message before reset animation
      setTimeout(() => {
        setIsResetting(true);
        wheel.style.transition = `transform ${resetDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        wheel.style.transform = 'rotate(0deg)';
        setSelectedBreed(null);
        
        // Hide resetting message after reset completes
        setTimeout(() => {
          setIsResetting(false);
        }, resetDuration);
      }, resetDelay);
    }

    const interval = setInterval(() => {
      setSpinProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / duration) * 50;
      });
    }, 50);

    setTimeout(() => {
      const finalAngle = (360 - (randomRotation % 360)) % 360;
      const sliceSize = 360 / catBreeds.length;
      const selectedIndex = Math.floor(finalAngle / sliceSize);
      setSelectedBreed(catBreeds[selectedIndex]);
      setIsSpinning(false);
      setSpinProgress(0);
    }, duration);
  };

  const getConicGradient = () => {
    const sectionAngle = 360 / catBreeds.length;
    const gradientStops = catBreeds.map((breed, index) => {
      const startAngle = index * sectionAngle;
      const endAngle = startAngle + sectionAngle;
      return `${breedColors[breed].bg} ${startAngle}deg ${endAngle}deg`;
    });
    return `conic-gradient(${gradientStops.join(', ')})`;
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-8">Cat Selector</h1>
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto">
        {catBreeds.map((breed) => (
          <div 
            key={breed}
            className="flex items-center gap-2 p-2"
          >
            <div 
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: breedColors[breed].bg }}
            />
            <span 
              className="text-sm font-medium"
              style={{ color: breedColors[breed].text }}
            >
              {breed}
            </span>
          </div>
        ))}
      </div>

      <div className="relative w-[400px] h-[400px] mx-auto">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 z-10">
          <div className="w-4 h-8 bg-primary shadow-md transform rotate-180"
               style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
        </div>

        {/* Wheel */}
        <div
          id="cat-wheel"
          className="w-full h-full rounded-full relative border-4 border-primary/30 shadow-lg overflow-hidden"
          style={{ 
            background: getConicGradient(),
          }}
        >
          {/* White dividing lines */}
          {catBreeds.map((_, index) => {
            const angle = (360 / catBreeds.length) * index;
            return (
              <div
                key={`line-${index}`}
                className="absolute top-1/2 left-1/2 w-[1px] h-[50%] bg-white/50"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'top',
                }}
              />
            );
          })}
          
          {/* Center decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center border-2 border-white">
              <div className="w-8 h-8 bg-white rounded-full shadow-inner" />
            </div>
          </div>
        </div>

        {/* Spin button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="absolute bottom-[-90px] left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center border-2 border-white"
        >
          <RotateCcw className="w-8 h-8 text-white" />
        </button>
      </div>

      {selectedBreed && !isResetting && (
        <div className="text-center mt-28 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2 text-primary/80">Selected Breed:</h3>
          <p 
            className="text-2xl font-medium"
            style={{ color: breedColors[selectedBreed].text }}
          >
            {selectedBreed}
          </p>
        </div>
      )}

      {isResetting && (
        <div className="text-center mt-28 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl backdrop-blur-sm animate-pulse">
          <p className="text-xl font-medium text-primary">
            Resetting wheel...
          </p>
        </div>
      )}
    </div>
  );
};

export default CatSelector;