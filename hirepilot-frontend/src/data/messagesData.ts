export interface Message {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
    isMe: boolean;
}

export interface Conversation {
    id: string;
    participants: {
        id: string;
        name: string;
        avatar?: string;
        isOnline: boolean;
    }[];
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

export const conversationsData: Conversation[] = [
    {
        id: 'conv-1',
        participants: [
            { id: 'u-1', name: 'Sarah Wilson', isOnline: true }
        ],
        lastMessage: 'Hi Nawaz, I saw your profile and would like to discuss the Frontend position...',
        lastMessageTime: '2h ago',
        unreadCount: 1
    },
    {
        id: 'conv-2',
        participants: [
            { id: 'u-2', name: 'John Smith', isOnline: false }
        ],
        lastMessage: 'Great, see you then.',
        lastMessageTime: '1d ago',
        unreadCount: 0
    },
    {
        id: 'conv-3',
        participants: [
            { id: 'u-3', name: 'AI Mentor', isOnline: true }
        ],
        lastMessage: 'You should focus more on system design questions.',
        lastMessageTime: '3d ago',
        unreadCount: 0
    }
];

export const messagesData: Record<string, Message[]> = {
    'conv-1': [
        { id: 'm-1', senderId: 'u-1', text: 'Hi Nawaz, I saw your profile and would like to discuss the Frontend position...', timestamp: '11:30 AM', isMe: false },
        { id: 'm-2', senderId: 'me', text: 'Thank you Sarah! I am interested. When can we talk?', timestamp: '11:45 AM', isMe: true }
    ],
    'conv-2': [
        { id: 'm-3', senderId: 'me', text: 'Sent the updated resume.', timestamp: 'Yesterday', isMe: true },
        { id: 'm-4', senderId: 'u-2', text: 'Great, see you then.', timestamp: 'Yesterday', isMe: false }
    ],
    'conv-3': [
        { id: 'm-5', senderId: 'u-3', text: 'How was your practice session today?', timestamp: '3 days ago', isMe: false },
        { id: 'm-6', senderId: 'me', text: 'It was good, but I struggled with recursion.', timestamp: '3 days ago', isMe: true },
        { id: 'm-7', senderId: 'u-3', text: 'You should focus more on system design questions.', timestamp: '3 days ago', isMe: false }
    ]
};
