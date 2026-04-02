export interface Notification {
    id: string;
    type: 'job' | 'message' | 'system';
    title: string;
    description: string;
    time: string;
    isRead: boolean;
    link?: string;
}

export const notificationsData: Notification[] = [
    {
        id: '1',
        type: 'job',
        title: 'New job matching your profile!',
        description: 'Senior Full Stack Developer at Tech Corp matches your skills in React and Node.js.',
        time: '5 minutes ago',
        isRead: false,
        link: '/jobs'
    },
    {
        id: '2',
        type: 'message',
        title: 'New message from Sarah Wilson',
        description: 'Hi Nawaz, I saw your profile and would like to discuss the Frontend position...',
        time: '2 hours ago',
        isRead: false,
        link: '/messages'
    },
    {
        id: '3',
        type: 'system',
        title: 'Interview scheduled',
        description: 'Your interview with Design Studio is confirmed for Dec 30, 2025 at 3:30 PM.',
        time: '2 days ago',
        isRead: true,
        link: '/interview'
    },
    {
        id: '5',
        type: 'job',
        title: 'Application viewed',
        description: 'Cloud Systems just viewed your application for Backend Engineer.',
        time: '3 days ago',
        isRead: true,
        link: '/jobs'
    }
];
