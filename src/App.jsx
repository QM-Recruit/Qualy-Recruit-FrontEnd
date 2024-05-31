// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Admin from "./page/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import InterviewSingle from "./page/InterviewSingle";
import Error from "./components/Error";
import RedirectLink from "./components/RedirectLink";

function App() {
  const { adminUser } = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a loading delay for demonstration purposes
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Cleanup function to clear the timeout in case component unmounts before the timeout
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div>
      <ToastContainer autoClose={800} theme="colored" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview" element={<RedirectLink />} />
            <Route path="/interview/:id" element={<InterviewSingle />} />
            {adminUser && <Route path="/admin" element={<Admin />} />}
            {!adminUser && <Route path="/admin" element={<Login />} />}
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
