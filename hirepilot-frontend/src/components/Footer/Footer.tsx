import { Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

interface SocialLink {
    icon: React.ComponentType<{ size: number }>;
    label: string;
    to: string;
}

interface FooterLink {
    label: string;
    to: string;
}

const SOCIAL_LINKS: SocialLink[] = [
    { icon: Linkedin, label: 'LinkedIn', to: 'https://linkedin.com/in/nawaj-kumanali' },
    { icon: Github, label: 'GitHub', to: 'https://github.com/nawaz-kumanali' },
];

const PLATFORM_LINKS: FooterLink[] = [
    { label: 'Home', to: '/' },
    { label: 'Job Board', to: '/jobs' },
    { label: 'Mock Prep', to: '/interview' },
    { label: 'About Us', to: '/about' },
];

const LEGAL_LINKS: FooterLink[] = [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
];

const CONTACT_INFO = {
    email: 'iamnawazahmad777@gmail.com',
    location: 'Nipani, Karnataka, India',
};

const BRAND_DESCRIPTION =
    'The ultimate companion for modern developers. Practice, prepare, and land your dream job with AI-driven mock interviews.';

const Footer = () => {
    return (
        <footer
            className="
                relative overflow-hidden
                bg-white dark:bg-[#1a1d23]
                border-t border-[#e0e0e0] dark:border-[#3c4043]
                py-5 md:py-8 mt-auto
                before:absolute before:top-0 before:left-0 before:right-0 before:h-[120px]
                before:bg-gradient-to-b before:from-primary/5 before:to-transparent
                before:pointer-events-none
            "
        >
            <div className="mx-auto w-full max-w-7xl px-4">
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                    {/* Brand Section */}
                    <div className="col-span-12 md:col-span-5">
                        <div className="flex flex-col gap-2">
                            <Logo />

                            <div
                                className="w-10 h-1 rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, #a855f7, #6366f1)',
                                }}
                            />

                            <p className="text-sm max-w-[360px] leading-relaxed text-[#5f6368] dark:text-[#9aa0a6]">
                                {BRAND_DESCRIPTION}
                            </p>

                            <div className="flex flex-row gap-1">
                                {SOCIAL_LINKS.map(({ icon: Icon, label, to }) => (
                                    <a
                                        key={label}
                                        href={to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        title={label}
                                        className="
                                            w-10 h-10 flex items-center justify-center rounded-lg
                                            border border-[#e0e0e0]/60 dark:border-[#3c4043]/60
                                            bg-[#f5f5f5]/60 dark:bg-[#0f172a]/60
                                            backdrop-blur-[6px]
                                            text-[#5f6368] dark:text-[#9aa0a6]
                                            transition-all duration-300
                                            hover:bg-primary hover:text-white
                                            hover:-translate-y-[3px]
                                            hover:shadow-[0_10px_24px_rgba(168,85,247,0.3)]
                                        "
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-6 md:col-span-3">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs tracking-[1.5px] font-bold text-[#5f6368] dark:text-[#9aa0a6] uppercase">
                                PLATFORM
                            </span>

                            <div className="flex flex-col gap-1.5">
                                {PLATFORM_LINKS.map(({ label, to }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="
                                            text-sm text-[#5f6368] dark:text-[#9aa0a6] no-underline
                                            transition-all duration-200 w-fit
                                            relative inline-block
                                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                                            after:w-0 after:h-[2px] after:bg-primary
                                            after:transition-all after:duration-250 after:ease
                                            hover:text-primary hover:after:w-full
                                        "
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="col-span-6 md:col-span-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs tracking-[1.5px] font-bold text-[#5f6368] dark:text-[#9aa0a6] uppercase">
                                CONTACT
                            </span>

                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-1.5 items-start">
                                    <Mail size={16} className="mt-0.5 flex-shrink-0 text-[#5f6368] dark:text-[#9aa0a6]" />
                                    <a
                                        href={`mailto:${CONTACT_INFO.email}`}
                                        className="
                                            text-sm text-[#5f6368] dark:text-[#9aa0a6] no-underline break-all
                                            transition-all duration-200 w-fit
                                            relative inline-block
                                            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                                            after:w-0 after:h-[2px] after:bg-primary
                                            after:transition-all after:duration-250 after:ease
                                            hover:text-primary hover:after:w-full
                                        "
                                    >
                                        {CONTACT_INFO.email}
                                    </a>
                                </div>

                                <div className="flex flex-row gap-1.5 items-start">
                                    <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[#5f6368] dark:text-[#9aa0a6]" />
                                    <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                                        {CONTACT_INFO.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-5 opacity-40 border-[#e0e0e0] dark:border-[#3c4043]" />

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                        &copy; {new Date().getFullYear()} HirePilot.
                    </span>

                    <div className="flex flex-row gap-3">
                        {LEGAL_LINKS.map(({ label, to }) => (
                            <Link
                                key={label}
                                to={to}
                                className="
                                    text-xs text-[#5f6368] dark:text-[#9aa0a6] no-underline
                                    transition-all duration-200 w-fit
                                    relative inline-block
                                    after:content-[''] after:absolute after:left-0 after:-bottom-0.5
                                    after:w-0 after:h-[2px] after:bg-primary
                                    after:transition-all after:duration-250 after:ease
                                    hover:text-primary hover:after:w-full
                                "
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
