
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Save } from 'lucide-react';

export function AuthPrompt() {
    const { session } = useAuth();

    if (session) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4 z-50 animate-fade-in">
            <div className="container flex items-center justify-center text-center">
                <Button asChild size="lg">
                    <Link to="/auth">
                        <Save className="mr-2 h-4 w-4" />
                        Login or Sign Up to Save Your Progress
                    </Link>
                </Button>
            </div>
        </div>
    );
}
