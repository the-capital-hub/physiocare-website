import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiPhone,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

const links = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Conditions", "/conditions"],
  ["Team", "/team"],
  ["Stories", "/patient-stories"],
  ["FAQs", "/faqs"],
];

const mobileContainer = {
  hidden: {
    opacity: 0,
    y: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.2,
    },
  },
};

const mobileItem = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.06,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={`site-header ${open ? "is-open" : ""}`}>
      <div className="nav-container">

        {/* Brand */}
        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
          aria-label="PhysioCare Home"
        >
          <motion.span
            className="brand-mark"
            whileHover={{
              scale: 1.06,
              rotate: -4,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            P
          </motion.span>

          <span className="brand-copy">
            <strong>PHYSIOCARE</strong>
            <small>Movement Clinic</small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">

          <a
            href="tel:+910000000000"
            className="nav-phone"
          >
            <span className="nav-phone-icon">
              <FiPhone />
            </span>
            <span>Call Us</span>
          </a>

          <Link
            to="/contact"
            className="nav-book"
          >
            <span>Book an Assessment</span>

            <span className="nav-book-icon">
              <FiArrowUpRight />
            </span>
          </Link>

        </div>

        {/* Mobile Button */}
        <motion.button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setOpen((value) => !value)}
          whileTap={{ scale: 0.92 }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <FiX /> : <FiMenu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel"
            variants={mobileContainer}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-panel-inner">

              <nav className="mobile-nav">
                {links.map(([label, to], index) => (
                  <motion.div
                    key={to}
                    custom={index}
                    variants={mobileItem}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={to}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `mobile-nav-link ${
                          isActive ? "active" : ""
                        }`
                      }
                    >
                      <span>{label}</span>
                      <FiArrowUpRight />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mobile-menu-contact">

                <div className="mobile-contact-info">
                  <span className="mobile-contact-icon">
                    <FiPhone />
                  </span>

                  <div>
                    <small>Call Us</small>
                    <a href="tel:+910000000000">
                      [Phone Number]
                    </a>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mobile-book-btn"
                  onClick={closeMenu}
                >
                  <span>Book an Assessment</span>
                  <FiArrowUpRight />
                </Link>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}