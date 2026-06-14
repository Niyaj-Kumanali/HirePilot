import React from 'react';

interface HIWCardType {
    step: string,
    Icon: React.ReactNode,
    title: string,
    desc: string
}

const HIWCard: React.FC<HIWCardType> = ({ step, Icon, title, desc }) => {
    return (
        <div
            className="
                relative p-4 md:p-5 rounded-2xl w-full h-full mx-auto
                border border-[#e0e0e0] dark:border-[#3c4043]
                bg-white dark:bg-[#1a1d23]
                shadow-sm
                transition-all duration-300
                hover:shadow-[0_4px_12px_rgba(168,85,247,0.12)]
                hover:-translate-y-0.5
                flex flex-row md:flex-col
                items-center md:items-center
                text-left md:text-center
                gap-2 md:gap-0
            "
        >
            <div
                className="
                    absolute -top-[14px] left-1/2 -translate-x-1/2
                    bg-gradient-to-r from-primary to-secondary
                    text-white px-2.5 py-0.75 rounded-full
                    text-[0.8rem] font-bold shadow-md whitespace-nowrap z-10
                "
            >
                Step {step}
            </div>

            <div
                className="
                    w-16 h-16 min-w-16 rounded-2xl
                    flex items-center justify-center mx-auto
                    mb-0 md:mb-2.5
                    bg-primary/5 text-secondary
                "
            >
                {Icon}
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

export default HIWCard;
