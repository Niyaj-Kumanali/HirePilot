import { Award, TrendingUp } from 'lucide-react';

interface InterviewTabNavProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const InterviewTabNav = ({ activeTab, setActiveTab }: InterviewTabNavProps) => {
  const tabs = [
    { id: 0, label: 'Practice Topics', icon: TrendingUp },
    { id: 1, label: 'Past History', icon: Award },
  ];

  return (
    <div className="border-b border-white/60 dark:border-white/10 mb-3">
      <div className="flex overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`
              flex items-center gap-1 px-4 py-3.5 text-sm font-semibold
              transition-all duration-200 whitespace-nowrap
              ${activeTab === id
                ? 'text-primary border-b-2 border-primary'
                : 'text-[#5f6368] dark:text-[#9aa0a6] hover:text-primary'
              }
            `}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterviewTabNav;
