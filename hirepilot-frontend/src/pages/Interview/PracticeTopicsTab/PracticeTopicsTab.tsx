import { Box } from '@mui/material';
import InterviewCard from '../InterviewCard/InterviewCard';
import type { PrepTopic } from '../../../types/interview';


interface PracticeTopicsTabProps {
  topics: PrepTopic[];
  onStartTraining: (interview: PrepTopic) => void;
}

const PracticeTopicsTab = ({ topics, onStartTraining }: PracticeTopicsTabProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 3,
      }}
    >
      {topics.map((topic) => (
        <InterviewCard
          key={topic.id}
          interview={{
            id: topic.id,
            title: topic.title,
            difficulty: topic.difficulty,
            category: topic.category,
          }}
          onStartTraining={(interview) => onStartTraining({
            id: interview.id,
            title: interview.title,
            category: interview.category,
            difficulty: interview.difficulty
          })}
        />
      ))}
    </Box>
  );
};

export default PracticeTopicsTab;