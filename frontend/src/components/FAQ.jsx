import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import '../assets/styles/FAQ.css';

const faqs = [
  {
    q: 'How long does it take to receive my custom song?',
    a: 'Delivery times depend on your chosen plan: Basic (5–7 days), Premium (3–4 days), and Signature (48-hour rush available). We never compromise on quality regardless of speed.',
  },
  {
    q: 'What information do I need to provide?',
    a: 'Simply share the story, memories, emotions, and key details about the person or occasion. The more you tell us, the more personal and meaningful your song will be. There is a simple order form to guide you.',
  },
  {
    q: 'Can I request a specific genre or music style?',
    a: 'Absolutely! We create songs across a wide range of genres — Bollywood, Western Pop, Classical, R&B, Folk, Jazz, and more. Just let us know your preference when ordering.',
  },
  {
    q: 'What if I am not happy with the song?',
    a: 'Your satisfaction is our top priority. Each plan includes a set number of revisions, and we will work with you until you love your song. Signature plan customers receive unlimited revisions.',
  },
  {
    q: 'Will my song be 100% original?',
    a: 'Yes — every Glory Tunes creation is written, composed, and produced exclusively for you. You will never hear your song anywhere else. We also provide a certificate of authenticity.',
  },
  {
    q: 'What format will I receive my song in?',
    a: 'Basic plan customers receive a high-quality MP3. Premium adds WAV (studio quality). Signature includes all formats plus a lyric video reel optimized for social media sharing.',
  },
  {
    q: 'Can I use the song on social media or at events?',
    a: 'Yes, personal use is fully covered. This includes sharing on social platforms, playing at events, and gifting. For commercial use (advertisements, radio), please contact us for a commercial license.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
      <button className="faq-item__trigger" onClick={onToggle}>
        <span className="faq-item__question">{q}</span>
        <span className="faq-item__icon">
          {isOpen ? (
            <Minus size={14} strokeWidth={2.2} />
          ) : (
            <Plus size={14} strokeWidth={2.2} />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-item__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <p className="faq-item__answer">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="faq" className="section-pad faq">
      <div className="container">
        <div className="faq-layout">
          {/* Left column */}
          <motion.div
            className="faq-intro"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Questions</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Frequently Asked{' '}
              <span className="display-font text-gold">Questions</span>
            </h2>
            <div className="gold-divider left" />
            <p className="section-desc" style={{ textAlign: 'left', marginLeft: 0 }}>
              Everything you need to know before ordering your custom song.
            </p>
            <button
              className="btn btn-gold faq__cta"
              onClick={() => scrollTo('#pricing')}
            >
              Order Now
            </button>
          </motion.div>

          {/* Right column */}
          <motion.div
            className="faq-list"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {faqs.map((item, i) => (
              <FAQItem
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
