import { Briefcase } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    description?: string;
    iconSize?: number;
}

const EmptyState = ({
    title = 'Found nothing here',
    description = 'Try adjusting your filters to find more results',
    iconSize = 64,
}: EmptyStateProps) => {
    return (
        <div className="flex justify-center items-center p-3 w-full">
            <div className="relative w-full p-4 md:p-6 rounded-[28px] text-center">
                <div className="flex flex-col items-center mb-4">
                    <div className="text-secondary animate-[float_3s_ease-in-out_infinite]">
                        <Briefcase size={iconSize} strokeWidth={1.5} />
                    </div>
                    <div
                        className="w-12 h-1.5 rounded-full mt-1.5"
                        style={{
                            backgroundColor: 'rgba(168,85,247,0.1)',
                            animation: 'pulse 3s ease-in-out infinite',
                        }}
                    />
                </div>

                <h3 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed] mb-2">
                    {title}
                </h3>
                <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] max-w-[400px] mx-auto leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default EmptyState;
