import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronRight,
} from "react-icons/fi";
import "./Footer.css";

const exploreLinks = [
  { label: "About Us", path: "/about" },
  { label: "Our Services", path: "/services" },
  { label: "Conditions", path: "/conditions" },
  { label: "Our Team", path: "/team" },
  { label: "Patient Stories", path: "/patient-stories" },
  { label: "FAQs", path: "/faqs" },
];

const serviceLinks = [
  { label: "Physiotherapy", path: "/services" },
  { label: "Rehabilitation", path: "/services" },
  { label: "Sports Rehabilitation", path: "/services" },
  { label: "Strength and Conditioning", path: "/services" },
  { label: "Biomechanical Assessment", path: "/services" },
];

export default function Footer() {
  return (
    <footer className="physio-footer">
      <div className="footer-cta">
        <div className="footer-container">
          <div className="footer-cta-inner">
            <div className="footer-cta-content">
              <span className="footer-eyebrow">
                <span />
                Your movement matters
              </span>

              <h2>Ready to move with more confidence?</h2>

              <p>
                Start with an assessment and understand what your body needs
                before deciding what comes next.
              </p>
            </div>

            <Link to="/contact" className="footer-cta-button">
              <span>Book an Assessment</span>
              <span className="footer-arrow">
                <FiArrowUpRight />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="footer-logo-mark">P</span>

                <span>
                  <strong>PHYSIOCARE</strong>
                  <small>Movement Clinic</small>
                </span>
              </Link>

              <p>
                Personalised physiotherapy, rehabilitation and movement care
                designed around your body, your goals and the way you want to
                live.
              </p>

              <div className="footer-socials">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FiFacebook />
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h3>Explore</h3>

              <nav>
                {exploreLinks.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <FiChevronRight />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-column">
              <h3>Care</h3>

              <nav>
                {serviceLinks.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <FiChevronRight />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="footer-column footer-contact">
              <h3>Get in touch</h3>

              <a href="tel:+910000000000">
                <span className="contact-icon">
                  <FiPhone />
                </span>
                <span>[Phone Number]</span>
              </a>

              <a href="mailto:hello@physiocare.com">
                <span className="contact-icon">
                  <FiMail />
                </span>
                <span>[Email Address]</span>
              </a>

              <div className="footer-address">
                <span className="contact-icon">
                  <FiMapPin />
                </span>

                <span>[Clinic Address]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} PhysioCare. All rights reserved.
          </p>

          <div>
            <Link to="/contact">Book an Assessment</Link>
            <span />
            <strong>Move Better. Live Stronger.</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}