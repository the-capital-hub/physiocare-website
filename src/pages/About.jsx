import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiCompass,
  FiHeart,
  FiLayers,
  FiMove,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import "./About.css";

const images = {
  hero:
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=90",

  movement:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=90",

  story:
    "https://images.unsplash.com/photo-1571019613914-85f342c55b1f?auto=format&fit=crop&w=1400&q=90",

  clinic:
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=90",
};

const process = [
  {
    number: "01",
    title: "Listen",
    text: "We understand your symptoms, routine, concerns and goals before deciding where to begin.",
    icon: FiHeart,
  },
  {
    number: "02",
    title: "Assess",
    text: "We look at movement, strength and the factors that may be influencing the problem.",
    icon: FiCompass,
  },
  {
    number: "03",
    title: "Restore",
    text: "Focused treatment and movement help you start moving with greater confidence.",
    icon: FiActivity,
  },
  {
    number: "04",
    title: "Build",
    text: "We progressively develop strength, control and capacity for everyday life.",
    icon: FiLayers,
  },
  {
    number: "05",
    title: "Progress",
    text: "Your plan changes with you as your movement and confidence improve.",
    icon: FiTarget,
  },
];

const principles = [
  {
    number: "01",
    title: "Personal",
    text: "Your body, your routine and your goals shape the care you receive.",
    icon: FiHeart,
  },
  {
    number: "02",
    title: "Practical",
    text: "The work we do should make sense outside the treatment room.",
    icon: FiMove,
  },
  {
    number: "03",
    title: "Progressive",
    text: "Your treatment grows with your strength, confidence and capacity.",
    icon: FiZap,
  },
  {
    number: "04",
    title: "Human",
    text: "Clear communication and genuine attention stay at the centre.",
    icon: FiActivity,
  },
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
      staggerChildren: 0.09,
    },
  },
};

export default function About() {
  return (
    <main className="about-v7">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-v7-hero">
        <div className="about-v7-hero-grid-pattern" />

        <div className="about-v7-orbit about-v7-orbit-one" />
        <div className="about-v7-orbit about-v7-orbit-two" />
        <div className="about-v7-orbit about-v7-orbit-three" />

        <div className="about-v7-container">
          <div className="about-v7-hero-grid">

            <motion.div
              className="about-v7-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.div
                className="about-v7-kicker"
                variants={reveal}
              >
                <span />
                ABOUT OUR CLINIC
              </motion.div>

              <motion.h1 variants={reveal}>
                Movement is
                <span>more than motion.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                It is confidence, independence, energy and the freedom to
                enjoy everyday life. That is what we help people get back to.
              </motion.p>

              <motion.div
                className="about-v7-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="about-v7-primary-btn"
                >
                  Book an Assessment
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/services"
                  className="about-v7-link-btn"
                >
                  Discover our approach
                  <FiArrowUpRight />
                </Link>
              </motion.div>

              <motion.div
                className="about-v7-mini-stats"
                variants={reveal}
              >
                <div>
                  <strong>01</strong>
                  <span>Listen first</span>
                </div>

                <div>
                  <strong>02</strong>
                  <span>Move with purpose</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>Build confidence</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="about-v7-hero-visual"
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 18,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="about-v7-hero-ring">
                <span>MOVE</span>
                <span>LIVE</span>
                <span>THRIVE</span>
              </div>

              <div className="about-v7-hero-image">
                <img
                  src={images.hero}
                  alt="Physiotherapist providing patient care"
                />
              </div>

              <motion.div
                className="about-v7-floating-card about-v7-floating-card-top"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FiActivity />

                <div>
                  <strong>Movement led</strong>
                  <span>Care with purpose</span>
                </div>
              </motion.div>

              <motion.div
                className="about-v7-floating-card about-v7-floating-card-bottom"
                animate={{
                  y: [0, 7, 0],
                }}
                transition={{
                  duration: 4.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="about-v7-card-number">
                  01
                </span>

                <div>
                  <strong>Your goals</strong>
                  <span>Shape the journey</span>
                </div>
              </motion.div>

              <motion.div
                className="about-v7-hero-dot-grid"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

          </div>
        </div>

        <div className="about-v7-scroll-line">
          <span>SCROLL TO EXPLORE</span>
          <div />
        </div>
      </section>

      {/* =========================================
          WHY WE CARE
      ========================================= */}

      <section className="about-v7-intro">

        <div className="about-v7-intro-bg about-v7-intro-bg-one" />
        <div className="about-v7-intro-bg about-v7-intro-bg-two" />

        <div className="about-v7-container">

          <div className="about-v7-intro-layout">

            <motion.div
              className="about-v7-intro-visual"
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="about-v7-intro-image">
                <img
                  src={images.movement}
                  alt="Patient performing guided physiotherapy exercise"
                />
              </div>

              <div className="about-v7-intro-caption">
                <span>WHY</span>
                <strong>WE CARE</strong>
              </div>

              <motion.div
                className="about-v7-intro-orbit"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span />
              </motion.div>

              <motion.div
                className="about-v7-intro-card"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="about-v7-intro-card-icon">
                  <FiMove />
                </div>

                <div>
                  <strong>Movement matters</strong>
                  <span>Every step forward counts</span>
                </div>
              </motion.div>

              <div className="about-v7-intro-dots" />

            </motion.div>

            <motion.div
              className="about-v7-intro-content"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="about-v7-section-tag"
                variants={reveal}
              >
                OUR BELIEF
              </motion.div>

              <motion.h2 variants={reveal}>
                Great physiotherapy should change
                <em> how life feels.</em>
              </motion.h2>

              <motion.p variants={reveal}>
                Pain can make ordinary things feel uncertain. A walk can
                become a calculation. Exercise can become intimidating.
                Everyday movement can lose its freedom.
              </motion.p>

              <motion.p variants={reveal}>
                We believe good care should reverse that feeling. Through
                assessment, education and progressive movement, we help you
                understand what is happening and what you can do next.
              </motion.p>

              <motion.div
                className="about-v7-intro-highlight"
                variants={reveal}
              >
                <div className="about-v7-highlight-number">
                  +
                </div>

                <div className="about-v7-highlight-copy">
                  <strong>
                    Movement creates confidence.
                  </strong>

                  <p>
                    Understanding your body gives you a clearer way forward.
                  </p>
                </div>

                <FiArrowUpRight className="about-v7-highlight-arrow" />
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          OUR STORY
      ========================================= */}

      <section className="about-v7-story">

        <div className="about-v7-story-shape about-v7-story-shape-one" />
        <div className="about-v7-story-shape about-v7-story-shape-two" />

        <div className="about-v7-container">
          <div className="about-v7-story-grid">

            <motion.div
              className="about-v7-story-visual"
              initial={{
                opacity: 0,
                x: 45,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              <div className="about-v7-story-main-image">
                <img
                  src={images.story}
                  alt="Physiotherapist working with patient"
                />
              </div>

              <motion.div
                className="about-v7-story-small-image"
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.65,
                }}
              >
                <img
                  src={images.movement}
                  alt="Patient doing guided movement exercise"
                />
              </motion.div>

              <div className="about-v7-story-label">
                <span>CARE</span>
                <strong>WITH INTENTION</strong>
              </div>

              <motion.div
                className="about-v7-story-circle"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span />
              </motion.div>

            </motion.div>

            <motion.div
              className="about-v7-story-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="about-v7-section-tag"
                variants={reveal}
              >
                OUR STORY
              </motion.div>

              <motion.h2 variants={reveal}>
                There is always a person behind the problem.
              </motion.h2>

              <motion.p variants={reveal}>
                We do not start with a treatment list. We start with you.
                Your symptoms, your habits, your concerns and the things you
                want to return to all matter.
              </motion.p>

              <motion.p variants={reveal}>
                That conversation becomes the foundation for everything that
                follows. We explain what we see, why it matters and how we
                can work together to improve it.
              </motion.p>

              <motion.div
                className="about-v7-story-points"
                variants={stagger}
              >

                <motion.div
                  className="about-v7-story-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Listen carefully</strong>
                    <p>
                      We understand your experience before planning care.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="about-v7-story-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Explain clearly</strong>
                    <p>
                      You deserve to understand what is happening.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="about-v7-story-point"
                  variants={reveal}
                >
                  <span>
                    <FiCheck />
                  </span>

                  <div>
                    <strong>Build together</strong>
                    <p>
                      Your progress helps shape every next step.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          STATEMENT
      ========================================= */}

      <section className="about-v7-statement">

        <div className="about-v7-statement-grid" />

        <motion.div
          className="about-v7-statement-circle about-v7-statement-circle-one"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="about-v7-statement-circle about-v7-statement-circle-two" />

        <div className="about-v7-container">

          <motion.div
            className="about-v7-statement-content"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <span className="about-v7-section-tag about-v7-light-tag">
              THE IDEA
            </span>

            <h2>
              Move without
              <span>second guessing.</span>
            </h2>

            <div className="about-v7-statement-bottom">

              <div className="about-v7-wave">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <p>
                We are here to replace uncertainty with understanding,
                supported movement and a plan you can trust.
              </p>

            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          PROCESS
      ========================================= */}

      <section className="about-v7-process">

        <div className="about-v7-container">

          <motion.div
            className="about-v7-process-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="about-v7-section-tag"
              variants={reveal}
            >
              OUR PROCESS
            </motion.div>

            <motion.h2 variants={reveal}>
              Five steps.
              <span>One clear direction.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Every part of your care connects to the next, so you always
              know where you are going.
            </motion.p>

          </motion.div>

          <motion.div
            className="about-v7-process-track"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={stagger}
          >

            <div className="about-v7-track-line" />

            {process.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  className="about-v7-process-card"
                  variants={reveal}
                  whileHover={{
                    y: -8,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >

                  <div className="about-v7-process-top">
                    <span>{item.number}</span>

                    <motion.div
                      className="about-v7-process-icon"
                      whileHover={{
                        rotate: 8,
                        scale: 1.08,
                      }}
                    >
                      <Icon />
                    </motion.div>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <div className="about-v7-process-dot" />

                </motion.article>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          MISSION
      ========================================= */}

      <section className="about-v7-mission">

        <div className="about-v7-mission-image">
          <motion.img
            src={images.clinic}
            alt="Modern physiotherapy clinic"
            initial={{
              scale: 1.08,
            }}
            whileInView={{
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </div>

        <div className="about-v7-mission-overlay" />

        <motion.div
          className="about-v7-mission-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="about-v7-container">

          <motion.div
            className="about-v7-mission-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="about-v7-section-tag about-v7-light-tag"
              variants={reveal}
            >
              OUR MISSION
            </motion.div>

            <motion.h2 variants={reveal}>
              Make physiotherapy feel
              <span>more human.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              We want every person who walks through our doors to feel heard,
              understood and confident about their next step.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="about-v7-white-btn"
              >
                Begin Your Journey
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          PRINCIPLES
      ========================================= */}

      <section className="about-v7-principles">

        <div className="about-v7-container">

          <motion.div
            className="about-v7-principles-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="about-v7-section-tag"
              variants={reveal}
            >
              WHAT GUIDES US
            </motion.div>

            <motion.h2 variants={reveal}>
              Small details.
              <span>Big difference.</span>
            </motion.h2>

          </motion.div>

          <motion.div
            className="about-v7-principles-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.12,
            }}
            variants={stagger}
          >

            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  className="about-v7-principle-card"
                  variants={reveal}
                  whileHover={{
                    y: -9,
                  }}
                >

                  <div className="about-v7-principle-head">
                    <span>{item.number}</span>

                    <motion.div
                      className="about-v7-principle-icon"
                      whileHover={{
                        rotate: 8,
                        scale: 1.08,
                      }}
                    >
                      <Icon />
                    </motion.div>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                  <div className="about-v7-principle-line" />

                </motion.article>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="about-v7-final">

        <motion.div
          className="about-v7-final-image"
          initial={{
            scale: 1.07,
          }}
          whileInView={{
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={images.hero}
            alt="Physiotherapy consultation and care"
          />
        </motion.div>

        <div className="about-v7-final-overlay" />

        <div className="about-v7-final-pattern" />

        <motion.div
          className="about-v7-final-shape about-v7-final-shape-one"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="about-v7-final-shape about-v7-final-shape-two" />

        <div className="about-v7-container">

          <motion.div
            className="about-v7-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="about-v7-section-tag about-v7-light-tag"
              variants={reveal}
            >
              YOUR NEXT STEP
            </motion.div>

            <motion.h2 variants={reveal}>
              Ready to move
              <span>differently?</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Start with a conversation, a thoughtful assessment and a plan
              built around your goals.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="about-v7-final-btn"
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