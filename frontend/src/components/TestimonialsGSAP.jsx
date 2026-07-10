import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import '../assets/styles/TestimonialsGSAP.css';

const testimonials = [
  { id:1, name:'Priya Sharma',     role:'Anniversary Gift', location:'Mumbai',    initials:'PS', stars:5, quote:'I surprised my husband with a custom song for our 10th anniversary. He cried — and so did I. Glory Tunes captured everything about our journey in 3 minutes. Absolutely magical.' },
  { id:2, name:'Arjun Mehta',      role:'Wedding Song',     location:'Delhi',     initials:'AM', stars:5, quote:'Our first dance song was composed by Glory Tunes and it was the highlight of our entire wedding. Every guest was asking about it. Worth every rupee and more.' },
  { id:3, name:'Sunita Krishnan',  role:'Birthday Tribute', location:'Chennai',   initials:'SK', stars:5, quote:"Got a birthday song made for my mom's 70th and she said it was the best gift she has ever received. The lyrics were so personal and the voice was stunning." },
  { id:4, name:'Rahul Gupta',      role:'Proposal Song',    location:'Bangalore', initials:'RG', stars:5, quote:'She said YES! The song helped me say everything I could not put into words. Professional, fast, and absolutely beautiful. Highly recommended.' },
  { id:5, name:'Fatima Al-Rashid', role:'Business Jingle',  location:'Dubai',     initials:'FA', stars:5, quote:'Our brand jingle is now playing in all 12 of our stores. Customers hum it while they shop. Glory Tunes delivered beyond expectations in record time.' },
  { id:6, name:'Kavya Nair',       role:'Friendship Song',  location:'Kochi',     initials:'KN', stars:5, quote:'Gifted this to my best friend on her birthday — a song about our 15 years of friendship. She was speechless for 5 minutes then burst into tears. Best money I ever spent.' },
  { id:7, name:'Vikram Singh',     role:'Family Song',      location:'Jaipur',    initials:'VS', stars:5, quote:'Had a family song made for my parents silver anniversary. They played it at the party and everyone was emotional. The quality was cinematic — felt like a real Bollywood track.' },
  { id:8, name:'Ananya Bose',      role:'Tribute Song',     location:'Kolkata',   initials:'AB', stars:5, quote:'We commissioned a tribute song for our late father. It brought tears to every eye at the memorial. The team was incredibly sensitive and professional throughout.' },
];

const allCards = [...testimonials, ...testimonials];

function StarRow({ count }) {
  return (
    <div className="tgsap-stars">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#D4AF37" color="#D4AF37" />
      ))}
    </div>
  );
}

function TestiCard({ name, role, location, initials, stars, quote }) {
  return (
    <div className="tgsap-card">
      <div className="tgsap-card__quote"><Quote size={22} strokeWidth={1} /></div>
      <StarRow count={stars} />
      <p className="tgsap-card__text">"{quote}"</p>
      <div className="tgsap-card__author">
        <div className="tgsap-card__avatar">{initials}</div>
        <div className="tgsap-card__meta">
          <span className="tgsap-card__name">{name}</span>
          <span className="tgsap-card__role">{role} &middot; {location}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsGSAP() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    tweenRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 35,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });
    return () => tweenRef.current?.kill();
  }, []);

  const pause  = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.play();

  return (
    <section id="testimonials" className="section-pad tgsap">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Client Stories</span>
          <h2 className="section-title">What Our Clients <span className="display-font text-gold">Say</span></h2>
          <div className="gold-divider" />
          <p className="section-desc">Real people, real emotions, real songs. Over 2,800 happy clients and counting.</p>
        </motion.div>
      </div>

      <div className="tgsap-viewport" onMouseEnter={pause} onMouseLeave={resume} onTouchStart={pause} onTouchEnd={resume}>
        <div className="tgsap-fade tgsap-fade--left"  aria-hidden="true" />
        <div className="tgsap-fade tgsap-fade--right" aria-hidden="true" />
        <div className="tgsap-track" ref={trackRef}>
          {allCards.map((t, i) => <TestiCard key={`${t.id}-${i}`} {...t} />)}
        </div>
      </div>

     
    </section>
  );
}