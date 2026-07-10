import { motion } from 'framer-motion';
import { Headphones, Music2 } from 'lucide-react';
import '../assets/styles/CTA.css';
import ctaBg from '../assets/images/gtimg8.png';

/* Small decorative music-note floaters using Unicode musical characters */
function MusicalAccents() {
  const noteChars = ['\u266A', '\u266B', '\u266C', '\u266D'];
  return (
    <div className="cta-notes" aria-hidden="true">
      {noteChars.map((n, i) => (
        <span key={i} className="cta-note" style={{ animationDelay: `${i * 0.8}s` }}>
          {n}
        </span>
      ))}
    </div>
  );
}

export default function CTA() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="cta-section">
        <img src={ctaBg} alt="" className="cta-section__bg-img" />
      <div className="cta-section__bg" aria-hidden="true">
        <div className="cta-section__radial cta-section__radial--1" />
        <div className="cta-section__radial cta-section__radial--2" />
        <div className="cta-section__grid" />
      </div>

      <div className="container cta-section__inner">
        <MusicalAccents />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="cta-section__content"
        >
          <div className="cta-section__icon">
            <Music2 size={28} strokeWidth={1.2} />
          </div>

          <h2 className="cta-section__title">
            Let's Turn Your Memories
            <br />
            <span className="display-font cta-section__title-display">Into Music</span>
          </h2>

          <p className="cta-section__sub">
            Every moment deserves to be remembered. Let us create a song
            that will last a lifetime.
          </p>

          <button
            className="btn btn-gold cta-section__btn"
            onClick={() => scrollTo('#pricing')}
          >
            <Headphones size={20} strokeWidth={1.8} />
            Order Your Custom Song
          </button>

          <div className="cta-section__trust">
            {['3,500+ Songs Created', '100% Original', 'Worldwide Delivery'].map((t) => (
              <span key={t} className="cta-section__trust-item">
                <span className="cta-section__trust-dot" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
