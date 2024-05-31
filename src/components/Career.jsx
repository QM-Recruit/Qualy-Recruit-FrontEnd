import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Career() {
  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };
  return (
    <>
      <span id="career" className="anchor career"></span>
      <section className="career-sec">
        <div className="container">
          <div className="row">
            <motion.div className="left" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
              <div className="img">
                <img src="/ceo.png" alt="ceoの画像" />
              </div>
            </motion.div>
            <div className="right">
              <motion.h3 className="sec-ttl" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
                <span>03</span>
                <p>Executive</p>
              </motion.h3>
              <motion.div className="desc" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
                <h4>Career</h4>
                <p>After graduating from university, I worked as “Pharmaceutical Sales Representative” in Hisamitsu Pharmaceutical Co., Inc. Subsequently, I transitioned to Recruit Co., Ltd., Japan’s largest IT services company, where I engaged in advertising and IT services sales for “Real Estate” companies. Utilizing unique sales and analytical methods, I received six internal commendations. Following a total of 4.5 years in sales, I became the Sales Director at a 6-year-old IT venture company, contributing to its success and earning a promotion to COO within six months. After serving in that role for 2.5 years, I went on to found my own company “Qualy, inc.” and “Qualy Myanmar Co., Ltd.”.</p>
              </motion.div>
              <motion.div className="desc" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
                <h4>Message</h4>
                <p className="mb25">Our corporate philosophy is “to become a valued presence in society.” In order to achieve that vision, we are working on the following two missions.</p>
                <p className="mb25">
                  Expanding strengths:
                  <br />
                  To develop the individual strengths that each person possesses and create a bright future that was once unimaginable.
                </p>
                <p>
                  Job creation:
                  <br />
                  To generate employment in places with a lack of jobs, create opportunities for employment, and establish arenas for value creation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Career;
