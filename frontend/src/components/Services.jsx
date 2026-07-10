import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, Heart, Gem, Gift, Users, Home, Mic, Briefcase } from 'lucide-react';
import '../assets/styles/Services.css';
import imgBirthday from '../assets/images/gtimg3.png';
import imgWedding  from '../assets/images/weddingSongImg.png';
import imgFamily   from '../assets/images/gtimg7.png';
import imgProposal from '../assets/images/proposalSongImg.png';
import imgFreindship from '../assets/images/friendshipSongImg.png';
import imgAnniversary from '../assets/images/anniversarySongImg.png';
import imgTribute from '../assets/images/tributeSongImg.png';
import imgBuisnessJingles from '../assets/images/buisnessJinglesImg.png';
import OrderModal from './OrderModal';

const services = [
  { icon: Cake,      title: 'Birthday Songs',    desc: '...', img: imgBirthday },
  { icon: Heart,     title: 'Anniversary Songs', desc: '...', img: imgAnniversary },
  { icon: Gem,       title: 'Wedding Songs',     desc: '...', img: imgWedding },
  { icon: Gift,      title: 'Proposal Songs',    desc: '...', img: imgProposal },
  { icon: Users,     title: 'Friendship Songs',  desc: '...', img: imgFreindship },
  { icon: Home,      title: 'Family Songs',      desc: '...', img: imgFamily },
  { icon: Mic,       title: 'Tribute Songs',     desc: '...', img: imgTribute },
  { icon: Briefcase, title: 'Business Jingles',  desc: '...', img: imgBuisnessJingles },
];

const languages = [
  { name: 'Tamil',    native: 'தமிழ்' },
  { name: 'English',  native: 'English' },
  { name: 'Malayalam',native: 'മലയാളം' },
  { name: 'Kannada',  native: 'ಕನ್ನಡ' },
  { name: 'Telugu',   native: 'తెలుగు' },
  { name: 'Hindi',    native: 'हिन्दी' },
];

export function ServiceCard({ icon: Icon, title, desc, img, index = 0, onOrderClick }) {
  return (
    <motion.div
      className="service-card gold-border-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      {img && (
        <div className="service-card__img">
          <img src={img} alt={title} />
        </div>
      )}
      <div className="service-card__icon">
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
      <button
        className="btn btn-outline service-card__order-btn"
        onClick={() => onOrderClick(title)}
      >
        Order Song
      </button>
    </motion.div>
  );
}

export default function Services() {
  const [modalOpen, setModalOpen]             = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleOrderClick = (title) => {
    setSelectedService(title);
    setModalOpen(true);
  };

  return (
    <section id="services" className="section-pad services">
      <div className="container">

        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What We Create</span>
          <h2 className="section-title">
            Songs For Every{' '}
            <span className="display-font text-gold">Occasion</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-desc">
            Every emotion deserves its own melody. We craft personalized songs for
            life's most meaningful moments.
          </p>
        </motion.div>

        {/* Service cards */}
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              {...s}
              index={i}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>

        {/* ── Languages strip ── */}
        <motion.div
          className="languages-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="languages-strip__label">✨ Available in</p>
          <div className="languages-strip__pills">
            {languages.map((lang) => (
              <div key={lang.name} className="lang-pill">
                <span className="lang-pill__native">{lang.native}</span>
                <span className="lang-pill__name">{lang.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={selectedService}
      />
    </section>
  );
}