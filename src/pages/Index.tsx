
import { AffirmationCard } from "@/components/AffirmationCard";
import { Waves } from "lucide-react";
import { Link } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

const Index = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: { xs: 4, md: 8 }
      }}
    >
      <Box className="animate-fade-in">
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Welcome to Your Mindful Anchor
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: '48rem', mx: 'auto' }}>
          A quiet space to find your calm, understand your feelings, and practice self-compassion.
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/grounding-tool"
            startIcon={<Waves />}
            sx={{ 
              color: 'background.default', 
              fontWeight: 'bold', 
              '&:hover': { backgroundColor: 'primary.dark' } 
            }}
          >
            Find Calm Now (SOS)
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 8, width: '100%', maxWidth: '42rem' }} className="animate-fade-in" style={{animationDelay: '0.2s'}}>
        <AffirmationCard />
      </Box>
    </Container>
  );
};

export default Index;
