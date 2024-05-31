import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { app } from "../firebase";
import { motion, AnimatePresence } from "framer-motion";
const database = getDatabase(app);

function CompanyData() {
  const [data, setData] = useState([]);
  const fadeUpAnimation = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const dataRef = ref(database, "company-data");
    onValue(dataRef, (snapshot) => {
      const companyData = snapshot.val();
      if (companyData) {
        const dataArray = Object.entries(companyData).map(([id, cData]) => ({ id, ...cData }));
        setData(dataArray);
      }
    });
  }, [database]); // Added dependency to ensure useEffect runs when database changes
  return (
    <div className="com-data-block">
      <motion.h4 variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
        Company Data
      </motion.h4>
      <ul className="data-row">
        {data.map((cData) => (
          <motion.li className="data-item" key={cData.id} variants={fadeUpAnimation} initial="hidden" whileInView="visible" exit="hidden">
            <div className="data-txt">
              <span>{cData.title}</span>
              <p>{cData.value}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyData;
