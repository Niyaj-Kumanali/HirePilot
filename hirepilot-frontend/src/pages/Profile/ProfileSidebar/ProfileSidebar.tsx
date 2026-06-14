import { MapPin, Edit, LogOut, Mail, Phone, Camera } from 'lucide-react';
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Card from '../../../components/Card/Card';
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg';

import type { CurrentUserState } from '../../../store/CurrentUser/currentuser.types';
import SocialCard from '../SocialCard/SocialCard';

interface ProfileSidebarProps {
    profileData: CurrentUserState;
    profileCompletion: number;
    isEditing: boolean;
    onEditClick: () => void;
    onLogoutClick: () => void;
    onImageClick: () => void;
}

const ProfileSidebar = ({
    profileData,
    profileCompletion,
    onEditClick,
    onLogoutClick,
    onImageClick
}: ProfileSidebarProps) => {
    return (
        <aside className="flex flex-col gap-3">
            <Card>
                {/* Avatar Section */}
                <div className="flex justify-center mb-3">
                    <div className="relative">
                        <div className="w-[120px] h-[120px] rounded-full border-4 border-white dark:border-[#1a1d23] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
                            {profileImg ? (
                                <img src={profileImg} alt="profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl font-bold" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: 'white' }}>
                                    NK
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onImageClick}
                            className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-all shadow-md"
                        >
                            <Camera size={18} />
                        </button>
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#22c55e] border-3 border-white dark:border-[#1a1d23]" />
                    </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center gap-1 mb-3">
                    <h5 className="text-lg font-bold text-center text-gray-900 dark:text-gray-100">
                        {profileData.firstName} {profileData.lastName}
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                        {profileData.headline || 'Senior Full Stack Developer'}
                    </p>
                    <Badge variant="ghost" iconLeft={<MapPin size={14} />}>
                        {profileData.location || 'San Francisco, CA'}
                    </Badge>
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-2 mb-3">
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{profileData.interviewsCount}</span>
                        <span className="text-[0.7rem] text-gray-500 dark:text-gray-400">Interviews</span>
                    </div>
                    <div className="w-px bg-black/10 dark:bg-white/10" />
                    <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{profileData.successRate}%</span>
                        <span className="text-[0.7rem] text-gray-500 dark:text-gray-400">Success</span>
                    </div>
                </div>

                {/* Profile Completion */}
                <div className="mb-3">
                    <ProgressBar progress={profileCompletion} showLabel label="Profile Strength" height={8} />
                </div>

                {/* Contact Info */}
                <div className="space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5">
                        <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{profileData.email}</span>
                    </div>
                    {profileData.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone size={16} className="text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">{profileData.phone}</span>
                        </div>
                    )}
                    <SocialCard profileData={profileData} />
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <Button variant="secondary" iconLeft={<Edit size={16} />} onClick={onEditClick} fullWidth>
                        Edit Profile
                    </Button>
                    <Button variant="danger" iconLeft={<LogOut size={16} />} onClick={onLogoutClick} fullWidth>
                        Logout
                    </Button>
                </div>
            </Card>
        </aside>
    );
};

export default ProfileSidebar;
