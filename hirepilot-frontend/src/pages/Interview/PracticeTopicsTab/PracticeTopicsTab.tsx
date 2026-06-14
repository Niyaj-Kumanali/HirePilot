import InterviewCard from '../InterviewCard/InterviewCard';
import type { PrepTopic } from '../../../types/interview';

interface PracticeTopicsTabProps {
  topics: PrepTopic[];
  onStartTraining: (interview: PrepTopic) => void;
}

const PracticeTopicsTab = ({ topics, onStartTraining }: PracticeTopicsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
    </div>
  );
};

export default PracticeTopicsTab;
