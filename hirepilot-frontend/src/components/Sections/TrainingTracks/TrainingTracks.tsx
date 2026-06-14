import { Terminal, Code, Layers, BarChart, Settings } from 'lucide-react';
import VisualHeader from '../../VisualHeader/VisualHeader';
import TTCard from './TTCard/TTCard';

const trainingTracksData = [
  {
    id: 'backend',
    title: 'Backend Developer',
    desc: 'Master APIs, databases, microservices, and system design for scalable applications.',
    icon: <Terminal size={26} />,
    color: '#6366f1',
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

const TrainingTracks = () => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center py-12 md:py-8 relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4">
        <header className="mb-6 text-center">
          <VisualHeader
            badge='Career Paths'
            title='Specialized'
            gradient_title='Training Tracks'
            subtitle='Industry-validated curriculums designed to turn beginners into job-ready engineers.'
          />
        </header>

        <div className="grid grid-cols-12 gap-6">
          {trainingTracksData.map((track, index) => (
            <div className="col-span-12 sm:col-span-6 md:col-span-4 flex" key={index}>
              <TTCard {...track} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTracks;
