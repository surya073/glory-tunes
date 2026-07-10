import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Music2, Send, Phone, MessageSquare } from 'lucide-react';
import '../assets/styles/OrderModal.css';

export default function OrderModal({ isOpen, onClose, serviceName }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setForm({ name: '', email: '', phone: '', notes: '' });
      setSubmitted(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: serviceName }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Could not reach the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="order-modal__backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="order-modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="order-modal__close" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2} />
            </button>

            {submitted ? (
              /* ── Success State ── */
              <div className="order-modal__success">
                <div className="order-modal__icon"><Music2 size={28} strokeWidth={1.3} /></div>
                <h3>Request Received! 🎶</h3>
                <p>We'll reach out to <strong>{form.email}</strong> within 24 hours.</p>
                <button className="btn btn-gold" onClick={onClose}>Close</button>
              </div>
            ) : (
              <>
                <div className="order-modal__header">
                  <div className="order-modal__icon">
                    <Music2 size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="order-modal__title">
                    Order Your <span className="display-font text-gold">{serviceName}</span>
                  </h3>
                  <p className="order-modal__sub">
                    Tell us your details and we'll reach out within 24 hours.
                  </p>
                </div>

                <form className="order-modal__form" onSubmit={handleSubmit}>
                  <div className="order-modal__body">

                    {/* Left column */}
                    <div className="order-modal__left">
                      <div className="order-modal__field">
                        <label className="order-modal__label"><User size={13} />Your Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          placeholder="e.g. Arjun Mehta" className="order-modal__input" required autoFocus />
                      </div>
                      <div className="order-modal__field">
                        <label className="order-modal__label"><Mail size={13} />Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="you@example.com" className="order-modal__input" required />
                      </div>
                      <div className="order-modal__field">
                        <label className="order-modal__label"><Phone size={13} />Phone / WhatsApp</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX" className="order-modal__input" />
                      </div>
                      <div className="order-modal__field">
                        <label className="order-modal__label"><Music2 size={13} />Service</label>
                        <input type="text" value={serviceName}
                          className="order-modal__input order-modal__input--disabled" disabled readOnly />
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="order-modal__right">
                      <div className="order-modal__field order-modal__field--grow">
                        <label className="order-modal__label"><MessageSquare size={13} />Notes / Message</label>
                        <textarea name="notes" value={form.notes} onChange={handleChange}
                          placeholder="Any special requirements, dedications, or details..."
                          className="order-modal__textarea" />
                        <span className="order-modal__hint">{form.notes.length} / 500 characters</span>
                      </div>
                      <button type="submit" className="btn btn-gold order-modal__submit" disabled={loading}>
                        <Send size={16} />{loading ? 'Sending...' : 'Send Request'}
                      </button>
                    </div>

                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}