import React, { useState, useRef, useEffect } from "react";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import aiImage from './ai_image_bhavana_sadu.png';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [hovering, setHovering] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const videoSrc = process.env.PUBLIC_URL + '/videos/intro.mp4';

    useEffect(() => {
        const handler = () => {
            const v = videoRef.current;
            if (v) {
                v.muted = false;
                setIsMuted(false);
                if (hovering) {
                    v.play().catch(() => { });
                }
            }
            document.removeEventListener('pointerdown', handler);
        };

        document.addEventListener('pointerdown', handler, { once: true });
        return () => document.removeEventListener('pointerdown', handler);
    }, [hovering]);

    const containerStyle = { width: 360, position: 'relative', borderRadius: 8, overflow: 'hidden' };
    const imgStyle = { width: '100%', height: 'auto', display: 'block' };
    const videoStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: hovering ? 1 : 0,
        transition: 'opacity 260ms ease',
        pointerEvents: 'auto',
    };

    const handleMouseEnter = () => {
        setHovering(true);
        const v = videoRef.current;
        if (v) {
            v.currentTime = 0;
            v.muted = false;
            const p = v.play();
            if (p && p.catch) {
                p.catch(() => {
                    v.muted = true;
                    setIsMuted(true);
                    const p2 = v.play();
                    if (p2 && p2.catch) p2.catch(() => { });
                });
            }
        }
    };
    const handleMouseLeave = () => {
        setHovering(false);
        const v = videoRef.current;
        if (v) {
            v.pause();
            v.currentTime = 0;
        }
    };

    const toggleAudio = (e) => {
        e.stopPropagation();
        const v = videoRef.current;
        if (!v) return;
        if (isMuted) {
            v.muted = false;
            const playPromise = v.paused ? v.play() : null;
            if (playPromise && playPromise.catch) {
                playPromise.catch(() => {
                    v.muted = true;
                    setIsMuted(true);
                });
            }
            setIsMuted(false);
        } else {
            v.muted = true;
            setIsMuted(true);
        }
    };

    const handleClickPlayWithAudio = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        const v = videoRef.current;
        if (!v) return;
        setHovering(true);
        v.muted = false;
        setIsMuted(false);
        const p = v.play();
        if (p && p.catch) {
            p.catch(() => {
                v.muted = true;
                setIsMuted(true);
            });
        }
    };

    const [showNotice, setShowNotice] = useState(true);

    const handleCloseNotice = () => {
        setShowNotice(false);
    };

    const roles = ["Software Engineer", "AI Developer", "Full-stack Developer"];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState(roles[0]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;
        const current = roles[roleIndex];
        if (!isDeleting) {
            if (displayedText.length < current.length) {
                timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length + 1)), 120);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 1000);
            }
        } else {
            if (displayedText.length > 0) {
                timeout = setTimeout(() => setDisplayedText(current.slice(0, displayedText.length - 1)), 60);
            } else {
                setIsDeleting(false);
                setRoleIndex((roleIndex + 1) % roles.length);
            }
        }
        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, roleIndex]);

    return (
        <div style={{ minHeight: '100vh', background: '#080810', color: '#e2e8f0', paddingTop: 24 }}>

            {showNotice && (
                <div style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    background: 'rgba(15, 23, 42, 0.92)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    zIndex: 999,
                    maxWidth: 300,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    animation: 'slideInToast 0.4s ease'
                }}>
                    <style>{`
            @keyframes slideInToast {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
            }
        `}</style>

                    <div style={{
                        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18
                    }}>
                        🎬
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0', marginBottom: 4 }}>
                            AI intro video
                        </div>
                        <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4 }}>
                            Hover my photo to preview
                        </div>
                        <button
                            onClick={(e) => { handleClickPlayWithAudio(e); setShowNotice(false); }}
                            style={{
                                marginTop: 8,
                                background: '#6366f1', color: '#fff', border: 'none',
                                padding: '5px 12px', borderRadius: 6,
                                fontSize: 11, fontWeight: 500, cursor: 'pointer'
                            }}
                        >
                            ▶ Play with sound
                        </button>
                    </div>
                </div>
            )}

            <div style={{
                maxWidth: 1100,
                margin: '0 auto',
                padding: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 40,
            }}>
                <div style={{ flexShrink: 0, paddingTop: 8 }}>
                    <div
                        style={{ width: 320, borderRadius: 16, overflow: 'hidden', position: 'relative', boxShadow: '0 0 40px rgba(99,102,241,0.2)' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClickPlayWithAudio}
                    >
                        <img src={aiImage} alt="Bhavana Sadu" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        <video
                            ref={videoRef}
                            src={videoSrc}
                            style={videoStyle}
                            playsInline loop muted={isMuted} preload="auto"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />
                        <button
                            aria-label={isMuted ? 'Unmute' : 'Mute'}
                            onClick={toggleAudio}
                            style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                            {isMuted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 1, background: '#06b6d4' }} />
                        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 12, color: '#06b6d4', letterSpacing: '0.08em' }}>
                            PORTFOLIO
                        </span>
                    </div>

                    <div>
                        <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 4px', fontWeight: 400 }}>
                            Hi there, I'm
                        </p>
                        <h1 style={{ fontSize: 42, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                            Bhavana Sadu
                        </h1>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, minHeight: 32 }}>
                        <style>{`
                        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
                        .typed {
                            font-family: 'Fira Code', monospace;
                            font-size: 20px;
                            font-weight: 400;
                            color: #06b6d4;
                            letter-spacing: 0.04em;
                        }
                        .cursor {
                            display: inline-block;
                            width: 12px;
                            height: 2px;
                            background: #06b6d4;
                            margin-left: 4px;
                            vertical-align: bottom;
                            margin-bottom: 4px;
                            animation: uBlink 1s step-end infinite;
                        }
                        @keyframes uBlink {
                            0%, 49%  { opacity: 1; }
                            50%, 100% { opacity: 0; }
                        }
                    `}</style>
                        <span className="typed">{displayedText}</span>
                        <span className="cursor" aria-hidden="true" />
                    </div>

                    <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #6366f1, #06b6d4)', borderRadius: 2 }} />

                    <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.8, margin: 0, maxWidth: 520 }}>
                        Software Engineer with experience in developing reliable software solutions and solving real-world problems.
                        Passionate about <span style={{ color: '#c7d2fe', fontWeight: 500 }}>AI</span>,{' '}
                        <span style={{ color: '#c7d2fe', fontWeight: 500 }}>Machine Learning</span>, and building innovative
                        products that combine intelligence with technology.
                    </p>

                    <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                        <button style={{
                            background: '#6366f1', color: '#fff', border: 'none',
                            padding: '11px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                            cursor: 'pointer', letterSpacing: '0.01em'
                        }}>
                            View Projects →
                        </button>
                        <button style={{
                            background: 'transparent', color: '#94a3b8',
                            border: '1px solid rgba(148,163,184,0.25)',
                            padding: '11px 24px', borderRadius: 8, fontSize: 14,
                            cursor: 'pointer', letterSpacing: '0.01em'
                        }}>
                            Download CV
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 0, marginTop: 16, paddingTop: 24, borderTop: '1px solid rgba(99,102,241,0.12)' }}>
                        {[
                            { num: '2+', label: 'Years exp' },
                            { num: '10+', label: 'Projects' },
                            { num: '8+', label: 'Tech stacks' },
                        ].map((s, i) => (
                            <div key={i} style={{ paddingRight: 32, paddingLeft: i === 0 ? 0 : 32, borderLeft: i === 0 ? 'none' : '1px solid rgba(99,102,241,0.12)' }}>
                                <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 22, fontWeight: 500, color: '#f1f5f9' }}>
                                    {s.num} <span style={{ color: '#818cf8' }}></span>
                                </div>
                                <div style={{ fontSize: 11, color: '#475569', marginTop: 2, letterSpacing: '0.04em' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {activeTab !== 'home' && <div />}
        </div>
    );
}

export default HomePage;