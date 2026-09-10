import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiCheck,
  FiMapPin,
} from "react-icons/fi";

import doctor1 from "../assets/doctor1.jpg";
import doctor2 from "../assets/doctor2.jpg";
import doctor4 from "../assets/doctor4.jpg";
import doctor5 from "../assets/doctor5.jpg";

import "./Team.css";

/* =========================================================
   LOCATION CARDS
========================================================= */

const locations = [
  {
    title: "Team Ulsoor",
    image: "https://static.wixstatic.com/media/9c90f2_168477602b644cb9a5fd961958170594~mv2.jpg/v1/fill/w_613,h_315,al_t,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c90f2_168477602b644cb9a5fd961958170594~mv2.jpg",
    target: "ulsoor",
  },
  {
    title: "Team Koramangala",
    image: "https://static.wixstatic.com/media/9c90f2_3b81dfbc3af145e7b22dbc32487d9239~mv2.jpg/v1/fill/w_613,h_315,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c90f2_3b81dfbc3af145e7b22dbc32487d9239~mv2.jpg",
    target: "koramangala",
  },
  {
    title: "Team Indiranagar",
    image: "https://static.wixstatic.com/media/9c90f2_67d52bd68f6e44c793606813e04db906~mv2.jpg/v1/fill/w_613,h_315,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c90f2_67d52bd68f6e44c793606813e04db906~mv2.jpg",
    target: "indiranagar",
  },
  {
    title: "Team Whitefield",
    image: "https://static.wixstatic.com/media/9c90f2_9ebc53e6934f41acac9a9b92e29a1b4c~mv2.jpg/v1/fill/w_613,h_315,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c90f2_9ebc53e6934f41acac9a9b92e29a1b4c~mv2.jpg",
    target: "whitefield",
  },
  {
    title: "Team Admin",
    image: "https://static.wixstatic.com/media/9c90f2_905b79d8c8984949843447153e0ff037~mv2.jpg/v1/fill/w_613,h_315,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c90f2_905b79d8c8984949843447153e0ff037~mv2.jpg",
    target: "admin",
  },
  {
    title: "Meet our Founders",
    image: "https://static.wixstatic.com/media/9c90f2_101423fd3692419983b39fa2d3d604b7~mv2.png/v1/fill/w_613,h_315,al_t,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9c90f2_101423fd3692419983b39fa2d3d604b7~mv2.png",
    target: "founders",
  },
];

/* =========================================================
   ULSOOR
========================================================= */

const ulsoorTeam = [
  {
    name: "Akshata Koli",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_d79421078b6c46a680c1e79739222804~mv2.jpg/v1/fill/w_346,h_429,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Rohan Charles",
    role: "Strength & Conditioning Coach",
    image: "https://static.wixstatic.com/media/9c90f2_3c6d315801d64195a51604768f289aac~mv2.jpg/v1/fill/w_346,h_429,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Aadhav Panchu Thomas",
    role: "Physiotherapist",
    image: doctor2,
  },
  {
    name: "Riti Shetty",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_cf8dfcc2606d428eb0dc58d24e558e1c~mv2.jpg/v1/fill/w_346,h_429,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Soumya Gowda",
    role: "Strength & Conditioning Coach",
    image: "https://static.wixstatic.com/media/9c90f2_12af576b5d8c49c7a26375c993f50997~mv2.jpg/v1/fill/w_346,h_429,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Srijanya Rajesh",
    role: "Physiotherapist",
    image: doctor4,
  },
  
  {
    name: "Chaitra",
    role: "Sports Scientist",
    image: doctor1,
  },
  {
    name: "Swathi M V",
    role: "Physiotherapist",
    image: doctor2,
  },
  
  {
    name: "Gautam Satish",
    role: "Physiotherapist",
    image: doctor5,
  },
  {
    name: "Vedith",
    role: "Sports Scientist",
    image: doctor1,
  },
  
  {
    name: "Soumya SK",
    role: "Physiotherapist",
    image: doctor4,
  },
];

/* =========================================================
   KORAMANGALA
========================================================= */

const koramangalaTeam = [
  {
    name: "Gagan Gowda",
    role: "Strength and Conditioning Coach",
    image: "https://static.wixstatic.com/media/9c90f2_4277b17d54c445d48885cd5d493d8280~mv2.jpg/v1/fill/w_349,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Sairam M",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_1b05c88f8c6d4c5d80eba5d84d7371d5~mv2.jpg/v1/fill/w_349,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Martin Thomas",
    role: "Strength and Conditioning Coach",
    image: "https://static.wixstatic.com/media/9c90f2_9877ab031a164139afb5a941b67c9c8f~mv2.png/v1/fill/w_349,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.png",
  },
  {
    name: "Niha",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_38a1b6731e0c40f4a17b771881e10c29~mv2.jpg/v1/fill/w_349,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Sindhura Udupa",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_031cecc9867e4491ad2d02d0ea5375d0~mv2.jpg/v1/fill/w_349,h_420,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Bijoy Joseph Bastian",
    role: "Strength and Conditioning Coach",
    image: doctor4,
  },
  {
    name: "Naveenraj A",
    role: "Sports Physiotherapist",
    image: doctor5,
  },
  {
    name: "Shaik Sufiya",
    role: "Physiotherapist",
    image: doctor1,
  },
  
  {
    name: "Aadhithya N R",
    role: "Strength and Conditioning Coach",
    image: doctor4,
  },
  {
    name: "Kiran Prakash Dsouza",
    role: "Sports Physiotherapist",
    image: doctor5,
  },
  {
    name: "Niharika J Somayaji",
    role: "Sports Physiotherapist",
    image: doctor1,
  },
  {
    name: "Vasudha Siddappa",
    role: "Physiotherapist",
    image: doctor2,
  },
  
  {
    name: "Aashutosh Karna",
    role: "Orthopaedic Physiotherapist",
    image: doctor5,
  },
  {
    name: "Malan Karthikeyan",
    role: "Strength and Conditioning Coach",
    image: doctor1,
  },
  {
    name: "Nyja H A",
    role: "Physiotherapist",
    image: doctor2,
  },
  
  {
    name: "Achintya P R",
    role: "Physiotherapist",
    image: doctor5,
  },
  {
    name: "Mihir Arun Rajani",
    role: "Sports Physiotherapist",
    image: doctor1,
  },
  {
    name: "Ramya Shetty",
    role: "Physiotherapist",
    image: doctor2,
  },
];

/* =========================================================
   INDIRANAGAR
========================================================= */

const indiranagarTeam = [
  {
    name: "Niketh Madhu",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_38ffdf7767994ccfb80911bdb898a098~mv2.jpg/v1/fill/w_349,h_356,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Varsha Gowda",
    role: "Strength & Conditioning Coach",
    image: "https://static.wixstatic.com/media/9c90f2_cf4a84dda610445fb4a3f114489f6736~mv2.jpg/v1/fill/w_349,h_356,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Manoj Prasath",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_111037e0d0254d68b5cbc68983c647d9~mv2.jpg/v1/fill/w_349,h_356,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Bhavika Advani",
    role: "Sports Physiotherapist",
    image: "https://static.wixstatic.com/media/9c90f2_1adcd708dfce47c682d4d0d9aa4b7c63~mv2.jpg/v1/fill/w_349,h_356,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.jpg",
  },
  {
    name: "Jayani",
    role: "Physiotherapist",
    image: doctor4,
  },
  {
    name: "Gokulnath G",
    role: "Physiotherapist",
    image: doctor5,
  },
  
  {
    name: "Nithya Shree N",
    role: "Physiotherapist",
    image: doctor2,
  },
  {
    name: "Sam Azariah Philip",
    role: "Sports Physiotherapist",
    image: doctor4,
  },
  {
    name: "Devika R S",
    role: "Physiotherapist",
    image: doctor5,
  },
  
  {
    name: "Bhumika B Rai",
    role: "Physiotherapist",
    image: doctor2,
  },
  {
    name: "Akash Kumar S",
    role: "Physiotherapist",
    image: doctor4,
  },
];

/* =========================================================
   WHITEFIELD
========================================================= */

const whitefieldTeam = [
  {
    name: "Shivani Vyas",
    role: "Sports Physiotherapist",
    image: doctor1,
  },
  {
    name: "Karthik A",
    role: "Sports Physiotherapist",
    image: doctor2,
  },
  {
    name: "Tanushka Acharya",
    role: "Physiotherapist",
    image: doctor4,
  },
  {
    name: "Imthiyaz Ibrahim",
    role: "Sports Physiotherapist",
    image: doctor5,
  },
  {
    name: "Smriti Srivastava",
    role: "Sports Physiotherapist",
    image: doctor1,
  },
];

/* =========================================================
   ADMIN
========================================================= */

const adminTeam = [
  {
    name: "Sumalatha SP",
    role: "Head Admin",
    image: doctor4,
  },
  {
    name: "Shuaib",
    role: "Admin Ulsoor",
    image: doctor2,
  },
  {
    name: "Pavithra",
    role: "Admin Koramangala",
    image: doctor1,
  },
];

/* =========================================================
   FOUNDER
========================================================= */

const founders = [
  {
    name: "Somya Rout",
    role: "Founder",
    image: doctor5,
    education:
      "Bachelors in Physiotherapy. Post-Graduation in Clinical Research. Fellowship in Sports Sciences (Apollo Hospitals). Certification in Asian Football Sports Physiotherapy course (ASPETAR, Qatar). Certificate in Manual Therapy (MTFI). Certified Strength and Conditioning Trainer (Exercise and Sport Sciences International Consultancy). Certification in Cranial, Spinal Osteopathy (European Union). Member of Indian Association of Physiotherapists. Certificate Physiotherapy course in Marathon Running.",
    experience:
      "Former Head Physiotherapist for a Ranji Cricket Team and Academy. Former Head Physiotherapist for U19 and U17 Indian football team. Former Physiotherapist for a national player, Vietnam Tennis Open. Former Head Physiotherapist at Sports Authority of Gujarat. Somya worked closely with cricketer Michael Bevan from 2011-12. He was also a part of the physio team for the Asian Football Qualifiers in Kuwait and Asian football championship in Malaysia.",
    currently:
      "Founded STAIRS Physiotherapy and Fitness Centre (Ulsoor and Koramangala, Bangalore) in 2019.",
  },
  {
    name: "Harinag S P",
    role: "Co-Founder",
    image: doctor4,
    education:
      "Harinag S P is one of the co-founders of Stairs and is also one of the strength and conditioning coaches at Stairs. He did his Bachelor's of Engineering in Civil Engineering.",
    experience:
      "He is a sports enthusiast since childhood, loves running, football and badminton and holds a black belt in Karate and won various state and national level tournaments. Expertized in Functional training and Plyometrics and has also been practicing Olympic lifting for many years. Loves to explore different forms of training and is creative and fun with training programs.",
    currently:
      "Apart from loving everything related to sports, Hari loves to meet new people and learn new skills. In his leisure time, he loves to challenge himself and takes up different fitness challenges.",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

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

/* =========================================================
   MEMBER CARD
========================================================= */

function MemberCard({ member, index }) {
  return (
    <motion.article
      className="team-member-card-new"
      variants={reveal}
      whileHover={{
        y: -7,
      }}
    >
      <div className="team-member-photo-new">

        <img
          src={member.image}
          alt={member.name}
        />

        <div className="team-member-photo-overlay-new" />

        <span className="team-member-index-new">
          {String(index + 1).padStart(2, "0")}
        </span>

      </div>

      <div className="team-member-info-new">

        <div className="team-member-red-line" />

        <h3>
          {member.name}
        </h3>

        <p>
          {member.role}
        </p>

        <button
          type="button"
          className="team-read-more-new"
        >
          Read More
          <FiArrowUpRight />
        </button>

      </div>
    </motion.article>
  );
}

/* =========================================================
   TEAM SECTION
========================================================= */

function TeamSection({
  id,
  title,
  members,
}) {
  return (
    <section
      id={id}
      className="team-group-new"
    >
      <motion.div
        className="team-group-title-new"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={reveal}
      >
        <span>STAIRS TEAM</span>

        <h2>
          {title}
        </h2>
      </motion.div>

      <motion.div
        className="team-member-grid-new"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.05,
        }}
        variants={stagger}
      >
        {members.map((member, index) => (
          <MemberCard
            key={member.name}
            member={member}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function Team() {
  return (
    <main className="team-page-new">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="team-page-new-hero">

  {/* Background Grid */}
  <div className="team-page-new-hero-grid" />

  {/* Decorative Orbits */}
  <motion.div
    className="team-page-new-orbit team-orbit-main"
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

  <motion.div
    className="team-page-new-orbit team-orbit-small"
    animate={{
      rotate: -360,
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <span />
  </motion.div>

  <div className="team-page-new-hero-image">
    <img
      src={doctor5}
      alt="PhysioCare team"
    />

    <div className="team-page-new-hero-image-overlay" />
  </div>

  <div className="team-container-new">

    <div className="team-page-new-hero-content">

      <motion.div
        className="team-new-eyebrow team-new-eyebrow-light"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        OUR PEOPLE
      </motion.div>

      <motion.h1
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Meet the
        <span>team.</span>
      </motion.h1>

      <motion.p
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.18,
        }}
      >
        Physiotherapists, strength and conditioning coaches,
        sports scientists and the wider team working together
        behind the care.
      </motion.p>

      <motion.div
        className="team-page-new-hero-meta"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.3,
        }}
      >

        <div>
          <strong>01</strong>
          <span>PEOPLE</span>
        </div>

        <i />

        <div>
          <strong>04</strong>
          <span>LOCATIONS</span>
        </div>

        <i />

        <div>
          <strong>01</strong>
          <span>SHARED GOAL</span>
        </div>

      </motion.div>

    </div>

  </div>

  <div className="team-page-new-hero-scroll">
    <span>SCROLL TO MEET THE TEAM</span>
    <i />
  </div>

</section>

      {/* =====================================================
          MEET THE TEAM
      ===================================================== */}

      <section className="team-meet-section">

        <div className="team-container-new">

          <motion.div
            className="team-main-title"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={reveal}
          >
            <span>MEET THE TEAM</span>
          </motion.div>

          <motion.div
            className="team-location-grid-new"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {locations.map((location) => (
              <motion.a
                key={location.target}
                href={`#${location.target}`}
                className="team-location-card-new"
                variants={reveal}
                whileHover={{
                  y: -6,
                }}
              >

                <img
                  src={location.image}
                  alt={location.title}
                />

                <div className="team-location-overlay-new" />

                <div className="team-location-content-new">

                  <span>
                    <FiMapPin />
                  </span>

                  <h2>
                    {location.title}
                  </h2>

                  <strong>
                    Click here
                    <FiArrowUpRight />
                  </strong>

                </div>

              </motion.a>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          ULSOOR
      ===================================================== */}

      <TeamSection
        id="ulsoor"
        title="Ulsoor Team"
        members={ulsoorTeam}
      />

      {/* =====================================================
          KORAMANGALA
      ===================================================== */}

      <TeamSection
        id="koramangala"
        title="Koramangala Team"
        members={koramangalaTeam}
      />

      {/* =====================================================
          INDIRANAGAR
      ===================================================== */}

      <TeamSection
        id="indiranagar"
        title="Indiranagar Team"
        members={indiranagarTeam}
      />

      {/* =====================================================
          WHITEFIELD
      ===================================================== */}

      <TeamSection
        id="whitefield"
        title="Whitefield Team"
        members={whitefieldTeam}
      />

      {/* =====================================================
          JOIN OUR TEAM
      ===================================================== */}

      <section className="team-join-new">

        <div className="team-join-pattern" />

        <div className="team-container-new">

          <div className="team-join-layout">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >

              <div className="team-new-eyebrow team-new-eyebrow-light">
                CAREER
              </div>

              <h2>
                JOIN OUR
                <span>TEAM</span>
              </h2>

            </motion.div>

            <motion.div
              className="team-join-copy"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              variants={reveal}
            >

              <p>
                There's always room for growth! Click the button
                below to send your resumé.
              </p>

              <a
                href="mailto:hr@stairsphysiotherapy.in?subject=Job Application"
                className="team-join-btn"
              >
                Send Your CV
                <FiArrowUpRight />
              </a>

              <span className="team-join-note">
                The HR team will get back to you within 7-10
                working days.
              </span>

            </motion.div>

          </div>

        </div>
      </section>

      {/* =====================================================
          ADMIN TEAM
      ===================================================== */}

      <section
        id="admin"
        className="team-admin-new"
      >

        <div className="team-container-new">

          <motion.div
            className="team-red-heading-new"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={reveal}
          >
            ADMIN TEAM
          </motion.div>

          <motion.div
            className="team-admin-list-new"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.08,
            }}
            variants={stagger}
          >

            {adminTeam.map((member) => (
              <motion.article
                key={member.name}
                className="team-admin-card-new"
                variants={reveal}
              >

                <div className="team-admin-photo-new">

                  <img
                    src={member.image}
                    alt={member.name}
                  />

                </div>

                <div className="team-admin-content-new">

                  <span>
                    ADMINISTRATION
                  </span>

                  <h3>
                    {member.name}
                  </h3>

                  <p>
                    {member.role}
                  </p>

                  <button
                    type="button"
                    className="team-read-more-new"
                  >
                    Read More
                    <FiArrowUpRight />
                  </button>

                </div>

              </motion.article>
            ))}

          </motion.div>

        </div>
      </section>

      {/* =====================================================
          FOUNDERS
      ===================================================== */}

      <section
        id="founders"
        className="team-founders-new"
      >

        <div className="team-container-new">

          <motion.div
            className="team-red-heading-new"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={reveal}
          >
            FOUNDERS
          </motion.div>

          <div className="team-founder-list-new">

            {founders.map((founder, index) => (
              <motion.article
                key={founder.name}
                className="team-founder-new-card"
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.12,
                }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                }}
              >

                <div className="team-founder-new-image">

                  <img
                    src={founder.image}
                    alt={founder.name}
                  />

                </div>

                <div className="team-founder-new-content">

                  <div className="team-founder-role">
                    {founder.role}
                  </div>

                  <h2>
                    {founder.name}
                  </h2>

                  <div className="team-founder-line" />

                  <div className="team-founder-block">

                    <strong>
                      EDUCATION AND QUALIFICATIONS
                    </strong>

                    <p>
                      {founder.education}
                    </p>

                  </div>

                  <div className="team-founder-block">

                    <strong>
                      WORK EXPERIENCE
                    </strong>

                    <p>
                      {founder.experience}
                    </p>

                  </div>

                  <div className="team-founder-block">

                    <strong>
                      CURRENTLY
                    </strong>

                    <p>
                      {founder.currently}
                    </p>

                  </div>

                </div>

              </motion.article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="team-final-new">

        <div className="team-final-new-grid" />

        <div className="team-container-new">

          <motion.div
            className="team-final-new-content"
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={stagger}
          >

            <motion.div
              className="team-new-eyebrow team-new-eyebrow-light"
              variants={reveal}
            >
              YOUR NEXT STEP
            </motion.div>

            <motion.h2 variants={reveal}>
              The right care
              <span>starts with people.</span>
            </motion.h2>

            <motion.p variants={reveal}>
              Get to know the people behind the care and start
              your journey with the right team.
            </motion.p>

            <motion.div variants={reveal}>
              <Link
                to="/contact"
                className="team-final-new-btn"
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