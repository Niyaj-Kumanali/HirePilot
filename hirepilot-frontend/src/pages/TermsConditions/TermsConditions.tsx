import React, { useEffect } from 'react';
import VisualHeader from '../../components/VisualHeader/VisualHeader';

const TermsConditions: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background glows */}
            <div
                className="absolute top-[15%] right-[10%] w-[350px] h-[350px] rounded-full pointer-events-none"
                style={{
                    background: 'rgba(168,85,247,0.08)',
                    filter: 'blur(80px)',
                    animation: 'floatAround 10s ease-in-out infinite',
                }}
            />
            <div
                className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full pointer-events-none"
                style={{
                    background: 'rgba(99,102,241,0.08)',
                    filter: 'blur(80px)',
                    animation: 'floatAround 12s ease-in-out infinite',
                    animationDelay: '1s',
                }}
            />

            <div className="mx-auto w-full max-w-3xl px-4 relative py-8">
                <div className="mb-6">
                    <VisualHeader
                        badge="Legal"
                        title="Terms &"
                        gradient_title="Conditions"
                        subtitle="Understanding our agreement and the rules of the HirePilot platform."
                    />
                </div>

                <div className="bg-white dark:bg-[#1a1d23] p-3 md:p-5 rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043]">
                    <div className="flex flex-col gap-4">
                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">1. Agreement to Terms</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                By accessing or using HirePilot, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">2. Use License</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed mb-2">
                                Permission is granted to temporarily use the materials (information or software) on HirePilot's website for personal, non-commercial transitory viewing only.
                            </p>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed mb-1">
                                This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-8 flex flex-col gap-1">
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">Modify or copy the materials.</li>
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">Use the materials for any commercial purpose.</li>
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">Attempt to decompile or reverse engineer any software contained on HirePilot.</li>
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">Remove any copyright or other proprietary notations from the materials.</li>
                            </ul>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">3. Disclaimer</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                The materials on HirePilot are provided on an 'as is' basis. HirePilot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">4. Limitations</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                In no event shall HirePilot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HirePilot.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">5. Governing Law</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                These terms and conditions are governed by and construed in accordance with the laws of Karnataka, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditions;
