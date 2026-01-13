import { Calendar, Award, TrendingUp } from 'lucide-react';
import './interviewtabnav.scss';

interface InterviewTabNavProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const InterviewTabNav = ({ activeTab, setActiveTab }: InterviewTabNavProps) => {
  const tabs = [
    { id: 0, label: 'Upcoming Rounds', icon: Calendar },
    { id: 1, label: 'Past History', icon: Award },
    { id: 2, label: 'Practice Topics', icon: TrendingUp },
  ];

  return (
    <nav className="interview-tab-navigation">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`interview-tab-btn ${activeTab === id ? 'active' : ''}`}
          onClick={() => setActiveTab(id)}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </nav>
  );
};

export default InterviewTabNav;