import { useRef, useEffect, useState } from 'react';
import { Send, Phone, Video, Info, Search, MoreVertical, Paperclip, Smile, CheckCheck, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './messages.scss';
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
        <div className="messages-wrapper">
            <div className="messages-container">
                {/* Sidebar */}
                <aside className="messages-sidebar">
                    <div className="sidebar-header">
                        <h2>Messages</h2>
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Search chats..." />
                        </div>
                    </div>

                    <div className="conversations-list">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                className={`conversation-item ${selectedChat === conv.id ? 'active' : ''}`}
                                onClick={() => setSelectedChat(conv.id)}
                            >
                                <div className="avatar-wrapper">
                                    <div className="avatar">
                                        {conv.participants[0].name.charAt(0)}
                                    </div>
                                    {conv.participants[0].isOnline && <div className="online-indicator"></div>}
                                </div>
                                <div className="conv-info">
                                    <div className="conv-top">
                                        <span className="conv-name">{conv.participants[0].name}</span>
                                        <span className="conv-time">{conv.lastMessageTime}</span>
                                    </div>
                                    <div className="conv-bottom">
                                        <p className="last-msg">{conv.lastMessage}</p>
                                        {conv.unreadCount > 0 && (
                                            <span className="unread-badge">{conv.unreadCount}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Chat Area */}
                <main className="chat-area">
                    {activeConversation ? (
                        <>
                            <header className="chat-header">
                                <div className="user-profile">
                                    <div className="avatar">
                                        {activeConversation.participants[0].name.charAt(0)}
                                    </div>
                                    <div className="user-info">
                                        <h3>{activeConversation.participants[0].name}</h3>
                                        <span className="status">
                                            {activeConversation.participants[0].isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                                <div className="chat-actions">
                                    <button className="action-btn" title="Phone call"><Phone size={20} /></button>
                                    <button className="action-btn" title="Video call"><Video size={20} /></button>
                                    <button className="action-btn" title="Info"><Info size={20} /></button>
                                    <button className="action-btn" title="More options"><MoreVertical size={20} /></button>
                                </div>
                            </header>

                            <div className="chat-messages">
                                <AnimatePresence initial={false}>
                                    {activeMessages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            className={`message-row ${msg.isMe ? 'me' : 'them'}`}
                                        >
                                            {!msg.isMe && (
                                                <div className="msg-avatar">
                                                    {activeConversation.participants[0].name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="message-bubble">
                                                <p>{msg.text}</p>
                                                <div className="message-meta">
                                                    <span className="time">{msg.timestamp}</span>
                                                    {msg.isMe && <CheckCheck size={14} className="status-icon" />}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="message-row them"
                                    >
                                        <div className="msg-avatar">
                                            {activeConversation.participants[0].name.charAt(0)}
                                        </div>
                                        <div className="message-bubble typing">
                                            <div className="typing-dots">
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            <footer className="chat-input-area">
                                <div className="input-actions">
                                    <button className="icon-btn" title="Attach file"><Paperclip size={20} /></button>
                                </div>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    />
                                    <button className="smile-btn" title="Emoji"><Smile size={20} /></button>
                                </div>
                                <button
                                    className="send-btn"
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    title="Send message"
                                >
                                    <Send size={20} />
                                </button>
                            </footer>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <MessageSquare size={64} className="empty-icon" />
                            <h3>Your Messages</h3>
                            <p>Select a conversation to start chatting</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Messages;