import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VisualHeader from '../../components/VisualHeader/VisualHeader';
import InterviewTabNav from './InterviewTabNav/InterviewTabNav';
import CompletedInterviewsTab from './CompletedInterviewsTab/CompletedInterviewsTab';
import PracticeTopicsTab from './PracticeTopicsTab/PracticeTopicsTab';
import { useAppSelector } from '../../store/hooks';
import type { RootState } from '../../store/rootReducer';
import type { CompletedInterview, PrepTopic } from '../../types/interview';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

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
    <div className="min-h-screen py-5 relative before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.08)_0%,transparent_50%)] before:pointer-events-none before:z-0">
      <div className="mx-auto w-full max-w-7xl px-4 relative z-1">
        <header className="text-center py-3 md:py-5">
          <VisualHeader
            badge="Ready to ace it?"
            title="Interview Prep Hub"
            gradient_title="with AI"
            subtitle="Master your next technical round with AI-driven insights and personalized feedback."
          />
        </header>

        <InterviewTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-4">
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
        </div>
      </div>
    </div>
  );
};

export default Interview;
