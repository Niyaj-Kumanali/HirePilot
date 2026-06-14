import { FileText } from 'lucide-react';
import type { CompletedInterview } from '../../../types/interview';

interface CompletedInterviewsTabProps {
  interviews: CompletedInterview[];
}

const CompletedInterviewsTab = ({ interviews }: CompletedInterviewsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {interviews.map((interview) => (
        <div
          key={interview.id}
          className="
            p-3 rounded-xl border border-[#e0e0e0] dark:border-[#3c4043]
            bg-white dark:bg-[#1a1d23]
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(168,85,247,0.15)]
          "
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">
                {interview.title}
              </h3>
              <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                {interview.company} &bull; {interview.position}
              </p>
            </div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center border-[3px]"
              style={{ backgroundColor: 'rgba(30,126,52,0.1)', borderColor: '#1e7e34' }}
            >
              <span className="text-lg font-bold text-[#1e7e34]">
                {interview.score}%
              </span>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-[#fafafa]/50 dark:bg-[#0f172a]/50 mb-2">
            <div className="flex items-center gap-1 mb-1">
              <FileText size={16} className="text-[#5f6368] dark:text-[#9aa0a6]" />
              <span className="text-xs font-bold uppercase text-[#5f6368] dark:text-[#9aa0a6]">
                Feedback
              </span>
            </div>
            <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] italic">
              &ldquo;{interview.feedback}&rdquo;
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              {interview.date}
            </span>
            <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              by {interview.interviewer}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedInterviewsTab;
