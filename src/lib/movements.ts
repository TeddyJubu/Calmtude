
export interface Movement {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
}

export const movements: Movement[] = [
  {
    id: "walk",
    title: "Mindful Walk",
    description: "Walk around your space, paying attention to the sensation of your feet on the ground. Notice the movement in your legs and body.",
    duration: 180, // 3 minutes
  },
  {
    id: "jumping-jacks",
    title: "10 Jumping Jacks",
    description: "A quick burst of energy to shift your focus. Do 10 jumping jacks at a comfortable pace.",
    duration: 60, // 1 minute timer as an option
  },
  {
    id: "stretch-arms",
    title: "Overhead Arm Stretch",
    description: "Stand or sit tall. Inhale as you raise your arms overhead, interlocking your fingers. Hold for 15-30 seconds. Feel the stretch in your sides.",
    duration: 60,
  },
  {
    id: "neck-roll",
    title: "Gentle Neck Rolls",
    description: "Slowly and gently tilt your head to one side, then roll it forward and to the other side. Avoid rolling it backwards. Repeat 3-5 times each way.",
    duration: 120, // 2 minutes
  },
];
