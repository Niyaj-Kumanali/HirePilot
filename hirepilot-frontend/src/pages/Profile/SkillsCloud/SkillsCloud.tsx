import React from 'react';
import { Award } from 'lucide-react';
import type { Skill } from '../../../store/CurrentUser/currentuser.types';
import Card from '../../../components/Card/Card';

interface SkillsCloudProps {
    skills: Skill[];
}

const SkillsCloud: React.FC<SkillsCloudProps> = ({ skills }) => {
    return (
        <Card className="p-4 rounded-2xl border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-1.5 mb-3">
                <Award size={22} className="text-primary" />
                <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100">Technical Expertise</h5>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <span
                        key={i}
                        className="px-3 py-1.5 text-sm font-semibold rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#0f172a]/50 text-gray-700 dark:text-gray-300"
                    >
                        {skill.name}
                    </span>
                ))}
            </div>
        </Card>
    );
};

export default SkillsCloud;
