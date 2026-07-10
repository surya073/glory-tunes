import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music2 } from 'lucide-react';
import '../assets/styles/Gallery.css';
import audioFile from '../assets/gtaudio1.mpeg?url';
import bgImg from '../assets/images/ourworksBgImg.png';

const portfolioItemsBase = [
  { id: 1, title: 'Sarah & James',    category: 'Wedding Song',    color: '#1a1200' },
  { id: 2, title: "Mom's 60th",       category: 'Birthday Song',   color: '#0d1a00' },
  { id: 3, title: 'Forever Friends',  category: 'Friendship Song', color: '#1a0000' },
  { id: 4, title: 'The Big Proposal', category: 'Proposal Song',   color: '#000d1a' },
  { id: 5, title: 'Our Family',       category: 'Family Song',     color: '#1a001a' },
  { id: 6, title: 'Brand Melody',     category: 'Business Jingle', color: '#001a1a' },
];

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '--:--';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

let sharedAudio = null;
function getAudio() {
  if (!sharedAudio) {
    sharedAudio = new Audio(audioFile);
    sharedAudio.preload = 'metadata';
  }
  return sharedAudio;
}

export function PortfolioCard({
  id, title, category, color, index = 0,
  playingId, setPlayingId, totalDuration, onDurationLoaded,
}) {
  const isPlaying = playingId === id;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(totalDuration || 0);

  useEffect(() => {
    if (totalDuration) setDuration(totalDuration);
  }, [totalDuration]);

  useEffect(() => {
    const audio = getAudio();
    if (audio.duration && !isNaN(audio.duration)) {
      setDuration(audio.duration);
      onDurationLoaded?.(audio.duration);
      return;
    }
    const handler = () => {
      setDuration(audio.duration);
      onDurationLoaded?.(audio.duration);
    };
    audio.addEventListener('loadedmetadata', handler);
    return () => audio.removeEventListener('loadedmetadata', handler);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      setCurrentTime(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentTime(getAudio().currentTime);
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    const audio = getAudio();
    if (isPlaying) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.pause();
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn('Playback failed:', err));
      }
      setPlayingId(id);
    }
  };

  const handleSeek = (e) => {
    if (isTouchDevice) return;
    const audio = getAudio();
    const val = parseFloat(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
    if (!isPlaying) {
      setPlayingId(id);
      audio.play().catch((err) => console.warn('Playback failed:', err));
    }
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const remaining = duration - currentTime;

  return (
    <motion.div
      className="portfolio-card"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={!isTouchDevice ? { y: -6 } : {}}
    >
      <div
        className="portfolio-card__visual"
        style={{
          background: `radial-gradient(circle at 40% 40%, ${color} 0%, #050505 100%)`,
        }}
      >
        <div className={`portfolio-card__wave${isPlaying ? ' is-playing' : ''}`}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="portfolio-card__wave-bar"
              style={{
                height: `${12 + Math.sin(i * 0.8 + id) * 10}px`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        <button
          className={`portfolio-card__play${isPlaying ? ' is-playing' : ''}`}
          aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
          onClick={handlePlayPause}
        >
          {isPlaying
            ? <Pause size={20} fill="currentColor" strokeWidth={0} />
            : <Play  size={20} fill="currentColor" strokeWidth={0} />
          }
        </button>

        <span className={`portfolio-card__duration${isPlaying ? ' is-counting' : ''}`}>
          {isPlaying ? formatTime(remaining) : formatTime(duration)}
        </span>
      </div>

      <div className="portfolio-card__player" onClick={(e) => e.stopPropagation()}>
        <span className="portfolio-card__time">{formatTime(currentTime)}</span>

        <div className="portfolio-card__track">
          <div
            className="portfolio-card__track-fill"
            style={{ width: `${progress}%` }}
          />
          {!isTouchDevice && (
            <input
              className="portfolio-card__seek"
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              aria-label="Seek"
            />
          )}
        </div>

        <span className="portfolio-card__time">
          {formatTime(duration)}
        </span>
      </div>

      <div className="portfolio-card__info">
        <div className="portfolio-card__category">{category}</div>
        <h3 className="portfolio-card__title">{title}</h3>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [playingId, setPlayingId]         = useState(null);
  const [totalDuration, setTotalDuration] = useState(null);

  useEffect(() => {
    const audio = getAudio();
    const handleLoaded = () => setTotalDuration(audio.duration);
    audio.addEventListener('loadedmetadata', handleLoaded);
    if (audio.duration && !isNaN(audio.duration)) setTotalDuration(audio.duration);
    return () => audio.removeEventListener('loadedmetadata', handleLoaded);
  }, []);

  useEffect(() => {
    const audio = getAudio();
    const handleEnded = () => setPlayingId(null);
    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <section id="portfolio" className="section-pad gallery">

      <div className="gallery-bg">
        <img src={bgImg} alt="" className="gallery-bg__img" />
      </div>

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Listen to Our{' '}
            <span className="display-font text-gold">Creations</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-desc">
            Every song tells a unique story. Here's a glimpse into the magic we create.
          </p>
        </motion.div>

        <div className="portfolio-grid">
          {portfolioItemsBase.map((item, i) => (
            <PortfolioCard
              key={item.id}
              {...item}
              index={i}
              playingId={playingId}
              setPlayingId={setPlayingId}
              totalDuration={totalDuration}
              onDurationLoaded={setTotalDuration}
            />
          ))}
        </div>

        <motion.div
          className="gallery__footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="gallery__footer-icon">
            <Music2 size={14} strokeWidth={1.5} />
          </div>
          <span>Sample songs — Your song will be 100% original and exclusive to you</span>
        </motion.div>
      </div>

    </section>
  );
}