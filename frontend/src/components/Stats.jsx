import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Music2, Users, Globe, Sparkles } from 'lucide-react';
import '../assets/styles/Stats.css';

const stats = [
  { icon: Music2,   value: 3500, suffix: '+', label: 'Songs Delivered' },
  { icon: Users,    value: 2800, suffix: '+', label: 'Happy Clients' },
  { icon: Globe,    value: 42,   suffix: '+', label: 'Cities Served' },
  { icon: Sparkles, value: 500,  suffix: '+', label: 'Custom Projects' },
];

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="stats-section">
      <div className="stats-section__inner" />
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <div className="stat-card__icon">
                <stat.icon size={22} strokeWidth={1.5} />
              </div>
              <div className="stat-card__value">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-card__label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
