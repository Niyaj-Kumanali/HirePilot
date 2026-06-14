import { X, Camera } from 'lucide-react';
import { useEffect } from 'react';

interface ImageModalProps {
    onClose: () => void;
}

const ImageModal = ({ onClose }: ImageModalProps) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div
                className="relative w-full max-w-sm rounded-2xl border border-white/60 dark:border-white/10 animate-[fadeIn_0.2s_ease-out] bg-white/90 dark:bg-[#1a1d23]/90 backdrop-blur-xl"
            >
                <header className="flex justify-between items-center pb-2 p-4 border-b border-black/10 dark:border-white/10">
                    <span className="font-bold text-lg text-gray-900">Profile Picture</span>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-black/10 transition-all"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="p-4 space-y-2">
                    <button
                        className="w-full flex items-center gap-2 py-2 px-3 rounded-xl border border-black/10 dark:border-white/10 font-semibold text-sm text-gray-700 hover:bg-black/5 transition-all"
                    >
                        <Camera size={20} />
                        Upload Photo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
