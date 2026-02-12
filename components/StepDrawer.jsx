import React from 'react';
import { X, CheckCircle, Circle, BookOpen, AlertCircle, ListTodo, Pin, Check } from 'lucide-react';

export const StepDrawer = ({
  step,
  isOpen,
  onClose,
  progress,
  onToggleStatus,
  onToggleChecklist,
  onToggleFavorite
}) => {
  if (!step) return null;

  const status = progress.status[step.id] || 'todo';
  const isFavorite = !!progress.favorites[step.id];

  // Calculate completion percentage based on checklist
  const totalChecks = step.checklist.length;
  const completedChecks = step.checklist.filter(c => progress.checklist[c.id]).length;
  const percent = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes da etapa ${step.title}`}
      >
        {/* Header */}
        <div className="bg-brand-primary text-white p-6 relative flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fechar painel"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-start gap-4 pr-8">
            <div className="bg-white/20 text-white font-bold text-xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">
              {step.order}
            </div>
            <div>
               <h2 className="text-2xl font-bold leading-tight">{step.title}</h2>
               <div className="flex items-center gap-3 mt-2">
                 <button 
                   onClick={() => onToggleFavorite(step.id)}
                   className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${isFavorite ? 'bg-brand-gold text-brand-text' : 'bg-white/20 hover:bg-white/30'}`}
                 >
                   <Pin size={12} className={isFavorite ? "fill-current" : ""} />
                   {isFavorite ? 'Favorita' : 'Favoritar'}
                 </button>
                 <span className="text-xs bg-black/20 px-2 py-1 rounded-md">
                    {status === 'done' ? 'Concluída' : status === 'doing' ? 'Em Andamento' : 'Não Iniciada'}
                 </span>
               </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          
          {/* Description */}
          <div className="prose text-brand-gray">
            <p className="text-lg leading-relaxed">{step.description}</p>
          </div>

          {/* Action Status Button */}
          <div className="flex flex-col gap-2">
            <button
                onClick={() => onToggleStatus(step.id)}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                    status === 'done' 
                    ? 'bg-brand-accent text-white shadow-lg ring-2 ring-brand-accent ring-offset-2' 
                    : status === 'doing'
                    ? 'bg-brand-secondary text-white shadow-md'
                    : 'bg-brand-gray/10 text-brand-gray hover:bg-brand-gray/20'
                }`}
            >
                {status === 'done' && <><CheckCircle size={20} /> Etapa Concluída</>}
                {status === 'doing' && <><AlertCircle size={20} /> Em Andamento</>}
                {status === 'todo' && <><Circle size={20} /> Marcar como Iniciada</>}
            </button>
             <p className="text-center text-xs text-brand-gray">Clique para alternar o status manualmente</p>
          </div>

          {/* What to Do */}
          <section>
            <h3 className="flex items-center gap-2 text-brand-primary font-bold text-lg mb-4">
              <BookOpen size={20} /> O que fazer
            </h3>
            <ul className="space-y-3">
              {step.whatToDo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-brand-primary/10 p-3 rounded-lg border border-brand-primary/20">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                  <span className="text-brand-primary/80">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Checklist */}
          {step.checklist.length > 0 && (
            <section className="bg-brand-gray/5 p-5 rounded-2xl border border-brand-gray/10">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="flex items-center gap-2 text-brand-text font-bold text-lg">
                    <ListTodo size={20} className="text-brand-secondary" /> Checklist
                 </h3>
                 <span className="text-xs font-semibold text-brand-gray bg-white px-2 py-1 rounded border">
                    {percent}% Concluído
                 </span>
              </div>
              
              <div className="space-y-3">
                {step.checklist.map((item) => {
                  const isChecked = !!progress.checklist[item.id];
                  return (
                    <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
                        <input 
                          type="checkbox" 
                          className="peer appearance-none w-5 h-5 border-2 border-brand-gray/30 rounded-md checked:bg-brand-secondary checked:border-brand-secondary transition-colors"
                          checked={isChecked}
                          onChange={(e) => onToggleChecklist(item.id, e.target.checked)}
                        />
                        <Check size={14} className="absolute text-brand-text opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                      <span className={`text-sm transition-all ${isChecked ? 'text-brand-gray line-through' : 'text-brand-text group-hover:text-black'}`}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};
