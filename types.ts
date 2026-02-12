export type Mode = 'mestrado' | 'doutorado';
export type StepStatus = 'todo' | 'doing' | 'done';

export interface ChecklistItem {
  id: string;
  text: string;
}

export interface Reference {
  label: string;
  note?: string;
}

export interface Step {
  id: string;
  mode: Mode;
  order: number;
  title: string;
  short: string;
  description: string;
  whatToDo: string[];
  inputs: string[];
  prerequisites: string[];
  deadlines: string[];
  tips?: string[];
  references?: Reference[];
  checklist: ChecklistItem[];
}

export interface UserProgress {
  status: Record<string, StepStatus>; // stepId -> status
  checklist: Record<string, boolean>; // checklistItemId -> checked
  favorites: Record<string, boolean>; // stepId -> isFavorite
  lastActiveStepId?: string;
}

export interface AppSettings {
  maxDeadlineMestrado: string;
  maxDeadlineDoutorado: string;
  defenseRules: string;
  proficiencyRules: string;
  localNotes: string;
}
