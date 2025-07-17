
import { HomeIcon, LogEmotionIcon, GroundingIcon, StressReliefIcon } from "@/components/icons/CustomIcons";
import type { ElementType } from "react";

export const navItems: { href: string; label: string; mobileLabel?: string; icon: ElementType }[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/emotion-log", label: "Log Emotion", icon: LogEmotionIcon },
  { href: "/grounding-tool", label: "Grounding", icon: GroundingIcon },
  { href: "/quick-stress-relief", label: "Quick Stress-Relief", mobileLabel: "Stress-Relief", icon: StressReliefIcon },
];
