
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Anchor, NotebookText, Waves } from "lucide-react";
import { AppBar, Toolbar, Link, Box, Container } from "@mui/material";

const navItems = [
  { href: "/", label: "Home", icon: Anchor },
  { href: "/emotion-log", label: "Log Emotion", icon: NotebookText },
  { href: "/grounding-tool", label: "Grounding", icon: Waves },
];

export function Header() {
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      backgroundColor: 'transparent', 
      backdropFilter: 'blur(10px)',
      borderBottom: 1, 
      borderColor: 'divider' 
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                component={RouterLink}
                to={item.href}
                underline="none"
                variant="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: location.pathname === item.href ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                  transition: 'color 0.2s',
                  textTransform: 'none'
                }}
              >
                <item.icon style={{ height: '18px', width: '18px' }} />
                {item.label}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
