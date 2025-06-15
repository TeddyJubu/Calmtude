
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";

export function BottomNav() {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <nav className="container flex h-16 items-center justify-around px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 flex-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary",
              location.pathname === item.href && "text-primary"
            )}
            style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
          >
            <item.icon className="h-5 w-5" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}
