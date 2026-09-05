import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiCheck,
  FiHeart,
  FiUser,
  FiUsers,
} from "react-icons/fi";

import "./Team.css";

const team = [
  {
    number: "01",
    role: "Founder and Senior Physiotherapist",
    name: "[Doctor Name]",
    qualification: "BPT | MPT | Verified Certifications",
    focus: "[Specialization]",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "02",
    role: "Physiotherapist",
    name: "[Physiotherapist Name]",
    qualification: "[Qualification]",
    focus: "[Area of Focus]",
    image:
      "https://images.unsplash.com/photo-1594824804732-ca8db6d3c8d5?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "03",
    role: "Physiotherapist",
    name: "[Physiotherapist Name]",
    qualification: "[Qualification]",
    focus: "[Area of Focus]",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=90",
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

export default function Team() {
  return (
    <main className="team-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="team-hero">

        <div className="team-hero-grid" />

        <div className="team-hero-circle team-hero-circle-one" />
        <div className="team-hero-circle team-hero-circle-two" />

        <div className="team-container">

          <div className="team-hero-layout">

            <motion.div
              className="team-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="team-tag"
                variants={reveal}
              >
                OUR TEAM
              </motion.div>

              <motion.h1 variants={reveal}>
                Meet the people
                <span>behind your progress.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                Good physiotherapy starts with listening, communication and
                clinical reasoning. Our team combines professional expertise
                with an understanding of your goals.
              </motion.p>

              <motion.div
                className="team-hero-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="team-primary-btn"
                >
                  Meet Us Through an Assessment
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/about"
                  className="team-text-btn"
                >
                  Our approach
                  <FiArrowUpRight />
                </Link>
              </motion.div>

              <motion.div
                className="team-hero-note"
                variants={reveal}
              >
                <span />
                <p>
                  Clinical expertise matters. So does feeling understood.
                </p>
              </motion.div>

            </motion.div>

            <motion.div
              className="team-hero-visual"
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

              <div className="team-hero-image">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1700&q=90"
                  alt="Physiotherapy team working together"
                />
              </div>

              <div className="team-hero-label">
                <span>PEOPLE</span>
                <strong>BEHIND THE CARE</strong>
              </div>

              <motion.div
                className="team-hero-orbit"
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
                className="team-floating-card"
                animate={{
                  y: [0, -7, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="team-floating-icon">
                  <FiUsers />
                </div>

                <div>
                  <strong>One team</strong>
                  <span>One shared goal</span>
                </div>
              </motion.div>

              <div className="team-dot-pattern" />

            </motion.div>

          </div>
        </div>
      </section>

      {/* =========================================
          TEAM INTRO
      ========================================= */}

      <section className="team-intro-section">

        <div className="team-container">

          <motion.div
            className="team-intro-layout"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="team-intro-copy"
              variants={reveal}
            >

              <div className="team-tag">
                THE PEOPLE YOU MEET
              </div>

              <h2>
                Expertise should feel
                <span>personal.</span>
              </h2>

            </motion.div>

            <motion.p
              className="team-intro-text"
              variants={reveal}
            >
              From your first conversation to your final progression goal,
              your experience is shaped by people who listen, think carefully
              and communicate clearly.
            </motion.p>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          TEAM MEMBERS
      ========================================= */}

      <section className="team-members-section">

        <div className="team-container">

          <motion.div
            className="team-members-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {team.map((member, index) => (
              <motion.article
                key={member.number}
                className={`team-member-card ${
                  index === 0 ? "team-member-featured" : ""
                }`}
                variants={reveal}
                whileHover={{
                  y: -9,
                }}
              >

                <div className="team-member-image">

                  <img
                    src={member.image}
                    alt={member.name}
                  />

                  <div className="team-member-image-overlay" />

                  <span className="team-member-number">
                    {member.number}
                  </span>

                  <div className="team-member-role">
                    {member.role}
                  </div>

                </div>

                <div className="team-member-content">

                  <h3>{member.name}</h3>

                  <p className="team-member-qualification">
                    {member.qualification}
                  </p>

                  <div className="team-member-focus">
                    <span>AREA OF FOCUS</span>
                    <strong>{member.focus}</strong>
                  </div>

                  <div className="team-member-bottom">
                    <span>CLINICAL PROFILE</span>
                    <FiArrowUpRight />
                  </div>

                </div>

              </motion.article>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          PROFESSIONAL STANDARDS
      ========================================= */}

      <section className="team-standards-section">

        <div className="team-standards-shape team-standards-shape-one" />
        <div className="team-standards-shape team-standards-shape-two" />

        <div className="team-container">

          <div className="team-standards-layout">

            <motion.div
              className="team-standards-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="team-tag"
                variants={reveal}
              >
                PROFESSIONAL STANDARDS
              </motion.div>

              <motion.h2 variants={reveal}>
                Expertise should be
                <span>clear and verifiable.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                Qualifications, experience and areas of practice should never
                feel hidden. They form part of the trust between clinician and
                patient.
              </motion.p>

              <motion.div
                className="team-standard-points"
                variants={stagger}
              >

                <motion.div
                  className="team-standard-point"
                  variants={reveal}
                >
                  <span>
                    <FiAward />
                  </span>

                  <div>
                    <strong>Qualifications</strong>
                    <p>
                      Display relevant degrees, registrations and verified
                      certifications.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="team-standard-point"
                  variants={reveal}
                >
                  <span>
                    <FiUser />
                  </span>

                  <div>
                    <strong>Experience</strong>
                    <p>
                      Show the practical experience that shapes each
                      clinician’s approach.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="team-standard-point"
                  variants={reveal}
                >
                  <span>
                    <FiHeart />
                  </span>

                  <div>
                    <strong>Patient centred care</strong>
                    <p>
                      Different expertise comes together around one shared
                      goal: meaningful patient progress.
                    </p>
                  </div>
                </motion.div>

              </motion.div>

            </motion.div>

            <motion.div
              className="team-standards-visual"
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

              <div className="team-standards-image">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1500&q=90"
                  alt="Physiotherapist consulting with a patient"
                />
              </div>

              <motion.div
                className="team-standards-card"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="team-standards-card-icon">
                  <FiCheck />
                </div>

                <div>
                  <span>THE STANDARD</span>
                  <strong>
                    Skill with genuine attention.
                  </strong>
                </div>
              </motion.div>

              <motion.div
                className="team-standards-orbit"
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

            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================
          TEAM PHILOSOPHY
      ========================================= */}

      <section className="team-philosophy">

        <div className="team-philosophy-grid" />

        <motion.div
          className="team-philosophy-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="team-container">

          <motion.div
            className="team-philosophy-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.22,
            }}
            variants={stagger}
          >

            <motion.div
              className="team-light-tag"
              variants={reveal}
            >
              OUR SHARED PHILOSOPHY
            </motion.div>

            <motion.h2 variants={reveal}>
              Different expertise.
              <span>One direction.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Every clinician brings different knowledge and experience, but
              the goal stays the same: helping you understand your body, move
              with confidence and make meaningful progress.
            </motion.p>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="team-final">

        <div className="team-final-image">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90"
            alt="Physiotherapy team"
          />
        </div>

        <div className="team-final-overlay" />
        <div className="team-final-pattern" />

        <motion.div
          className="team-final-circle"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="team-container">

          <motion.div
            className="team-final-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.25,
            }}
            variants={stagger}
          >

            <motion.div
              className="team-light-tag"
              variants={reveal}
            >
              YOUR NEXT STEP
            </motion.div>

            <motion.h2 variants={reveal}>
              The right care starts
              <span>with the right conversation.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Meet the team through an assessment and start with a plan built
              around your goals.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="team-final-btn"
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