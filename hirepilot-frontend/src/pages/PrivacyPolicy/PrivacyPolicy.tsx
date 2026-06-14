import React, { useEffect } from 'react';
import VisualHeader from '../../components/ui/VisualHeader';

const PrivacyPolicy: React.FC = () => {
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
                        title="Privacy"
                        highlight="Policy"
                        subtitle="Learn how we protect and manage your data at HirePilot."
                    />
                </div>

                <div className="bg-white dark:bg-[#1a1d23] p-3 md:p-5 rounded-2xl border border-[#e0e0e0] dark:border-[#3c4043]">
                    <div className="flex flex-col gap-4">
                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">1. Introduction</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                Welcome to HirePilot. We are committed to protecting your personal information and your right to privacy.
                                If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">2. Information We Collect</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                We collect personal information that you provide to us such as name, email address, and professional background when you register on the platform.
                                We also collect data through your interactions with our AI tools, and mock interviews to improve your experience.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">3. How We Use Your Information</h4>
                            <ul className="list-disc pl-8 flex flex-col gap-1">
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">To provide and maintain our Service.</li>
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">To notify you about changes to our Service.</li>
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">To provide AI-driven feedback on your interview performance.</li>
                                <li className="text-[#5f6368] dark:text-[#9aa0a6]">To monitor the usage of our Service and detect technical issues.</li>
                            </ul>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">4. Data Security</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
                                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">5. Your Privacy Rights</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your personal information directly within your account settings section.
                            </p>
                        </section>

                        <section>
                            <h4 className="text-xl font-bold mb-1 text-[#202124] dark:text-[#e8eaed]">6. Contact Us</h4>
                            <p className="text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:{' '}
                                <a href="mailto:iamnawazahmad777@gmail.com" className="text-primary font-semibold">
                                    iamnawazahmad777@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
