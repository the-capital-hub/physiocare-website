import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiHeart,
  FiActivity,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";

import "./PatientStories.css";

const stories = [
  {
    number: "01",
    title: "Back to Running",
    goal: "Return to running after pain or injury.",
    journey:
      "Assessment → progressive strength → running specific work → gradual return.",
    outcome: "[Verified patient outcome]",
    icon: FiActivity,
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1300&q=90",
  },
  {
    number: "02",
    title: "Back to Everyday Life",
    goal: "Move comfortably through daily activities.",
    journey:
      "Mobility → strength → functional training → confidence.",
    outcome: "[Verified patient outcome]",
    icon: FiHeart,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1300&q=90",
  },
  {
    number: "03",
    title: "Stronger After Surgery",
    goal: "Rebuild strength and function after surgery.",
    journey:
      "Guided rehabilitation → progressive loading → functional milestones.",
    outcome: "[Verified patient outcome]",
    icon: FiShield,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1300&q=90",
  },
  {
    number: "04",
    title: "Understanding My Body",
    goal: "Understand recurring movement or performance limitations.",
    journey:
      "Assessment → education → targeted exercise → self management.",
    outcome: "[Verified patient outcome]",
    icon: FiTrendingUp,
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c55b1f?auto=format&fit=crop&w=1300&q=90",
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

export default function PatientStories() {
  return (
    <main className="patient-stories-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="patient-stories-hero">

        <div className="patient-stories-hero-grid" />

        <div className="patient-stories-hero-circle patient-stories-hero-circle-one" />
        <div className="patient-stories-hero-circle patient-stories-hero-circle-two" />

        <div className="patient-stories-container">

          <div className="patient-stories-hero-layout">

            <motion.div
              className="patient-stories-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="patient-stories-tag"
                variants={reveal}
              >
                PATIENT STORIES
              </motion.div>

              <motion.h1 variants={reveal}>
                Progress looks
                <span>different for everyone.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                For one person, success means running again. For another,
                it means climbing stairs, returning to work, getting back to
                the gym or simply feeling more capable.
              </motion.p>

              <motion.div
                className="patient-stories-hero-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="patient-stories-primary-btn"
                >
                  Start Your Journey
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/services"
                  className="patient-stories-text-btn"
                >
                  Explore our services
                  <FiArrowUpRight />
                </Link>
              </motion.div>

              <motion.div
                className="patient-stories-hero-note"
                variants={reveal}
              >
                <span />
                <p>
                  Your definition of progress is what matters most.
                </p>
              </motion.div>

            </motion.div>

            <motion.div
              className="patient-stories-hero-visual"
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

              <div className="patient-stories-hero-image">
                <img
                  src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=90"
                  alt="Runner returning to activity"
                />
              </div>

              <div className="patient-stories-hero-label">
                <span>PROGRESS</span>
                <strong>IS PERSONAL</strong>
              </div>

              <motion.div
                className="patient-stories-hero-orbit"
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
                className="patient-stories-floating-card"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="patient-stories-floating-icon">
                  <FiTrendingUp />
                </div>

                <div>
                  <strong>Every milestone counts</strong>
                  <span>Big or small</span>
                </div>
              </motion.div>

              <div className="patient-stories-dot-pattern" />

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          INTRO
      ========================================= */}

      <section className="patient-stories-intro">

        <div className="patient-stories-container">

          <motion.div
            className="patient-stories-intro-layout"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="patient-stories-intro-copy"
              variants={reveal}
            >

              <div className="patient-stories-tag">
                WHAT PROGRESS MEANS
              </div>

              <h2>
                The goal is not simply
                <span>less pain.</span>
              </h2>

            </motion.div>

            <motion.p
              className="patient-stories-intro-text"
              variants={reveal}
            >
              Meaningful progress is being able to do more of what matters to
              you. Each journey starts from a different place and moves toward
              a different definition of success.
            </motion.p>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          STORIES
      ========================================= */}

      <section className="patient-stories-list">

        <div className="patient-stories-container">

          <motion.div
            className="patient-stories-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {stories.map((story, index) => {
              const Icon = story.icon;

              return (
                <motion.article
                  key={story.number}
                  className={`patient-story-card ${
                    index === 0 ? "patient-story-featured" : ""
                  }`}
                  variants={reveal}
                  whileHover={{
                    y: -9,
                  }}
                >

                  <div className="patient-story-image">

                    <img
                      src={story.image}
                      alt={story.title}
                    />

                    <div className="patient-story-image-overlay" />

                    <span className="patient-story-number">
                      {story.number}
                    </span>

                    <div className="patient-story-icon">
                      <Icon />
                    </div>

                  </div>

                  <div className="patient-story-content">

                    <div className="patient-story-kicker">
                      PATIENT JOURNEY
                    </div>

                    <h3>{story.title}</h3>

                    <p className="patient-story-goal">
                      {story.goal}
                    </p>

                    <div className="patient-story-journey">
                      <span>THE PATH</span>
                      <p>{story.journey}</p>
                    </div>

                    <div className="patient-story-outcome">
                      <span>OUTCOME</span>
                      <strong>{story.outcome}</strong>
                    </div>

                    <div className="patient-story-bottom">
                      <span>EXPLORE STORY</span>
                      <FiArrowUpRight />
                    </div>

                  </div>

                </motion.article>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          JOURNEY
      ========================================= */}

      <section className="patient-stories-journey">

        <div className="patient-stories-journey-shape patient-stories-journey-shape-one" />
        <div className="patient-stories-journey-shape patient-stories-journey-shape-two" />

        <div className="patient-stories-container">

          <div className="patient-stories-journey-layout">

            <motion.div
              className="patient-stories-journey-visual"
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

              <div className="patient-stories-journey-image">
                <img
                  src="https://images.unsplash.com/photo-1571019613914-85f342c55b1f?auto=format&fit=crop&w=1500&q=90"
                  alt="Physiotherapist working with a patient"
                />
              </div>

              <div className="patient-stories-journey-badge">
                <span>01</span>
                <strong>YOUR JOURNEY</strong>
              </div>

              <motion.div
                className="patient-stories-journey-orbit"
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
              className="patient-stories-journey-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="patient-stories-tag"
                variants={reveal}
              >
                NO TWO JOURNEYS ARE THE SAME
              </motion.div>

              <motion.h2 variants={reveal}>
                Your progress is
                <span>not a template.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                One patient may want to return to sport. Another may want to
                feel confident walking, working or exercising again. The
                destination changes, so the pathway should change too.
              </motion.p>

              <motion.div
                className="patient-stories-journey-points"
                variants={stagger}
              >

                <motion.div
                  className="patient-stories-journey-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Start where you are</strong>
                    <p>
                      We understand your current movement, symptoms and goals.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="patient-stories-journey-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Build step by step</strong>
                    <p>
                      Treatment and exercise progress as your capacity grows.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="patient-stories-journey-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Keep moving forward</strong>
                    <p>
                      Confidence grows when progress becomes part of everyday
                      life.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

              <motion.div variants={reveal}>
                <Link
                  to="/contact"
                  className="patient-stories-dark-btn"
                >
                  Start Your Assessment
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

      <section className="patient-stories-statement">

        <div className="patient-stories-statement-grid" />

        <motion.div
          className="patient-stories-statement-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="patient-stories-container">

          <motion.div
            className="patient-stories-statement-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="patient-stories-light-tag"
              variants={reveal}
            >
              THE BIGGER PICTURE
            </motion.div>

            <motion.h2 variants={reveal}>
              Progress is measured
              <span>in real life.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              More confidence. More strength. More freedom. More of the things
              that make your everyday life feel like yours again.
            </motion.p>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="patient-stories-final">

        <div className="patient-stories-final-image">
          <img
            src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=90"
            alt="Patient returning to running"
          />
        </div>

        <div className="patient-stories-final-overlay" />
        <div className="patient-stories-final-pattern" />

        <motion.div
          className="patient-stories-final-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="patient-stories-container">

          <motion.div
            className="patient-stories-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="patient-stories-light-tag"
              variants={reveal}
            >
              YOUR STORY STARTS HERE
            </motion.div>

            <motion.h2 variants={reveal}>
              What does progress
              <span>look like for you?</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with an assessment and let us understand where you are,
              where you want to go and how we can help you get there.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="patient-stories-final-btn"
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