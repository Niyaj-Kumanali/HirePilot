import { BrainCircuit, TrendingUp, CheckCircle } from "lucide-react";

const FEATURES = [
    { icon: BrainCircuit, text: 'AI Mock Interviews' },
    { icon: TrendingUp, text: 'Skill Gap Analysis' },
    { icon: CheckCircle, text: 'Readiness Scoring' }
];

const HeroFeatures = () => {
    return (
        <div className="flex flex-row flex-wrap justify-center gap-2 mb-5">
            {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                    <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 text-[#202124] dark:text-[#e8eaed]"
                    >
                        <Icon size={20} className="text-secondary" />
                        <span className="font-semibold">{feature.text}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default HeroFeatures;
