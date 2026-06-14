import { Play, Sparkles } from "lucide-react";
import Scanner from "../../Scanner/Scanner";
import VisualHeader from "../../ui/VisualHeader";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center py-12 md:py-8 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent dark:via-primary/[0.03]" />

      <div className="mx-auto w-full max-w-7xl px-4 relative z-1">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
          <div className="col-span-12 md:col-span-6">
            <div className="grid gap-3 justify-items-center md:justify-items-start text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/15 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wide">
                <Sparkles size={14} />
                Free for early adopters
              </div>

              <VisualHeader
                title="Ready to land your"
                highlight="dream job?"
                subtitle="Master the art of the interview with AI feedback that's actually useful. No fluff, just results."
                align="left"
              />

              <div className="flex flex-wrap gap-3 mt-2">
                <Link to="/signup" className="no-underline">
                  <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7e22ce] text-white shadow-button hover:shadow-button-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                    Get Started Free
                    <Play size={18} fill="currentColor" />
                  </span>
                </Link>
                <Link to="/interview" className="no-underline">
                  <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl bg-white/80 dark:bg-[#1a1d23]/80 backdrop-blur-sm border border-white/60 dark:border-white/10 text-[#202124] dark:text-[#e8eaed] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer">
                    Try Demo
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent rounded-3xl blur-3xl -z-10" />
              <Scanner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
