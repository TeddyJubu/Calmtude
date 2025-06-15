
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Save } from 'lucide-react';
import { cn } from "@/lib/utils";

export function AuthPrompt({ variant = 'fixed' }: { variant?: 'fixed' | 'inline' }) {
    const { session } = useAuth();

    if (session) {
        return null;
    }
    
    const isFixed = variant === 'fixed';

    return (
        <div className={cn(
            "animate-fade-in",
            isFixed 
                ? "fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 z-50"
                : "w-full"
        )}>
            <div className={cn("flex items-center justify-center text-center", isFixed && "container")}>
                <Button asChild size="default" className={cn(!isFixed && "w-full", "text-xs sm:text-sm")}>
                    <Link to="/auth">
                        <Save className="mr-2 h-4 w-4" />
                        Login or Sign Up to Save Your Progress
                    </Link>
                </Button>
            </div>
        </div>
    );
}
