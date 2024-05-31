import React from "react";
import Post from "./Post";
import { motion, AnimatePresence } from "framer-motion";

function Requirment() {
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
      <span id="requirement" className="anchor requirment"></span>
      <section className="req-sec">
        <div className="req-container">
          <motion.h3 className="sec-ttl" variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            <span>02</span>
            <p>Requirements</p>
          </motion.h3>
          <motion.div variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            <Post />
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Requirment;
