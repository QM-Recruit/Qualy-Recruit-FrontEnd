import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  return (
    <motion.footer variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
      <p className="txt">&copy;Qualy Myanmar</p>
    </motion.footer>
  );
}

export default Footer;
