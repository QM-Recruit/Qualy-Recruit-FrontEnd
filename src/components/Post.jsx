import React from "react";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, push, update, remove } from "firebase/database";
import { app } from "../firebase";
import { format } from "date-fns"; // Import format function from date-fns
import JobForm from "./JobForm";
import { motion, AnimatePresence } from "framer-motion";
const database = getDatabase(app);

function CompanyData() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const closeForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("fixed");
    } else {
      document.body.classList.remove("fixed");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("fixed");
    };
  }, [showForm]);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const dataRef = ref(database, "posts");
    onValue(dataRef, (snapshot) => {
      const postData = snapshot.val();
      if (postData) {
        const dataArray = Object.entries(postData).map(([id, post]) => ({ id, ...post }));
        const sortedData = dataArray.sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp
        // Get the latest 3 posts
        // const latestPosts = sortedData.slice(0, 3);

        setData(sortedData);
      }
    });
  }, [database]); // Added dependency to ensure useEffect runs when database changes
  return (
    <div className="jobs-list">
      {data.map((post) => (
        <div className="job-card" key={post.id}>
          <h4 className="card-ttl">
            {post.title}
            <br className="sp" /> ({post.gender} - {post.hirePerson} Post{post.hirePerson > 1 ? "s" : ""})<span onClick={() => setShowForm(true)} className="arrow"></span>
          </h4>
          <div className="desc">
            <div className="left">
              <span>Full-time employee</span>
              <span>$ {post.value}〜</span>
            </div>
            <div className="right">
              {/* Recruitment deadline<span className="date">{format(new Date(post.date), "yyyy.M.dd")}</span> */}
              Recruitment deadline<span className="date">{post.date}</span>
            </div>
          </div>
          {/* <p className="detail">{post.description}</p> */}
          <div className="detail" dangerouslySetInnerHTML={{ __html: post.description }}></div>
        </div>
      ))}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="job-form"
            initial={{ x: isMobile ? 400 : 800 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? 400 : 800 }}
            transition={{
              duration: isMobile ? 0.6 : 0.5,
              type: "tween",
              ease: "easeInOut",
            }}
          >
            <JobForm closeForm={closeForm} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`overlay ${showForm ? "show" : ""}`} onClick={() => setShowForm(false)}></div>
    </div>
  );
}

export default CompanyData;
