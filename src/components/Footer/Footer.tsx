import React from 'react'
import { Mail, MapPin, Linkedin, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import './footer.scss'
import Logo from '../Logo/Logo'

const socialLinks = [
    // { icon: Facebook, label: 'Facebook', to: 'https://facebook.com' },
    // { icon: Twitter, label: 'Twitter', to: 'https://twitter.com' },
    { icon: Linkedin, label: 'LinkedIn', to: 'https://linkedin.com/in/nawaj-kumanali' },
    { icon: Github, label: 'GitHub', to: 'https://github.com/nawaz-kumanali' },
]

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section footer-brand">
                        <Logo />
                        <p className="footer-description">
                            The ultimate companion for modern developers. Practice, prepare, and land your dream job with AI-driven mock interviews.
                        </p>
                        <div className="social-links">
                            {socialLinks.map(({ icon: Icon, label, to }) => (
                                <Link
                                    key={label}
                                    to={to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    title={label}
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Platform Section */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">Platform</h3>
                        <ul className="footer-links">
                            <li><Link to="/landing">Home</Link></li>
                            <li><Link to="/jobs">Job Board</Link></li>
                            <li><Link to="/interview">Mock Prep</Link></li>
                            <li><Link to="/courses">Courses</Link></li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">Resources</h3>
                        <ul className="footer-links">
                            <li><Link to="/blog">Insights</Link></li>
                            <li><Link to="/docs">Guide</Link></li>
                            <li><Link to="/faq">Help Center</Link></li>
                            <li><Link to="/community">Community</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-section footer-contact">
                        <h3 className="footer-section-title">Contact</h3>
                        <div className="contact-items">
                            <div className="contact-item">
                                <Mail size={18} className="contact-icon" />
                                <div>
                                    <p className="contact-label">Email</p>
                                    <Link to="mailto:iamnawazahmad777@gmail.com">iamnawazahmad777@gmail.com</Link>
                                </div>
                            </div>
                            <div className="contact-item">
                                <MapPin size={18} className="contact-icon" />
                                <div>
                                    <p className="contact-label">Location</p>
                                    <span>Nipani, Karnataka, India</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="footer-copyright">© 2025 HirePilot. All rights reserved.</p>
                    <div className="footer-bottom-right">
                        <div className="legal-links">
                            <Link to="/privacy">Privacy Policy</Link>
                            <Link to="/terms">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer