import { Search, BrainCircuit, BarChartHorizontal, CheckCircle } from "lucide-react";
import VisualHeader from "../../ui/VisualHeader";
import HIWCard from "./HIWCard/HIWCard";

const steps = [
  {
    step: "01",
    title: "Browse & Choose",
    desc: "Explore jobs and select roles that match your career goals. Get instant readiness scores.",
    Icon: <Search size={32} />,
  },
  {
    step: "02",
    title: "Train with AI",
    desc: "Practice with AI-powered mock interviews tailored to your target role and experience level.",
    Icon: <BrainCircuit size={32} />,
  },
  {
    step: "03",
    title: "Get Insights",
    desc: "Receive detailed feedback on your performance, skill gaps, and areas to improve.",
    Icon: <BarChartHorizontal size={32} />,
  },
  {
    step: "04",
    title: "Apply with Confidence",
    desc: "Once you're interview-ready, apply to jobs knowing you're prepared to succeed.",
    Icon: <CheckCircle size={32} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center py-12 md:py-8 relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 relative z-1">
        <div className="mb-6 text-center">
          <VisualHeader
            badge="The Process"
            title="Your Journey to get"
            highlight="Hired"
            subtitle="A simple, structured approach to mastering the interview process and landing your dream job."
          />
        </div>

        <div className="grid grid-cols-12 gap-6 justify-center">
          {steps.map((item) => (
            <div className="col-span-12 sm:col-span-6 md:col-span-3 flex" key={item.step}>
              <HIWCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
