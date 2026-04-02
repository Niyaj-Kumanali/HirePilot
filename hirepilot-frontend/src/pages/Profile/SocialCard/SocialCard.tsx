import { IconButton, alpha, useTheme, Box } from "@mui/material"
import { Github, Linkedin, MailIcon, PhoneCall } from "lucide-react"
import type { CurrentUserState } from "../../../store/CurrentUser/currentuser.types"

const SocialCard = ({ profileData }: { profileData: CurrentUserState }) => {
    const theme = useTheme();

    const socialLinks = [
        { icon: Github, link: profileData.github, color: '#333', type: 'external' },
        { icon: Linkedin, link: profileData.linkedin, color: '#0077b5', type: 'external' },
        { icon: MailIcon, link: `mailto:${profileData.email}`, color: '#EA4335', type: 'mail' }, // Gmail Red
        { icon: PhoneCall, link: `tel:${profileData.phone}`, color: theme.palette.success.main, type: 'phone' },
    ];

    return (
        <Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1.5,
                    p: 1,
                }}
            >
                {socialLinks.map(({ icon: Icon, link, color }, i) => (
                    <IconButton
                        key={i}
                        component="a" // Use native anchor tag for external/protocol links
                        href={link || '#'}
                        target={link?.startsWith('http') ? "_blank" : "_self"} // Only open new tab for web URLs
                        rel="noopener noreferrer"
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: alpha(color, 0.1),
                            color: color,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: color,
                                color: 'white',
                                transform: 'translateY(-3px)', // Nice subtle lift effect
                            },
                        }}
                    >
                        <Icon size={20} />
                    </IconButton>
                ))}
            </Box>
        </Box>
    )
}

export default SocialCard;