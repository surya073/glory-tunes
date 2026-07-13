import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, Phone, MessageSquare, Music2, ChevronDown } from 'lucide-react';
import '../assets/styles/Contact.css';

const occasions = [
  'Birthday Song', 'Anniversary Song', 'Wedding Song', 'Proposal Song',
  'Friendship Song', 'Family Song', 'Tribute Song', 'Business Jingle', 'Other',
];

const genres = ['Bollywood', 'Western Pop', 'Classical', 'R&B / Soul', 'Folk / Acoustic', 'Jazz', 'Hip-Hop', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '', genre: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
    } else {
      alert(data.message || "Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Could not reach the server. Please try again later.");
  }
};

  return (
    <section id="contact" className="section-pad contact">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Start Your <span className="display-font text-gold">Song Journey</span></h2>
          <div className="gold-divider" />
          <p className="section-desc">Fill in the details below and we'll get back to you within 24 hours with a personalised quote.</p>
        </motion.div>

        <div className="contact-layout">
          {/* Left info */}
          <motion.div className="contact-info" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="contact-info__card">
              <div className="contact-info__icon"><Music2 size={22} strokeWidth={1.5} /></div>
              <div>
                <h4 className="contact-info__title">Custom Made for You</h4>
                <p className="contact-info__desc">Every song is written from scratch based on your story. No templates. No recycled melodies.</p>
              </div>
            </div>
            <div className="contact-info__card">
              <div className="contact-info__icon"><Send size={20} strokeWidth={1.5} /></div>
              <div>
                <h4 className="contact-info__title">Fast Turnaround</h4>
                <p className="contact-info__desc">Receive your song in as little as 48 hours with our Signature plan — or up to 7 days for Basic.</p>
              </div>
            </div>
            <div className="contact-info__card">
              <div className="contact-info__icon"><Phone size={20} strokeWidth={1.5} /></div>
              <div>
                <h4 className="contact-info__title">Talk to Us Directly</h4>
                <p className="contact-info__desc">Prefer a call? Reach us on WhatsApp or phone — available 9am–9pm IST every day.</p>
              </div>
            </div>
            <div className="contact-info__quote">
              <p>"The best gift is one that no one else will ever own."</p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div className="contact-form-wrap" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success__icon"><Music2 size={32} strokeWidth={1.2} /></div>
                <h3>We've got your story!</h3>
                <p>Our team will reach out within 24 hours with your personalised quote. Get ready for something magical.</p>
                <button className="btn btn-gold" onClick={() => setSubmitted(false)}>Submit Another Request</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label"><User size={13} strokeWidth={2} />Your Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Arjun Mehta" className="contact-form__input" required />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label"><Mail size={13} strokeWidth={2} />Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="contact-form__input" required />
                  </div>
                </div>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label"><Phone size={13} strokeWidth={2} />Phone / WhatsApp</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="contact-form__input" />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label"><Music2 size={13} strokeWidth={2} />Occasion Type</label>
                    <div className="contact-form__select-wrap">
                      <select name="occasion" value={form.occasion} onChange={handleChange} className="contact-form__select" required>
                        <option value="">Select occasion...</option>
                        {occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <ChevronDown size={14} className="contact-form__select-icon" />
                    </div>
                  </div>
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">Preferred Music Genre</label>
                  <div className="contact-form__genre-grid">
                    {genres.map((g) => (
                      <button key={g} type="button"
                        className={`contact-form__genre-btn ${form.genre === g ? 'active' : ''}`}
                        onClick={() => setForm((p) => ({ ...p, genre: g }))}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label"><MessageSquare size={13} strokeWidth={2} />Your Story / Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell us about the person, the occasion, special memories, emotions you want captured — the more detail the better!"
                    className="contact-form__textarea" rows={5} required />
                  <span className="contact-form__hint">{form.message.length} / 1000 characters</span>
                </div>
                <button type="submit" className="btn btn-gold contact-form__submit">
                  <Send size={17} strokeWidth={1.8} />Send My Story
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}