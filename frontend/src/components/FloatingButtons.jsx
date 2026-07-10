import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import '../assets/styles/FloatingButtons.css';

export function FloatingWhatsApp({
  number  = '9790183513',
  message = 'Hi! I want to order a custom song.',
}) {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-btn floating-btn--whatsapp"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp size={26} />
      <span className="floating-btn__pulse floating-btn__pulse--green" />
      <span className="floating-btn__pulse floating-btn__pulse--green floating-btn__pulse--delay" />
    </motion.a>
  );
}

export function FloatingCall({ number = '+919790183513' }) {
  return (
    <motion.a
      href={`tel:${number}`}
      className="floating-btn floating-btn--call"
      aria-label="Call us"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Phone size={22} strokeWidth={1.8} />
      <span className="floating-btn__glow" />
    </motion.a>
  );
}
