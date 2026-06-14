import { ArrowRight, Gauge } from 'lucide-react';
import type { PrepTopic } from '../../../types/interview';
import Card from '../../../components/Card/Card';

interface InterviewCardProps {
    interview: PrepTopic;
    onStartTraining: (interview: PrepTopic) => void;
}

const InterviewCard = ({ interview, onStartTraining }: InterviewCardProps) => {
    const { id, title, difficulty, category } = interview;

    return (
        <Card className="p-2.5 h-full flex flex-col group">
            <div className="mb-1 flex justify-between items-start">
                <h3
                    className="text-base font-extrabold flex-1 mr-1 line-clamp-2 min-h-[2.6rem] text-[#202124] dark:text-[#e8eaed]"
                >
                    {title}
                </h3>
            </div>

            <div className="flex flex-row gap-2 mb-2 pb-1.5 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-0.75 text-xs font-semibold text-[#5f6368] dark:text-[#9aa0a6]">
                    <Gauge size={14} className="text-primary" />
                    <span>{difficulty}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-0.75 h-[52px] overflow-hidden content-start">
                <span
                    key={id}
                    className="bg-primary/5 text-primary px-1 py-0.4 rounded-full text-[0.65rem] font-bold border border-primary/10"
                >
                    {category}
                </span>
            </div>

            <button
                onClick={() => onStartTraining(interview)}
                className="
                    mt-auto w-full
                    bg-gradient-to-r from-primary to-secondary text-white
                    py-1.25 rounded-[10px] font-bold text-[0.85rem]
                    shadow-none
                    hover:-translate-y-px hover:shadow-[0_8px_16px_rgba(168,85,247,0.2)]
                    transition-all duration-200
                    flex items-center justify-center gap-2
                "
            >
                Start Training
                <ArrowRight size={16} />
            </button>
        </Card>
    );
};

export default InterviewCard;
