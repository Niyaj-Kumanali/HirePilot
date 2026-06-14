import {
  Briefcase,
  Bot,
  Compass,
  Sparkles,
  Send,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: Briefcase, text: 'Job Search' },
  { icon: Bot, text: 'AI Mock Interviews' },
  { icon: Compass, text: 'Roadmap & Guidance' },
  { icon: Send, text: 'Auto Applier' },
  { icon: Calendar, text: 'Auto Mailer' },
  { icon: Sparkles, text: 'Preparation Hub' },
];

const HeroHeader = () => {
  return (
    <div className="text-center w-full">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 text-xs font-bold text-primary mb-5 tracking-wide uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Your AI Career Copilot
      </div>

      <h1 className="text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-extrabold mb-4 leading-[1.05] tracking-tight text-[#202124] dark:text-[#e8eaed]">
        Land Your Dream Job
        <br />
        <span className="bg-gradient-to-r from-primary via-secondary to-pink-500 bg-clip-text text-transparent">
          with AI Precision
        </span>
      </h1>

      <p className="text-[1.05rem] md:text-[1.25rem] max-w-[600px] mx-auto mb-7 leading-relaxed text-[#5f6368] dark:text-[#9aa0a6]">
        From job discovery to interview mastery — HirePilot automates your
        search, sharpens your skills, and guides you every step of the way.
      </p>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <Link
          to="/jobs"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Browse Jobs
          <ArrowRight size={18} />
        </Link>
        <Link
          to="/interview"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 text-[#202124] dark:text-[#e8eaed] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          <Bot size={18} />
          Start Practice
        </Link>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-2 mb-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-xs font-semibold text-[#202124] dark:text-[#e8eaed]"
            >
              <Icon size={15} className="text-secondary" />
              {f.text}
            </div>
          );
        })}
      </div>

      <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm">
        Trusted by{' '}
        <span className="font-extrabold text-[#202124] dark:text-[#e8eaed]">
          10,000+
        </span>{' '}
        job seekers
      </p>
    </div>
  );
};

export default HeroHeader;
