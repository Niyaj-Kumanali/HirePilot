import type { CurrentUserState } from "../store/CurrentUser/currentuser.types";

export const currentUser: CurrentUserState = {
    firstName: 'Nawaz',
    lastName: 'Kumanali',
    headline: 'Full Stack Developer | Open Source Enthusiast',
    location: 'Nipani, India',
    email: 'iamnawazahmad777@gmail.com',
    phone: '+91 8217097121',
    bio: 'Passionate about building scalable applications and mentoring junior developers. Love exploring new technologies and contributing to open source projects.',
    website: '',
    joinedDate: 'Joined March 2021',
    linkedin: 'https://linkedin.com/in/nawaj-kumanali',
    github: 'https://github.com/nawaz-kumanali',
    twitter: 'https://twitter.com/nawaz_kumanali',
    experience: [
        {
            company: 'TechFlow Systems',
            role: 'Senior Full Stack Developer',
            period: 'Jan 2022 - Present',
            description: 'Leading the development of highly scalable microservices and real-time data visualizers.'
        },
        {
            company: 'Digital Wave',
            role: 'Frontend Engineer',
            period: 'Jun 2019 - Dec 2021',
            description: 'Specialized in building high-performance Vue and React applications for enterprise clients.'
        }
    ],
    skills: [
        { name: 'React', category: 'Frontend' },
        { name: 'TypeScript', category: 'Language' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'PostgreSQL', category: 'Database' },
        { name: 'AWS', category: 'DevOps' },
        { name: 'System Design', category: 'Architecture' },
    ],
    readiness: [
        { label: 'Technical Depth', score: 85, icon: 'Zap', color: '#6366f1' },
        { label: 'Communication', score: 92, icon: 'Activity', color: '#10b981' },
        { label: 'Behavioral', score: 88, icon: 'Target', color: '#ec4899' },
    ],
    interviewsCount: 12,
    successRate: 92,
}
