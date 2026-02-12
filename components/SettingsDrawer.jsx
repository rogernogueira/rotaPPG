import React, { useState } from 'react';
import { X, Save, Settings } from 'lucide-react';

export const SettingsDrawer = ({ isOpen, onClose, settings, onSave }) => {
  const [formData, setFormData] = useState(settings);

  // Sync when opening
  React.useEffect(() => {
    if(isOpen) setFormData(settings);
  }, [isOpen, settings]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed inset-y-0 left-0 w-full md:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2 text-brand-text">
            <Settings size={20} /> Configurações
          </h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-140px)]">
            <div>
                <label className="block text-sm font-semibold text-brand-gray mb-2">Prazo Máximo (Mestrado)</label>
                <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg"
                    value={formData.maxDeadlineMestrado}
                    onChange={e => handleChange('maxDeadlineMestrado', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-brand-gray mb-2">Prazo Máximo (Doutorado)</label>
                <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg"
                    value={formData.maxDeadlineDoutorado}
                    onChange={e => handleChange('maxDeadlineDoutorado', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-brand-gray mb-2">Regras de Banca/Defesa</label>
                <textarea 
                    className="w-full p-2 border rounded-lg h-24 text-sm"
                    value={formData.defenseRules}
                    onChange={e => handleChange('defenseRules', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-brand-gray mb-2">Regras de Proficiência</label>
                <textarea 
                    className="w-full p-2 border rounded-lg h-24 text-sm"
                    value={formData.proficiencyRules}
                    onChange={e => handleChange('proficiencyRules', e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-brand-gray mb-2">Observações Locais</label>
                <textarea 
                    className="w-full p-2 border rounded-lg h-24 text-sm"
                    value={formData.localNotes}
                    onChange={e => handleChange('localNotes', e.target.value)}
                    placeholder="Ex: Secretaria funciona apenas terças e quintas..."
                />
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t bg-stone-50">
            <button 
                onClick={handleSave}
                className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition"
            >
                <Save size={18} /> Salvar Alterações
            </button>
        </div>
      </div>
    </>
  );
};
