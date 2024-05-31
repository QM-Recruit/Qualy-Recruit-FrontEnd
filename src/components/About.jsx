import React from "react";
import CompanyData from "./CompanyData";
import SliderAbout from "./SliderAbout";
import { motion, AnimatePresence } from "framer-motion";

function About() {
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
      <span id="about" className="anchor about"></span>
      <section className="about-sec">
        <div className="about-container">
          <motion.h3 className="sec-ttl" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            <span>01</span>
            <p>A VALUED PRESENCE IN SOCIETY</p>
          </motion.h3>
          <motion.p className="para" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            Qualy Myanmar is branch company of Japan software quality assurance company “Qualy”. We use Japan quality methods of QA (Quality Assurance) and We were the first to introduce a business model in Myanmar what a third party verifies software/application development. We have accomplished more than 2000 projects so far and are a growing company that continues to lead the industry. Let’s join us! And make the world more funtastic!
          </motion.p>
          <CompanyData />
          <div className="location-block">
            <motion.h4 variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
              Location
            </motion.h4>
            <motion.h5 variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
              Mawlamyine Head Office
            </motion.h5>
            <motion.iframe variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden" title="Google Map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d478.25124196780155!2d97.62124179269983!3d16.475034569192104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smm!4v1706165324507!5m2!1sen!2smm" width="100%" height="266" style={{ border: 0 }} allowFullScreen referrerPolicy="no-referrer-when-downgrade"></motion.iframe>
            <motion.p className="address" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
              No. (448), Lower Main Road, Pabedan Quarter, Mawlamyine Township, Mon State, Myanmar
            </motion.p>
          </div>
          <motion.div variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            <SliderAbout />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;
