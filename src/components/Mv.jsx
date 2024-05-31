import React from "react";
import { motion, useAnimation } from "framer-motion";

function Mv() {
  const line1 = "YOU CAN";
  const line2 = "CHANGE";
  const line3 = "THE FUTURE";

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <section className="mv">
        <div className="mv-container">
          <motion.h2 className="mv-txt" variants={sentence} initial="hidden" animate="visible">
            {line1.split("").map((char, i) => {
              return (
                <motion.span key={char + "_" + i} variants={letter}>
                  {char}
                </motion.span>
              );
            })}
            <br />
            {line2.split("").map((char, i) => {
              return (
                <motion.span key={char + "_" + i} variants={letter}>
                  {char}
                </motion.span>
              );
            })}
            <br />
            {line3.split("").map((char, i) => {
              return (
                <motion.span key={char + "_" + i} variants={letter}>
                  {char}
                </motion.span>
              );
            })}
          </motion.h2>
          <div className="scrolldown">
            <span>scroll</span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Mv;
