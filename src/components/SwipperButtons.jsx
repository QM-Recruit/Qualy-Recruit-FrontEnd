import React from "react";
import { useSwiper } from "swiper/react";

function SwipperButtons() {
  const swiper = useSwiper();
  return (
    <div className="swiper-nav-btns">
      <button className="prev" onClick={() => swiper.slidePrev()}></button>
      <button className="next" onClick={() => swiper.slideNext()}></button>
    </div>
  );
}

export default SwipperButtons;
