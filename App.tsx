import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GraduationCap, Search, Settings as SettingsIcon, RotateCcw, FileText, Filter } from 'lucide-react';

import { STEPS } from './data/steps';
import { Mode } from './types';
import { useProgress } from './hooks/useProgress';

import { Board } from './components/Board';
import { StepDrawer } from './components/StepDrawer';
import { SettingsDrawer } from './components/SettingsDrawer';
import { PrintView } from './components/PrintView';

// Helper to get query params for mode logic in simpler router setup
const MainApp = () => {
  const [mode, setMode] = useState<Mode>('mestrado');
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'doing' | 'done' | 'favorite'>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { 
    progress, 
    settings, 
    updateSettings, 
    toggleStepStatus, 
    setChecklist, 
    toggleFavorite, 
    resetProgress 
  } = useProgress(mode);

  const steps = useMemo(() => {
    return STEPS.filter(step => step.mode === mode).sort((a, b) => a.order - b.order);
  }, [mode]);

  const filteredSteps = useMemo(() => {
    return steps.filter(step => {
      // Search
      const matchesSearch = step.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            step.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter
      const status = progress.status[step.id] || 'todo';
      const isFav = !!progress.favorites[step.id];
      
      let matchesFilter = true;
      if (filter === 'done') matchesFilter = status === 'done';
      if (filter === 'doing') matchesFilter = status === 'doing';
      if (filter === 'pending') matchesFilter = status === 'todo';
      if (filter === 'favorite') matchesFilter = isFav;

      return matchesSearch && matchesFilter;
    });
  }, [steps, searchQuery, filter, progress]);

  const selectedStep = useMemo(() => 
    steps.find(s => s.id === selectedStepId) || null, 
  [selectedStepId, steps]);

  // Calculations for progress bar
  const totalSteps = steps.length;
  const completedSteps = steps.filter(s => progress.status[s.id] === 'done').length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-gray-800 font-sans">
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Logo & Mode Switcher */}
            <div className="flex items-center gap-4">
               <div className="bg-brand-primary text-white p-2 rounded-lg shadow-sm">
                 <GraduationCap size={28} />
               </div>
               <div>
                 <h1 className="font-bold text-lg leading-none text-brand-primary">Manual PPG</h1>
                 <div className="flex gap-2 text-xs mt-1">
                    <button 
                      onClick={() => setMode('mestrado')}
                      className={`px-3 py-1 rounded-full transition-colors ${mode === 'mestrado' ? 'bg-brand-secondary text-white font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      Mestrado
                    </button>
                    <button 
                      onClick={() => setMode('doutorado')}
                      className={`px-3 py-1 rounded-full transition-colors ${mode === 'doutorado' ? 'bg-brand-secondary text-white font-bold shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      Doutorado
                    </button>
                 </div>
               </div>
            </div>

            {/* Controls */}
            <div className="flex flex-1 md:justify-end items-center gap-2 md:gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              {/* Search */}
              <div className="relative group min-w-[160px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar etapas..." 
                  className="pl-9 pr-3 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary w-full border border-transparent focus:border-white focus:bg-white transition-all shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter */}
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="bg-white border border-gray-200 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-sm"
              >
                <option value="all">Todas</option>
                <option value="pending">Pendentes</option>
                <option value="doing">Em andamento</option>
                <option value="done">Concluídas</option>
                <option value="favorite">Favoritas</option>
              </select>

              <div className="h-6 w-px bg-gray-200 mx-1 hidden md:block"></div>

              {/* Actions */}
              <Link 
                to="/print" 
                state={{ mode }}
                className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-100 rounded-lg transition-colors"
                title="Versão para Impressão"
              >
                <FileText size={20} />
              </Link>
              
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-gray-500 hover:text-brand-primary hover:bg-gray-100 rounded-lg transition-colors"
                title="Configurações"
              >
                <SettingsIcon size={20} />
              </button>

               <button 
                onClick={resetProgress}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Resetar Progresso"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 w-full relative z-40">
            <div 
                className="h-full bg-brand-accent transition-all duration-500 shadow-[0_0_10px_rgba(156,185,148,0.5)]" 
                style={{ width: `${progressPercent}%` }}
            ></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
         <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight mb-2">
                Trilha do {mode === 'mestrado' ? 'Mestrado' : 'Doutorado'}
            </h2>
            <p className="text-gray-500 font-medium">
                {completedSteps} de {totalSteps} etapas concluídas ({Math.round(progressPercent)}%)
            </p>
         </div>

         {/* Board or List */}
         {filter === 'all' && !searchQuery ? (
             <Board 
                steps={steps} 
                progress={progress}
                onStepClick={(step) => setSelectedStepId(step.id)}
             />
         ) : (
             // Filtered List View
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {filteredSteps.length > 0 ? (
                    filteredSteps.map(step => (
                         <button 
                            key={step.id}
                            onClick={() => setSelectedStepId(step.id)}
                            className="bg-white p-6 rounded-xl shadow-sm border hover:border-brand-primary hover:shadow-md transition-all text-left flex flex-col h-full group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-brand-primary/10 text-brand-primary font-bold px-2 py-1 rounded text-xs group-hover:bg-brand-primary group-hover:text-white transition-colors">Etapa {step.order}</span>
                                {progress.status[step.id] === 'done' && <span className="text-brand-accent text-xs font-bold">Concluída</span>}
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{step.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2">{step.description}</p>
                        </button>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        Nenhuma etapa encontrada com os filtros atuais.
                    </div>
                )}
             </div>
         )}
      </main>

      {/* Drawers */}
      <StepDrawer 
        step={selectedStep}
        isOpen={!!selectedStep}
        onClose={() => setSelectedStepId(null)}
        progress={progress}
        onToggleStatus={toggleStepStatus}
        onToggleChecklist={setChecklist}
        onToggleFavorite={toggleFavorite}
      />

      <SettingsDrawer 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={updateSettings}
      />
    </div>
  );
};

// Router Wrapper
const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/print" element={<PrintWrapper />} />
        </Routes>
    </Router>
  );
};

// Wrapper for print view to access location state
const PrintWrapper = () => {
    const location = useLocation();
    const mode = location.state?.mode || 'mestrado';
    return <PrintView mode={mode} />;
}

export default App;
