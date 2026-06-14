import { Link } from "react-router-dom";

const HeroHeader = () => {
    return (
        <div className="mb-4">
            <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-extrabold mb-2 leading-[1.1] text-[#202124] dark:text-[#e8eaed]">
                Train Smarter.
                <br />
                Interview Better.
            </h1>

            <p className="text-[1rem] md:text-[1.25rem] lg:text-[1.4rem] max-w-[700px] mx-auto mb-4 leading-relaxed text-[#5f6368] dark:text-[#9aa0a6] font-normal">
                Master your next interview with AI-powered mock sessions, real-time
                feedback, and personalized training paths
            </p>

            <div className="flex justify-center gap-2 mb-6 flex-wrap">
                <Link
                    to="/jobs"
                    className="
                        inline-flex items-center justify-center
                        py-1 px-4 text-[1.1rem] font-semibold
                        rounded-full border-[1.5px] border-primary
                        text-[#202124] dark:text-[#e8eaed]
                        hover:border-primary
                        transition-colors
                    "
                >
                    Browse Jobs
                </Link>
            </div>

            <p className="text-[#5f6368] dark:text-[#9aa0a6]">
                Join <span className="font-extrabold text-[#202124] dark:text-[#e8eaed]">10,000+</span> candidates who've improved their
                interview skills
            </p>
        </div>
    );
};

export default HeroHeader;
