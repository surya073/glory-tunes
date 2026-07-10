import { motion } from 'framer-motion';
import { MessageSquare, Sliders, Mic2, Send } from 'lucide-react';
import '../assets/styles/HowItWorks.css';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Share Your Story',
    desc: 'Tell us about the person, the occasion, and the emotions you want captured. Every detail matters.',
  },
  {
    icon: Sliders,
    number: '02',
    title: 'Choose Your Style',
    desc: 'Pick a genre, mood, and tempo. Classical, pop, folk, R&B — your vision, your vibe.',
  },
  {
    icon: Mic2,
    number: '03',
    title: 'We Compose & Produce',
    desc: 'Our professional musicians craft your song from scratch with original lyrics and live instrumentation.',
  },
  {
    icon: Send,
    number: '04',
    title: 'Receive & Cherish',
    desc: 'Get your song delivered as a high-quality audio file ready to share, gift, or play at the event.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad how-it-works">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">The Process</span>
          <h2 className="section-title">
            Simple as{' '}
            <span className="display-font text-gold">1, 2, 3, 4</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-desc">
            From your first message to your final song in just a few simple steps.
          </p>
        </motion.div>

        <div className="steps-row">
          {steps.map((step, i) => (
            <div key={step.number} className="step-wrapper">
              <motion.div
                className="step-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="step-num">{step.number}</div>
                <div className="step-icon-wrap">
                  <div className="step-icon">
                    <step.icon size={26} strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  className="step-connector"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.4, duration: 0.5 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
