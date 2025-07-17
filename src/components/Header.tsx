
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 hidden w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium therapeutic-transition flex items-center gap-2 rounded-lg px-3 py-2 focus:outline-none icon-focus-ring",
                "hover:text-primary hover:bg-primary/5",
                location.pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
              aria-label={`Navigate to ${item.label}`}
            >
              <item.icon
                size="sm"
                aria-hidden="true"
                focusable={false}
                withHover={true}
                withEntrance={true}
              />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
