import React from 'react';
import { STEPS } from '../data/steps';
import { Printer, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrintView = ({ mode }) => {
  const steps = STEPS.filter(s => s.mode === mode).sort((a, b) => a.order - b.order);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white min-h-screen">
      {/* No Print Header */}
      <div className="no-print bg-brand-gray/10 p-4 border-b flex justify-between items-center sticky top-0 z-10">
        <Link to="/" className="flex items-center gap-2 text-brand-primary font-semibold hover:underline">
            <ArrowLeft size={20} /> Voltar ao Tabuleiro
        </Link>
        <div className="flex gap-4 items-center">
             <span className="text-brand-gray font-medium uppercase tracking-wider">{mode}</span>
             <button 
                onClick={handlePrint}
                className="bg-brand-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-primary/90"
            >
                <Printer size={18} /> Imprimir / Salvar PDF
            </button>
        </div>
      </div>

      {/* Printable Content */}
      <div className="max-w-4xl mx-auto p-8 print:p-0">
        <div className="text-center mb-12 border-b pb-8">
            <h1 className="text-4xl font-bold text-brand-text mb-2 uppercase">Manual do {mode}</h1>
            <p className="text-brand-gray">Guia passo a passo para conclusão do curso</p>
        </div>

        <div className="space-y-8">
            {steps.map(step => (
                <div key={step.id} className="border-l-4 border-brand-primary pl-6 py-2 break-inside-avoid">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm print:border print:border-brand-gray/50 print:text-black">
                            {step.order}
                        </span>
                        <h2 className="text-2xl font-bold text-brand-text">{step.title}</h2>
                    </div>
                    
                    <p className="text-brand-text mb-4 text-justify">{step.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
                        <div className="bg-brand-gray/5 p-4 rounded-lg print:border print:bg-white">
                            <h3 className="font-bold text-sm uppercase text-brand-gray mb-2">O que fazer</h3>
                            <ul className="list-disc ml-4 space-y-1 text-sm text-brand-text">
                                {step.whatToDo.map((todo, i) => <li key={i}>{todo}</li>)}
                            </ul>
                        </div>
                        <div className="bg-brand-gray/5 p-4 rounded-lg print:border print:bg-white">
                             <h3 className="font-bold text-sm uppercase text-brand-gray mb-2">Prazos & Entradas</h3>
                             <p className="text-sm mb-2"><span className="font-semibold">Prazo:</span> {step.deadlines.join(', ')}</p>
                             <div className="text-sm">
                                <span className="font-semibold">Entregar:</span>
                                <ul className="list-disc ml-4 mt-1">
                                    {step.inputs.map((inp, i) => <li key={i}>{inp}</li>)}
                                </ul>
                             </div>
                        </div>
                    </div>
                    
                    {step.checklist.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-bold text-sm uppercase text-brand-gray mb-2">Checklist</h3>
                            <div className="flex flex-wrap gap-4">
                                {step.checklist.map(c => (
                                    <div key={c.id} className="flex items-center gap-2 text-sm text-brand-text">
                                        <div className="w-4 h-4 border border-brand-gray/50 rounded"></div>
                                        {c.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
        
        <div className="mt-16 text-center text-xs text-brand-gray border-t pt-4">
            Gerado via Manual Interativo PPG
        </div>
      </div>
    </div>
  );
};
