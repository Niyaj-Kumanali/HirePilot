import { useRef, useEffect, useState } from 'react';
import { Send, Phone, Video, Info, Search, MoreVertical, Smile, CheckCheck, MessageSquare, Pencil, Pin, Paperclip } from 'lucide-react';
import { useRealTimeChat } from '../../hooks/useRealTimeChat';

const AVATAR_COLORS = [
  'from-primary to-secondary',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
  'from-sky-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-purple-600',
];

const getInitials = (name: string) => name.charAt(0).toUpperCase();
const getAvatarColor = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const groupMessagesByDate = (messages: any[]) => {
  const groups: { date: string; messages: any[] }[] = [];
  let currentDate = '';

  for (const msg of messages) {
    const msgDate = new Date(msg.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (msgDate !== currentDate) {
      currentDate = msgDate;
      groups.push({ date: msgDate, messages: [msg] });
    } else {
      groups[groups.length - 1].messages.push(msg);
    }
  }
  return groups;
};

const formatDateLabel = (dateStr: string) => {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  return dateStr;
};

const Messages = () => {
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isTyping]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage('');
  };

  const messageGroups = groupMessagesByDate(activeMessages);
  const filteredConversations = conversations.filter(c =>
    c.participants[0].name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const pinnedConversations = filteredConversations.slice(0, 1);
  const regularConversations = filteredConversations.slice(1);

  const ChatBubble = ({ msg, isMe }: { msg: any; isMe: boolean }) => (
    <div className={`flex gap-2 ${isMe ? 'flex-row-reverse self-end' : 'self-start'} max-w-[75%] group`}>
      {!isMe && (
        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getAvatarColor(activeConversation?.participants[0]?.name || '')} flex items-center justify-center text-[0.7rem] font-bold text-white flex-shrink-0 mt-1`}>
          {getInitials(activeConversation?.participants[0]?.name || '')}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <div
          className={`
            px-3 py-2 text-sm leading-relaxed
            ${isMe
              ? 'rounded-[18px_18px_4px_18px] text-white shadow-button'
              : 'rounded-[18px_18px_18px_4px] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 border border-white/60 dark:border-white/10 shadow-sm'
            }
          `}
          style={isMe ? { background: 'linear-gradient(135deg, #a855f7, #6366f1)' } : undefined}
        >
          <div className="text-[0.9rem] leading-relaxed">{msg.text}</div>
          <div className={`flex items-center gap-1 mt-0.5 ${isMe ? 'justify-end' : 'justify-end'}`}>
            <span className="text-[0.65rem] opacity-60">{msg.timestamp}</span>
            {isMe && <CheckCheck size={12} className="opacity-70" />}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-0 md:p-4 h-[calc(100vh-70px)] flex justify-center">
      <div className="w-full max-w-[1200px] h-full flex overflow-hidden rounded-none md:rounded-2xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-card">
        {/* Sidebar */}
        <div className={`w-full md:w-[340px] border-r border-white/60 dark:border-white/10 flex-col bg-white/50 dark:bg-[#1a1d23]/50 backdrop-blur-[12px] ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
          {/* Sidebar Header */}
          <div className="p-3 border-b border-white/60 dark:border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <h5 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">Messages</h5>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                <Pencil size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus-within:border-primary focus-within:shadow-[0_0_0_2px_rgba(168,85,247,0.1)] transition-all">
              <Search size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Pinned */}
            {pinnedConversations.length > 0 && !searchQuery && (
              <div className="px-2 pt-2 pb-1">
                <div className="flex items-center gap-1 px-2 mb-1">
                  <Pin size={12} className="text-gray-400" />
                  <span className="text-[0.65rem] font-bold uppercase text-gray-400 tracking-wider">Pinned</span>
                </div>
                {pinnedConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${selectedChat === conv.id ? 'bg-primary/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(conv.participants[0].name)} flex items-center justify-center font-bold text-white text-sm`}>
                        {getInitials(conv.participants[0].name)}
                      </div>
                      {conv.participants[0].isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-white dark:border-[#1a1d23]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{conv.participants[0].name}</span>
                        <span className="text-[0.6rem] text-gray-400">{conv.lastMessageTime}</span>
                      </div>
                      <span className="text-xs text-gray-400 truncate block mt-0.5">{conv.lastMessage}</span>
                    </div>
                  </button>
                ))}
                <div className="border-t border-white/60 dark:border-white/10 my-1.5 mx-2" />
              </div>
            )}

            {/* All Conversations */}
            <div className="px-2 pb-2">
              {!searchQuery && regularConversations.length > 0 && (
                <div className="flex items-center gap-1 px-2 mb-1 mt-1">
                  <span className="text-[0.65rem] font-bold uppercase text-gray-400 tracking-wider">All Messages</span>
                </div>
              )}
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center gap-1 py-8 text-gray-400">
                  <MessageSquare size={24} className="opacity-50" />
                  <span className="text-xs font-semibold">No conversations found</span>
                </div>
              ) : (
                regularConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${selectedChat === conv.id ? 'bg-primary/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(conv.participants[0].name)} flex items-center justify-center font-bold text-white text-sm`}>
                        {getInitials(conv.participants[0].name)}
                      </div>
                      {conv.participants[0].isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-white dark:border-[#1a1d23]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm truncate text-gray-900 dark:text-gray-100">{conv.participants[0].name}</span>
                        <span className="text-[0.6rem] text-gray-400 flex-shrink-0 ml-1">{conv.lastMessageTime}</span>
                      </div>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-gray-400 truncate">{conv.lastMessage}</span>
                        {conv.unreadCount > 0 && (
                          <span className="bg-primary text-white text-[0.6rem] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full ml-1">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex-col bg-white/80 dark:bg-[#1a1d23]/80 ${activeConversation ? 'flex' : 'hidden md:flex'}`}>
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <header className="px-3 py-2.5 border-b border-white/60 dark:border-white/10 flex items-center justify-between bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(activeConversation.participants[0].name)} flex items-center justify-center font-bold text-white text-sm shadow-button flex-shrink-0`}>
                    {getInitials(activeConversation.participants[0].name)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900 dark:text-gray-100">{activeConversation.participants[0].name}</div>
                    <div className={`text-[0.65rem] font-semibold ${activeConversation.participants[0].isOnline ? 'text-[#22c55e]' : 'text-gray-400'}`}>
                      {activeConversation.participants[0].isOnline ? '● Online' : 'Offline'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"><Phone size={18} /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"><Video size={18} /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"><Info size={18} /></button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all"><MoreVertical size={18} /></button>
                </div>
              </header>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {messageGroups.map((group, gi) => (
                  <div key={gi}>
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-[0.65rem] font-semibold text-gray-400 bg-white/60 dark:bg-[#1a1d23]/60 px-2.5 py-1 rounded-full border border-white/60 dark:border-white/10 backdrop-blur-sm">
                        {formatDateLabel(group.date)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {group.messages.map((msg: any) => (
                        <ChatBubble key={msg.id} msg={msg} isMe={msg.isMe} />
                      ))}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 self-start">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${getAvatarColor(activeConversation.participants[0].name)} flex items-center justify-center text-[0.7rem] font-bold text-white flex-shrink-0`}>
                      {getInitials(activeConversation.participants[0].name)}
                    </div>
                    <div className="px-3 py-2.5 rounded-[18px_18px_18px_4px] bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <footer className="px-3 py-2.5 border-t border-white/60 dark:border-white/10 bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition-all flex-shrink-0">
                    <Paperclip size={18} />
                  </button>
                  <div className="flex-1 flex items-center px-3 py-1.5 rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 focus-within:border-primary focus-within:shadow-[0_0_0_2px_rgba(168,85,247,0.1)] transition-all">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 bg-transparent border-none outline-none py-1.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                    />
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-amber-400 transition-all flex-shrink-0">
                      <Smile size={18} />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white shadow-button hover:shadow-card-hover hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0 flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </footer>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <MessageSquare size={36} className="text-primary" />
              </div>
              <div className="text-center">
                <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">Your Messages</h5>
                <p className="text-sm text-gray-400">Select a conversation from the sidebar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
