import { Edit, X, Briefcase, Building, Calendar, Save, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { currentUserActions } from '../../../store/CurrentUser/currentuser.slice';
import type { CurrentUserState, Experience, Skill } from '../../../store/CurrentUser/currentuser.types';
import { useAppDispatch } from '../../../store/hooks';
import Button from '../../../components/Button/Button';

interface EditProfileProps {
    profileData: CurrentUserState;
    setIsEditing: (isEditing: boolean) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ profileData, setIsEditing }) => {
    const [editData, setEditData] = useState<CurrentUserState>(profileData);
    const dispatch = useAppDispatch();

    const handleInputChange = <T extends keyof CurrentUserState>(field: T, value: CurrentUserState[T]) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
        const updatedExp = [...editData.experience];
        updatedExp[index] = { ...updatedExp[index], [field]: value };
        setEditData(prev => ({ ...prev, experience: updatedExp }));
    };

    const addExperience = () => {
        setEditData(prev => ({
            ...prev,
            experience: [
                { company: '', role: '', period: '', description: '' },
                ...prev.experience
            ]
        }));
    };

    const removeExperience = (index: number) => {
        setEditData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
        const updatedSkills = [...editData.skills];
        updatedSkills[index] = { ...updatedSkills[index], [field]: value };
        setEditData(prev => ({ ...prev, skills: updatedSkills }));
    };

    const addSkill = () => {
        setEditData(prev => ({
            ...prev,
            skills: [...prev.skills, { name: '', level: 'Beginner', category: 'General' }]
        }));
    };

    const removeSkill = (index: number) => {
        setEditData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        dispatch(currentUserActions.setCurrentUser(editData));
        setIsEditing(false);
    };

    const inputClass = "w-full px-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-gray-900 dark:text-gray-100 outline-none focus:border-primary transition-all";
    const labelClass = "text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 block";

    return (
        <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1d23] shadow-sm">
            {/* Header */}
            <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                    <Edit size={22} className="text-primary" />
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Update Your Identity</h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ensure your profile remains competitive and up-to-date.
                </p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div>
                    <label className={labelClass}>First Name</label>
                    <input className={inputClass} value={editData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                </div>
                <div>
                    <label className={labelClass}>Last Name</label>
                    <input className={inputClass} value={editData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Headline</label>
                    <input className={inputClass} value={editData.headline} onChange={(e) => handleInputChange('headline', e.target.value)} placeholder="e.g. Senior Full Stack Developer" />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Professional Bio</label>
                    <textarea className={`${inputClass} min-h-[100px] resize-y`} value={editData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} rows={4} />
                </div>
                <div>
                    <label className={labelClass}>Email</label>
                    <input className={inputClass} type="email" value={editData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                </div>
                <div>
                    <label className={labelClass}>Phone</label>
                    <input className={inputClass} value={editData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                </div>
                <div>
                    <label className={labelClass}>Github URL</label>
                    <input className={inputClass} value={editData.github} onChange={(e) => handleInputChange('github', e.target.value)} />
                </div>
                <div>
                    <label className={labelClass}>LinkedIn URL</label>
                    <input className={inputClass} value={editData.linkedin} onChange={(e) => handleInputChange('linkedin', e.target.value)} />
                </div>
            </div>

            <hr className="my-4 border-black/10 dark:border-white/10" />

            {/* Experience Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h6 className="font-bold text-base text-gray-900 dark:text-gray-100">Experience</h6>
                    <Button variant="secondary" size="small" iconLeft={<Plus size={16} />} onClick={addExperience}>
                        Add Experience
                    </Button>
                </div>

                <div className="space-y-3">
                    {editData.experience.map((exp, i) => (
                        <div
                            key={i}
                            className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#0f172a]/50 relative"
                        >
                            <button
                                onClick={() => removeExperience(i)}
                                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                            >
                                <X size={16} />
                            </button>

                            <div className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div>
                                        <label className={labelClass}>Job Title</label>
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10">
                                            <Briefcase size={14} className="text-gray-400 flex-shrink-0" />
                                            <input
                                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
                                                value={exp.role}
                                                onChange={(e) => handleExperienceChange(i, 'role', e.target.value)}
                                                placeholder="e.g. Senior Software Engineer"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClass}>Company</label>
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10">
                                            <Building size={14} className="text-gray-400 flex-shrink-0" />
                                            <input
                                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                                                placeholder="e.g. Google"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Time Period</label>
                                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10">
                                        <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                                        <input
                                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
                                            value={exp.period}
                                            onChange={(e) => handleExperienceChange(i, 'period', e.target.value)}
                                            placeholder="e.g. Jan 2022 - Present"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Key Responsibilities & Achievements</label>
                                    <textarea
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-gray-900 dark:text-gray-100 outline-none focus:border-primary transition-all min-h-[80px] resize-y"
                                        value={exp.description}
                                        onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                                        placeholder="Describe your impact, technologies used, and key projects..."
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className="my-4 border-black/10 dark:border-white/10" />

            {/* Skills Section */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                    <h6 className="font-bold text-base text-gray-900 dark:text-gray-100">Skills</h6>
                    <Button variant="secondary" size="small" iconLeft={<Plus size={16} />} onClick={addSkill}>
                        Add Skill
                    </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {editData.skills.map((skill, i) => (
                        <div
                            key={i}
                            className="p-2 flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#0f172a]/50"
                        >
                            <input
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 min-w-0"
                                value={skill.name}
                                onChange={(e) => handleSkillChange(i, 'name', e.target.value)}
                                placeholder="Skill name"
                            />
                            <button onClick={() => removeSkill(i)} className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-500 hover:bg-black/10 dark:hover:bg-white/10 flex-shrink-0">
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button variant="primary" iconLeft={<Save size={18} />} onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
    );
};

export default EditProfile;
