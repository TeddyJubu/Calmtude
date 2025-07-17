
export interface StressReliefTrick {
  id: number;
  name: string;
  emoji: string;
  brief: string;
  actions: string[];
}

export const stressReliefTricks: StressReliefTrick[] = [
  {
    id: 1,
    name: "Sense Check-In",
    emoji: "🌟",
    brief: "Quickly use your senses to ground yourself.",
    actions: [
      "Notice 5 things you see.",
      "Listen for 4 things you hear.",
      "Feel 3 different textures.",
      "Smell 2 distinct scents.",
      "Taste 1 thing (sip water, eat a mint).",
    ],
  },
  {
    id: 2,
    name: "Ice & Spice",
    emoji: "🧊🍋",
    brief: "Snap out of anxiety with intense sensory input.",
    actions: [
      "Hold an ice cube tightly for a moment.",
      "Bite or suck on sour candy or lemon.",
      "Notice the sharp sensations shifting your attention away from anxiety.",
    ],
  },
  {
    id: 3,
    name: "Balloon Breathing",
    emoji: "🎈",
    brief: "Slow breathing to quickly calm your nerves.",
    actions: [
      "Breathe in slowly through your nose (3-4 seconds).",
      "Imagine filling your belly like a balloon.",
      "Slowly exhale through your mouth (4-5 seconds).",
      "Repeat 5-10 times.",
    ],
  },
  {
    id: 4,
    name: "Mindful Wiggle",
    emoji: "🕺",
    brief: "Shake anxiety out through simple movement.",
    actions: [
      "Stand up.",
      "Shake your arms and legs gently for 10 seconds.",
      "Do 10 jumping jacks or dance around for a minute.",
    ],
  },
  {
    id: 5,
    name: "Safe Place Escape",
    emoji: "🏖️",
    brief: "Calm yourself by imagining your favorite safe place.",
    actions: [
      "Close your eyes.",
      "Picture a relaxing, comforting place clearly in your mind.",
      "Imagine all the details: sights, sounds, smells.",
      "Stay there in your mind for 1-2 minutes.",
    ],
  },
  {
    id: 6,
    name: "Rooted Tree",
    emoji: "🌳",
    brief: "Visualize being strong and grounded like a tree.",
    actions: [
      "Stand or sit straight.",
      "Imagine roots growing from your feet deep into the earth.",
      "Feel stable, safe, and secure.",
      "Hold this visual and breathe slowly for 1 minute.",
    ],
  },
  {
    id: 7,
    name: "Anchor Affirmations",
    emoji: "🛟",
    brief: "Calm yourself quickly with reassuring phrases.",
    actions: [
      'Choose or create a comforting phrase like "I am safe now."',
      "Repeat it gently to yourself several times.",
      "Believe the words as you say them.",
    ],
  },
  {
    id: 8,
    name: "Thought Shuffle",
    emoji: "🎲",
    brief: "Quickly distract and calm your busy mind.",
    actions: [
      'Pick a random word (e.g., "STAR").',
      "Think of unrelated objects starting with each letter (S for snake, T for tree, etc.).",
      "Shift your focus fully to each new word or image.",
    ],
  },
  {
    id: 9,
    name: "Fact vs. Fear",
    emoji: "🥽",
    brief: "Replace scary thoughts with calm facts.",
    actions: [
      "Identify the scary thought clearly.",
      "State simple, truthful facts that challenge this thought.",
      "Say the calming fact to yourself clearly and confidently.",
    ],
  },
];
