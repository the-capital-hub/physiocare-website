import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiInstagram,
  FiFacebook,
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronRight,
  FiActivity,
} from "react-icons/fi";
import "./Footer.css";
const LOGO_URL =
  "https://static.wixstatic.com/media/9c90f2_9440af6822a34176b24b34906c2a25bb~mv2.png";
import footer1 from '../assets/footer1.jpg'
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
  { label: "Strength & Conditioning", path: "/services" },
  { label: "Biomechanical Assessment", path: "/services" },
];

export default function Footer() {
  return (
    <footer className="physio-footer">
      {/* =====================================================
          FOOTER CTA
      ====================================================== */}
     
<section className="footer-cta">
    <div className="footer-cta-bg">
    <img
      src={footer1}
      alt=""
    />
  </div>

  <div className="footer-cta-grid" />

  <div className="footer-cta-orbit footer-cta-orbit-one" />
  <div className="footer-cta-orbit footer-cta-orbit-two" />

  <div className="footer-cta-pulse">
    <span />
  </div>

  <div className="footer-cta-motion">
    <span className="motion-line motion-line-one" />
    <span className="motion-line motion-line-two" />
    <span className="motion-line motion-line-three" />
    <span className="motion-dot motion-dot-one" />
    <span className="motion-dot motion-dot-two" />
  </div>

  <div className="footer-container">
    <div className="footer-cta-inner">
      <div className="footer-cta-content">
        <div className="footer-eyebrow">
          
          <span>Your movement matters</span>
        </div>

        <div className="footer-cta-heading-wrap">
          <span className="footer-cta-index">01</span>

          <h2>
            Move better.
            <span>Live stronger.</span>
          </h2>
        </div>

        <p>
          Start with an assessment and get a clearer understanding of your
          movement, recovery and next steps.
        </p>

        <Link to="/contact" className="footer-cta-button">
          <span>Book an Assessment</span>

          <span className="footer-arrow">
            <FiArrowUpRight />
          </span>
        </Link>
      </div>

      <div className="footer-cta-visual" aria-hidden="true">
        <div className="footer-visual-label">
          <span>PHYSIOCARE</span>
          <strong>MOVEMENT</strong>
        </div>

        <div className="footer-visual-circle">
          <div className="footer-visual-inner">
            <FiActivity />
          </div>
        </div>

        <div className="footer-visual-cross footer-cross-one" />
        <div className="footer-visual-cross footer-cross-two" />

        <div className="footer-visual-tag">
          <span className="footer-tag-dot" />
          <span>START WITH<br />AN ASSESSMENT</span>
        </div>

        <span className="footer-visual-number">01</span>
      </div>
    </div>
  </div>
</section>
      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <section className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* BRAND */}
            {/* BRAND */}
<div className="footer-brand">
  <Link to="/" className="footer-logo">
    <span className="footer-logo-image">
      <img
        src={LOGO_URL}
        alt="Stairs Physiotherapy & Fitness Logo"
      />
    </span>

    
  </Link>

  <p className="footer-brand-description">
    Personalised physiotherapy, rehabilitation and movement care
    designed around your body, your goals and the way you want to
    live.
  </p>

  <div className="footer-brand-meta">
    <span>PHYSIOTHERAPY</span>
    <i />
    <span>REHABILITATION</span>
    <i />
    <span>PERFORMANCE</span>
  </div>

  <div className="footer-socials">
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      className="footer-social"
    >
      <FiInstagram />
    </a>

    <a
      href="https://facebook.com"
      target="_blank"
      rel="noreferrer"
      aria-label="Facebook"
      className="footer-social"
    >
      <FiFacebook />
    </a>
  </div>
</div>

            {/* EXPLORE */}
            <div className="footer-column">
              <span className="footer-column-number">01</span>

              <h3>Explore</h3>

              <nav className="footer-links">
                {exploreLinks.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <FiChevronRight />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CARE */}
            <div className="footer-column">
              <span className="footer-column-number">02</span>

              <h3>Care</h3>

              <nav className="footer-links">
                {serviceLinks.map((item) => (
                  <Link key={item.label} to={item.path}>
                    <FiChevronRight />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* CONTACT */}
            <div className="footer-column footer-contact">
              <span className="footer-column-number">03</span>

              <h3>Get in touch</h3>

              <div className="footer-contact-list">
                <a href="tel:+910000000000" className="footer-contact-item">
                  <span className="contact-icon">
                    <FiPhone />
                  </span>

                  <span>
                    <small>CALL US</small>
                    <strong>[Phone Number]</strong>
                  </span>
                </a>

                <a
                  href="mailto:hello@physiocare.com"
                  className="footer-contact-item"
                >
                  <span className="contact-icon">
                    <FiMail />
                  </span>

                  <span>
                    <small>EMAIL US</small>
                    <strong>[Email Address]</strong>
                  </span>
                </a>

                <div className="footer-contact-item footer-address">
                  <span className="contact-icon">
                    <FiMapPin />
                  </span>

                  <span>
                    <small>VISIT US</small>
                    <strong>[Clinic Address]</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RED DIVIDER */}
          <div className="footer-divider">
            <span />
          </div>

          {/* FOOTER STATEMENT */}
          <div className="footer-statement">
            <span>CARE THAT MOVES WITH YOU.</span>

            <strong>
              Better movement starts
              <em>with understanding.</em>
            </strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM BAR
      ====================================================== */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} PhysioCare. All rights reserved.
          </p>

          <div className="footer-bottom-right">
            <Link to="/contact">Book an Assessment</Link>

            <span className="footer-bottom-dot" />

            <strong>Move Better. Live Stronger.</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}