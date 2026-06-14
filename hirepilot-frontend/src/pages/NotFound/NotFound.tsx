import { ArrowLeft, Home, LayoutDashboard, MessageCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.back();
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background orbs */}
      {[
        { top: '10%', left: '10%', size: 200, delay: 0 },
        { top: '60%', right: '15%', size: 150, delay: 1 },
        { bottom: '15%', left: '20%', size: 180, delay: 2 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: pos.size,
            height: pos.size,
            background: 'rgba(168,85,247,0.05)',
            top: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            animation: `float ${6 + i * 2}s ease-in-out infinite`,
            animationDelay: `${pos.delay}s`,
          }}
        />
      ))}

      <div className="mx-auto w-full max-w-5xl px-4 relative z-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
            {/* 404 Display */}
            <div className="flex flex-row gap-2 items-center">
              <span className="text-[5rem] md:text-[8rem] font-black text-[#202124] dark:text-[#e8eaed]">4</span>
              <div className="relative w-[60px] md:w-[100px] h-[60px] md:h-[100px] rounded-full border-4 border-primary flex items-center justify-center bg-white/40 dark:bg-[#1a1d23]/40 backdrop-blur-sm">
                <div
                  className="w-[20px] md:w-[30px] h-[20px] md:h-[30px] rounded-full bg-primary"
                  style={{ animation: 'iconPulse 2s ease-in-out infinite' }}
                />
              </div>
              <span className="text-[5rem] md:text-[8rem] font-black text-[#202124] dark:text-[#e8eaed]">4</span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-2xl md:text-3xl font-bold text-[#202124] dark:text-[#e8eaed]">
                Page Not Found
              </h3>
              <p className="text-[#5f6368] dark:text-[#9aa0a6] max-w-[500px]">
                Oops! The page you're looking for doesn't exist or has been moved. Let us help you get back on track.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-2 flex-wrap">
              <button
                onClick={handleHomeClick}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-sm bg-gradient-to-r from-primary to-secondary text-white transition-all hover:opacity-90 shadow-button"
              >
                <Home size={20} />
                Back to Home
              </button>
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-sm border border-white/60 dark:border-white/10 text-[#202124] dark:text-[#e8eaed] transition-all hover:bg-black/5 dark:hover:bg-white/5 bg-white/60 dark:bg-[#1a1d23]/60 backdrop-blur-sm"
              >
                <ArrowLeft size={20} />
                Go Back
              </button>
            </div>

            {/* Quick Navigation */}
            <div className="w-full mt-4">
              <h4 className="text-lg font-bold mb-2 text-[#202124] dark:text-[#e8eaed]">
                Quick Navigation
              </h4>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2">
                {[
                  { icon: Home, label: 'Home', to: '/' },
                  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
                  { icon: MessageCircle, label: 'Contact', to: '/contact' },
                ].map(({ icon: Icon, label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="p-2 text-center no-underline bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    <div className="flex flex-col gap-1 items-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={24} />
                      </div>
                      <span className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed]">
                        {label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="hidden md:flex justify-center items-center relative">
            <div className="bg-white/60 dark:bg-[#1a1d23]/60 backdrop-blur-md rounded-full p-8 border border-white/60 dark:border-white/10 shadow-card" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[200px] h-auto">
                <defs>
                  <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <path d="M60 10 L45 35 L45 95 C45 105 50 110 60 110 C70 110 75 105 75 95 L75 35 Z" fill="url(#rocketGradient)" />
                <circle cx="60" cy="35" r="6" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
                <path d="M45 75 L25 95 L35 85 Z" fill="#dc2626" opacity="0.8" />
                <path d="M75 75 L95 95 L85 85 Z" fill="#dc2626" opacity="0.8" />
                <path d="M55 95 L50 110 M65 95 L70 110" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                <path d="M50 110 Q48 125 50 145 Q52 130 50 110" fill="#f59e0b" opacity="0.7" />
                <path d="M70 110 Q72 125 70 145 Q68 130 70 110" fill="#f59e0b" opacity="0.7" />
                <path d="M60 110 Q58 130 60 150 Q62 130 60 110" fill="#fbbf24" opacity="0.8" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
