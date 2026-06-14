import { BrainCircuit, TrendingUp, CheckCircle } from 'lucide-react';

const FEATURES = [
  { icon: BrainCircuit, text: 'AI Mock Interviews' },
  { icon: TrendingUp, text: 'Skill Gap Analysis' },
  { icon: CheckCircle, text: 'Readiness Scoring' },
];

const HeroFeatures = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-2">
      {FEATURES.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-sm font-semibold text-[#202124] dark:text-[#e8eaed]"
          >
            <Icon size={18} className="text-secondary" />
            {feature.text}
          </div>
        );
      })}
    </div>
  );
};

export default HeroFeatures;
