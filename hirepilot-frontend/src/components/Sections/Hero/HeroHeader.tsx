import { Link } from 'react-router-dom';

const HeroHeader = () => {
  return (
    <div>
      <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold mb-2 leading-[1.1] text-[#202124] dark:text-[#e8eaed]">
        Train Smarter.
        <br />
        Interview Better.
      </h1>

      <p className="text-[1rem] md:text-[1.25rem] lg:text-[1.4rem] max-w-[650px] mx-auto mb-6 leading-relaxed text-[#5f6368] dark:text-[#9aa0a6] font-normal">
        Master your next interview with AI-powered mock sessions, real-time
        feedback, and personalized training paths
      </p>

      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <Link
          to="/jobs"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white shadow-[0_4px_12px_rgba(168,85,247,0.25)] hover:shadow-[0_6px_16px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Browse Jobs
        </Link>
      </div>

      <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm">
        Join{' '}
        <span className="font-extrabold text-[#202124] dark:text-[#e8eaed]">
          10,000+
        </span>{' '}
        candidates who've improved their interview skills
      </p>
    </div>
  );
};

export default HeroHeader;
