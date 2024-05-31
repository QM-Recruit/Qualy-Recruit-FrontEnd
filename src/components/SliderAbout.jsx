import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderAbout() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
  };
  const sliderData = [
    {
      src: "/slider_img01.png",
      alt: "img01の画像",
    },
    {
      src: "/slider_img02.png",
      alt: "img02の画像",
    },
    {
      src: "/slider_img03.png",
      alt: "img03の画像",
    },
    {
      src: "/slider_img04.png",
      alt: "img04の画像",
    },
    {
      src: "/slider_img05.png",
      alt: "img05の画像",
    },
    {
      src: "/slider_img06.png",
      alt: "img06の画像",
    },
    {
      src: "/slider_img07.png",
      alt: "img07の画像",
    },
    {
      src: "/slider_img08.png",
      alt: "img08の画像",
    },
  ];
  return (
    <div className="slider-block">
      <Slider {...settings}>
        {sliderData.map((data, index) => (
          <div className="item" key={index}>
            <img src={data.src} alt={data.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderAbout;
