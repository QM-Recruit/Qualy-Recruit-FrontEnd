import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import SwipperButtons from "./SwipperButtons";
import Interviewer from "./Interviewer";
import interviewerData from "../backend/InterviewData";

function SwipperEmployee() {
  return (
    <div className="slider-block">
      <h3 className="sec-ttl mb30">
        <span>04</span>
        <p>Employee Interviews</p>
      </h3>
      <div className="slider">
        <Swiper
          // slidesPerView={3}
          // spaceBetween={40}
          // navigation={true}
          breakpoints={{
            400: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            401: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            769: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
        >
          {interviewerData.map((user, index) => (
            <SwiperSlide key={index}>
              <Interviewer key={index} user={user} />
            </SwiperSlide>
          ))}
          <SwipperButtons />
        </Swiper>
      </div>
    </div>
  );
}

export default SwipperEmployee;
