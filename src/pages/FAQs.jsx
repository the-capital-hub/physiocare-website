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
    "How do I schedule an appointment?",
    "You can schedule an appointment by contacting our team through our website or phone. Our staff will help you choose a convenient time and guide you through the booking process.",
  ],
  [
    "What is Physical Therapy?",
    "Physical therapy is a healthcare approach focused on relieving pain, restoring movement, improving function and preventing recurring injuries. Our physiotherapists assess your condition and create a personalized treatment plan using exercises, hands-on techniques and other appropriate methods.",
  ],
  [
    "How do we treat Physical Therapy at Stairs?",
    "At Stairs, we begin with a detailed assessment of your movement, symptoms, strength and functional needs. Based on your condition and goals, we combine personalized exercises, manual therapy, movement training and rehabilitation techniques to support long-term recovery.",
  ],
  [
    "To what extent are our physical therapists and coaches qualified?",
    "Our physiotherapists and coaches are committed to professional practice, patient safety and evidence-informed care. They assess each individual’s needs and provide guidance based on their condition, goals and rehabilitation requirements.",
  ],
  [
    "How long does a physiotherapy/training session last?",
    "The duration of each session depends on the type of service, your condition and your treatment goals. Please contact our team for details about the expected duration of your appointment.",
  ],
  [
    "Is physiotherapy painful?",
    "Physiotherapy should be performed according to your comfort level and condition. Some exercises or techniques may cause mild discomfort, but your therapist will adjust the treatment as needed. Always communicate any pain or discomfort during your session.",
  ],
  [
    "How many sessions do I need before I can fully recover from an injury?",
    "The number of sessions required depends on the type and severity of your injury, your goals, progress and response to treatment. Your physiotherapist will regularly review your condition and recommend an appropriate treatment plan.",
  ],
  [
    "How can you treat my injury without touching me?",
    "Physiotherapy can include exercise therapy, movement retraining, posture correction, education and guided rehabilitation. These approaches can help improve strength, mobility and function even when hands-on treatment is not required.",
  ],
  [
    "Are online sessions available?",
    "Online sessions may be available depending on your condition and the type of treatment required. Please contact our team to confirm online consultation availability and suitability for your needs.",
  ],
  [
    "What if I’m not sure if I’m doing my prescribed exercises right?",
    "If you are unsure about your exercises, contact your physiotherapist for guidance. Your therapist can review your technique, correct your movements and make adjustments to help you perform the exercises safely and effectively.",
  ],
  [
    "What is our cancellation and reschedule policy?",
    "If you need to cancel or reschedule your appointment, please inform our team as early as possible. Contact us directly to understand the applicable cancellation and rescheduling terms.",
  ],
  [
    "What forms of payment do you accept?",
    "For information about accepted payment methods, please contact our team. We will guide you regarding the available payment options for your selected service.",
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

            {/* HERO CONTENT */}

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

            {/* HERO VISUAL */}

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

            {/* LEFT INFORMATION PANEL */}

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


              {/* FAQ IMAGE */}

              <motion.div
                className="faqs-side-image"
                variants={reveal}
              >

                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=90"
                  alt="Physiotherapist helping a patient"
                />

                <div className="faqs-side-image-overlay" />

                <div className="faqs-side-image-badge">
                  <span style={{paddingTop:"5px"}} />
                  CLINICAL CARE
                </div>

                <div className="faqs-side-image-caption">
                  <strong>Clear answers.</strong>
                  <span>Confident next steps.</span>
                </div>

              </motion.div>


              {/* SIDE NOTE */}

              <motion.div
                className="faqs-side-note"
                variants={reveal}
              >

                <FiHelpCircle />

                <div>
                  <strong>Not seeing your question?</strong>
                  <span>
                    Contact the clinic and ask us directly.
                  </span>
                </div>

              </motion.div>


              {/* QUESTION COUNT */}

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


            {/* FAQ ACCORDION */}

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