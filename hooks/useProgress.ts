import { useState, useEffect, useCallback } from 'react';
import { Mode, StepStatus, UserProgress, AppSettings } from '../types';

const STORAGE_KEY_PREFIX = 'ppg_manual_progress_v1_';
const SETTINGS_KEY = 'ppg_board_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
  maxDeadlineMestrado: '24 Meses',
  maxDeadlineDoutorado: '48 Meses',
  defenseRules: 'Mínimo de 3 membros na banca de mestrado, 5 no doutorado.',
  proficiencyRules: 'Inglês obrigatório. Segunda língua para doutorado.',
  localNotes: 'Adicione aqui notas específicas da sua universidade...'
};

export const useProgress = (mode: Mode) => {
  const [progress, setProgress] = useState<UserProgress>({
    status: {},
    checklist: {},
    favorites: {},
  });

  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // Load Progress
  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${mode}`);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    } else {
        // Reset to empty if switching modes and nothing found
        setProgress({ status: {}, checklist: {}, favorites: {} });
    }
  }, [mode]);

  // Load Settings
  useEffect(() => {
    const storedSettings = localStorage.getItem(SETTINGS_KEY);
    if (storedSettings) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  // Save Progress Logic
  const saveProgress = useCallback((newProgress: UserProgress) => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${mode}`, JSON.stringify(newProgress));
    setProgress(newProgress);
  }, [mode]);

  // Save Settings Logic
  const saveSettings = useCallback((newSettings: AppSettings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    setSettings(newSettings);
  }, []);

  const toggleStepStatus = (stepId: string) => {
    const current = progress.status[stepId] || 'todo';
    let next: StepStatus = 'todo';
    if (current === 'todo') next = 'doing';
    else if (current === 'doing') next = 'done';
    else next = 'todo';

    const newProgress = {
      ...progress,
      status: { ...progress.status, [stepId]: next }
    };
    saveProgress(newProgress);
  };

  const setChecklist = (itemId: string, checked: boolean) => {
    const newProgress = {
      ...progress,
      checklist: { ...progress.checklist, [itemId]: checked }
    };
    // Auto-update step status to 'doing' if an item is checked and status is 'todo'
    // Find parent step logic would be needed for perfect auto-status, simplified here
    saveProgress(newProgress);
  };

  const toggleFavorite = (stepId: string) => {
    const newProgress = {
      ...progress,
      favorites: { ...progress.favorites, [stepId]: !progress.favorites[stepId] }
    };
    saveProgress(newProgress);
  };

  const resetProgress = () => {
    if (confirm('Tem certeza que deseja apagar todo o progresso deste modo?')) {
        const empty = { status: {}, checklist: {}, favorites: {} };
        saveProgress(empty);
    }
  };

  return {
    progress,
    settings,
    updateSettings: saveSettings,
    toggleStepStatus,
    setChecklist,
    toggleFavorite,
    resetProgress
  };
};
