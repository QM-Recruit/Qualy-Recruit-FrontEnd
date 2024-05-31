import React, { useState, useEffect } from "react";
import ToTopBtn from "../components/ToTopBtn";
import MvSection from "../section/MvSection";
import AboutSection from "../section/AboutSection";
import RequirmentSection from "../section/RequirmentSection";
import CareerSection from "../section/CareerSection";
import InterviewSection from "../section/InterviewSection";
import SnsSection from "../section/SnsSection";

function Home() {
  return (
    <>
      <MvSection />
      <AboutSection />
      <RequirmentSection />
      <CareerSection />
      <InterviewSection />
      <SnsSection />
      <ToTopBtn />
    </>
  );
}

export default Home;
