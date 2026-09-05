import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiMail,
  FiMapPin,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";

import "./Contact.css";

const images = {
  hero:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=90",

  consultation:
    "https://images.unsplash.com/photo-1571019613914-85f342c55b1f?auto=format&fit=crop&w=1500&q=90",

  clinic:
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1700&q=90",
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main className="contact-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="contact-hero">

        <div className="contact-hero-grid" />

        <div className="contact-hero-circle contact-hero-circle-one" />
        <div className="contact-hero-circle contact-hero-circle-two" />

        <div className="contact-container">

          <div className="contact-hero-layout">

            <motion.div
              className="contact-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="contact-tag"
                variants={reveal}
              >
                CONTACT & BOOKING
              </motion.div>

              <motion.h1 variants={reveal}>
                Let’s get
                <span>you moving.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                Tell us where you are today, what is limiting you and what
                you want to get back to. We will help you understand the next
                step.
              </motion.p>

              <motion.div
                className="contact-hero-actions"
                variants={reveal}
              >
                <a
                  href="#appointment"
                  className="contact-primary-btn"
                >
                  Book an Appointment
                  <FiArrowUpRight />
                </a>

                <a
                  href="#contact-details"
                  className="contact-text-btn"
                >
                  Contact details
                  <FiArrowUpRight />
                </a>
              </motion.div>

              <motion.div
                className="contact-hero-note"
                variants={reveal}
              >
                <span />
                <p>
                  Start with a conversation. We will guide the rest.
                </p>
              </motion.div>

            </motion.div>

            <motion.div
              className="contact-hero-visual"
              initial={{
                opacity: 0,
                scale: 0.96,
                x: 28,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="contact-hero-image">
                <img
                  src={images.hero}
                  alt="Physiotherapist talking with a patient"
                />
              </div>

              <div className="contact-hero-badge">
                <span>01</span>

                <div>
                  <strong>Start with an assessment</strong>
                  <small>Understand your next step</small>
                </div>
              </div>

              <motion.div
                className="contact-hero-orbit"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span />
              </motion.div>

              <div className="contact-hero-label">
                <span>CARE</span>
                <strong>MADE PERSONAL</strong>
              </div>

              <motion.div
                className="contact-floating-card"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiMessageCircle />

                <div>
                  <strong>Questions?</strong>
                  <span>We are here to help</span>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          CONTACT DETAILS
      ========================================= */}

      <section
        id="contact-details"
        className="contact-details-section"
      >

        <div className="contact-container">

          <motion.div
            className="contact-section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="contact-tag"
              variants={reveal}
            >
              FIND YOUR WAY HERE
            </motion.div>

            <motion.h2 variants={reveal}>
              Everything you need
              <span>before your first visit.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Reach out using whichever option feels easiest. We can answer
              your questions and help you decide what comes next.
            </motion.p>

          </motion.div>

          <motion.div
            className="contact-info-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={stagger}
          >

            <motion.article
              className="contact-info-card"
              variants={reveal}
              whileHover={{
                y: -7,
              }}
            >
              <div className="contact-info-icon">
                <FiPhone />
              </div>

              <div>
                <span>PHONE</span>
                <strong>[Phone Number]</strong>
                <p>
                  Call us during clinic hours for appointments or questions.
                </p>
              </div>

              <FiArrowUpRight className="contact-card-arrow" />
            </motion.article>

            <motion.article
              className="contact-info-card"
              variants={reveal}
              whileHover={{
                y: -7,
              }}
            >
              <div className="contact-info-icon">
                <FiMail />
              </div>

              <div>
                <span>EMAIL</span>
                <strong>[Email Address]</strong>
                <p>
                  Send us your questions and we will get back to you.
                </p>
              </div>

              <FiArrowUpRight className="contact-card-arrow" />
            </motion.article>

            <motion.article
              className="contact-info-card"
              variants={reveal}
              whileHover={{
                y: -7,
              }}
            >
              <div className="contact-info-icon">
                <FiMapPin />
              </div>

              <div>
                <span>CLINIC</span>
                <strong>[Full Clinic Address]</strong>
                <p>
                  Visit us at the clinic for your assessment and treatment.
                </p>
              </div>

              <FiArrowUpRight className="contact-card-arrow" />
            </motion.article>

            <motion.article
              className="contact-info-card"
              variants={reveal}
              whileHover={{
                y: -7,
              }}
            >
              <div className="contact-info-icon">
                <FiClock />
              </div>

              <div>
                <span>OPENING HOURS</span>
                <strong>[Days and Timings]</strong>
                <p>
                  Choose a convenient time and we will help arrange the visit.
                </p>
              </div>

              <FiArrowUpRight className="contact-card-arrow" />
            </motion.article>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          APPOINTMENT
      ========================================= */}

      <section
        id="appointment"
        className="contact-booking-section"
      >

        <div className="contact-booking-shape contact-booking-shape-one" />
        <div className="contact-booking-shape contact-booking-shape-two" />

        <div className="contact-container">

          <div className="contact-booking-layout">

            <motion.div
              className="contact-booking-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="contact-tag"
                variants={reveal}
              >
                YOUR APPOINTMENT
              </motion.div>

              <motion.h2 variants={reveal}>
                Your movement.
                <span>Your next step.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                Share a few details and tell us what you need help with. This
                gives us a starting point for understanding your visit.
              </motion.p>

              <motion.div
                className="contact-booking-points"
                variants={stagger}
              >

                <motion.div
                  className="contact-booking-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Tell us what is happening</strong>
                    <p>
                      Describe the problem in your own words.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-booking-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Choose a convenient time</strong>
                    <p>
                      Share your preferred appointment date and time.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-booking-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>We guide the next step</strong>
                    <p>
                      Your assessment helps shape the right pathway.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

              <motion.div
                className="contact-booking-image"
                variants={reveal}
              >
                <img
                  src={images.consultation}
                  alt="Physiotherapist guiding a patient"
                />

                <div className="contact-booking-image-caption">
                  <span>THE FIRST VISIT</span>
                  <strong>Listen. Assess. Plan.</strong>
                </div>
              </motion.div>

            </motion.div>

            <motion.div
              className="contact-form-wrap"
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <form
                onSubmit={handleSubmit}
                className="contact-form"
              >

                <div className="contact-form-head">
                  <div>
                    <span>BOOKING FORM</span>
                    <h3>Tell us about you.</h3>
                  </div>

                  <div className="contact-form-number">
                    01
                  </div>
                </div>

                <div className="contact-form-grid">

                  <label className="contact-field">
                    <span>Full Name</span>
                    <input
                      type="text"
                      placeholder="Enter your name"
                    />
                  </label>

                  <label className="contact-field">
                    <span>Phone</span>
                    <input
                      type="tel"
                      placeholder="Enter your phone"
                    />
                  </label>

                  <label className="contact-field">
                    <span>Email</span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                    />
                  </label>

                  <label className="contact-field">
                    <span>Service</span>

                    <select defaultValue="">
                      <option value="" disabled>
                        Choose a service
                      </option>

                      <option>
                        Physiotherapy
                      </option>

                      <option>
                        Biomechanical Assessment
                      </option>

                      <option>
                        Rehabilitation
                      </option>

                      <option>
                        Prehabilitation
                      </option>

                      <option>
                        Sports Rehabilitation
                      </option>

                      <option>
                        Strength and Conditioning
                      </option>

                      <option>
                        Pediatric Physiotherapy
                      </option>
                    </select>
                  </label>

                  <label className="contact-field">
                    <span>Preferred Date</span>
                    <input type="date" />
                  </label>

                  <label className="contact-field">
                    <span>Preferred Time</span>
                    <input type="time" />
                  </label>

                  <label className="contact-field contact-field-full">
                    <span>Goal or Concern</span>

                    <textarea
                      rows="5"
                      placeholder="Tell us briefly what you would like help with"
                    />
                  </label>

                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                >
                  Request an Appointment
                  <FiArrowUpRight />
                </button>

                <p className="contact-form-note">
                  Your details help us understand how we can best support you.
                </p>

              </form>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          BEFORE YOU VISIT
      ========================================= */}

      <section className="contact-visit-section">

        <div className="contact-container">

          <div className="contact-visit-layout">

            <motion.div
              className="contact-visit-visual"
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.18,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="contact-visit-image">
                <img
                  src={images.clinic}
                  alt="Modern physiotherapy clinic interior"
                />
              </div>

              <motion.div
                className="contact-visit-circle"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 23,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span />
              </motion.div>

            </motion.div>

            <motion.div
              className="contact-visit-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="contact-tag"
                variants={reveal}
              >
                BEFORE YOU VISIT
              </motion.div>

              <motion.h2 variants={reveal}>
                Come as you are.
                <span>We will take it from there.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                You do not need to know exactly what is wrong or which service
                you need. Your first visit is about understanding your needs
                and creating a clear direction.
              </motion.p>

              <motion.div
                className="contact-visit-list"
                variants={stagger}
              >

                <motion.div
                  className="contact-visit-item"
                  variants={reveal}
                >
                  <span>01</span>
                  <strong>Bring your questions</strong>
                </motion.div>

                <motion.div
                  className="contact-visit-item"
                  variants={reveal}
                >
                  <span>02</span>
                  <strong>Tell us what you want to return to</strong>
                </motion.div>

                <motion.div
                  className="contact-visit-item"
                  variants={reveal}
                >
                  <span>03</span>
                  <strong>Wear something comfortable to move in</strong>
                </motion.div>

              </motion.div>

              <motion.div variants={reveal}>
                <Link
                  to="/about"
                  className="contact-about-btn"
                >
                  Learn About Our Approach
                  <FiArrowUpRight />
                </Link>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="contact-final">

        <div className="contact-final-image">
          <img
            src={images.hero}
            alt="Physiotherapy consultation"
          />
        </div>

        <div className="contact-final-overlay" />
        <div className="contact-final-pattern" />

        <motion.div
          className="contact-final-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="contact-container">

          <motion.div
            className="contact-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="contact-light-tag"
              variants={reveal}
            >
              YOUR NEXT STEP
            </motion.div>

            <motion.h2 variants={reveal}>
              Ready to feel
              <span>more confident in movement?</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with an assessment and let’s build a clear way forward
              together.
            </motion.p>

            <motion.div variants={reveal}>
              <a
                href="#appointment"
                className="contact-final-btn"
              >
                Book Your Assessment
                <FiArrowUpRight />
              </a>
            </motion.div>

          </motion.div>

        </div>
      </section>

    </main>
  );
}