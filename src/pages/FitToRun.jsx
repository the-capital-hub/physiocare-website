import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiCompass,
  FiHeart,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

import "./FitToRun.css";

const images = {
  hero:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=90",

  assessment:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=90",

  strength:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=90",

  running:
    "https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1400&q=90",

  recovery:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=90",
};

const journey = [
  {
    number: "01",
    title: "Assess",
    text: "Understand how you move, load and run before changing anything.",
    icon: FiCompass,
  },
  {
    number: "02",
    title: "Understand",
    text: "Connect symptoms, movement patterns, strength and running demands.",
    icon: FiActivity,
  },
  {
    number: "03",
    title: "Build",
    text: "Develop the strength, control and capacity your running needs.",
    icon: FiTrendingUp,
  },
  {
    number: "04",
    title: "Return",
    text: "Gradually reintroduce running with a clear and manageable plan.",
    icon: FiZap,
  },
  {
    number: "05",
    title: "Perform",
    text: "Build confidence and resilience for the running you want to do.",
    icon: FiTarget,
  },
];

const benefits = [
  {
    title: "Run Without Guesswork",
    text: "Understand what may be limiting your running and what to work on next.",
    icon: FiCompass,
  },
  {
    title: "Build Running Strength",
    text: "Develop lower limb strength, control and capacity for repeated impact.",
    icon: FiTrendingUp,
  },
  {
    title: "Reduce Setbacks",
    text: "Identify modifiable factors that may contribute to recurring problems.",
    icon: FiShield,
  },
  {
    title: "Return With Confidence",
    text: "Progress towards running again with a plan that adapts as you improve.",
    icon: FiHeart,
  },
];

const assessmentPoints = [
  "Mobility",
  "Single leg strength",
  "Balance and control",
  "Running mechanics",
  "Load tolerance",
  "Training habits",
];

const dos = [
  "Warm up progressively",
  "Build running volume gradually",
  "Keep strength training consistent",
  "Respect recovery between harder sessions",
  "Pay attention to changes in symptoms",
];

const donts = [
  "Ignore persistent or worsening pain",
  "Increase distance and speed at the same time",
  "Train hard every day",
  "Copy someone else's running progression",
  "Rush back after an injury",
];

const faqs = [
  [
    "Is Fit to Run only for injured runners?",
    "No. The program can support runners who are returning after injury, preparing for a race, dealing with recurring problems or simply wanting to improve movement and running capacity.",
  ],
  [
    "Can beginners join Fit to Run?",
    "Yes. The starting point is based on your current ability, training history and goals rather than how experienced you are.",
  ],
  [
    "What happens during a running assessment?",
    "We discuss your running history and goals, then assess relevant mobility, strength, control and running-related factors.",
  ],
  [
    "Can I join while training for a race?",
    "Yes. The program can be adapted around your training schedule, current workload and race goals.",
  ],
  [
    "How quickly can I return to running?",
    "There is no single timeline. Progress depends on your condition, current capacity, symptoms, training demands and response to loading.",
  ],
  [
    "Do I need a gym?",
    "Not necessarily. Your plan can be adapted to the equipment, space and training environment available to you.",
  ],
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 30,
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

export default function FitToRun() {
  return (
    <main className="fit-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="fit-hero">

        <div className="fit-hero-image">
          <img
            src={images.hero}
            alt="Runner training outdoors"
          />
        </div>

        <div className="fit-hero-overlay" />

        <div className="fit-hero-grid" />

        <motion.div
          className="fit-hero-orbit"
          animate={{ rotate: 360 }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
        </motion.div>

        <div className="fit-container">

          <div className="fit-hero-content">

            <motion.div
              className="fit-eyebrow fit-eyebrow-light"
              initial="hidden"
              animate="visible"
              variants={reveal}
            >
              RUNNING PHYSIOTHERAPY PROGRAM
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              variants={reveal}
            >
              Fit to
              <span>Run.</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              variants={reveal}
            >
              Run stronger. Run smarter. Build the strength, control and
              confidence your running needs.
            </motion.p>

            <motion.div
              className="fit-hero-actions"
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.22 }}
              variants={reveal}
            >

              <Link
                to="/contact"
                className="fit-primary-btn"
              >
                Start Your Running Assessment

                <span>
                  <FiArrowUpRight />
                </span>
              </Link>

              <a
                href="#program"
                className="fit-outline-btn"
              >
                Explore the Program
                <FiArrowUpRight />
              </a>

            </motion.div>

          </div>

          

        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section
        className="fit-section fit-intro"
        id="program"
      >

        <div className="fit-container">

          <div className="fit-section-heading">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >

              <motion.div
                className="fit-eyebrow"
                variants={reveal}
              >
                FIT TO RUN PROGRAM
              </motion.div>

              <motion.h2 variants={reveal}>
                Running should challenge your body
                <span>not constantly fight it.</span>
              </motion.h2>

            </motion.div>

            <motion.p
              className="fit-section-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
              Fit to Run is a structured physiotherapy led approach for
              runners who want to understand their body, build running
              capacity and return to the road with greater confidence.
            </motion.p>

          </div>

          <div className="fit-intro-grid">

            <motion.div
              className="fit-intro-image"
              initial={{
                opacity: 0,
                x: -35,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >

              <img
                src={images.assessment}
                alt="Running assessment"
              />

              <div className="fit-image-overlay" />

              <div className="fit-image-label">
                <span>RUNNING ANALYSIS</span>
                <strong>LOOK BEYOND THE PAIN</strong>
              </div>

            </motion.div>

            <motion.div
              className="fit-intro-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >

              <motion.p
                className="fit-large-copy"
                variants={reveal}
              >
                Your running problem is rarely just about one body part.
                Training volume, strength, mobility, recovery, movement
                control and running demands can all influence how you feel.
              </motion.p>

              <motion.p
                className="fit-body-copy"
                variants={reveal}
              >
                That is why we start with an assessment and build from there.
                The goal is not simply to get you through one pain free run 
                it is to build a body that is better prepared for the demands
                of running.
              </motion.p>

              <motion.div
                className="fit-intro-stat"
                variants={reveal}
              >
                <span>THE GOAL</span>

                <strong>
                  Better movement.
                  <br />
                  Better running.
                </strong>

                <FiArrowUpRight />
              </motion.div>

            </motion.div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY JOIN
      ===================================================== */}

      <section className="fit-section fit-benefits">

        <div className="fit-container">

          <motion.div
            className="fit-centered-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >

            <motion.div
              className="fit-eyebrow"
              variants={reveal}
            >
              WHY FIT TO RUN
            </motion.div>

            <motion.h2 variants={reveal}>
              More than getting back to running.
              <span>Build what keeps you there.</span>
            </motion.h2>

          </motion.div>

          <motion.div
            className="fit-benefit-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={stagger}
          >

            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  className="fit-benefit-card"
                  variants={reveal}
                  whileHover={{ y: -8 }}
                >

                  <div className="fit-card-number">
                    0{index + 1}
                  </div>

                  <div className="fit-card-icon">
                    <Icon />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <FiArrowUpRight className="fit-card-arrow" />

                </motion.article>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          ASSESSMENT
      ===================================================== */}

      <section className="fit-section fit-assessment">

        <div className="fit-container fit-assessment-layout">

          <motion.div
            className="fit-assessment-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >

            <motion.div
              className="fit-eyebrow"
              variants={reveal}
            >
              THE RUNNING ASSESSMENT
            </motion.div>

            <motion.h2 variants={reveal}>
              We do not just look at
              <span>where it hurts.</span>
            </motion.h2>

            <motion.p
              className="fit-body-copy"
              variants={reveal}
            >
              We look at how you move, how you load your body and what your
              running currently demands.
            </motion.p>

            <motion.div
              className="fit-assessment-list"
              variants={reveal}
            >

              {assessmentPoints.map((item, index) => (
                <div
                  className="fit-assessment-item"
                  key={item}
                >
                  <span>0{index + 1}</span>

                  <strong>{item}</strong>

                  <FiCheck />
                </div>
              ))}

            </motion.div>

          </motion.div>

          <motion.div
            className="fit-assessment-visual"
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >

            <div className="fit-assessment-image">
              <img
                src={images.running}
                alt="Runner moving outdoors"
              />

              <div className="fit-assessment-overlay" />
            </div>

            <motion.div
              className="fit-running-marker"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              <span>
                <FiActivity />
              </span>

              <div>
                <small>RUNNING MECHANICS</small>
                <strong>ASSESS • LOAD • PROGRESS</strong>
              </div>

            </motion.div>

            <div className="fit-crosshair">
              <span />
              <i />
            </div>

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          JOURNEY
      ===================================================== */}

      <section className="fit-section fit-journey">

        <div className="fit-container">

          <motion.div
            className="fit-centered-heading fit-centered-light"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >

            <motion.div
              className="fit-eyebrow fit-eyebrow-light"
              variants={reveal}
            >
              YOUR RUNNING JOURNEY
            </motion.div>

            <motion.h2 variants={reveal}>
              A clearer path from
              <span>pain to performance.</span>
            </motion.h2>

          </motion.div>

          <motion.div
            className="fit-journey-track"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >

            <div className="fit-journey-line" />

            {journey.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  className="fit-journey-item"
                  variants={reveal}
                >

                  <div className="fit-journey-dot">
                    <Icon />
                  </div>

                  <span>{item.number}</span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                </motion.article>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          STRENGTH
      ===================================================== */}

      <section className="fit-strength">

        <div className="fit-strength-image">
          <img
            src={images.strength}
            alt="Strength training for runners"
          />
        </div>

        <div className="fit-strength-overlay" />

        <div className="fit-container">

          <div className="fit-strength-content">

            <motion.div
              className="fit-eyebrow fit-eyebrow-light"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
            >
              STRENGTH FOR RUNNERS
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
              Stronger legs.
              <span>Better control.</span>
              More resilient running.
            </motion.h2>

            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
            >
              Running is repetitive. Your body needs the capacity to handle
              that repetition. Strength training helps build the foundation
              behind efficient, confident movement.
            </motion.p>

            <motion.div
              className="fit-strength-tags"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >

              {[
                "Single-leg strength",
                "Calf capacity",
                "Hip strength",
                "Core control",
                "Landing mechanics",
              ].map((item) => (
                <motion.span
                  key={item}
                  variants={reveal}
                >
                  {item}
                </motion.span>
              ))}

            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DOS & DONTS
      ===================================================== */}

      <section className="fit-section fit-dos">

        <div className="fit-container">

          <div className="fit-heading-split">

            <div>
              <motion.div
                className="fit-eyebrow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
              >
                BEFORE YOU RUN
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
              >
                Small habits can change
                <span>how you handle load.</span>
              </motion.h2>
            </div>

            <motion.p
              className="fit-section-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
            >
              Good running is not only about mileage. Warm up, recovery,
              strength, training load and progression all matter.
            </motion.p>

          </div>

          <div className="fit-dos-grid">

            <motion.div
              className="fit-do-card"
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <div className="fit-do-header">
                <span>DO</span>
                <FiCheck />
              </div>

              <div className="fit-do-list">
                {dos.map((item, index) => (
                  <div key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

            </motion.div>

            <motion.div
              className="fit-dont-card"
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <div className="fit-do-header">
                <span>DON'T</span>
                <FiShield />
              </div>

              <div className="fit-do-list">
                {donts.map((item, index) => (
                  <div key={item}>
                    <span>0{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WHEN TO GET ASSESSED
      ===================================================== */}

      <section className="fit-assess-cta">

        <div className="fit-assess-cta-bg" />

        <div className="fit-container">

          <div className="fit-assess-cta-grid">

            <div>

              <motion.div
                className="fit-eyebrow fit-eyebrow-light"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
              >
            
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
              >
                Something about your
                <span>running has changed.</span>
              </motion.h2>

            </div>

            <motion.div
              className="fit-assess-reasons"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >

              {[
                "Pain keeps returning",
                "Your running has changed",
                "You are preparing for a race",
                "You are returning after injury",
                "You want to improve performance",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  variants={reveal}
                >
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <FiArrowUpRight />
                </motion.div>
              ))}

            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="fit-section fit-faq">

        <div className="fit-container">

          <div className="fit-heading-split">

            <div>
              <motion.div
                className="fit-eyebrow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
              >
                FIT TO RUN FAQ
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
              >
                Questions before
                <span>you start.</span>
              </motion.h2>
            </div>

            <motion.p
              className="fit-section-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={reveal}
            >
              Everything starts with understanding your current position and
              the goal you want to reach.
            </motion.p>

          </div>

          <div className="fit-faq-grid">

            {faqs.map(([question, answer], index) => (
              <motion.details
                key={question}
                className="fit-faq-item"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.04,
                }}
              >

                <summary>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>{question}</strong>

                  <FiArrowUpRight />
                </summary>

                <p>{answer}</p>

              </motion.details>
            ))}

          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="fit-final">

        <div className="fit-final-image">
          <img
            src={images.hero}
            alt="Runner ready to train"
          />
        </div>

        <div className="fit-final-overlay" />

        <motion.div
          className="fit-final-orbit"
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
        </motion.div>

        <div className="fit-container">

          <motion.div
            className="fit-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="fit-eyebrow fit-eyebrow-light"
              variants={reveal}
            >
              READY TO RUN BETTER?
            </motion.div>

            <motion.h2 variants={reveal}>
              Build your foundation.
              <span>Then run from there.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with a running assessment and understand what your body
              needs before deciding what comes next.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="fit-primary-btn"
              >
                Book Your Fit to Run Assessment

                <span>
                  <FiArrowUpRight />
                </span>
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </section>

    </main>
  );
}