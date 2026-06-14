import { useState, useEffect, useCallback, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VisualHeader from '../../components/ui/VisualHeader';
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
  const [isPending, startTransition] = useTransition();

  const {
    completedInterviews: completedInterviewsList,
    prepTopics: prepTopicsList
  } = useAppSelector((state: RootState) => state.interview);

  const handleStartTraining = useCallback((interview: PrepTopic) => {
    navigate('/live-interview', { state: { interview } });
  }, [navigate]);

  const handleTabChange = (tab: number) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  };

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
    <div className="min-h-screen py-5 relative">
      <div className="mx-auto w-full max-w-7xl px-4 relative z-1">
        <header className="text-center py-3 md:py-5">
          <VisualHeader
            badge="Ready to ace it?"
            title="Interview Prep Hub"
            highlight="with AI"
            subtitle="Master your next technical round with AI-driven insights and personalized feedback."
          />
        </header>

        <InterviewTabNav activeTab={activeTab} setActiveTab={handleTabChange} />

        <div className="mt-4 relative">
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-start justify-center pt-8 rounded-2xl bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-[2px]">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm font-semibold text-primary">
                <span className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                Switching tab…
              </div>
            </div>
          )}
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
