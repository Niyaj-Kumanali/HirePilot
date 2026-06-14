import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUserActions } from '../../store/CurrentUser/currentuser.slice';
import { authActions } from '../../store/auth/auth.slice';
import { type CurrentUserState } from '../../store/CurrentUser/currentuser.types';
import { AUTH_SERVICE } from '../../api/services/authApi';
import Loading from '../../components/ui/Spinner';

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-2">
        <Loading />
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 md:py-8">
      <div className="max-w-[1400px] mx-auto px-2 md:px-4">
        {isEditing ? (
          <EditProfile profileData={profileData} setIsEditing={setIsEditing} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
            <div className="static lg:sticky lg:top-[100px] lg:h-fit">
              <ProfileSidebar
                profileData={profileData}
                profileCompletion={profileCompletion}
                isEditing={isEditing}
                onEditClick={() => setIsEditing(true)}
                onLogoutClick={handleLogout}
                onImageClick={() => setOpenImageDialog(true)}
              />
            </div>

            <main className="space-y-3">
              <ReadinessSection readiness={profileData.readiness} />
              <AboutMe bio={profileData.bio} />
              <CareerJourney experience={profileData.experience} />
              <SkillsCloud skills={profileData.skills} />
            </main>
          </div>
        )}
      </div>

      {openImageDialog && (
        <ImageModal onClose={() => setOpenImageDialog(false)} />
      )}
    </div>
  );
};

export default Profile;
