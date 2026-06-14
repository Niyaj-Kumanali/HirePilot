import { useRef, useEffect, useState } from 'react';
import { Send, Phone, Video, Info, Search, MoreVertical, Paperclip, Smile, CheckCheck, MessageSquare } from 'lucide-react';
import { useRealTimeChat } from '../../hooks/useRealTimeChat';

const Messages = () => {
    const [newMessage, setNewMessage] = useState('');
    const {
        selectedChat,
        setSelectedChat,
        conversations,
        sendMessage,
        isTyping,
        activeMessages,
        activeConversation
    } = useRealTimeChat('conv-1');

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [activeMessages, isTyping]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        sendMessage(newMessage);
        setNewMessage('');
    };

    return (
        <div className="p-0 md:p-3 h-[calc(100vh-70px)] flex justify-center">
            <div className="w-full max-w-[1200px] h-full flex overflow-hidden rounded-none md:rounded-2xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-card">
                {/* Sidebar */}
                <div
                    className={`
                        w-full md:w-[350px] border-r border-white/60 dark:border-white/10
                        flex-col bg-white/50 dark:bg-[#1a1d23]/50 backdrop-blur-[12px]
                        ${activeConversation ? 'hidden md:flex' : 'flex'}
                    `}
                >
                    <div className="p-2.5 border-b border-white/60 dark:border-white/10">
                        <h5 className="text-xl font-extrabold mb-2 text-gray-900 dark:text-gray-100">Messages</h5>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus-within:border-primary">
                            <Search size={18} className="text-gray-500 dark:text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search chats..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-1 space-y-0.5">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedChat(conv.id)}
                                className={`
                                    w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all
                                    ${selectedChat === conv.id
                                        ? 'bg-primary/10 border-l-4 border-l-primary hover:bg-primary/15'
                                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                                    }
                                `}
                            >
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white text-sm"
                                        style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
                                    >
                                        {conv.participants[0].name.charAt(0)}
                                    </div>
                                    {conv.participants[0].isOnline && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-white dark:border-[#1a1d23]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm truncate max-w-[70%] text-gray-900 dark:text-gray-100">
                                            {conv.participants[0].name}
                                        </span>
                                        <span className="text-[0.7rem] text-gray-500 dark:text-gray-400">
                                            {conv.lastMessageTime}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center mt-0.5">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[80%] opacity-80">
                                            {conv.lastMessage}
                                        </span>
                                        {conv.unreadCount > 0 && (
                                            <span className="bg-primary text-white text-[0.7rem] font-bold px-0.75 py-0.25 rounded leading-none">
                                                {conv.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div
                    className={`
                        flex-1 flex-col bg-white/80 dark:bg-[#1a1d23]/80
                        ${activeConversation ? 'flex' : 'hidden md:flex'}
                    `}
                >
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <header className="p-2 border-b border-white/60 dark:border-white/10 flex justify-between items-center bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white text-sm shadow-button"
                                        style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
                                    >
                                        {activeConversation.participants[0].name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-gray-900 dark:text-gray-100">
                                            {activeConversation.participants[0].name}
                                        </div>
                                        <div className={`text-[0.7rem] font-semibold ${activeConversation.participants[0].isOnline ? 'text-[#22c55e]' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {activeConversation.participants[0].isOnline ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"><Phone size={20} /></button>
                                    <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"><Video size={20} /></button>
                                    <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"><Info size={20} /></button>
                                    <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"><MoreVertical size={20} /></button>
                                </div>
                            </header>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
                                {activeMessages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex gap-1.5 ${msg.isMe ? 'flex-row-reverse self-end' : 'self-start'} max-w-[80%]`}
                                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                                    >
                                        {!msg.isMe && (
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.8rem] bg-white/80 dark:bg-[#1a1d23]/80 border border-white/60 dark:border-white/10 text-gray-500 dark:text-gray-400 flex-shrink-0">
                                                {activeConversation.participants[0].name.charAt(0)}
                                            </div>
                                        )}
                                        <div
                                            className={`
                                                p-2 text-sm leading-relaxed
                                                ${msg.isMe
                                                    ? 'rounded-[20px_20px_4px_20px] text-white shadow-button'
                                                    : 'rounded-[20px_20px_20px_4px] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 border border-white/60 dark:border-white/10 shadow-card'
                                                }
                                            `}
                                            style={msg.isMe ? { background: 'linear-gradient(135deg, #a855f7, #6366f1)' } : undefined}
                                        >
                                            <div className="text-[0.95rem] leading-relaxed">{msg.text}</div>
                                            <div className={`flex justify-end items-center gap-0.5 mt-0.5 opacity-70 ${msg.isMe ? '' : ''}`}>
                                                <span className="text-[0.7rem]" style={{ color: 'inherit' }}>{msg.timestamp}</span>
                                                {msg.isMe && <CheckCheck size={14} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex gap-1.5 self-start" style={{ animation: 'fadeIn 0.3s ease-out' }}>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[0.8rem] bg-white/80 dark:bg-[#1a1d23]/80 border border-white/60 dark:border-white/10 text-gray-500 dark:text-gray-400 flex-shrink-0">
                                            {activeConversation.participants[0].name.charAt(0)}
                                        </div>
                                        <div className="p-1.5 rounded-[20px_20px_20px_4px] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 flex gap-0.5 items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-60 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-60 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-60 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <footer className="p-2 border-t border-white/60 dark:border-white/10 flex gap-1.5 items-center bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm">
                                <button className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 flex-shrink-0"><Paperclip size={20} /></button>
                                <div className="flex-1 flex items-center px-2 py-0.5 rounded-2xl border border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm focus-within:border-primary focus-within:shadow-[0_0_0_2px_rgba(168,85,247,0.1)]">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="flex-1 bg-transparent border-none outline-none py-2 text-[0.95rem] text-gray-900 dark:text-gray-100"
                                    />
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:text-yellow-400"><Smile size={20} /></button>
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-button"
                                >
                                    <Send size={20} />
                                </button>
                            </footer>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MessageSquare size={48} className="text-primary" />
                            </div>
                            <h5 className="text-xl font-bold text-gray-900 dark:text-gray-100">Your Messages</h5>
                            <p className="text-sm">Select a conversation to start chatting</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
