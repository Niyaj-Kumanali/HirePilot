import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for managing the browser's MediaDevices API (Camera and Microphone).
 * 
 * Automatically handles stream acquisition when `active` is true and ensures
 * proper cleanup of tracks to prevent hardware usage indicators from remaining on.
 * 
 * @param {boolean} active - Whether the media stream should be currently active.
 * @returns {Object} Object containing the stream, status flags, and toggle functions.
 */
export const useMediaStream = (active: boolean) => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);

    const stopStream = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            setStream(null);
        }
    }, []);

    const startStream = useCallback(async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            streamRef.current = mediaStream;
            setStream(mediaStream);
            setError(null);
            return mediaStream;
        } catch (err: unknown) {
            const errorInstance = err instanceof Error ? err : new Error(String(err));
            console.error("Media Access Error:", errorInstance);
            setError(errorInstance);
            return null;
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (streamRef.current) {
            const audioTracks = streamRef.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsMuted(audioTracks.length > 0 ? !audioTracks[0].enabled : false);
        }
    }, []);

    const toggleVideo = useCallback(() => {
        if (streamRef.current) {
            const videoTracks = streamRef.current.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(videoTracks.length > 0 ? !videoTracks[0].enabled : false);
        }
    }, []);

    useEffect(() => {
        const handleStream = async () => {
            if (active) {
                await startStream();
            } else {
                stopStream();
            }
        };
        handleStream();
        return () => {
            stopStream();
        };
    }, [active, startStream, stopStream]);

    return {
        stream,
        error,
        isMuted,
        isVideoOff,
        toggleMute,
        toggleVideo,
        startStream,
        stopStream
    };
};
