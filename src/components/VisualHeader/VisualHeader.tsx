import React from 'react'
import './visualheader.scss'

interface VisualHeaderType {
    badge?: string,
    title: string,
    gradient_title: string,
    subtitle: string,
    align?: React.CSSProperties['textAlign']
}

const VisualHeader: React.FC<VisualHeaderType> = ({ badge, title, gradient_title, subtitle, align = "center" }) => {
    return (
        <div className="visual-header" style={{ textAlign: align }}>
            {badge && <div className="visual-header-eyebrow">
                <span className="badge-dot"></span>
                <span>{badge}</span>
            </div>}
            <h2 className="visual-header-title">
                {title} <span className="gradient-text">{gradient_title}</span>
            </h2>
            <p className="visual-header-subtitle">
                {subtitle}
            </p>
        </div>
    )
}

export default VisualHeader