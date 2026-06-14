import React, { useState, useRef, useEffect } from "react";
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
            // Unmute. If the video is paused, request playback so audio is audible.
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
        e.stopPropagation();
        const v = videoRef.current;
        if (!v) return;
        // Do not reset playback position; only unmute and request play.
        v.muted = false;
        setIsMuted(false);
        const p = v.play();
        if (p && p.catch) {
            p.catch(() => {
                // If browser blocks playback with audio, revert to muted.
                v.muted = true;
                setIsMuted(true);
            });
        }
    };

    return (
        <div>
            <div style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClickPlayWithAudio}>
                <img src={aiImage} alt="Bhavana Sadu" style={imgStyle} />
                <video
                    ref={videoRef}
                    src={videoSrc}
                    style={videoStyle}
                    playsInline
                    loop
                    muted={isMuted}
                    preload="auto"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                />
                {/* Small mute/unmute control */}
                <button
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    onClick={toggleAudio}
                    style={{
                        position: 'absolute',
                        right: 8,
                        bottom: 8,
                        background: 'rgba(0,0,0,0.45)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '6px 8px',
                        cursor: 'pointer',
                    }}
                >
                    {isMuted ? '🔈' : '🔊'}
                </button>
                

                
            </div>
            {activeTab !== 'home' && <div />}
        </div>
    );
}

export default HomePage;