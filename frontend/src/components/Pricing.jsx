import { motion } from 'framer-motion';
import { Check, Zap, Star, Crown } from 'lucide-react';
import '../assets/styles/Pricing.css';

const plans = [
  {
    icon: Zap,
    name: 'Basic',
    tagline: 'Perfect for a heartfelt gift',
    price: '₹2,999',
    usd: '$36',
    features: [
      'Original song up to 2 minutes',
      'Custom lyrics based on your story',
      '1 genre choice',
      'MP3 delivery in 5–7 days',
      '1 revision included',
      'Digital certificate of authenticity',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    icon: Star,
    name: 'Premium',
    tagline: 'Most popular — all-inclusive',
    price: '₹5,999',
    usd: '$72',
    features: [
      'Original song up to 3.5 minutes',
      'Custom lyrics + vocal performance',
      '2 genre choices',
      'MP3 + WAV delivery in 3–4 days',
      '3 revisions included',
      'Behind-the-scenes making video',
      'Digital framed lyric sheet',
      'Priority support',
    ],
    cta: 'Order Premium',
    featured: true,
  },
  {
    icon: Crown,
    name: 'Signature',
    tagline: 'The ultimate musical experience',
    price: '₹11,999',
    usd: '$145',
    features: [
      'Original song up to 5 minutes',
      'Full band arrangement',
      'Any genre, any style',
      'All formats — 48hr rush delivery',
      'Unlimited revisions',
      'Full lyric booklet',
      'Video lyric reel for social',
      'Dedicated producer',
      'Lifetime archive access',
    ],
    cta: 'Go Signature',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad pricing">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Transparent Pricing</span>
          <h2 className="section-title">
            Choose Your{' '}
            <span className="display-font text-gold">Experience</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-desc">
            No hidden fees. No compromises. Just world-class songs at every price point.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: plan.featured ? -4 : -8 }}
            >
              {plan.featured && (
                <div className="pricing-card__badge">Most Popular</div>
              )}

              <div className="pricing-card__header">
                <div className="pricing-card__icon">
                  <plan.icon size={22} strokeWidth={1.5} />
                </div>
                <div className="pricing-card__name">{plan.name}</div>
                <div className="pricing-card__tagline">{plan.tagline}</div>
              </div>

              <div className="pricing-card__price">
                <span className="pricing-card__amount">{plan.price}</span>
                <span className="pricing-card__usd">{plan.usd}</span>
              </div>

              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li key={f} className="pricing-card__feature">
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className="pricing-card__check"
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`btn pricing-card__cta ${
                  plan.featured ? 'btn-gold' : 'btn-outline'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="pricing__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          All prices are inclusive of taxes. International payments accepted.
        </motion.p>
      </div>
    </section>
  );
}
