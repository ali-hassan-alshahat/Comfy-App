import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import "../styles/Main.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Main = ({ slides }) => {
  const splideOptions = {
    perMove: 1,
    type: "fade",
    rewind: true,
    pagination: true,
    speed: "1500",
    autoplay: "playing",
    rate: 1,
    arrows: 2,
  };

  return (
    <div>
      <Splide options={splideOptions}>
        {slides.map((val) => (
          <SplideSlide key={val.id}>
            <div className="main-main">
              <img
                src={val.img_url}
                alt={val.text || "Slider"}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div className="main-home main-home-anime">
                <div className="text-start main-start-text">
                  <div className="row">
                    <p className="main-price col-5 col-lg-2 col-md-3">
                      {val.price}
                    </p>
                  </div>
                  <div className="row">
                    <h3 className="main-text col-10 col-md-6 col-xl-8">
                      {val.text}
                    </h3>
                  </div>
                  <div className="main-explore">
                    <Link to={"/shop"} className="main-explore-text">
                      {val.explore} <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Main;
