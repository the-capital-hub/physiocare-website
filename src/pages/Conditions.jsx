import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiHeart,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

import "./Conditions.css";

const heroImage =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=90";

const guidanceImage =
  "https://images.unsplash.com/photo-1571019613914-85f342c55b1f?auto=format&fit=crop&w=1500&q=90";

const groups = [
  {
    number: "01",
    title: "Back and Spine",
    intro:
      "Support for common back and spinal problems that affect comfort and movement.",
    items: [
      "Back Pain",
      "Neck Pain",
      "Sciatica",
    ],
    icon: FiActivity,
  },
  {
    number: "02",
    title: "Joints",
    intro:
      "Focused care for joint problems that can make everyday movement difficult.",
    items: [
      "Knee Pain",
      "Shoulder Pain",
      "Hip Pain",
      "Ankle and Foot Problems",
    ],
    icon: FiHeart,
  },
  {
    number: "03",
    title: "Sports and Activity",
    intro:
      "Helping active people recover from injury and return to what they enjoy.",
    items: [
      "Sports Injuries",
      "Muscle Injuries",
      "Tendon Problems",
    ],
    icon: FiTrendingUp,
  },
  {
    number: "04",
    title: "Recovery and Mobility",
    intro:
      "Guidance for recovery, balance and movement when everyday mobility feels limited.",
    items: [
      "Post Surgery Rehabilitation",
      "Balance Problems",
      "Mobility Limitations",
      "Arthritis",
    ],
    icon: FiShield,
  },
];

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

export default function Conditions() {
  return (
    <main className="conditions-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="conditions-hero">

        <div className="conditions-hero-grid" />

        <div className="conditions-hero-circle conditions-hero-circle-one" />
        <div className="conditions-hero-circle conditions-hero-circle-two" />

        <div className="conditions-container">
          <div className="conditions-hero-layout">

            <motion.div
              className="conditions-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="conditions-tag"
                variants={reveal}
              >
                CONDITIONS WE TREAT
              </motion.div>

              <motion.h1 variants={reveal}>
                Your symptoms are
                <span>unique.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                Your care should be too. We look beyond the symptom to
                understand what is limiting your movement and what you want
                to return to.
              </motion.p>

              <motion.div
                className="conditions-hero-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="conditions-primary-btn"
                >
                  Start an Assessment
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/services"
                  className="conditions-text-btn"
                >
                  Explore our services
                  <FiArrowUpRight />
                </Link>
              </motion.div>

              <motion.div
                className="conditions-hero-note"
                variants={reveal}
              >
                <span />
                <p>
                  You do not need to diagnose yourself before you visit.
                </p>
              </motion.div>

            </motion.div>

            <motion.div
              className="conditions-hero-visual"
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

              <div className="conditions-hero-image">
                <img
                  src={heroImage}
                  alt="Physiotherapist assessing a patient"
                />
              </div>

              <div className="conditions-hero-label">
                <span>UNDERSTAND</span>
                <strong>THEN MOVE FORWARD</strong>
              </div>

              <motion.div
                className="conditions-hero-orbit"
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

              <motion.div
                className="conditions-floating-card"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="conditions-floating-icon">
                  <FiActivity />
                </div>

                <div>
                  <strong>Every body is different</strong>
                  <span>Your plan should reflect that</span>
                </div>
              </motion.div>

              <div className="conditions-dot-pattern" />

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          CONDITION GROUPS
      ========================================= */}

      <section className="conditions-list-section">

        <div className="conditions-container">

          <motion.div
            className="conditions-section-intro"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="conditions-tag"
              variants={reveal}
            >
              AREAS WE HELP WITH
            </motion.div>

            <motion.h2 variants={reveal}>
              Start with what is
              <span>holding you back.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              These are some of the common problems we support. Your symptoms
              may not fit neatly into one category, and that is completely
              fine.
            </motion.p>

          </motion.div>

          <motion.div
            className="conditions-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {groups.map((group, index) => {
              const Icon = group.icon;

              return (
                <motion.article
                  key={group.number}
                  className={`conditions-card ${
                    index === 0 ? "conditions-card-featured" : ""
                  }`}
                  variants={reveal}
                  whileHover={{
                    y: -9,
                  }}
                >

                  <div className="conditions-card-top">
                    <span className="conditions-card-number">
                      {group.number}
                    </span>

                    <motion.div
                      className="conditions-card-icon"
                      whileHover={{
                        rotate: 8,
                        scale: 1.08,
                      }}
                    >
                      <Icon />
                    </motion.div>
                  </div>

                  <div className="conditions-card-content">
                    <h3>{group.title}</h3>

                    <p className="conditions-card-intro">
                      {group.intro}
                    </p>

                    <div className="conditions-items">
                      {group.items.map((item) => (
                        <span key={item}>
                          <FiCheck />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="conditions-card-bottom">
                    <span>LEARN MORE</span>
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

      <section className="conditions-guidance">

        <div className="conditions-guidance-shape conditions-guidance-shape-one" />
        <div className="conditions-guidance-shape conditions-guidance-shape-two" />

        <div className="conditions-container">

          <div className="conditions-guidance-layout">

            <motion.div
              className="conditions-guidance-visual"
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

              <div className="conditions-guidance-image">
                <img
                  src={guidanceImage}
                  alt="Physiotherapist guiding patient movement"
                />
              </div>

              <div className="conditions-guidance-badge">
                <span>WHY</span>
                <strong>ASSESS FIRST</strong>
              </div>

              <motion.div
                className="conditions-guidance-orbit"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 21,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span />
              </motion.div>

            </motion.div>

            <motion.div
              className="conditions-guidance-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="conditions-tag"
                variants={reveal}
              >
                NOT SURE WHAT YOUR CONDITION IS
              </motion.div>

              <motion.h2 variants={reveal}>
                You do not need to
                <span>figure it out alone.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                Pain can be confusing. Different problems can feel similar,
                and the same condition can affect people in very different
                ways.
              </motion.p>

              <motion.p variants={reveal}>
                That is why we begin with an assessment. We understand your
                symptoms, look at how you move and use that information to
                decide what should happen next.
              </motion.p>

              <motion.div
                className="conditions-guidance-points"
                variants={stagger}
              >

                <motion.div
                  className="conditions-guidance-point"
                  variants={reveal}
                >
                  <span>01</span>
                  <div>
                    <strong>Understand</strong>
                    <p>
                      Listen to your symptoms and goals.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="conditions-guidance-point"
                  variants={reveal}
                >
                  <span>02</span>
                  <div>
                    <strong>Assess</strong>
                    <p>
                      Explore movement, strength and function.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="conditions-guidance-point"
                  variants={reveal}
                >
                  <span>03</span>
                  <div>
                    <strong>Guide</strong>
                    <p>
                      Create a clear pathway that fits you.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

              <motion.div variants={reveal}>
                <Link
                  to="/contact"
                  className="conditions-dark-btn"
                >
                  Talk to Us
                  <FiArrowUpRight />
                </Link>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          STATEMENT
      ========================================= */}

      <section className="conditions-statement">

        <div className="conditions-statement-grid" />

        <motion.div
          className="conditions-statement-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="conditions-container">

          <motion.div
            className="conditions-statement-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="conditions-light-tag"
              variants={reveal}
            >
              THE IMPORTANT PART
            </motion.div>

            <motion.h2 variants={reveal}>
              The diagnosis is not
              <span>the whole story.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              What matters is how the problem affects your movement, your
              routine and the things you want to do.
            </motion.p>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="conditions-final">

        <div className="conditions-final-image">
          <img
            src={heroImage}
            alt="Physiotherapy consultation"
          />
        </div>

        <div className="conditions-final-overlay" />
        <div className="conditions-final-pattern" />

        <motion.div
          className="conditions-final-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="conditions-container">

          <motion.div
            className="conditions-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="conditions-light-tag"
              variants={reveal}
            >
              YOUR NEXT STEP
            </motion.div>

            <motion.h2 variants={reveal}>
              Not sure where to
              <span>begin?</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with an assessment. You do not need all the answers
              before your first visit.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="conditions-final-btn"
              >
                Start With an Assessment
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </section>

    </main>
  );
}