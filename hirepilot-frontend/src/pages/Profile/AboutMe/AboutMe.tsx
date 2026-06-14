import React from 'react';
import { User } from 'lucide-react';
import Card from '../../../components/Card/Card';

interface AboutMeProps {
    bio: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ bio }) => {
    return (
        <Card className="p-4 rounded-2xl border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-1.5 mb-3">
                <User size={22} className="text-primary" />
                <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">About Me</h5>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {bio || 'Passionately developing high-impact software solutions with a focus on modern web technologies.'}
            </p>
        </Card>
    );
};

export default AboutMe;
