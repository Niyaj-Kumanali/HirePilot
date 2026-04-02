export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Skill {
    name: string;
    category?: string;
}

export interface ReadinessMetric {
    label: string;
    score: number;
    icon: string; // Icon name string for storage
    color: string;
}

export interface CurrentUserState {
    firstName: string;
    lastName: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    bio: string;
    joinedDate: string;
    github: string;
    linkedin: string;
    website: string;
    twitter: string;
    experience: Experience[];
    skills: Skill[];
    readiness: ReadinessMetric[];
    interviewsCount: number;
    successRate: number;
}

