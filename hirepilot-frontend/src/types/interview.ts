export interface TrainingInterview {
    position: string;
    company: string;
    topics: string[];
}

export interface Interview extends TrainingInterview {
    id: number;
    title: string;
    date: string;
    time: string;
    duration: string;
    interviewer: string;
    status?: string;
    difficulty: string;
    score?: number;
    feedback?: string;
}

export interface CompletedInterview extends Interview {
    score: number;
    feedback: string;
}

export interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
    hidden?: boolean;
}

export interface InterviewSession {
    interview: TrainingInterview;
    messages: Message[];
}

export interface PerformanceReportData {
    communicationScore: number;
    technicalScore: number;
    overallScore: number;
    feedback: string;
    tips: string[];
}

export interface PrepTopic {
    id: number;
    title: string;
    category: string;
    difficulty: string;
}
