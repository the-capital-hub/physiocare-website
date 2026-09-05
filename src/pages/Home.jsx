import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowUpRight,
  FiCheck,
  FiHeart,
  FiShield,
  FiTrendingUp,
  FiMove,
  FiTarget,
  FiPlus,
  FiCompass,
} from "react-icons/fi";

import "./Home.css";

const images = {
  hero:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=90",

  assessment:
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=90",

  movement:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=90",

  sport:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=90",

  recovery:
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=90",

  team:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=90",

  clinic:
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1600&q=90",
};

const conditions = [
  {
    number: "01",
    title: "Back and Spine",
    description: "Back pain, sciatica and neck concerns",
    image: images.assessment,
  },
  {
    number: "02",
    title: "Knee and Hip",
    description: "Pain, stiffness and movement limitations",
    image: images.movement,
  },
  {
    number: "03",
    title: "Sports and Activity",
    description: "Injuries, tendon concerns and return to sport",
    image: images.sport,
  },
  {
    number: "04",
    title: "Recovery and Mobility",
    description: "Post surgery recovery, balance and confidence",
    image: images.recovery,
  },
];

const services = [
  {
    number: "01",
    title: "Physiotherapy",
    text: "Personalised treatment built around your assessment, movement and goals.",
    icon: FiActivity,
  },
  {
    number: "02",
    title: "Biomechanical Assessment",
    text: "Understand how you move and where your body may need more support.",
    icon: FiCompass,
  },
  {
    number: "03",
    title: "Rehabilitation",
    text: "Build strength, control and confidence through a clear recovery plan.",
    icon: FiShield,
  },
  {
    number: "04",
    title: "Strength and Conditioning",
    text: "Train with purpose and build the capacity to perform at your best.",
    icon: FiTrendingUp,
  },
];

const people = [
  {
    title: "Everyday Movers",
    text: "Move with more confidence in the activities that matter to you.",
    icon: FiHeart,
  },
  {
    title: "Active Individuals",
    text: "Stay active while building resilience and better movement habits.",
    icon: FiActivity,
  },
  {
    title: "Athletes",
    text: "Recover, return and perform with a structured rehabilitation pathway.",
    icon: FiTrendingUp,
  },
  {
    title: "Post Surgery",
    text: "Progress from early recovery towards strength and independence.",
    icon: FiShield,
  },
  {
    title: "Older Adults",
    text: "Build mobility, balance and confidence for everyday life.",
    icon: FiMove,
  },
  {
    title: "Children",
    text: "Support healthy movement, coordination and development.",
    icon: FiTarget,
  },
];

const steps = [
  {
    number: "01",
    title: "Assess",
    text: "We listen, examine movement and understand what matters to you.",
  },
  {
    number: "02",
    title: "Understand",
    text: "We connect your symptoms with your body, routine and goals.",
  },
  {
    number: "03",
    title: "Treat",
    text: "Targeted care is used where it adds value to your recovery.",
  },
  {
    number: "04",
    title: "Train",
    text: "Build the strength and capacity needed for real life.",
  },
  {
    number: "05",
    title: "Progress",
    text: "Measure change and keep adapting as you move forward.",
  },
];

const visits = [
  ["01", "Book", "Choose a convenient appointment time."],
  ["02", "Assess", "We understand your concern and movement."],
  ["03", "Plan", "You leave with a clear next step."],
  ["04", "Move", "We work together towards your goal."],
];

const principles = [
  "Assess before we assume",
  "Individualised care, not one size fits all",
  "Clear progress you can understand",
  "Education that supports independence",
  "Movement and function beyond symptom relief",
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
      staggerChildren: 0.07,
    },
  },
};

export default function Home() {
  return (
    <main className="home-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="home-hero">

        <div className="home-hero-grid" />

        <div className="home-hero-orbit home-hero-orbit-one" />
        <div className="home-hero-orbit home-hero-orbit-two" />

        <div className="home-container">

          <div className="home-hero-layout">

            <motion.div
              className="home-hero-copy"
              initial="hidden"
              animate="visible"
              variants={stagger}
            >

              <motion.div
                className="home-tag"
                variants={reveal}
              >
                PHYSIOTHERAPY AND MOVEMENT CARE
              </motion.div>

              <motion.h1 variants={reveal}>
                Move better.
                <span>Live stronger.</span>
              </motion.h1>

              <motion.p variants={reveal}>
                Personalised physiotherapy, rehabilitation and movement care
                designed around your body, your goals and the life you want to
                return to.
              </motion.p>

              <motion.div
                className="home-hero-actions"
                variants={reveal}
              >
                <Link
                  to="/contact"
                  className="home-primary-btn"
                >
                  Book an Assessment
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/services"
                  className="home-text-btn"
                >
                  Explore our care
                  <FiArrowUpRight />
                </Link>
              </motion.div>

              <motion.div
                className="home-hero-proof"
                variants={reveal}
              >
                <span>Assessment first</span>
                <i />
                <span>Personalised care</span>
                <i />
                <span>Goal focused</span>
              </motion.div>

            </motion.div>

            <motion.div
              className="home-hero-visual"
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

              <div className="home-hero-image">
                <motion.img
                  src={images.hero}
                  alt="Physiotherapist working with a patient"
                  initial={{
                    scale: 1.08,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <div className="home-hero-image-overlay" />

                <div className="home-hero-floating">

                  <div className="home-hero-floating-icon">
                    <FiActivity />
                  </div>

                  <div>
                    <strong>
                      Care that starts with understanding
                    </strong>

                    <span>
                      Assessment, treatment and progress
                    </span>
                  </div>

                </div>

              </div>

              <div className="home-hero-side-note">
                <strong>01</strong>

                <span>
                  Start with
                  <br />
                  an assessment
                </span>
              </div>

              <motion.div
                className="home-hero-small-orbit"
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

              <div className="home-dot-pattern" />

            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================
          TRUST
      ========================================= */}

      <section className="home-trust">
        <div className="home-container home-trust-row">
          <span>Personalised care</span>
          <span>Movement focused</span>
          <span>Evidence informed</span>
          <span>Progress measured</span>
          <span>Long term confidence</span>
        </div>
      </section>

      {/* =========================================
          CONDITIONS
      ========================================= */}

      <section className="home-section home-conditions">

        <div className="home-container">

          <div className="home-heading-row">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="home-tag"
                variants={reveal}
              >
                WHAT BRINGS YOU HERE
              </motion.div>

              <motion.h2 variants={reveal}>
                Start with the problem.
                <span>We will find the path.</span>
              </motion.h2>

            </motion.div>

            <motion.p
              className="home-heading-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >
              Whether pain is stopping you, surgery has changed your routine
              or you want to perform better, you do not need to diagnose
              yourself before you arrive.
            </motion.p>

          </div>

          <motion.div
            className="home-condition-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {conditions.map((item, index) => (
              <motion.div
                key={item.number}
                variants={reveal}
                whileHover={{
                  y: -8,
                }}
              >

                <Link
                  to="/conditions"
                  className={`home-condition-card ${
                    index === 0 ? "home-condition-featured" : ""
                  }`}
                >

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="home-condition-overlay" />

                  <div className="home-condition-content">

                    <span>
                      {item.number}
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <b>
                      Explore
                      <FiArrowUpRight />
                    </b>

                  </div>

                </Link>

              </motion.div>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          APPROACH
      ========================================= */}

      <section className="home-section home-approach">

        <div className="home-container home-approach-layout">

          <motion.div
            className="home-approach-visual"
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

            <div className="home-approach-image">
              <img
                src={images.assessment}
                alt="Physiotherapy assessment"
              />
            </div>

            <div className="home-media-tag">
              UNDERSTAND BEFORE YOU TREAT
            </div>

            <div className="home-media-number">
              02
            </div>

            <motion.div
              className="home-approach-orbit"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <span />
            </motion.div>

          </motion.div>

          <motion.div
            className="home-approach-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="home-tag"
              variants={reveal}
            >
              OUR APPROACH
            </motion.div>

            <motion.h2 variants={reveal}>
              Your body has a story.
              <span>Let us understand it.</span>
            </motion.h2>

            <motion.p
              className="home-large-copy"
              variants={reveal}
            >
              Good physiotherapy starts with listening. We look at how you
              move, what you need to do, what has changed and where you want
              to go next.
            </motion.p>

            <div className="home-step-list">

              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  className="home-step"
                  variants={reveal}
                >

                  <span>
                    {step.number}
                  </span>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>

                </motion.div>
              ))}

            </div>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          SERVICES
      ========================================= */}

      <section className="home-section home-services">

        <div className="home-container">

          <div className="home-heading-row">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={stagger}
            >

              <motion.div
                className="home-tag"
                variants={reveal}
              >
                WHAT WE DO
              </motion.div>

              <motion.h2 variants={reveal}>
                Care that changes
                <span>as you progress.</span>
              </motion.h2>

            </motion.div>

            <Link
              to="/services"
              className="home-view-link"
            >
              View all services
              <FiArrowUpRight />
            </Link>

          </div>

          <motion.div
            className="home-services-list"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <motion.div
                  className="home-service-row"
                  key={service.number}
                  variants={reveal}
                  whileHover={{
                    x: 8,
                  }}
                >

                  <span className="home-service-number">
                    {service.number}
                  </span>

                  <div className="home-service-icon">
                    <Icon />
                  </div>

                  <div className="home-service-main">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>

                  <FiArrowUpRight className="home-service-arrow" />

                </motion.div>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          WHO WE HELP
      ========================================= */}

      <section className="home-section home-people">

        <div className="home-container">

          <motion.div
            className="home-centered-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="home-tag home-tag-center"
              variants={reveal}
            >
              WHO WE HELP
            </motion.div>

            <motion.h2 variants={reveal}>
              Different goals.
              <span>One place to start.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              From everyday movement to sports performance, care is built
              around the person in front of us.
            </motion.p>

          </motion.div>

          <motion.div
            className="home-people-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {people.map((person) => {
              const Icon = person.icon;

              return (
                <motion.div
                  key={person.title}
                  variants={reveal}
                  whileHover={{
                    y: -7,
                  }}
                >

                  <Link
                    to="/conditions"
                    className="home-person-card"
                  >

                    <span className="home-person-icon">
                      <Icon />
                    </span>

                    <div>
                      <h3>{person.title}</h3>
                      <p>{person.text}</p>
                    </div>

                    <FiArrowUpRight className="home-person-arrow" />

                  </Link>

                </motion.div>
              );
            })}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          WHY CHOOSE US
      ========================================= */}

      <section className="home-dark">

        <div className="home-dark-grid" />

        <motion.div
          className="home-dark-orbit"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
        </motion.div>

        <div className="home-container home-dark-layout">

          <motion.div
            className="home-dark-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.18,
            }}
            variants={stagger}
          >

            <motion.div
              className="home-light-tag"
              variants={reveal}
            >
              WHY CHOOSE US
            </motion.div>

            <motion.h2 variants={reveal}>
              Progress is more than
              <span>feeling better.</span>
            </motion.h2>

            <motion.p
              className="home-dark-copy-text"
              variants={reveal}
            >
              It is understanding your body, building capacity and gaining
              the confidence to do more.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/about"
                className="home-light-button"
              >
                Why our approach works
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

          <motion.div
            className="home-principles"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={stagger}
          >

            {principles.map((item, index) => (
              <motion.div
                className="home-principle"
                key={item}
                variants={reveal}
              >

                <span>
                  0{index + 1}
                </span>

                <p>{item}</p>

                <FiCheck />

              </motion.div>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          CLINIC
      ========================================= */}

      <section className="home-section home-clinic">

        <div className="home-container home-clinic-layout">

          <motion.div
            className="home-clinic-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="home-tag"
              variants={reveal}
            >
              INSIDE YOUR CARE
            </motion.div>

            <motion.h2 variants={reveal}>
              A clinic built around
              <span>real movement.</span>
            </motion.h2>

            <motion.p
              className="home-large-copy"
              variants={reveal}
            >
              From assessment to exercise and hands on care, every part of
              the experience should help you understand your body and feel
              more confident using it.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="home-view-link"
              >
                Plan your first visit
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

          <div className="home-clinic-collage">

            <motion.img
              className="home-collage-main"
              src={images.movement}
              alt="Movement rehabilitation"
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
                amount: 0.2,
              }}
              transition={{
                duration: 0.75,
              }}
            />

            <motion.img
              className="home-collage-small"
              src={images.sport}
              alt="Sports rehabilitation"
              initial={{
                opacity: 0,
                x: -30,
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
                delay: 0.1,
              }}
            />

            <span className="home-collage-label">
              Move with purpose
            </span>

            <motion.div
              className="home-collage-orbit"
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

          </div>

        </div>
      </section>

      {/* =========================================
          TEAM
      ========================================= */}

      <section className="home-section home-team">

        <div className="home-container home-team-layout">

          <motion.div
            className="home-team-photo"
            initial={{
              opacity: 0,
              x: -30,
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
            }}
          >

            <img
              src={images.team}
              alt="Physiotherapist portrait"
            />

            <div className="home-team-photo-overlay" />

            <span>
              MEET YOUR THERAPIST
            </span>

          </motion.div>

          <motion.div
            className="home-team-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="home-tag"
              variants={reveal}
            >
              YOUR CARE TEAM
            </motion.div>

            <motion.h2 variants={reveal}>
              People matter
              <span>as much as treatment.</span>
            </motion.h2>

            <motion.p
              className="home-large-copy"
              variants={reveal}
            >
              Your therapist should know what you are working towards,
              explain what is happening and help you become more confident in
              managing your movement.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/team"
                className="home-primary-btn"
              >
                Meet the team
                <FiArrowUpRight />
              </Link>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* =========================================
          FIRST VISIT
      ========================================= */}

      <section className="home-section home-first-visit">

        <div className="home-container">

          <motion.div
            className="home-centered-heading"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="home-tag home-tag-center"
              variants={reveal}
            >
              YOUR FIRST VISIT
            </motion.div>

            <motion.h2 variants={reveal}>
              Know what happens
              <span>before you arrive.</span>
            </motion.h2>

          </motion.div>

          <motion.div
            className="home-visit-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
            }}
            variants={stagger}
          >

            {visits.map(([number, title, text]) => (
              <motion.div
                className="home-visit-card"
                key={number}
                variants={reveal}
                whileHover={{
                  y: -7,
                }}
              >

                <span>
                  {number}
                </span>

                <div className="home-visit-icon">
                  <FiPlus />
                </div>

                <h3>
                  {title}
                </h3>

                <p>
                  {text}
                </p>

              </motion.div>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="home-final">

        <div className="home-final-image">

          <img
            src={images.hero}
            alt="Physiotherapy consultation"
          />

        </div>

        <div className="home-final-overlay" />
        <div className="home-final-pattern" />

        <motion.div
          className="home-final-orbit"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <span />
        </motion.div>

        <div className="home-container">

          <div className="home-final-layout">

            <motion.div
              className="home-final-content"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.25,
              }}
              variants={stagger}
            >

              <motion.div
                className="home-light-tag"
                variants={reveal}
              >
                YOUR NEXT STEP
              </motion.div>

              <motion.h2 variants={reveal}>
                Start where you are.
                <span>Move forward from here.</span>
              </motion.h2>

              <motion.p variants={reveal}>
                Begin with an assessment, understand your body and take the
                next step with a clearer plan.
              </motion.p>

              <motion.div variants={reveal}>
                <Link
                  to="/contact"
                  className="home-final-btn"
                >
                  Book an Assessment
                  <FiArrowUpRight />
                </Link>
              </motion.div>

            </motion.div>

            <motion.div
              className="home-final-side"
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
                amount: 0.25,
              }}
              transition={{
                duration: 0.75,
              }}
            >

              <span>THE IDEA</span>

              <strong>
                Better movement creates more confidence.
              </strong>

              <FiArrowUpRight />

            </motion.div>

          </div>

        </div>
      </section>

    </main>
  );
}