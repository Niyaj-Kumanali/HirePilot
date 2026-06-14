import React from 'react';

interface FeatureCardType {
    title: string,
    desc: string,
    icon: React.ReactNode,
}

const FeatureCard: React.FC<FeatureCardType> = ({ title, desc, icon }) => {
    return (
        <div
            className="
                relative bg-white dark:bg-[#1a1d23]
                p-4 md:p-5 rounded-2xl h-full z-10
                border border-[#e0e0e0] dark:border-[#3c4043]
                transition-all duration-300
                hover:shadow-[0_4px_12px_rgba(168,85,247,0.12)]
                hover:-translate-y-0.5
                flex flex-row md:flex-col
                items-center md:items-start
                gap-2 md:gap-0
            "
        >
            <div
                className="
                    w-16 h-16 min-w-16 rounded-2xl
                    flex items-center justify-center
                    bg-primary/5 text-secondary
                    mb-0 md:mb-2.5
                "
            >
                {icon}
            </div>
            <div>
                <h3 className="text-lg font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">
                    {title}
                </h3>
                <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                    {desc}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
