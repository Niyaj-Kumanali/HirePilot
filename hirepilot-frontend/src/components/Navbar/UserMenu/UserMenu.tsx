import { Paper, Box, Avatar, Typography, Divider, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import profileImg from '../../../assets/Nawaz_profile_IMG.jpg'
import type { CurrentUserState } from "../../../store/CurrentUser/currentuser.types";



interface UserMenuProps {
    currentUser: CurrentUserState;
    handleLogout: () => void;
    handleUserMenuStatus: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser, handleLogout, handleUserMenuStatus}) => {
    return (
        <Paper sx={{
            position: 'absolute',
            top: 50,
            right: 0,
            width: 250,
            p: 2,
            zIndex: 10,
            boxShadow: 3
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={profileImg} sx={{ width: 40, height: 40, mr: 1.5 }} />
                <Box>
                    <Typography variant="subtitle2" noWrap>
                        {currentUser.firstName + " " + currentUser.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                        {currentUser.email}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Stack spacing={0.5}>
                <Button component={Link} to="/profile" onClick={handleUserMenuStatus} startIcon={<Home size={16} />} fullWidth sx={{ justifyContent: 'flex-start', color: 'text.primary' }}>
                    My Profile
                </Button>
                {/* <Button component={Link} to="/interview" onClick={handleUserMenuStatus} startIcon={<Zap size={16} />} fullWidth sx={{ justifyContent: 'flex-start', color: 'text.primary' }}>
                    My Interviews
                </Button>
                <Button component={Link} to="/messages" onClick={handleUserMenuStatus} startIcon={<MessageSquare size={16} />} fullWidth sx={{ justifyContent: 'flex-start', color: 'text.primary' }}>
                    Messages
                </Button> */}
                <Divider sx={{ my: 1 }} />
                <Button onClick={handleLogout} startIcon={<LogOut size={16} />} fullWidth sx={{ justifyContent: 'flex-start', color: 'error.main' }}>
                    Sign Out
                </Button>
            </Stack>
        </Paper>
    )
}

export default UserMenu