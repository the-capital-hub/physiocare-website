import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiCompass,
  FiActivity,
  FiHeart,
} from "react-icons/fi";

import { services } from "../data/services";
import "./Services.css";

const heroImage =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=90";

const supportImage =
  "https://images.unsplash.com/photo-1571019613914-85f342c55b1f?auto=format&fit=crop&w=1400&q=90";

const approachImage =
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1500&q=90";

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

export default function Services() {
  return (
    <main className="services-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="services-hero">

        <div className="services-hero-grid" />

        <div className="services-hero-circle services-hero-circle-one" />
        <div className="services-hero-circle services-hero-circle-two" />

        <div className="services-container">
          <div className="services-hero-layout">

            <motion.div
              className="services-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="services-tag"
                variants={reveal}
              >
                WHAT WE DO
              </motion.div>

              <motion.h1 variants={reveal}>
                Care that
                <span>moves with you.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                From your first assessment to rebuilding strength and
                confidence, every part of your care is designed around where
                you are now and where you want to go.
              </motion.p>

              <motion.div
                className="services-hero-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="services-primary-btn"
                >
                  Start an Assessment
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/about"
                  className="services-text-btn"
                >
                  How we work
                  <FiArrowUpRight />
                </Link>
              </motion.div>

              <motion.div
                className="services-hero-note"
                variants={reveal}
              >
                <span />
                <p>
                  No guesswork. No unnecessary treatment. Just a clear path
                  forward.
                </p>
              </motion.div>

            </motion.div>

            <motion.div
              className="services-hero-visual"
              initial={{
                opacity: 0,
                scale: 0.96,
                x: 25,
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

              <div className="services-hero-image">
                <img
                  src={heroImage}
                  alt="Physiotherapist helping a patient"
                />
              </div>

              <div className="services-hero-image-label">
                <span>CARE</span>
                <strong>BUILT AROUND YOU</strong>
              </div>

              <motion.div
                className="services-orbit"
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

              <motion.div
                className="services-floating-card"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="services-floating-icon">
                  <FiActivity />
                </div>

                <div>
                  <strong>Movement first</strong>
                  <span>Care that adapts</span>
                </div>
              </motion.div>

              <div className="services-dot-pattern" />

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          SERVICES GRID
      ========================================= */}

      <section className="services-list-section">

        <div className="services-container">

          <motion.div
            className="services-section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="services-tag"
              variants={reveal}
            >
              OUR SERVICES
            </motion.div>

            <motion.h2 variants={reveal}>
              Support for every
              <span>stage of movement.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Whether you are managing pain, returning to activity or looking
              to perform better, your plan starts with understanding what your
              body needs.
            </motion.p>

          </motion.div>

          <motion.div
            className="services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number || index}
                  className={`services-card ${
                    index === 0 ? "services-card-featured" : ""
                  }`}
                  variants={reveal}
                  whileHover={{
                    y: -8,
                  }}
                >

                  <div className="services-card-top">
                    <span className="services-card-number">
                      {service.number}
                    </span>

                    <motion.div
                      className="services-card-icon"
                      whileHover={{
                        rotate: 8,
                        scale: 1.08,
                      }}
                    >
                      <Icon />
                    </motion.div>
                  </div>

                  <div className="services-card-content">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>

                  <div className="services-card-bottom">
                    <span>EXPLORE</span>
                    <FiArrowUpRight />
                  </div>

                </motion.article>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          GUIDANCE
      ========================================= */}

      <section className="services-guidance">

        <div className="services-guidance-shape services-guidance-shape-one" />
        <div className="services-guidance-shape services-guidance-shape-two" />

        <div className="services-container">

          <div className="services-guidance-layout">

            <motion.div
              className="services-guidance-visual"
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

              <div className="services-guidance-image">
                <img
                  src={supportImage}
                  alt="Physiotherapist guiding patient movement"
                />
              </div>

              <div className="services-guidance-badge">
                <span>01</span>
                <strong>START WITH YOU</strong>
              </div>

              <motion.div
                className="services-guidance-orbit"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span />
              </motion.div>

            </motion.div>

            <motion.div
              className="services-guidance-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="services-tag"
                variants={reveal}
              >
                NOT SURE WHERE TO START
              </motion.div>

              <motion.h2 variants={reveal}>
                You do not need to
                <span>choose the perfect service.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                Your first visit is about understanding what is happening,
                what matters to you and which approach is most appropriate.
              </motion.p>

              <motion.div
                className="services-check-list"
                variants={stagger}
              >

                <motion.div
                  className="services-check-item"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Understand your symptoms</strong>
                    <p>
                      We listen to what you are experiencing and how it affects
                      your everyday life.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="services-check-item"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Assess how you move</strong>
                    <p>
                      We look at the movement and strength factors that matter.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="services-check-item"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Create your pathway</strong>
                    <p>
                      Together we decide what the next step should look like.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

              <motion.div variants={reveal}>
                <Link
                  to="/contact"
                  className="services-dark-btn"
                >
                  Start an Assessment
                  <FiArrowUpRight />
                </Link>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          APPROACH
      ========================================= */}

      <section className="services-approach">

        <div className="services-container">

          <div className="services-approach-layout">

            <motion.div
              className="services-approach-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="services-tag"
                variants={reveal}
              >
                THE DIFFERENCE
              </motion.div>

              <motion.h2 variants={reveal}>
                Treatment is only
                <span>one part of progress.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                We combine hands on care with education, movement and
                progressive exercise so your progress can continue beyond the
                clinic.
              </motion.p>

              <motion.div
                className="services-approach-points"
                variants={stagger}
              >

                <motion.div
                  className="services-approach-point"
                  variants={reveal}
                >
                  <span>
                    <FiCompass />
                  </span>

                  <div>
                    <strong>Understand</strong>
                    <p>
                      Know what is happening and why it matters.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="services-approach-point"
                  variants={reveal}
                >
                  <span>
                    <FiActivity />
                  </span>

                  <div>
                    <strong>Move</strong>
                    <p>
                      Build better control through purposeful movement.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="services-approach-point"
                  variants={reveal}
                >
                  <span>
                    <FiHeart />
                  </span>

                  <div>
                    <strong>Trust</strong>
                    <p>
                      Grow confidence in what your body can do.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

            </motion.div>

            <motion.div
              className="services-approach-visual"
              initial={{
                opacity: 0,
                x: 35,
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

              <div className="services-approach-image">
                <img
                  src={approachImage}
                  alt="Patient performing a guided physiotherapy exercise"
                />
              </div>

              <div className="services-approach-card">
                <span>THE GOAL</span>
                <strong>More confidence in movement.</strong>
                <FiArrowUpRight />
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="services-final">

        <div className="services-final-image">
          <img
            src={heroImage}
            alt="Physiotherapy consultation"
          />
        </div>

        <div className="services-final-overlay" />
        <div className="services-final-pattern" />

        <motion.div
          className="services-final-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="services-container">

          <motion.div
            className="services-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="services-light-tag"
              variants={reveal}
            >
              YOUR NEXT STEP
            </motion.div>

            <motion.h2 variants={reveal}>
              Ready to find
              <span>your way forward?</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with an assessment and leave with a clearer understanding
              of your body and what comes next.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="services-final-btn"
              >
                Book Your Assessment
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

        </div>

      </section>

    </main>
  );
}