import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import InterviewTabNav from './InterviewTabNav/InterviewTabNav';
import CompletedInterviewsTab from './CompletedInterviewsTab/CompletedInterviewsTab';
import PracticeTopicsTab from './PracticeTopicsTab/PracticeTopicsTab';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store/rootReducer';
import { Box, Container, useTheme, alpha } from '@mui/material';
import type { CompletedInterview, PrepTopic } from '../../types/interview';

/**
 * Main Hub for all interview preparation activities.
 * 
 * Features:
 * - Tabbed navigation (Upcoming, Completed, Practice Topics).
 * - Centralized training start logic with route-based initialization.
 * - Persistent visual background patterns.
 */
const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const {
    completedInterviews: completedInterviewsList,
    prepTopics: prepTopicsList
  } = useAppSelector((state: RootState) => state.interview);

  const handleStartTraining = useCallback((interview: PrepTopic) => {
    navigate('/live-interview', { state: { interview } });
  }, [navigate]);

  useEffect(() => {
    if (location.state?.job) {
      const job = location.state.job;
      handleStartTraining({
        id: job.id,
        title: job.title,
        category: job.category || job.company || 'Job Application',
        difficulty: job.difficulty || job.level || 'Medium'
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state, handleStartTraining]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 5,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0%, transparent 50%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box component="header" sx={{ textAlign: 'center', py: { xs: 3, md: 5 } }}>
          <VisualHeader
            badge="Ready to ace it?"
            title="Interview Prep Hub"
            gradient_title="with AI"
            subtitle="Master your next technical round with AI-driven insights and personalized feedback."
          />
        </Box>

        <InterviewTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <Box sx={{ mt: 4 }}>
          {activeTab === 0 && (
            <PracticeTopicsTab
              topics={prepTopicsList}
              onStartTraining={handleStartTraining}
            />
          )}
          {activeTab === 1 && (
            <CompletedInterviewsTab
              interviews={completedInterviewsList as unknown as CompletedInterview[]}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Interview;