import { Award, TrendingUp } from 'lucide-react';
import { Tabs, Tab, Box } from '@mui/material';

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
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTab-root': {
            minHeight: 56,
            fontWeight: 600,
            fontSize: '0.95rem',
            textTransform: 'none',
            gap: 1,
          },
        }}
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <Tab
            key={id}
            label={label}
            icon={<Icon size={18} />}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default InterviewTabNav;