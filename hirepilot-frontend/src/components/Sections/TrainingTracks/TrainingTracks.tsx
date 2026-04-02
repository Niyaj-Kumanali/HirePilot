import { Terminal, Code, Layers, BarChart, Settings } from 'lucide-react';
import VisualHeader from '../../VisualHeader/VisualHeader';
import TTCard from './TTCard/TTCard';
import { Box, Container, Grid, useTheme } from '@mui/material';

const trainingTracksData = [
  {
    id: 'backend',
    title: 'Backend Developer',
    desc: 'Master APIs, databases, microservices, and system design for scalable applications.',
    icon: <Terminal size={26} />,
    color: '#8b5cf6', // violet-500 equivalent for "Secondary" theme color usually
    tag: 'Popular',
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    desc: 'Craft intuitive UIs with React, Next.js, and optimize for performance and UX.',
    icon: <Code size={26} />,
    color: '#2563eb',
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    desc: 'Build and deploy end-to-end solutions, bridging both frontend and backend architectures.',
    icon: <Layers size={26} />,
    color: '#059669',
    tag: 'New',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    desc: 'Uncover insights with SQL, Python, and data visualization for business decisions.',
    icon: <BarChart size={26} />,
    color: '#ea580c',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    desc: 'Automate CI/CD pipelines, manage infrastructure, and ensure seamless delivery.',
    icon: <Settings size={26} />,
    color: '#dc2626',
    tag: 'Coming Soon',
  },
];

/**
 * Specialized Training Tracks section for career paths.
 * 
 * Displays multiple career-focused tracks (Backend, Frontend, etc.) 
 * using `TTCard`. Dynamically injects theme colors for specific tracks.
 */
const TrainingTracks = () => {
  const theme = useTheme();

  // Updating the color for the first item to use theme if possible, or keeping hardcoded if strict
  // The original used var(--theme-color-secondary) which maps to secondary.main usually.
  // We can inject theme colors into the data if we move data inside component, or just use a hex that matches.
  // For now I'll use the hardcoded hexes from original array but update the first one.
  const processedData = trainingTracksData.map(track => ({
    ...track,
    color: track.id === 'backend' ? theme.palette.secondary.main : track.color
  }));

  return (
    <Box component="section" sx={{ py: 4, position: 'relative' }}>
      <Container maxWidth="lg">
        <Box component="header" sx={{ mb: 2, textAlign: 'center' }}>
          <VisualHeader
            badge='Career Paths'
            title='Specialized'
            gradient_title='Training Tracks'
            subtitle='Industry-validated curriculums designed to turn beginners into job-ready engineers.'
          />
        </Box>

        <Grid container spacing={3}>
          {processedData.map((track, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
              <TTCard {...track} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrainingTracks;