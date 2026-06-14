import React from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Experience } from '../../../store/CurrentUser/currentuser.types';
import Card from '../../../components/ui/Card';

interface CareerJourneyProps {
    experience: Experience[];
}

const CareerJourney: React.FC<CareerJourneyProps> = ({ experience }) => {
    return (
        <Card className="p-4 rounded-2xl border border-black/10 dark:border-white/10">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1.5">
                    <Briefcase size={22} className="text-primary" />
                    <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">Career Journey</h5>
                </div>
                <Link
                    to="/jobs"
                    className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-all"
                >
                    Explore Jobs
                    <ChevronRight size={16} />
                </Link>
            </div>

            <div className="space-y-3">
                {experience.map((exp, i) => (
                    <div
                        key={i}
                        className="relative pl-4"
                    >
                        {/* Timeline line */}
                        <div
                            className="absolute left-1.5 top-2 w-0.5 bg-primary/20"
                            style={{ bottom: i === experience.length - 1 ? 'auto' : '-1.5rem' }}
                        />
                        {/* Timeline dot */}
                                        <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-[3px] border-white dark:border-[#1a1d23] shadow-[0_0_0_2px_rgba(168,85,247,0.2)]" />
                        <div className="space-y-0.5">
                            <div className="flex justify-between items-start flex-wrap">
                                <h6 className="font-bold text-sm text-gray-900 dark:text-gray-100">{exp.role}</h6>
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{exp.period}</span>
                            </div>
                            <p className="text-sm font-semibold text-primary">{exp.company}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default CareerJourney;
