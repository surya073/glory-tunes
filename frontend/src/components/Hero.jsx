import { motion } from 'framer-motion';
import { Play, Headphones, Music2 } from 'lucide-react';
import '../assets/styles/Hero.css';
import heroBg from '../assets/images/gtimg2.png';

/* Animated Waveform */
function Waveform() {
  return (
    <div className="hero-waveform" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="hero-waveform__bar"
          style={{
            animationDelay: `${(i * 0.07) % 1.4}s`,
            height: `${20 + Math.sin(i * 0.8) * 14 + Math.cos(i * 0.5) * 10}px`,
          }}
        />
      ))}
    </div>
  );
}

/* Floating Notes — uses Unicode musical note characters (not emoji) */
function FloatingNotes() {
  const noteChars = ['\u266A', '\u266B', '\u266C', '\u266D', '\u2669'];
  return (
    <div className="floating-notes" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className="floating-note"
          style={{
            left: `${8 + i * 8}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${8 + (i % 4) * 2}s`,
            fontSize: `${14 + (i % 3) * 6}px`,
            opacity: 0.15 + (i % 3) * 0.05,
          }}
        >
          {noteChars[i % noteChars.length]}
        </span>
      ))}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0 },
};

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      {/* Background layers */}
      <div className="hero-bg" aria-hidden="true">
          <img src={heroBg} alt="" className="hero-bg__img" />

        <div className="hero-bg__gradient" />
        <div className="hero-bg__radial hero-bg__radial--gold" />
        <div className="hero-bg__radial hero-bg__radial--mid" />
        <div className="hero-bg__grid" />
      </div>

      <FloatingNotes />

      <div className="container hero__content">
        {/* Badge */}
        <motion.div
          className="hero__badge"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Music2 size={13} strokeWidth={2} />
          <span>Premium Custom Songs — Delivered Worldwide</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero__headline"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Your Story.
          <br />
          <span className="hero__headline-display">Your Emotion.</span>
          <br />
          Your Song.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="hero__sub"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Turn memories into timeless melodies with custom-made songs
          <br className="hero__br" /> crafted exclusively for you.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <button
            className="btn btn-gold hero__btn-primary"
            onClick={() => scrollTo('#pricing')}
          >
            <Headphones size={18} strokeWidth={1.8} />
            Create My Song
          </button>
          <button
            className="btn btn-outline hero__btn-secondary"
            onClick={() => scrollTo('#portfolio')}
          >
            <Play size={15} fill="currentColor" strokeWidth={0} />
            Listen Samples
          </button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="hero__trust"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          {['100% Original', 'Fast Delivery', '100% Satisfaction'].map((t) => (
            <span key={t} className="hero__trust-item">
              <span className="hero__trust-dot" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Waveform */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Waveform />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
