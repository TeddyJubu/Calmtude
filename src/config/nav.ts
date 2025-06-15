
import { Anchor, NotebookText, Waves, Zap } from "lucide-react";
import type { ElementType } from "react";

export const navItems: { href: string; label: string; mobileLabel?: string; icon: ElementType }[] = [
  { href: "/", label: "Home", icon: Anchor },
  { href: "/emotion-log", label: "Log Emotion", icon: NotebookText },
  { href: "/grounding-tool", label: "Grounding", icon: Waves },
  { href: "/quick-stress-relief", label: "Quick Stress-Relief", mobileLabel: "Stress-Relief", icon: Zap },
];
