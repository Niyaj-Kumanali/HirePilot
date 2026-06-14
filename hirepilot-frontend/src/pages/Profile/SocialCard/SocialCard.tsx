import { Github, Linkedin, Mail, Phone } from "lucide-react"
import type { CurrentUserState } from "../../../store/CurrentUser/currentuser.types"

const SocialCard = ({ profileData }: { profileData: CurrentUserState }) => {
    const socialLinks = [
        { icon: Github, link: profileData.github, color: '#333', type: 'external' },
        { icon: Linkedin, link: profileData.linkedin, color: '#0077b5', type: 'external' },
        { icon: Mail, link: `mailto:${profileData.email}`, color: '#EA4335', type: 'mail' },
        { icon: Phone, link: `tel:${profileData.phone}`, color: '#22c55e', type: 'phone' },
    ];

    return (
        <div className="grid grid-cols-4 gap-1.5 p-1">
            {socialLinks.map(({ icon: Icon, link, color }, i) => (
                <a
                    key={i}
                    href={link || '#'}
                    target={(link?.startsWith('http') ?? false) ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:-translate-y-0.75"
                    style={{
                        backgroundColor: `${color}1A`,
                        color: color,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = color;
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${color}1A`;
                        e.currentTarget.style.color = color;
                    }}
                >
                    <Icon size={20} />
                </a>
            ))}
        </div>
    )
}

export default SocialCard;
