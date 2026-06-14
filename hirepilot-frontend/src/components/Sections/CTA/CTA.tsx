import { Play } from "lucide-react";
import Scanner from "../../Scanner/Scanner";
import VisualHeader from "../../ui/VisualHeader";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center py-12 md:py-8 relative overflow-hidden">
      {/* Subtle Grid Background - Light mode */}
      <div
        className="absolute inset-0 pointer-events-none z-0 dark:hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 85%)',
        }}
      />
      {/* Subtle Grid Background - Dark mode */}
      <div
        className="absolute inset-0 pointer-events-none z-0 hidden dark:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 85%)',
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 relative z-1">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="col-span-12 md:col-span-7">
            <div className="grid gap-2 justify-items-center md:justify-items-start text-center md:text-left">
              <VisualHeader
                badge="Free for early adopters"
                title="Ready to land your"
                highlight="dream job?"
                subtitle="Master the art of the interview with AI feedback that's actually useful. No fluff, just results."
                align="left"
              />

              <div className="mt-3">
                <Link to="/jobs" className="no-underline">
                  <span
                    className="
                      inline-flex items-center gap-2
                      py-1.5 px-3.5 text-[1rem] font-semibold rounded-lg
                      bg-[#202124] dark:bg-[#e8eaed]
                      text-white dark:text-[#1a1d23]
                      hover:bg-[#5f6368] dark:hover:bg-[#9aa0a6]
                      hover:-translate-y-0.5 hover:shadow-md
                      transition-all duration-200 cursor-pointer
                    "
                  >
                    Get Started Now
                    <Play size={18} fill="currentColor" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="relative flex justify-center">
              <Scanner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
