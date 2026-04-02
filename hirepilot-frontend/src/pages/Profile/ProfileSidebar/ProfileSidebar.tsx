import { MapPin, Edit, LogOut, Mail, Phone, Camera } from 'lucide-react';
import Badge from '../../../components/Badge/Badge';
import Button from '../../../components/Button/Button';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import Card from '../../../components/Card/Card';
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg';
import { Box, Stack, Typography, IconButton, Avatar, Divider, useTheme } from '@mui/material';

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
    const theme = useTheme();

    return (
        <Box component="aside" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card>
                {/* Avatar Section */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={profileImg}
                            alt="profile"
                            sx={{
                                width: 120,
                                height: 120,
                                border: `4px solid ${theme.palette.background.paper}`,
                                boxShadow: theme.shadows[4],
                            }}
                        >
                            NK
                        </Avatar>
                        <IconButton
                            onClick={onImageClick}
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                        >
                            <Camera size={18} />
                        </IconButton>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                width: 16,
                                height: 16,
                                borderRadius: '50%',
                                bgcolor: 'success.main',
                                border: `3px solid ${theme.palette.background.paper}`,
                            }}
                        />
                    </Box>
                </Box>

                {/* User Info */}
                <Stack spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight={700} textAlign="center">
                        {profileData.firstName} {profileData.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        {profileData.headline || 'Senior Full Stack Developer'}
                    </Typography>
                    <Badge variant="ghost" iconLeft={<MapPin size={14} />}>
                        {profileData.location || 'San Francisco, CA'}
                    </Badge>
                </Stack>

                {/* Stats */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                    <Stack alignItems="center">
                        <Typography variant="h6" fontWeight={700}>
                            {profileData.interviewsCount}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Interviews
                        </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack alignItems="center">
                        <Typography variant="h6" fontWeight={700}>
                            {profileData.successRate}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Success
                        </Typography>
                    </Stack>
                </Stack>

                {/* Profile Completion */}
                <Box sx={{ mb: 3 }}>
                    <ProgressBar progress={profileCompletion} showLabel label="Profile Strength" height={8} />
                </Box>

                {/* Contact Info */}
                <Stack spacing={1.5} sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Mail size={16} color={theme.palette.text.secondary} />
                        <Typography variant="body2" color="text.secondary">
                            {profileData.email}
                        </Typography>
                    </Stack>
                    {profileData.phone && (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Phone size={16} color={theme.palette.text.secondary} />
                            <Typography variant="body2" color="text.secondary">
                                {profileData.phone}
                            </Typography>
                        </Stack>
                    )}
                    {/* Social Card */}
                    <SocialCard profileData={profileData} />
                </Stack>

                {/* Actions */}
                <Stack spacing={2}>
                    <Button variant="secondary" iconLeft={<Edit size={16} />} onClick={onEditClick} fullWidth>
                        Edit Profile
                    </Button>
                    <Button variant="danger" iconLeft={<LogOut size={16} />} onClick={onLogoutClick} fullWidth>
                        Logout
                    </Button>
                </Stack>
            </Card>


        </Box>
    );
};

export default ProfileSidebar;
