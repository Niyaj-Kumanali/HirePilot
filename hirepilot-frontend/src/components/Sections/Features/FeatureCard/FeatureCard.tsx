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
                relative p-4 md:p-5 rounded-2xl h-full z-10
                bg-white/80 dark:bg-[#1a1d23]/80
                backdrop-blur-md
                border border-white/60 dark:border-white/10
                shadow-card
                transition-all duration-300 ease-out-expo
                hover:-translate-y-0.5 hover:shadow-card-hover
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
