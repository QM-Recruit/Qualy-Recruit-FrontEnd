import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SnsItem from "./SnsItem";

function Sns() {
  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };
  const facebookData = [
    {
      link: "https://www.facebook.com/qualymm/",
      src: "/qm.png",
      alt: "QMFacebookの画像",
    },
    {
      link: "https://www.facebook.com/JapanTrainingCentre",
      src: "/jtcm.png",
      alt: "JTCMFacebookの画像",
    },
    {
      link: "https://www.facebook.com/jtcmandalay",
      src: "/jtco.png",
      alt: "JTCOFacebookの画像",
    },
  ];
  const linkedinData = [
    {
      link: "https://www.linkedin.com/company/qualy-myanmar",
      src: "/qm.png",
      alt: "QMLinkedの画像",
    },
  ];
  return (
    <section className="sns-sec">
      <div className="container">
        <motion.h3 className="sec-ttl" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
          <span>05</span>
          <p>SNS</p>
        </motion.h3>
        <div className="fb-block">
          <motion.h4 variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            Facebook
          </motion.h4>
          <motion.ul className="row" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            {facebookData.map((item, index) => (
              <SnsItem key={index} data={item} />
            ))}
          </motion.ul>
        </div>
        <div className="linked-in">
          <motion.h4 className="pt0" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            Linked in
          </motion.h4>
          <motion.ul className="row" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            {linkedinData.map((item, index) => (
              <SnsItem key={index} data={item} />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

export default Sns;
