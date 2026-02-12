import React from 'react';
import { BoardNode } from './BoardNode';

export const Board = ({ steps, progress, onStepClick }) => {
  
  const getPathDirection = (index) => {
    if (index >= steps.length - 1) return null;

    const row = Math.floor(index / 4);
    const nextRow = Math.floor((index + 1) / 4);
    const isEvenRow = row % 2 === 0;

    if (row === nextRow) {
      return isEvenRow ? 'right' : 'left';
    } else {
      return 'down';
    }
  };

  // Road Component
  const Road = ({ className, vertical = false }) => (
    <div className={`absolute bg-stone-200 border-stone-300 shadow-inner z-0 ${className} ${vertical ? 'border-x-4' : 'border-y-4'}`}>
        <div className={`absolute inset-0 flex items-center justify-center opacity-40`}>
            <div className={`border-stone-400 border-dashed ${vertical ? 'h-full border-l-2' : 'w-full border-t-2'}`} />
        </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      
      {/* Board Container */}
      <div className="bg-[#f8f5f2] rounded-[3rem] p-8 md:p-16 shadow-2xl border-8 border-[#e6e0d4] relative overflow-hidden">
        
        {/* Background Pattern (Subtle Dots) */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
        />
        
        {/* Start/Finish Labels overlay on board background */}
        <div className="absolute top-6 left-8 text-[#d6d0c4] font-black text-6xl uppercase opacity-20 select-none">
            Início
        </div>

        {/* Mobile Layout: Vertical Road */}
        <div className="md:hidden flex flex-col items-center relative space-y-16">
          {/* Continuous Road Background */}
          <Road className="top-8 bottom-8 left-1/2 w-16 -ml-8 rounded-full" vertical />

          {steps.map((step, index) => (
            <div key={step.id} className="relative z-10 w-full flex justify-center">
               <BoardNode 
                  step={step} 
                  index={index}
                  isLast={index === steps.length - 1} 
                  status={progress.status[step.id] || 'todo'}
                  isFavorite={!!progress.favorites[step.id]}
                  onClick={() => onStepClick(step)}
               />
            </div>
          ))}
        </div>

        {/* Desktop Layout: Zig Zag Grid */}
        <div className="hidden md:grid grid-cols-4 gap-y-28 gap-x-12 relative py-8">
          {steps.map((step, index) => {
            const row = Math.floor(index / 4);
            const isEvenRow = row % 2 === 0;
            
            // Zig Zag Logic
            let colIndex = index % 4;
            if (!isEvenRow) {
              colIndex = 3 - (index % 4);
            }

            const gridStyle = {
               gridColumnStart: colIndex + 1,
               gridRowStart: row + 1
            };

            const direction = getPathDirection(index);

            return (
              <div key={step.id} style={gridStyle} className="relative flex justify-center items-center">
                 
                 {/* Horizontal Road (Right) */}
                 {direction === 'right' && (
                   <Road className="top-1/2 left-1/2 w-[calc(100%+4rem)] h-16 -translate-y-1/2 origin-left -z-10" />
                 )}

                 {/* Horizontal Road (Left) */}
                 {direction === 'left' && (
                   <Road className="top-1/2 right-1/2 w-[calc(100%+4rem)] h-16 -translate-y-1/2 origin-right -z-10" />
                 )}

                 {/* Vertical Turn (Down) */}
                 {direction === 'down' && (
                   <Road className="top-1/2 left-1/2 h-[calc(100%+8rem)] w-16 -translate-x-1/2 origin-top -z-10" vertical />
                 )}

                 {/* Node */}
                 <BoardNode 
                    step={step} 
                    index={index} 
                    isLast={index === steps.length - 1}
                    status={progress.status[step.id] || 'todo'}
                    isFavorite={!!progress.favorites[step.id]}
                    onClick={() => onStepClick(step)}
                 />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
