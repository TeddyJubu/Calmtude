
export type BreathingStep = {
  label: 'Inhale' | 'Hold' | 'Exhale';
  duration: number; // in seconds
};

export type BreathingPattern = {
  id: string;
  name: string;
  description: string;
  steps: BreathingStep[];
};

export const breathingPatterns: BreathingPattern[] = [
  {
    id: 'equal-breath',
    name: 'Equal Breathing',
    description: 'Balance your breath, balance your mind.',
    steps: [
      { label: 'Inhale', duration: 4 },
      { label: 'Exhale', duration: 4 },
    ],
  },
  {
    id: '4-7-8-breath',
    name: '4-7-8 Breath',
    description: 'A calming breath for relaxation and sleep.',
    steps: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 7 },
      { label: 'Exhale', duration: 8 },
    ],
  },
  {
    id: 'box-breath',
    name: 'Box Breathing',
    description: 'Inhale for 4, hold for 4, exhale for 4, hold for 4.',
    steps: [
      { label: 'Inhale', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Exhale', duration: 4 },
      { label: 'Hold', duration: 4 },
    ],
  },
  {
    id: 'athletic-breath',
    name: 'Athletic Breath',
    description: 'For focus and performance.',
    steps: [
        { label: 'Inhale', duration: 2 },
        { label: 'Exhale', duration: 3 },
    ],
  },
  {
    id: 'energy-breath',
    name: 'Energy Breath',
    description: 'A quick boost of energy.',
    steps: [
        { label: 'Inhale', duration: 3 },
        { label: 'Exhale', duration: 1.5 },
    ],
  },
  {
    id: 'pursed-lip-breath',
    name: 'Pursed Lip Breathing',
    description: 'Helps control shortness of breath.',
    steps: [
        { label: 'Inhale', duration: 2 },
        { label: 'Exhale', duration: 4 },
    ],
  },
];
