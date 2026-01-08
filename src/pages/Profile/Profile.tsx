import { useState } from 'react';
import {
  User, MapPin, Briefcase, Edit, Save, X,
  Camera, LogOut,
  Github, Linkedin, Twitter, Globe, Copy, Check,
  Heart, Mail, Phone
} from 'lucide-react';

import profileImg from '../../assets/Nawaz_profile_IMG.jpg'
import './profile.scss'
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'Nawaz',
    lastName: 'Kumanali',
    headline: 'Full Stack Developer | Open Source Enthusiast',
    location: 'Nipani, India',
    email: 'iamnawazahmad777@gmail.com',
    phone: '+91 8217097121',
    bio: 'Passionate about building scalable applications and mentoring junior developers. Love exploring new technologies and contributing to open source projects.',
    website: 'nawaz.dev',
    joinedDate: 'Joined March 2021'
  });

  const [editData, setEditData] = useState(profileData);

  const skills = [
    { id: 1, name: 'React', level: 'Expert', endorsements: 245, percentage: 95 },
    { id: 2, name: 'TypeScript', level: 'Expert', endorsements: 189, percentage: 92 },
    { id: 3, name: 'Node.js', level: 'Advanced', endorsements: 156, percentage: 88 },
    { id: 4, name: 'System Design', level: 'Beginner', endorsements: 134, percentage: 85 },
    { id: 5, name: 'Java', level: 'Advanced', endorsements: 120, percentage: 86 },
    { id: 6, name: 'Springboot', level: 'Intermediate', endorsements: 98, percentage: 75 },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Globe, label: 'Website', url: '#' }
  ];

  const handleInputChange = (field: string, value: string) => {
    console.log(field, value);
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('nawaz.dev/profile');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">

        {/* Header Card */}
        <div className="profile-header-card">
          <div className="header-banner"></div>

          <div className="profile-header-content">
            <div className="avatar-section">
              <div className="avatar-container">
                <div className="main-avatar">
                  <div className="avatar-placeholder">{profileImg ? <img src={profileImg} alt="profile Img" /> : "NK"}</div>
                </div>
                <button className="camera-btn" onClick={() => setOpenImageDialog(true)} title="Change profile picture">
                  <Camera size={20} />
                </button>
                <div className="online-badge"></div>
              </div>
            </div>

            <div className="profile-main-info">
              {!isEditing ? (
                <>
                  <div className="profile-name-section">
                    <h1 className="user-name">{profileData.firstName} {profileData.lastName}</h1>
                  </div>
                 

                  <p className="user-headline">{profileData.headline}</p>
 <div className="profile-sub-section">
                    <h1 className="user-email"><Mail size={16} />{profileData.email}</h1>
                    <h1 className="user-phone"><Phone size={16} />{profileData.phone}</h1>

                  </div>
                  <div className="contact-info-strip">
                    <span><MapPin size={16} /> {profileData.location}</span>
                    <span className="divider">•</span>
                    <span><Briefcase size={16} /> Open for opportunities</span>
                  </div>

                  <p className="user-bio">{profileData.bio}</p>

                  <div className="social-links-row">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link key={link.label} to={link.url} className="social-link" title={link.label}>
                          <Icon size={18} />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="action-buttons">
                    <button className="btn-primary" onClick={() => { setEditData(profileData); setIsEditing(true); }}>
                      <Edit size={16} /> Edit Profile
                    </button>
                    <button className="btn-secondary" onClick={copyToClipboard}>
                      {copiedLink ? <Check size={16} /> : <Copy size={16} />}
                      {copiedLink ? 'Link Copied' : 'Share'}
                    </button>
                    <button className="logout-btn">
                      <LogOut size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="edit-form-container">
                  <div className="edit-form-grid">
                    <div className="form-row">
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="First Name"
                        className="form-input"
                      />
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Last Name"
                        className="form-input"
                      />
                    </div>
                     <input
                      type="text"
                      className="form-input full-width"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email"
                      required
                    />
                     <input
                      type="text"
                      className="form-input full-width"
                      value={editData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Phone"
                      required
                    />
                    <input
                      type="text"
                      className="form-input full-width"
                      value={editData.headline}
                      onChange={(e) => handleInputChange('headline', e.target.value)}
                      placeholder="Headline"
                    />
                    <textarea
                      className="form-input full-width"
                      rows={4}
                      value={editData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself"
                    />
                    <div className="form-actions">
                      <button className="btn-save" onClick={() => { setProfileData(editData); setIsEditing(false); }}>
                        <Save size={16} /> Save Changes
                      </button>
                      <button className="btn-cancel" onClick={() => setIsEditing(false)}>
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="skills-section">
            <div className="skills-header">
              <h3>Professional Skills</h3>
              <p>Skills are endorsed by your connections</p>
            </div>
            <div className="skills-grid">
              {skills.map(skill => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-header">
                    <div>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-badge">{skill.level}</span>
                    </div>
                    <Heart size={18} className="skill-heart" />
                  </div>
                  <small className="skill-endorsements">{skill.endorsements} endorsements</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Change Modal */}
      {openImageDialog && (
        <div className="image-change-modal-overlay" onClick={() => setOpenImageDialog(false)}>
          <div className="image-change-modal-content" onClick={e => e.stopPropagation()}>
            <div className="image-change-modal-header">
              <h3>Change Profile Picture</h3>
              <button className="image-change-modal-close-btn" onClick={() => setOpenImageDialog(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="image-change-modal-options">
              <button className="image-change-modal-option">
                <Camera size={20} />
                <span>Upload from Computer</span>
              </button>
              <button className="image-change-modal-option">
                <Globe size={20} />
                <span>Use Gravatar</span>
              </button>
              <button className="image-change-modal-option">
                <User size={20} />
                <span>Create Avatar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;