
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";

export function BottomNav() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <nav className="flex h-16 items-center justify-between px-1 safe-area-inset-bottom">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 text-xs font-medium therapeutic-transition rounded-lg mx-0.5 touch-target icon-focus-ring mobile-button-spacing mobile-nav-item",
              "hover:text-primary hover:bg-primary/5 focus:outline-none active:scale-95",
              location.pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground"
            )}
            style={{
              paddingTop: '0.5rem',
              paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
              WebkitTapHighlightColor: 'transparent'
            }}
            aria-label={`Navigate to ${item.label}`}
          >
            <item.icon
             size="xs"
              aria-hidden="true"
              focusable={false}
              withHover={true}
              withEntrance={true}
            />
            <span className="truncate text-[10px] leading-tight max-w-full px-0.5 mobile-nav-text">{item.mobileLabel || item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
