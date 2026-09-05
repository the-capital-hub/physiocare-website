import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiHelpCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import "./FAQs.css";

const faqs = [
  [
    "What happens during the first appointment?",
    "We discuss your symptoms, history, lifestyle and goals, then assess relevant movement, strength, balance or function. We explain our findings and discuss the next steps.",
  ],
  [
    "Do I need a referral?",
    "Use the clinic’s confirmed referral policy here. If direct access is available, state it clearly.",
  ],
  [
    "What should I wear?",
    "Wear comfortable clothing that allows the clinician to observe and assess the relevant body area and movement.",
  ],
  [
    "How long is a session?",
    "Typically 45 to 60 minutes. Replace this with the clinic’s confirmed duration.",
  ],
  [
    "How many sessions will I need?",
    "It depends on your condition, goals, progress and response to treatment. Your plan should be reviewed as you progress.",
  ],
  [
    "Will I get exercises?",
    "When appropriate, your plan may include exercises for mobility, strength, control, conditioning and independent progress.",
  ],
  [
    "Is physiotherapy only for pain?",
    "No. Physiotherapy can also support rehabilitation, movement quality, injury prevention, preparation for activity or surgery and return to sport.",
  ],
  [
    "What is a biomechanical assessment?",
    "It is a structured assessment of how you move, helping identify movement patterns, mobility or strength limitations and other factors relevant to your goals.",
  ],
  [
    "Can I have an assessment without an injury?",
    "Yes. Assessment can be useful when you want to understand movement, improve performance, prepare for activity or reduce avoidable limitations.",
  ],
  [
    "Do you offer online sessions?",
    "Add the clinic’s confirmed online physiotherapy or consultation policy here.",
  ],
  [
    "Will treatment hurt?",
    "Some techniques or exercises may feel challenging, but care should be appropriately dosed and communicated. Tell your clinician about discomfort during a session.",
  ],
  [
    "I do not know which service I need.",
    "That is okay. Start with an assessment and the team can guide you toward the most appropriate pathway.",
  ],
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

export default function FAQs() {
  const [active, setActive] = useState(0);

  return (
    <main className="faqs-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="faqs-hero">

        <div className="faqs-hero-grid" />

        <div className="faqs-hero-circle faqs-hero-circle-one" />
        <div className="faqs-hero-circle faqs-hero-circle-two" />

        <div className="faqs-container">

          <div className="faqs-hero-layout">

            <motion.div
              className="faqs-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="faqs-tag"
                variants={reveal}
              >
                FREQUENTLY ASKED QUESTIONS
              </motion.div>

              <motion.h1 variants={reveal}>
                Clear answers
                <span>before you begin.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                A few common questions about appointments, assessment,
                treatment and progress, so you can arrive feeling more
                prepared.
              </motion.p>

              <motion.div
                className="faqs-hero-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="faqs-primary-btn"
                >
                  Book an Assessment
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/services"
                  className="faqs-text-btn"
                >
                  Explore our services
                  <FiArrowUpRight />
                </Link>
              </motion.div>

            </motion.div>

            <motion.div
              className="faqs-hero-visual"
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

              <div className="faqs-hero-card">

                <div className="faqs-hero-card-icon">
                  <FiHelpCircle />
                </div>

                <span>GOOD TO KNOW</span>

                <h2>
                  You do not need to
                  <strong>know everything first.</strong>
                </h2>

                <p>
                  Your first visit is where we listen, assess and help you
                  understand what comes next.
                </p>

                <div className="faqs-hero-card-line">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

              </div>

              <motion.div
                className="faqs-hero-orbit"
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
                className="faqs-floating-card"
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
                  <strong>Still unsure?</strong>
                  <span>We can guide you</span>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================
          FAQ SECTION
      ========================================= */}

      <section className="faqs-list-section">

        <div className="faqs-container">

          <div className="faqs-content-layout">

            <motion.aside
              className="faqs-side-panel"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="faqs-tag"
                variants={reveal}
              >
                NEED TO KNOW
              </motion.div>

              <motion.h2 variants={reveal}>
                Questions are
                <span>part of the process.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                Understanding your care can make the first step feel much
                easier. Explore the answers below or speak with the team
                directly.
              </motion.p>

              <motion.div
                className="faqs-side-note"
                variants={reveal}
              >
                <FiHelpCircle />

                <div>
                  <strong>Not seeing your question?</strong>
                  <span>Contact the clinic and ask us directly.</span>
                </div>
              </motion.div>

              <motion.div
                className="faqs-side-number"
                variants={reveal}
              >
                <span>12</span>
                <div>
                  <strong>Common questions</strong>
                  <small>Answered clearly</small>
                </div>
              </motion.div>

            </motion.aside>

            <motion.div
              className="faqs-accordion"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.08,
              }}
              variants={stagger}
            >

              {faqs.map(([question, answer], index) => {
                const isActive = active === index;

                return (
                  <motion.article
                    key={question}
                    className={`faqs-item ${
                      isActive ? "faqs-item-active" : ""
                    }`}
                    variants={reveal}
                  >

                    <button
                      type="button"
                      className="faqs-question"
                      onClick={() =>
                        setActive(isActive ? -1 : index)
                      }
                      aria-expanded={isActive}
                    >

                      <span className="faqs-question-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="faqs-question-text">
                        {question}
                      </span>

                      <motion.span
                        className="faqs-question-icon"
                        animate={{
                          rotate: isActive ? 180 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <FiChevronDown />
                      </motion.span>

                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          className="faqs-answer-wrap"
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <div className="faqs-answer">
                            <span className="faqs-answer-line" />

                            <p>
                              {answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </motion.article>
                );
              })}

            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================
          REASSURANCE
      ========================================= */}

      <section className="faqs-reassurance">

        <div className="faqs-reassurance-grid" />

        <div className="faqs-container">

          <motion.div
            className="faqs-reassurance-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.22,
            }}
            variants={stagger}
          >

            <motion.div
              className="faqs-light-tag"
              variants={reveal}
            >
              STILL HAVE QUESTIONS
            </motion.div>

            <motion.h2 variants={reveal}>
              You can ask.
              <span>We will listen.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Not every question fits into a list. Tell us what you are
              unsure about and we can help you decide what the next step
              should be.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="faqs-white-btn"
              >
                Talk to the Clinic
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

          <motion.div
            className="faqs-reassurance-circle"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 27,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span />
          </motion.div>

        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="faqs-final">

        <div className="faqs-final-image">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=90"
            alt="Physiotherapy consultation"
          />
        </div>

        <div className="faqs-final-overlay" />
        <div className="faqs-final-pattern" />

        <motion.div
          className="faqs-final-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="faqs-container">

          <motion.div
            className="faqs-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="faqs-light-tag"
              variants={reveal}
            >
              READY WHEN YOU ARE
            </motion.div>

            <motion.h2 variants={reveal}>
              Still thinking about
              <span>the first step?</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with an assessment and get a clearer understanding of
              what your body needs.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="faqs-final-btn"
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