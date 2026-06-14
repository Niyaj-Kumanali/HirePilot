import React, { useEffect } from 'react';
import { Target, Users, Zap, Shield, Rocket, Trophy } from 'lucide-react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';

const AboutUs: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background glows */}
            <div
                className="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: 'rgba(168,85,247,0.1)',
                    filter: 'blur(80px)',
                    animation: 'floatAround 8s ease-in-out infinite',
                }}
            />
            <div
                className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: 'rgba(99,102,241,0.1)',
                    filter: 'blur(80px)',
                    animation: 'floatAroundReverse 10s ease-in-out infinite',
                }}
            />

            <div className="mx-auto w-full max-w-5xl px-4 relative py-8">
                {/* Header */}
                <div className="mb-8">
                    <VisualHeader
                        badge="Our Story"
                        title="Empowering Future"
                        gradient_title="Engineers"
                        subtitle="At HirePilot, we're building the most advanced AI-driven career acceleration platform for the next generation of developers."
                    />
                </div>

                <div className="flex flex-col gap-6">
                    {/* Mission Section */}
                    <div className="bg-white dark:bg-[#1a1d23] p-4 rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043]">
                        <div className="flex flex-col gap-2 items-center text-center">
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-[#202124] dark:text-[#e8eaed]">
                                Our Mission
                            </h3>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] max-w-[700px] leading-relaxed">
                                We believe that every talented developer deserves their dream job.
                                Our mission is to bridge the gap between preparation and performance by providing
                                state-of-the-art AI tools for mock interviews, skill assessment, and personalized learning.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { icon: Users, value: '10k+', label: 'Active Users' },
                            { icon: Rocket, value: '5k+', label: 'Interviews Conducted' },
                            { icon: Trophy, value: '2k+', label: 'Successful Placements' },
                        ].map(({ icon: Icon, value, label }, i) => (
                            <div key={i} className="bg-white dark:bg-[#1a1d23] p-4 text-center rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043]">
                                <div className="flex flex-col gap-2 items-center">
                                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Icon size={28} />
                                    </div>
                                    <span className="text-3xl font-extrabold text-primary">
                                        {value}
                                    </span>
                                    <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6] font-semibold">
                                        {label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features Section */}
                    <div>
                        <div className="flex flex-col gap-1 items-center text-center mb-4">
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase">
                                The Advantage
                            </span>
                            <h3 className="text-2xl font-bold text-[#202124] dark:text-[#e8eaed]">
                                Why Choose HirePilot?
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                                {
                                    icon: Zap,
                                    title: 'AI-Powered Insights',
                                    description: 'Get real-time feedback on your interview performance with advanced AI analysis and behavioral mapping.',
                                },
                                {
                                    icon: Shield,
                                    title: 'Risk-Free Practice',
                                    description: 'Build confidence without pressure. Our mock interviews simulate real-world high-stakes scenarios.',
                                },
                                {
                                    icon: Rocket,
                                    title: 'Career Acceleration',
                                    description: 'Go from candidate to hire faster with our data-driven matching system and role-specific preparation.',
                                },
                            ].map(({ icon: Icon, title, description }, i) => (
                                <div key={i} className="bg-white dark:bg-[#1a1d23] p-4 rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043]">
                                    <div className="flex flex-col gap-2">
                                        <Icon size={24} className="text-primary" />
                                        <h4 className="text-lg font-bold text-[#202124] dark:text-[#e8eaed]">
                                            {title}
                                        </h4>
                                        <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Story Section */}
                    <div className="bg-white dark:bg-[#1a1d23] p-4 rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043]">
                        <div className="flex flex-col gap-2 items-center text-center">
                            <h3 className="text-2xl font-bold text-[#202124] dark:text-[#e8eaed]">
                                The Inspiration
                            </h3>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] max-w-[800px] leading-relaxed">
                                HirePilot started as a simple idea: what if a developer could have an expert mentor available 24/7?
                                We saw brilliant minds struggling not with code, but with the pressure of high-stakes technical interviews.
                                By leveraging the latest in AI technology, we've built a platform that doesn't just test your skills—it helps you evolve them into a career.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
