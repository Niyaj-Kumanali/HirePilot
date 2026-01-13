import { useState, useEffect, useCallback } from 'react';
import { type Message, type Conversation, conversationsData, messagesData } from '../data/messagesData';

const STORAGE_KEY_MESSAGES = 'hp_chat_messages';
const STORAGE_KEY_CONVERSATIONS = 'hp_chat_conversations';
const CHANNEL_NAME = 'hp_chat_channel';

export const useRealTimeChat = (initialSelectedChatId: string) => {
    const [selectedChat, setSelectedChat] = useState<string>(initialSelectedChatId);
    const [conversations, setConversations] = useState<Conversation[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY_CONVERSATIONS);
        return saved ? JSON.parse(saved) : conversationsData;
    });
    const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
        const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
        return saved ? JSON.parse(saved) : messagesData;
    });

    const [isTyping, setIsTyping] = useState(false);
    const [channel] = useState(() => new BroadcastChannel(CHANNEL_NAME));

    // Sync with LocalStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_CONVERSATIONS, JSON.stringify(conversations));
    }, [conversations]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    }, [messages]);

    // Handle incoming messages from other tabs
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { type, payload } = event.data;

            if (type === 'NEW_MESSAGE') {
                const { chatId, message } = payload;
                setMessages(prev => ({
                    ...prev,
                    [chatId]: [...(prev[chatId] || []), message]
                }));

                setConversations(prev => prev.map(c =>
                    c.id === chatId
                        ? { ...c, lastMessage: message.text, lastMessageTime: 'Just now', unreadCount: c.id !== selectedChat ? c.unreadCount + 1 : 0 }
                        : c
                ));
            } else if (type === 'TYPING_START' && payload.chatId === selectedChat) {
                setIsTyping(true);
            } else if (type === 'TYPING_STOP' && payload.chatId === selectedChat) {
                setIsTyping(false);
            }
        };

        channel.addEventListener('message', handleMessage);
        return () => channel.removeEventListener('message', handleMessage);
    }, [channel, selectedChat]);

    const sendMessage = useCallback((text: string) => {
        const newMsg: Message = {
            id: `m-${Date.now()}`,
            senderId: 'me',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        // Update local state
        setMessages(prev => ({
            ...prev,
            [selectedChat]: [...(prev[selectedChat] || []), newMsg]
        }));

        setConversations(prev => prev.map(c =>
            c.id === selectedChat
                ? { ...c, lastMessage: text, lastMessageTime: 'Just now' }
                : c
        ));

        // Broadcast to other tabs
        channel.postMessage({
            type: 'NEW_MESSAGE',
            payload: { chatId: selectedChat, message: newMsg }
        });

        // Simulate Bot Response (If active chat is not 'me' sender based)
        if (selectedChat === 'conv-1' || selectedChat === 'conv-2' || selectedChat === 'conv-3') {
            // Start typing
            setIsTyping(true);
            channel.postMessage({ type: 'TYPING_START', payload: { chatId: selectedChat } });

            setTimeout(() => {
                const botMsg: Message = {
                    id: `b-${Date.now()}`,
                    senderId: 'bot',
                    text: `Thanks for your message! This is a simulated real-time response.`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMe: false
                };

                setMessages(prev => ({
                    ...prev,
                    [selectedChat]: [...(prev[selectedChat] || []), botMsg]
                }));

                setIsTyping(false);
                channel.postMessage({ type: 'TYPING_STOP', payload: { chatId: selectedChat } });

                channel.postMessage({
                    type: 'NEW_MESSAGE',
                    payload: { chatId: selectedChat, message: botMsg }
                });
            }, 2000);
        }
    }, [selectedChat, channel]);

    return {
        selectedChat,
        setSelectedChat,
        conversations,
        messages,
        sendMessage,
        isTyping,
        activeMessages: messages[selectedChat] || [],
        activeConversation: conversations.find(c => c.id === selectedChat)
    };
};
