// Header.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import JobForm from "./JobForm";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { adminUser, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // const isTablet = window.innerWidth <= 768;
  // const isMobile = window.innerWidth <= 500;
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const logoutHandler = () => {
    setLoading(true);
    dispatch({
      type: "SET_ADMINUSER",
      payload: null,
    });
    toast.success("Logout Successfully");
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setToggle(false);
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

  const menuAnimation = {
    hidden: {
      clipPath: "circle(100px at calc(100% - 20px) 20px)",
      opacity: 0,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 10,
        restDelta: 2,
      },
    },
    visible: {
      clipPath: `circle(1200px at calc(100% - 20px) 20px)`,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2,
      },
    },
  };

  return (
    <>
      {loading && <Loading />}
      <header>
        <div className="header-container">
          <div className="header-row">
            <Link to={"/"} onClick={closeMenu}>
              <h1 className="logo-icon">
                <img src="/logo.png" alt="logo" />
              </h1>
            </Link>
            <motion.nav className={`nav-items ${toggle ? "open" : ""}`} variants={menuAnimation} initial={isTablet || isMobile ? "hidden" : ""} animate={toggle ? "visible" : ""} exit="hidden">
              <ul>
                <>
                  <li>
                    <a href="/#about" onClick={closeMenu}>
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/#requirement" onClick={closeMenu}>
                      Requirement
                    </a>
                  </li>
                  <li>
                    <a href="/#career" onClick={closeMenu}>
                      Career
                    </a>
                  </li>
                  <li>
                    <a href="/#interview" onClick={closeMenu}>
                      Interview
                    </a>
                  </li>
                  <button onClick={() => setShowForm(true)}>Apply for a job</button>
                </>
                {adminUser && (
                  <>
                    <li>
                      <Link to={"/admin/applicants"}>
                        Show Applicants
                      </Link>
                    </li>
                    <li>
                      <Link to={"/admin"} onClick={logoutHandler}>
                        <div className="txt-center">
                          <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                        </div>
                        Logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.nav>
            <button onClick={handleToggle} className={`menu-btn ${toggle ? "open" : ""}`}>
              <span className="btn-line"></span>
              <span className="btn-line"></span>
              <span className="btn-line"></span>
            </button>
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
        </div>
      </header>
    </>
  );
}

export default Header;
