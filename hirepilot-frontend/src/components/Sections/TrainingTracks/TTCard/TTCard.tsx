import { ArrowRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface TTCardType {
    id: string,
    color: string,
    tag?: string,
    icon: React.ReactNode,
    title: string,
    desc: string
}

const getTagColor = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag === 'popular') return { bg: '#fef2f2', color: '#ef4444', border: 'transparent' };
    if (lowerTag === 'new') return { bg: '#f0fdf4', color: '#16a34a', border: 'transparent' };
    return { bg: 'rgba(255,255,255,0.6)', color: '#5f6368', border: '#e0e0e0' };
};

const TTCard: React.FC<TTCardType> = ({ color, tag, icon, title, desc }) => {
    const tagStyle = tag ? getTagColor(tag) : null;

    return (
        <Link
            to={`/tracks/${title}`}
            className="
                relative flex flex-col justify-between
                p-4 md:p-5 rounded-2xl h-full no-underline
                border border-[#e0e0e0] dark:border-[#3c4043]
                bg-white dark:bg-[#1a1d23]
                shadow-sm
                transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
                group
            "
        >
            {tag && tagStyle && (
                <span
                    className="absolute top-6 right-6 text-[0.7rem] font-extrabold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full z-10"
                    style={{
                        backgroundColor: tagStyle.bg,
                        color: tagStyle.color,
                        border: `1px solid ${tagStyle.border}`,
                    }}
                >
                    {tag}
                </span>
            )}

            <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2.5 relative transition-all duration-300"
                style={{ backgroundColor: `${color}0d`, color }}
            >
                <div
                    className="absolute inset-[-5px] rounded-[inherit] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-400"
                    style={{ backgroundColor: color, filter: 'blur(15px)' }}
                />
                {icon}
            </div>

            <div className="mb-2.5">
                <h3 className="text-lg font-bold mb-1.5 text-[#202124] dark:text-[#e8eaed]">
                    {title}
                </h3>
                <p
                    className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed line-clamp-3"
                >
                    {desc}
                </p>
            </div>

            <div
                className="mt-auto flex items-center gap-1 font-semibold text-[0.95rem] group-hover:gap-2 transition-all duration-300"
                style={{ color }}
            >
                <span>View Track</span>
                <ArrowRight size={18} />
            </div>
        </Link>
    );
};

export default TTCard;
