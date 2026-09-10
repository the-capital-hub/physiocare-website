import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";



const testimonials = [
  {
    name: "Sanjay Rajpal",
    role: "Businessman",
    rating: "4.8",
    image:
      "https://static.wixstatic.com/media/9c90f2_bcd35b26d5524861b606fd8efecbb942~mv2.jpg/v1/crop/x_206,y_45,w_745,h_745/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/image_6487327_JPG.jpg",
    text: "Stairs is God-sent for me. Absolutely awesome team and time at Stairs. Just can’t wait for my next session every single time. You guys make it so interesting and work towards the need and goal of the client, that ensures I skip my work but not my workout. Keep rocking TEAM STAIRS!",
  },

  {
    name: "Rukmini Vijayakumar",
    role: "Actor, Dancer",
    rating: "4.8",
    image:
      "https://static.wixstatic.com/media/9c90f2_ba3eaf045775474395d6f456ec12a64c~mv2.jpg/v1/crop/x_0,y_0,w_752,h_752/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a491be49038ea60c4f56b6d91be01d53.jpg",
    text: "I have personally grown to understand my body better because of Somya. There is a warm environment that the trainers and therapists foster that is conducive to progress. Every person working in Stairs is kind and helpful and I love the place! I highly recommend coming to Stairs!",
  },

  {
    name: "Shreyas Karnad",
    role: "Running Coach",
    rating: "4.5",
    image:
      "https://static.wixstatic.com/media/9c90f2_97ec8de28d8e41fd9d1aba071c0767dd~mv2.png/v1/crop/x_74,y_38,w_285,h_284/fill/w_399,h_397,al_c,lg_1,q_85,enc_avif,quality_auto/Screenshot%202023-01-31%20114209.png",
    text: "I’m proud to have a coach like Somya Rout, the team he is building and someone to speak to and someone who listens to me especially when you are in a profession it’s the other way round all the time. To Coach & To Be Coached is a perfect balance of learning & teaching.",
  },

  {
    name: "Pragathi Gupta",
    role: "Runner",
    rating: "4.8",
    image:
      "https://static.wixstatic.com/media/9c90f2_e3ea7ebcf7d046c1b32d54b3c23bf80c~mv2.png/v1/fill/w_400,h_400,al_c,lg_1,q_85,enc_avif,quality_auto/Screenshot%202023-02-01%20124539.png",
    text: "Stairs is like my second home. Entire team at Stairs is so diligent & proficient. They not only strengthen us but understand the needs of our sport & train us efficaciously such that we are able to pursue our goals.",
  },

  {
    name: "Janani Ananithakumar",
    role: "Athlete, Badminton (India)",
    rating: "4.8",
    image:
      "https://static.wixstatic.com/media/9c90f2_0b04d4eb20284e669e52919081f24314~mv2.jpg/v1/crop/x_179,y_184,w_244,h_245/fill/w_342,h_342,al_c,lg_1,q_80,enc_avif,quality_auto/328679113_1377475206125975_6512486517842574151_n.jpg",
    text: "Stairs isn’t just a fitness space; it's a home. Grateful for dedicated trainers, physios, and supportive members ensuring peak performance. Thank you, Team Stairs, for fostering excellence and positivity.",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
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
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export default function Testimonial() {
  return (
    <section className="home-testimonials">

      {/* Background graphics */}

      <div className="home-testimonials-grid" />

      <div className="home-testimonials-orbit home-testimonials-orbit-one">
        <span />
      </div>

      <div className="home-testimonials-orbit home-testimonials-orbit-two">
        <span />
      </div>

      <div className="home-container">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          className="home-testimonials-header"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={stagger}
        >

          <motion.div
            className="home-light-tag"
            variants={reveal}
          >
            REAL EXPERIENCES
          </motion.div>

          <motion.h2 variants={reveal}>
            Real people.
            <span>Real progress.</span>
          </motion.h2>

          <motion.p variants={reveal}>
            What matters most is how people feel, move and
            return to the things they love.
          </motion.p>

        </motion.div>

        {/* =================================================
            CARDS
        ================================================= */}

        <motion.div
          className="home-testimonials-grid-cards"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          variants={stagger}
        >

          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              className="home-testimonial-card"
              variants={reveal}
              whileHover={{
                y: -9,
              }}
            >

              {/* Top */}

              <div className="home-testimonial-card-top">

                <span className="home-testimonial-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="home-testimonial-big-quote">
                  “
                </span>

              </div>

              {/* Profile */}

              <div className="home-testimonial-profile">

                <div className="home-testimonial-image">

                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                  />

                </div>

                <div className="home-testimonial-person">

                  <h3>
                    {item.name}
                  </h3>

                  <span>
                    {item.role}
                  </span>

                  <div className="home-testimonial-rating">

                    <strong>
                      {item.rating}
                    </strong>

                    <span className="rating-stars">
                      ★★★★★
                    </span>

                  </div>

                </div>

              </div>

              {/* Review */}

              <p className="home-testimonial-review" style={{fontSize:"12px"}}>
                {item.text}
              </p>

              {/* Footer */}

              <div className="home-testimonial-footer">

                <span>
                  CLIENT EXPERIENCE
                </span>

                <span className="home-testimonial-footer-arrow">
                  <FiArrowUpRight />
                </span>

              </div>

            </motion.article>
          ))}

        </motion.div>

        {/* Bottom statement */}

        

      </div>

    </section>
  );
}