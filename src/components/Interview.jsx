import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SwipperEmployee from "./SwipperEmployee";

function Interview() {
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
      <span id="interview" className="anchor interview"></span>
      <section className="interview-sec">
        <div className="container">
          <motion.div variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            {/* <SliderEmployee /> */}
            <SwipperEmployee />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Interview;
