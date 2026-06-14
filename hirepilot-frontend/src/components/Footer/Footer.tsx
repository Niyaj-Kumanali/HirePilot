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
        <footer className="relative overflow-hidden border-t border-black/[0.04] dark:border-white/[0.06] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-xl mt-auto">
            <div className="mx-auto w-full max-w-7xl px-4 py-10 md:py-14">
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                    {/* Brand */}
                    <div className="col-span-12 md:col-span-5">
                        <div className="flex flex-col gap-3">
                            <Logo />
                            <p className="text-sm max-w-[360px] leading-relaxed text-[#5f6368] dark:text-[#9aa0a6]">
                                {BRAND_DESCRIPTION}
                            </p>
                            <div className="flex gap-2 mt-1">
                                {SOCIAL_LINKS.map(({ icon: Icon, label, to }) => (
                                    <a
                                        key={label}
                                        href={to}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        title={label}
                                        className="w-9 h-9 flex items-center justify-center rounded-xl border border-black/[0.04] dark:border-white/[0.06] bg-white/50 dark:bg-[#0f172a]/50 text-[#5f6368] dark:text-[#9aa0a6] transition-all duration-200 hover:bg-primary hover:text-white hover:-translate-y-0.5 hover:shadow-button"
                                    >
                                        <Icon size={15} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-6 md:col-span-3">
                        <div className="flex flex-col gap-3">
                            <span className="text-xs tracking-[1.5px] font-bold text-[#5f6368] dark:text-[#9aa0a6] uppercase">Platform</span>
                            <div className="flex flex-col gap-2">
                                {PLATFORM_LINKS.map(({ label, to }) => (
                                    <Link
                                        key={label}
                                        to={to}
                                        className="text-sm text-[#5f6368] dark:text-[#9aa0a6] no-underline transition-all duration-200 w-fit hover:text-primary"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="col-span-6 md:col-span-4">
                        <div className="flex flex-col gap-3">
                            <span className="text-xs tracking-[1.5px] font-bold text-[#5f6368] dark:text-[#9aa0a6] uppercase">Contact</span>
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="shrink-0 text-[#5f6368] dark:text-[#9aa0a6]" />
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-[#5f6368] dark:text-[#9aa0a6] no-underline transition-all duration-200 hover:text-primary">
                                        {CONTACT_INFO.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="shrink-0 text-[#5f6368] dark:text-[#9aa0a6]" />
                                    <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                                        {CONTACT_INFO.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-black/[0.04] dark:border-white/[0.06]" />

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6]">
                        &copy; {new Date().getFullYear()} HirePilot. All rights reserved.
                    </span>
                    <div className="flex gap-4">
                        {LEGAL_LINKS.map(({ label, to }) => (
                            <Link
                                key={label}
                                to={to}
                                className="text-xs text-[#5f6368] dark:text-[#9aa0a6] no-underline transition-all duration-200 hover:text-primary"
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
