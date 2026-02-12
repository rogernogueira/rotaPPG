import React from 'react';
import { Check, Star, Play, Flag } from 'lucide-react';

export const BoardNode = ({ step, status, isFavorite, onClick, index, isLast }) => {
  
  const isStart = index === 0;

  const getStatusColor = () => {
    switch (status) {
      case 'done': return 'bg-brand-accent border-brand-accent text-white';
      case 'doing': return 'bg-brand-primary border-brand-primary text-white';
      default: return 'bg-white border-brand-gray/20 text-brand-gray hover:border-brand-primary';
    }
  };

  const getStatusIcon = () => {
    if (status === 'done') return <Check size={28} strokeWidth={3} />;
    if (isStart) return <Play size={28} fill="currentColor" />;
    if (isLast) return <Flag size={28} fill="currentColor" />;
    return <span className="text-2xl font-black font-mono">{step.order}</span>;
  };

  return (
    <div className="relative group flex flex-col items-center z-20 transition-transform duration-300 hover:-translate-y-1">
      {/* 3D Button Token */}
      <button
        onClick={onClick}
        className={`
           relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center 
           border-b-[6px] border-r-[2px] border-l-[2px] border-t-[1px]
           shadow-xl active:shadow-sm active:translate-y-1 transition-all
           ${getStatusColor()}
        `}
        aria-label={`Abrir etapa ${step.order}: ${step.title}`}
      >
        {/* Inner Ring */}
        <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-white/40 pointer-events-none" />
        
        {/* Icon */}
        <div className="z-10 drop-shadow-md">
            {getStatusIcon()}
        </div>

        {/* Favorite Badge (Pin) */}
        {isFavorite && (
          <div className="absolute -top-2 -right-2 bg-brand-gold text-brand-text p-1.5 rounded-full shadow-md border-2 border-white transform rotate-12">
            <Star size={16} fill="currentColor" />
          </div>
        )}

        {/* Status Badge (if doing) */}
        {status === 'doing' && (
            <div className="absolute -bottom-2 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm uppercase tracking-wider">
                Atual
            </div>
        )}
      </button>

      {/* Label Plaque */}
      <div className="mt-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-brand-gray/20 shadow-sm text-center min-w-[140px] max-w-[160px] transform transition-all group-hover:scale-105">
        <h3 className="text-sm font-bold text-brand-text leading-tight">{step.short}</h3>
        {status === 'done' && <span className="text-[10px] font-bold text-brand-accent uppercase">Concluída</span>}
      </div>
    </div>
  );
};
