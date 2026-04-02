import { Edit, X, Briefcase, Building, Calendar, Save, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { currentUserActions } from '../../../store/CurrentUser/currentuser.slice';
import type { CurrentUserState, Experience, Skill } from '../../../store/CurrentUser/currentuser.types';
import { useAppDispatch } from '../../../store/hooks';
import {
    Card,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Stack,
    Divider,
    useTheme,
    alpha
} from '@mui/material';

interface EditProfileProps {
    profileData: CurrentUserState;
    setIsEditing: (isEditing: boolean) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ profileData, setIsEditing }) => {
    const [editData, setEditData] = useState<CurrentUserState>(profileData);
    const dispatch = useAppDispatch();
    const theme = useTheme();

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

    return (
        <Card
            sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                    <Edit size={22} color={theme.palette.primary.main} />
                    <Typography variant="h4" fontWeight={700}>
                        Update Your Identity
                    </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                    Ensure your profile remains competitive and up-to-date.
                </Typography>
            </Box>

            {/* Basic Info */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
                <TextField
                    label="First Name"
                    value={editData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Last Name"
                    value={editData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Headline"
                    value={editData.headline}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    placeholder="e.g. Senior Full Stack Developer"
                    fullWidth
                    sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}
                />
                <TextField
                    label="Professional Bio"
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}
                />
                <TextField
                    label="Email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Phone"
                    value={editData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Github URL"
                    value={editData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="LinkedIn URL"
                    value={editData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    fullWidth
                />
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Experience Section */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Experience
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Plus size={16} />}
                        onClick={addExperience}
                    >
                        Add Experience
                    </Button>
                </Stack>

                <Stack spacing={3}>
                    {editData.experience.map((exp, i) => (
                        <Card
                            key={i}
                            sx={{
                                p: 3,
                                position: 'relative',
                                border: `1px solid ${theme.palette.divider}`,
                                bgcolor: alpha(theme.palette.background.default, 0.5),
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={() => removeExperience(i)}
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                }}
                            >
                                <X size={16} />
                            </IconButton>

                            <Stack spacing={2}>
                                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                                    <TextField
                                        label="Job Title"
                                        value={exp.role}
                                        onChange={(e) => handleExperienceChange(i, 'role', e.target.value)}
                                        placeholder="e.g. Senior Software Engineer"
                                        InputProps={{
                                            startAdornment: <Briefcase size={14} style={{ marginRight: 8 }} />
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Company"
                                        value={exp.company}
                                        onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                                        placeholder="e.g. Google"
                                        InputProps={{
                                            startAdornment: <Building size={14} style={{ marginRight: 8 }} />
                                        }}
                                        fullWidth
                                    />
                                </Box>
                                <TextField
                                    label="Time Period"
                                    value={exp.period}
                                    onChange={(e) => handleExperienceChange(i, 'period', e.target.value)}
                                    placeholder="e.g. Jan 2022 - Present"
                                    InputProps={{
                                        startAdornment: <Calendar size={14} style={{ marginRight: 8 }} />
                                    }}
                                    fullWidth
                                />
                                <TextField
                                    label="Key Responsibilities & Achievements"
                                    value={exp.description}
                                    onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                                    placeholder="Describe your impact, technologies used, and key projects..."
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            </Box>

            <Divider sx={{ my: 4 }} />

            {/* Skills Section */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Skills
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Plus size={16} />}
                        onClick={addSkill}
                    >
                        Add Skill
                    </Button>
                </Stack>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
                    {editData.skills.map((skill, i) => (
                        <Card
                            key={i}
                            sx={{
                                p: 2,
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                border: `1px solid ${theme.palette.divider}`,
                                bgcolor: alpha(theme.palette.background.default, 0.5),
                            }}
                        >
                            <TextField
                                value={skill.name}
                                onChange={(e) => handleSkillChange(i, 'name', e.target.value)}
                                placeholder="Skill name"
                                size="small"
                                fullWidth
                            />
                            <IconButton size="small" onClick={() => removeSkill(i)}>
                                <X size={14} />
                            </IconButton>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Actions */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    startIcon={<Save size={18} />}
                    onClick={handleSave}
                >
                    Save Changes
                </Button>
            </Stack>
        </Card>
    );
};

export default EditProfile;