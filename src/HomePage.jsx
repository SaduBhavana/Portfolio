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

    return (
        <div>
            {showNotice && (
                <div style={{width: '100%', background: 'linear-gradient(90deg, #0f172a, #0b3d91)', color: '#fff', padding: '10px 0', boxShadow: '0 6px 18px rgba(2,6,23,0.12)'}}>
                    <div style={{maxWidth: 980, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 12}}>
                        <div style={{fontSize: 14, paddingLeft: 0}}>
                            See the AI intro — hover the image to preview and <strong>click the image</strong> to play with sound.
                        </div>
                        <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                            <button onClick={(e) => { e.stopPropagation(); handleClickPlayWithAudio(); }} style={{background: 'rgba(255,255,255,0.12)', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 6, cursor: 'pointer'}}>Play AI intro</button>
                        </div>
                    </div>
                </div>
            )}
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {isMuted ? <VolumeOffIcon style={{color: '#fff'}} fontSize="small" /> : <VolumeUpIcon style={{color: '#fff'}} fontSize="small" />}
                </button>
                

                
            </div>
            {activeTab !== 'home' && <div />}
        </div>
    );
}

export default HomePage;