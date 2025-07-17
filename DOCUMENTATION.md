# Calmtude - Mental Wellness App Documentation

## Overview

**Calmtude** is a comprehensive mental wellness web application designed to help users manage stress, anxiety, and find inner calm through various mindfulness tools and techniques. The app provides a quiet space for users to practice self-compassion, understand their feelings, and access guided wellness exercises.

## Core Features

### 🧘‍♀️ **Grounding Tools**
- **5-4-3-2-1 Technique**: Sensory grounding exercise using sight, sound, touch, smell, and taste
- **Body Awareness Scan**: Progressive body relaxation and awareness exercises
- **Anchor Statements**: Personalized affirmations and grounding phrases
- **Mindful Observation**: Present-moment awareness exercises

### 🌬️ **Breathing Exercises**
- **Deep Calm Breathing**: Guided breathing patterns with visual animations
- **Interactive Breathing Circle**: Real-time visual feedback for breathing exercises
- **Multiple Breathing Patterns**: Different techniques for various needs

### 🎯 **Stress Relief Tools**
- **Quick Stress Relief**: Immediate calming techniques with D9 dice activities
- **Cognitive Shuffle**: Mental distraction technique for racing thoughts
- **Factual Reframe**: Cognitive restructuring exercises
- **Sensory Distractions**: Multi-sensory calming activities

### 🌳 **Visualization & Mindfulness**
- **Rooted Tree Visualization**: Guided imagery for stability and grounding
- **Safe Place Journey**: Personalized safe space meditation
- **Mindful Movement**: Gentle movement exercises

### 📝 **Personal Tracking**
- **Emotion Log**: Track mood and feelings with notes
- **Mindful Observations**: Record insights and reflections
- **Personal Progress**: Monitor wellness journey

### 🎵 **Audio Features**
- **Background Sounds**: Nature sounds, white noise, and calming audio
- **Guided Audio**: Voice-guided exercises and meditations

## User Interface

### Main Navigation
- **Home Page**: Quick access to calm down tools
- **Grounding Tool**: Central hub for grounding techniques
- **Emotion Log**: Personal mood tracking
- **Individual Tool Pages**: Dedicated pages for each technique

### Design Features
- **Responsive Design**: Optimized for mobile and desktop
- **Dark/Light Mode**: Comfortable viewing in any environment
- **Smooth Animations**: Calming transitions and visual feedback
- **Accessible Interface**: Clear typography and intuitive navigation

## Technical Architecture

### Frontend Stack
- **React 18**: Modern component-based UI
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast development and building
- **React Router**: Client-side routing

### Backend & Data
- **Supabase**: Backend-as-a-service
- **PostgreSQL**: Relational database
- **Row Level Security**: User data protection
- **Real-time subscriptions**: Live data updates

### Key Libraries
- **Three.js**: 3D animations and visualizations
- **GSAP**: Smooth animations
- **Lucide React**: Beautiful icons
- **React Hook Form**: Form management
- **Shadcn/ui**: Component library

## File Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── stress-relief/   # Stress relief specific components
│   └── sensory/         # Sensory exercise components
├── pages/               # Main page components
│   └── tools/           # Individual tool pages
├── lib/                 # Utility functions and data
├── hooks/               # Custom React hooks
├── integrations/        # External service integrations
└── config/              # Configuration files
```

## Database Schema

### Core Tables
- **emotion_logs**: User mood tracking
- **mindful_observations**: User reflections and insights
- **user authentication**: Managed by Supabase Auth

### Security
- Row Level Security (RLS) policies ensure users only access their own data
- Authentication required for personal data features

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser
- Internet connection for Supabase backend

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd calmtude

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
- Supabase configuration is pre-configured
- No additional environment variables needed for basic functionality

## Usage Guide

### For New Users
1. **Start Here**: Click "Calm Down" on the homepage
2. **Explore Tools**: Try different grounding and breathing techniques
3. **Create Account**: Sign up to save progress and access personal features
4. **Track Progress**: Use emotion log to monitor your wellness journey

### Quick Access Features
- **Emergency Calm**: Direct access to quick stress relief tools
- **Breathing Exercise**: Immediate access to calming breath work
- **Grounding Hub**: Central location for all grounding techniques

### Personalization
- **Save Observations**: Record insights during mindful exercises
- **Track Emotions**: Log mood and feelings over time
- **Custom Experience**: Tools adapt to your usage patterns

## Wellness Tools Explained

### 🌊 **5-4-3-2-1 Grounding**
Identify 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.

### 🫁 **Deep Breathing**
Follow guided breathing patterns with visual cues for optimal relaxation.

### 🎲 **Cognitive Shuffle**
Distract anxious thoughts by mentally "shuffling" through random concepts.

### 🌲 **Tree Visualization**
Imagine yourself as a strong, rooted tree to build inner stability.

### 📝 **Body Scan**
Progressive awareness and relaxation of different body parts.

## Accessibility Features

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast**: Clear visual hierarchy
- **Responsive Text**: Scalable typography
- **Reduced Motion**: Respects user motion preferences

## Privacy & Security

- **Data Encryption**: All data transmitted securely
- **User Privacy**: Personal data never shared
- **Local Storage**: Minimal data stored locally
- **Secure Authentication**: Powered by Supabase Auth

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Android Chrome
- **Progressive Web App**: Can be installed on mobile devices

## Contributing

This app is built to help people find calm and manage stress. If you'd like to contribute:
- Focus on user experience and accessibility
- Maintain the calming, peaceful design language
- Ensure all features work across devices
- Test with real users when possible

## Support

For technical issues or questions about using the app:
- Check the in-app help sections
- Review this documentation
- Test different tools to find what works for you

---

**Remember**: This app is a tool for wellness support. For serious mental health concerns, please consult with healthcare professionals.

*"A quiet space to find your calm, understand your feelings, and practice self-compassion."*