
import { Hand, Footprints, PersonStanding, CircleCheck, LucideIcon } from 'lucide-react';

export type BodyAwarenessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const bodyAwarenessSteps: BodyAwarenessStep[] = [
  {
    title: "Ground Your Feet",
    description: "Press your feet firmly into the floor. Feel the solid ground beneath you, supporting your weight. Wiggle your toes inside your shoes.",
    icon: Footprints,
  },
  {
    title: "Clench and Release Fists",
    description: "Make tight fists with both hands, squeezing for a moment. Then, release the tension and let your fingers relax completely. Notice the change in sensation.",
    icon: Hand,
  },
  {
    title: "Engage Your Body",
    description: "Gently stamp your feet one at a time. Feel the vibration. Now, rub your palms together briskly until they feel warm.",
    icon: PersonStanding,
  },
  {
    title: "Full Body Check-in",
    description: "Take a slow, deep breath. Notice your posture. Are your shoulders relaxed? Is your jaw unclenched? Allow yourself to feel present in your body.",
    icon: PersonStanding,
  },
  {
    title: "Complete",
    description: "You've completed the body awareness scan. You are grounded and connected to the present moment.",
    icon: CircleCheck,
  },
];
