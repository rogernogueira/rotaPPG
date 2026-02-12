import React from 'react';
import { X, CheckCircle, Circle, BookOpen, AlertCircle, FileText, Calendar, ListTodo, Pin, Check } from 'lucide-react';
import { Step, StepStatus, UserProgress } from '../types';

interface StepDrawerProps {
  step: Step | null;
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onToggleStatus: (id: string) => void;
  onToggleChecklist: (itemId: string, checked: boolean) => void;
  onToggleFavorite: (id: string) => void;
}

export const StepDrawer: React.FC<StepDrawerProps> = ({
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
                   className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${isFavorite ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 hover:bg-white/30'}`}
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
          <div className="prose text-gray-600">
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
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                {status === 'done' && <><CheckCircle size={20} /> Etapa Concluída</>}
                {status === 'doing' && <><AlertCircle size={20} /> Em Andamento</>}
                {status === 'todo' && <><Circle size={20} /> Marcar como Iniciada</>}
            </button>
             <p className="text-center text-xs text-gray-400">Clique para alternar o status manualmente</p>
          </div>

          {/* What to Do */}
          <section>
            <h3 className="flex items-center gap-2 text-brand-primary font-bold text-lg mb-4">
              <BookOpen size={20} /> O que fazer
            </h3>
            <ul className="space-y-3">
              {step.whatToDo.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Checklist */}
          {step.checklist.length > 0 && (
            <section className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="flex items-center gap-2 text-gray-800 font-bold text-lg">
                    <ListTodo size={20} className="text-brand-secondary" /> Checklist
                 </h3>
                 <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded border">
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
                          className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-brand-secondary checked:border-brand-secondary transition-colors"
                          checked={isChecked}
                          onChange={(e) => onToggleChecklist(item.id, e.target.checked)}
                        />
                        <Check size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                      </div>
                      <span className={`text-sm transition-all ${isChecked ? 'text-gray-400 line-through' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          )}

          {/* Inputs & Deadlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
                <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm uppercase tracking-wide">
                    <FileText size={16} /> Entradas Necessárias
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    {step.inputs.map((inp, i) => <li key={i}>• {inp}</li>)}
                </ul>
            </section>

             <section>
                <h3 className="flex items-center gap-2 text-gray-800 font-bold mb-3 text-sm uppercase tracking-wide">
                    <Calendar size={16} /> Prazos Típicos
                </h3>
                <ul className="text-sm text-brand-secondary font-medium space-y-1">
                    {step.deadlines.map((dl, i) => <li key={i}>• {dl}</li>)}
                </ul>
            </section>
          </div>

           {/* Prerequisites */}
           {step.prerequisites.length > 0 && (
             <section className="border-t pt-4">
               <span className="text-xs font-bold text-gray-400 uppercase">Pré-requisitos:</span>
               <div className="flex flex-wrap gap-2 mt-2">
                 {step.prerequisites.map((pre, i) => (
                   <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">
                     {pre}
                   </span>
                 ))}
               </div>
             </section>
           )}

        </div>
      </div>
    </>
  );
};
