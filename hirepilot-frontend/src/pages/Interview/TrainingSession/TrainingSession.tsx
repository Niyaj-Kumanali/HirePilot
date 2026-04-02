import { useRef, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../store/hooks';
import { saveInterviewResult } from '../../../store/Interview/interview.slice';

import { generateAIQuestion, getPerformanceReport, generateRealTimeInsight } from '../../../utility/aiHelpers';
import { getAiStream } from '../../../utility/HandleAi';

// Hooks
import { useSpeech } from '../../../hooks/useSpeech';
import { useMediaStream } from '../../../hooks/useMediaStream';

// Components
import SessionHeader from './SessionHeader/SessionHeader';
import VideoGrid from './VideoGrid/VideoGrid';
import ControlBar from './ControlBar/ControlBar';
import PerformanceReport from './PerformanceReport/PerformanceReport';
import ErrorOverlay from './ErrorOverlay/ErrorOverlay';

import type { Message, PerformanceReportData } from '../../../types/interview';

/**
 * The core component for the AI Interview Simulation session.
 * 
 * Manages the entire lifecycle of an interview:
 * 1. Initializes the AI interviewer with a seed message.
 * 2. Streams real-time AI responses using Gemini AI.
 * 3. Provides real-time insights based on candidate input.
 * 4. Manages media streams (video/audio) and speech synthesis.
 * 5. Generates and saves a performance report upon completion.
 */
const TrainingSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const interview = location.state?.interview;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isFinishing, setIsFinishing] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [report, setReport] = useState<PerformanceReportData | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);

  // Real-time Insight State
  const [insight, setInsight] = useState<string | null>(null);
  const [isInsightVisible, setIsInsightVisible] = useState(false);
  const [systemError, setSystemError] = useState<{ title: string; message: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const initializationStarted = useRef(false);

  // Use Custom Hooks
  const { speak, isSpeaking: isAiSpeaking } = useSpeech({ enabled: isAudioEnabled });
  const {
    isMuted,
    isVideoOff,
    toggleMute,
    toggleVideo,
    stream
  } = useMediaStream(!!interview);

  // Redirect if no interview data
  useEffect(() => {
    if (!interview) {
      navigate('/interview');
    }
  }, [interview, navigate]);

  // Sync video ref with stream
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (interview && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer!);
  }, [interview, timeLeft]);

  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content: trimmedInput, timestamp: new Date() };
    const currentMessages = [...messages, userMsg];

    setUserInput("");
    setIsLocalLoading(true);
    setIsAiThinking(true);
    setMessages(currentMessages);

    const aiMsgId = `ai-${Date.now()}`;
    try {
      // 1. Get real-time insight while AI is thinking
      const position = interview.position || interview.title || "Candidate";
      const insightText = await generateRealTimeInsight(trimmedInput, position);
      if (insightText) {
        setInsight(insightText);
        setIsInsightVisible(true);
        setTimeout(() => setIsInsightVisible(false), 5000);
      }

      // 2. Start Message Stream
      const streamRes = await getAiStream(trimmedInput, messages);
      let accumulatedText = "";

      setMessages([...currentMessages, { id: aiMsgId, role: 'ai', content: "", timestamp: new Date() }]);

      let lastUpdateTime = Date.now();
      const UPDATE_INTERVAL = 100;

      for await (const chunk of streamRes) {
        const chunkText = (chunk as { text: () => string }).text();
        accumulatedText += chunkText;

        const now = Date.now();
        if (now - lastUpdateTime > UPDATE_INTERVAL) {
          setMessages(prev =>
            prev.map(m => m.id === aiMsgId ? { ...m, content: accumulatedText } : m)
          );
          lastUpdateTime = now;
        }
      }

      setMessages(prev =>
        prev.map(m => m.id === aiMsgId ? { ...m, content: accumulatedText } : m)
      );
      setIsAiThinking(false);
      setIsLocalLoading(false);
      speak(accumulatedText);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "AI Connection Issue";
      console.error("Stream Error:", error);
      setSystemError({
        title: "AI Connection Issue",
        message: errorMessage || "We're having trouble connecting to the AI. This usually happens due to rate limits or temporary service interruptions. Please try again in 1 minute."
      });
      setIsLocalLoading(false);
      setIsAiThinking(false);
    }
  };

  const handleFinishInterview = async () => {
    setIsFinishing(true);
    try {
      const finalReport = await getPerformanceReport(messages, interview.position || interview.title || "Candidate");
      const reportWithData = {
        ...finalReport,
        position: interview.position || interview.title || "Candidate",
        company: interview.company || interview.category || "Employer",
        topics: interview.topics || [interview.category || "General"]
      };

      setReport(reportWithData);
      dispatch(saveInterviewResult(reportWithData));

    } catch (error: unknown) {
      console.error("Finish Error:", error);
      navigate('/interview');
    } finally {
      setIsFinishing(false);
    }
  };

  const initializeSession = useCallback(async () => {
    if (messages.length > 0 || !interview) return;

    // 1. Seed message to satisfy Gemini's requirement for first message being from 'user'
    const seed: Message = {
      id: 'seed',
      role: 'user',
      content: "Let's start the interview simulation.",
      timestamp: new Date(),
      hidden: true
    };

    try {
      const question = await generateAIQuestion({ interview, messages: [] });
      const pos = interview.position || interview.title || "Candidate";
      const comp = interview.company || interview.category || "Employer";
      const topicsList = interview.topics || [interview.category || "General"];

      const combinedIntro = `Welcome! I'm your AI Interviewer. We are going to practice for the ${pos} role at ${comp}. I'll focus on: ${topicsList.join(', ')}.\n\n${question}`;

      const firstAiMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'ai',
        content: combinedIntro,
        timestamp: new Date(),
      };

      setMessages([seed, firstAiMsg]);
      speak(combinedIntro);
    } catch (error: unknown) {
      console.error("Initialization error:", error);
      setSystemError({
        title: "Simulation Error",
        message: "Failed to initialize the AI interviewer. This might be a temporary connectivity issue. Please try again later."
      });
    }
  }, [interview, messages.length, speak]);

  useEffect(() => {
    if (interview && messages.length === 0 && !initializationStarted.current) {
      initializationStarted.current = true;
      initializeSession();
    }
  }, [interview, messages.length, initializeSession]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!interview) return null;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <SessionHeader
          position={interview.position}
          company={interview.company}
          timeLeft={timeLeft}
          formatTime={formatTime}
          onFinish={handleFinishInterview}
          onClose={() => navigate('/interview')}
          isFinishing={isFinishing}
          canFinish={messages.length > 0}
        />

        <VideoGrid
          isSpeaking={isAiSpeaking}
          isLoading={isLocalLoading}
          isInsightVisible={isInsightVisible}
          insight={insight}
          lastAiMessage={messages.filter(m => m.role === 'ai' && !m.hidden).pop()?.content}
          videoRef={videoRef}
          isVideoOff={isVideoOff}
          isMuted={isMuted}
        />

        <ControlBar
          isMuted={isMuted}
          isVideoOff={isVideoOff}
          isAudioEnabled={isAudioEnabled}
          onToggleMute={toggleMute}
          onToggleVideo={toggleVideo}
          onToggleAudio={() => setIsAudioEnabled(!isAudioEnabled)}
          isListening={isListening}
          onToggleListening={() => setIsListening(!isListening)}
          userInput={userInput}
          setUserInput={setUserInput}
          onSendMessage={handleSendMessage}
          isLoading={isLocalLoading || isAiThinking}
        />
      </Box>

      {report && (
        <PerformanceReport
          report={report}
          position={interview.position}
          onClose={() => navigate('/interview')}
        />
      )}

      {systemError && (
        <ErrorOverlay
          error={systemError}
          onRetry={() => setSystemError(null)}
          onClose={() => navigate('/interview')}
        />
      )}
    </Box>
  );
};

export default TrainingSession;
