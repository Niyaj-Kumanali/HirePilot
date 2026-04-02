import { useRef, useEffect, useState } from 'react';
import { Send, Phone, Video, Info, Search, MoreVertical, Paperclip, Smile, CheckCheck, MessageSquare } from 'lucide-react';
import { useRealTimeChat } from '../../hooks/useRealTimeChat';
import { Box, Typography, Avatar, TextField, IconButton, Stack, Fade, List, ListItemButton, ListItemAvatar, ListItemText, Badge, Paper, InputAdornment, useTheme, alpha } from '@mui/material';

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
    const theme = useTheme();

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
        <Box sx={{ p: { xs: 0, md: 3 }, height: 'calc(100vh - 70px)', display: 'flex', justifyContent: 'center', bgcolor: 'background.default' }}>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 1200,
                    height: '100%',
                    display: 'flex',
                    overflow: 'hidden',
                    borderRadius: { xs: 0, md: 3 },
                    bgcolor: 'background.paper',
                    border: { md: `1px solid ${alpha(theme.palette.divider, 0.1)}` },
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 350 },
                        borderRight: `1px solid ${theme.palette.divider}`,
                        display: { xs: activeConversation ? 'none' : 'flex', md: 'flex' },
                        flexDirection: 'column',
                        bgcolor: alpha(theme.palette.background.paper, 0.5),
                        backdropFilter: 'blur(12px)',
                    }}
                >
                    <Box sx={{ p: 2.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
                        <Typography variant="h5" fontWeight={800} sx={{ mb: 2, color: 'text.primary' }}>
                            Messages
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Search chats..."
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} color={theme.palette.text.secondary} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 3,
                                    bgcolor: 'background.paper',
                                    '& fieldset': { borderColor: 'divider' },
                                    '&:hover fieldset': { borderColor: 'primary.main' },
                                }
                            }}
                        />
                    </Box>

                    <List sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
                        {conversations.map((conv) => (
                            <ListItemButton
                                key={conv.id}
                                onClick={() => setSelectedChat(conv.id)}
                                selected={selectedChat === conv.id}
                                sx={{
                                    borderRadius: 3,
                                    mb: 0.5,
                                    '&.Mui-selected': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.15) },
                                    },
                                    '&:hover': { bgcolor: alpha(theme.palette.action.hover, 0.5) }
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        invisible={!conv.participants[0].isOnline}
                                        sx={{ '& .MuiBadge-badge': { bgcolor: '#22c55e', color: '#22c55e', boxShadow: `0 0 0 2px ${theme.palette.background.paper}` } }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: 'transparent',
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                                fontWeight: 600,
                                                color: 'white'
                                            }}
                                        >
                                            {conv.participants[0].name.charAt(0)}
                                        </Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Typography variant="subtitle1" fontWeight={700} noWrap sx={{ maxWidth: '70%' }}>
                                                {conv.participants[0].name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {conv.lastMessageTime}
                                            </Typography>
                                        </Stack>
                                    }
                                    secondary={
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                                            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: '80%', opacity: 0.8 }}>
                                                {conv.lastMessage}
                                            </Typography>
                                            {conv.unreadCount > 0 && (
                                                <Box
                                                    sx={{
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 700,
                                                        px: 0.75,
                                                        py: 0.25,
                                                        borderRadius: 1,
                                                        lineHeight: 1
                                                    }}
                                                >
                                                    {conv.unreadCount}
                                                </Box>
                                            )}
                                        </Stack>
                                    }
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>

                {/* Chat Area */}
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: activeConversation ? 'flex' : 'none', md: 'flex' },
                        flexDirection: 'column',
                        bgcolor: 'background.default',
                    }}
                >
                    {activeConversation ? (
                        <>
                            <Box
                                component="header"
                                sx={{
                                    p: 2,
                                    borderBottom: `1px solid ${theme.palette.divider}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar
                                        sx={{
                                            bgcolor: 'transparent',
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            fontWeight: 600,
                                            boxShadow: theme.shadows[2]
                                        }}
                                    >
                                        {activeConversation.participants[0].name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={700}>
                                            {activeConversation.participants[0].name}
                                        </Typography>
                                        <Typography variant="caption" fontWeight={600} sx={{ color: activeConversation.participants[0].isOnline ? '#22c55e' : 'text.secondary' }}>
                                            {activeConversation.participants[0].isOnline ? 'Online' : 'Offline'}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <IconButton size="small"><Phone size={20} /></IconButton>
                                    <IconButton size="small"><Video size={20} /></IconButton>
                                    <IconButton size="small"><Info size={20} /></IconButton>
                                    <IconButton size="small"><MoreVertical size={20} /></IconButton>
                                </Stack>
                            </Box>

                            <Box sx={{ flex: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {activeMessages.map((msg) => (
                                    <Fade in={true} key={msg.id} timeout={300}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 1.5,
                                                alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
                                                maxWidth: '80%',
                                                flexDirection: msg.isMe ? 'row-reverse' : 'row',
                                            }}
                                        >
                                            {!msg.isMe && (
                                                <Avatar
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        fontSize: '0.8rem',
                                                        bgcolor: 'background.paper',
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        color: 'text.secondary'
                                                    }}
                                                >
                                                    {activeConversation.participants[0].name.charAt(0)}
                                                </Avatar>
                                            )}
                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: msg.isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                                                    bgcolor: msg.isMe ? 'transparent' : 'background.paper',
                                                    background: msg.isMe ? `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` : undefined,
                                                    color: msg.isMe ? 'common.white' : 'text.primary',
                                                    boxShadow: msg.isMe ? `0 4px 15px ${alpha(theme.palette.primary.main, 0.2)}` : theme.shadows[1],
                                                    border: !msg.isMe ? `1px solid ${theme.palette.divider}` : 'none',
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontSize: '0.95rem', lineHeight: 1.5 }}>
                                                    {msg.text}
                                                </Typography>
                                                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={0.5} sx={{ mt: 0.5, opacity: 0.7 }}>
                                                    <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'inherit' }}>
                                                        {msg.timestamp}
                                                    </Typography>
                                                    {msg.isMe && <CheckCheck size={14} />}
                                                </Stack>
                                            </Box>
                                        </Box>
                                    </Fade>
                                ))}
                                {isTyping && (
                                    <Fade in={true} timeout={300}>
                                        <Box sx={{ display: 'flex', gap: 1.5, alignSelf: 'flex-start' }}>
                                            <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}`, color: 'text.secondary' }}>
                                                {activeConversation.participants[0].name.charAt(0)}
                                            </Avatar>
                                            <Box sx={{ p: 1.5, borderRadius: '20px 20px 20px 4px', bgcolor: 'background.paper', border: `1px solid ${theme.palette.divider}`, display: 'flex', gap: 0.5, alignItems: 'center' }}>
                                                <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', opacity: 0.6 }} />
                                                <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', opacity: 0.6 }} />
                                                <Box sx={{ width: 6, height: 6, bgcolor: 'primary.main', borderRadius: '50%', opacity: 0.6 }} />
                                            </Box>
                                        </Box>
                                    </Fade>
                                )}
                                <div ref={chatEndRef} />
                            </Box>

                            <Box
                                component="footer"
                                sx={{
                                    p: 2,
                                    borderTop: `1px solid ${theme.palette.divider}`,
                                    display: 'flex',
                                    gap: 1.5,
                                    alignItems: 'center',
                                    bgcolor: 'background.paper'
                                }}
                            >
                                <IconButton size="small"><Paperclip size={20} /></IconButton>
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        bgcolor: alpha(theme.palette.background.default, 0.5),
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 4,
                                        px: 2,
                                        py: 0.5,
                                        '&:focus-within': {
                                            borderColor: 'primary.main',
                                            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.1)}`
                                        }
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        style={{
                                            flex: 1,
                                            border: 'none',
                                            background: 'none',
                                            outline: 'none',
                                            padding: '8px 0',
                                            color: theme.palette.text.primary,
                                            fontSize: '0.95rem'
                                        }}
                                    />
                                    <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: '#fbbf24' } }}><Smile size={20} /></IconButton>
                                </Box>
                                <IconButton
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        width: 48,
                                        height: 48,
                                        '&:hover': { bgcolor: 'primary.dark' },
                                        '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' }
                                    }}
                                >
                                    <Send size={20} />
                                </IconButton>
                            </Box>
                        </>
                    ) : (
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, color: 'text.secondary' }}>
                            <Box sx={{ p: 3, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: '50%' }}>
                                <MessageSquare size={48} color={theme.palette.primary.main} />
                            </Box>
                            <Typography variant="h5" fontWeight={700} color="text.primary">Your Messages</Typography>
                            <Typography variant="body1">Select a conversation to start chatting</Typography>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default Messages;