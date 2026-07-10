import { Music2, Phone, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../assets/styles/Footer.css';
import gtLogo from '../assets/gtlogonavbar.png';
import { color } from 'framer-motion';

const quickLinks  = ['Services', 'How It Works', 'Portfolio', 'Pricing', 'Reviews', 'FAQ'];
const serviceList = ['Birthday Songs', 'Wedding Songs', 'Anniversary Songs', 'Proposal Songs', 'Business Jingles', 'Tribute Songs'];

const anchorMap = {
  'Services':     '#services',
  'How It Works': '#how-it-works',
  'Portfolio':    '#portfolio',
  'Pricing':      '#pricing',
  'Reviews':      '#testimonials',
  'FAQ':          '#faq',
};

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer__top-border" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <a href="https://www.glorytunes.com" className="footer__logo-link">
                  <img src={gtLogo} alt="Glory Tunes Logo" className="navbar__logo-img" />
              </a>
            </div>
            <p className="footer__tagline">
              Turning your most precious memories into timeless musical
              masterpieces — crafted with love, delivered with purpose.
            </p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/glorytunes_/" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram">
                <FaInstagram size={15} />
              </a>
              <a href="https://www.youtube.com/@glorytunes" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="YouTube">
                <FaYoutube size={15} />
              </a>
              <a
                href="https://wa.me/9790183513"
                className="footer__social footer__social--whatsapp"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    className="footer__link"
                    onClick={() => scrollTo(anchorMap[link])}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Services</h4>
            <ul className="footer__links">
              {serviceList.map((s) => (
                <li key={s}>
                  <button
                    className="footer__link"
                    onClick={() => scrollTo('#services')}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact Us</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <Phone size={13} strokeWidth={1.5} className="footer__contact-icon" />
                <a href="tel:+919790183513" className="footer__contact-link">
                  +91 9790183513
                </a>
              </div>
              <div className="footer__contact-item">
                <FaWhatsapp size={13} className="footer__contact-icon" />
                <a
                  href="https://wa.me/9790183513"
                  className="footer__contact-link"
                >
                  WhatsApp Us
                </a>
              </div>
              <div className="footer__contact-item">
                <Mail size={13} strokeWidth={1.5} className="footer__contact-icon" />
                <a
                  href="mailto:glorytunes.in@gmail.com
"
                  className="footer__contact-link"
                >
                  glorytunes.in@gmail.com

                </a>
              </div>
              <div className="footer__contact-item">
                <MapPin size={13} strokeWidth={1.5} className="footer__contact-icon" />
                <span className="footer__contact-link">
                  India &middot; Worldwide Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
  <p className="footer__copy">
    &copy; {year} Glory Tunes. All rights reserved. Made with{" "}
    <svg
      className="footer__heart-icon"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 21s-6.716-4.273-9.428-7.314C.86 11.86.5 9.5 1.94 7.5 3.38 5.5 6.5 5 8.5 7l3.5 3.5L15.5 7c2-2 5.12-1.5 6.56.5 1.44 2 1.08 4.36-.628 6.186C18.716 16.727 12 21 12 21z" />
    </svg>{" "}
    by{" "}
    
    <a  href="https://www.liyaka.in/" style={{color:"white"}}
      target="_blank"
      rel="noopener noreferrer"
      className="footer__credit-link"
    >
      Liyaka Digital
    </a>
  </p>
</div>
      </div>
    </footer>
  );
}
