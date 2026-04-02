import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUserActions } from '../../store/CurrentUser/currentuser.slice';
import { authActions } from '../../store/auth/auth.slice';
import { type CurrentUserState } from '../../store/CurrentUser/currentuser.types';
import { Box, Stack, CircularProgress, Typography } from '@mui/material';
import { AUTH_SERVICE } from '../../api/services/authApi';

// Components
import EditProfile from './Edit/EditProfile';
import ReadinessSection from './ReadinessSection/ReadinessSection';
import AboutMe from './AboutMe/AboutMe';
import CareerJourney from './CareerJourney/CareerJourney';
import SkillsCloud from './SkillsCloud/SkillsCloud';
import ProfileSidebar from './ProfileSidebar/ProfileSidebar';
import ImageModal from './ImageModal/ImageModal';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const profileData = useAppSelector(state => state.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AUTH_SERVICE.getCurrentUser();
        dispatch(currentUserActions.setCurrentUser(data));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch]);


  const calculateCompletion = () => {
    const fields: (keyof CurrentUserState)[] = [
      'firstName', 'lastName', 'headline', 'location', 'bio',
      'github', 'linkedin', 'phone', 'experience', 'skills'
    ];
    const populatedFields = fields.filter(field => {
      const value = profileData[field];
      if (Array.isArray(value)) return value.length > 0;
      return !!value;
    });
    return Math.round((populatedFields.length / fields.length) * 100);
  };

  const profileCompletion = calculateCompletion();

  const handleLogout = () => {
    dispatch(currentUserActions.resetCurrentUser());
    dispatch(authActions.logout());
    navigate("/");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          bgcolor: 'background.default'
        }}
      >
        <CircularProgress size={50} thickness={4} sx={{ color: 'primary.main' }} />
        <Typography variant="body1" color="text.secondary" fontWeight={600}>
          Loading your profile...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 } }}>
        {
          isEditing ? (
            <EditProfile profileData={profileData} setIsEditing={setIsEditing} />
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '320px 1fr' },
                gap: 4,
              }}
            >
              <Box sx={{
                position: { xs: 'static', lg: 'sticky' },
                top: { lg: 100 }, // adjust based on your header height
                height: { lg: 'fit-content' },
              }}>
                <ProfileSidebar
                  profileData={profileData}
                  profileCompletion={profileCompletion}
                  isEditing={isEditing}
                  onEditClick={() => setIsEditing(true)}
                  onLogoutClick={handleLogout}
                  onImageClick={() => setOpenImageDialog(true)}
                />
              </Box>

              <Box component="main">
                <Stack spacing={3}>
                  <ReadinessSection readiness={profileData.readiness} />
                  <AboutMe bio={profileData.bio} />
                  <CareerJourney experience={profileData.experience} />
                  <SkillsCloud skills={profileData.skills} />
                </Stack>
              </Box>
            </Box>
          )
        }

      </Box>

      {
        openImageDialog && (
          <ImageModal onClose={() => setOpenImageDialog(false)} />
        )
      }
    </Box >
  );
};

export default Profile;
