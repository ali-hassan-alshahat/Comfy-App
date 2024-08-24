import React from "react";
import "../styles/Designs.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { BsInstagram } from "react-icons/bs";

export const Designs = ({ designs: { items } }) => {
  const splideOptions = {
    perPage: 5,
    perMove: 1,
    type: "loop",
    gap: "1rem",
    rewind: true,
    arrows: 2,
    pagination: false,
    breakpoints: {
      1200: { perPage: 4 },
      991: { perPage: 3 },
      768: { perPage: 2 },
      500: { perPage: 1 },
      425: { perPage: 1 },
    },
    classes: {
      arrows: "splide__arrows your-class-arrows",
      arrow: "splide__arrow your-class-arrow",
      prev: "splide__arrow--prev your-class-prev",
      next: "splide__arrow--next your-class-next",
    },
  };
  return (
    <div className='pt-5 pb-5'>
      <div className='container-fluid '>
        <div className='pb-4'>
          <h2 className='text-center fw-bold '>
            @comfy! Follow Us On Instagram
          </h2>
        </div>
        <Splide options={splideOptions}>
          {items.map((val, i) => {
            return (
              <SplideSlide key={i}>
                <div className='overflow-hidden designs-imgs position-relative '>
                  <img
                    width={500}
                    height={500}
                    src={val.img}
                    alt='No'
                    className='d-block img-fluid '
                  />
                  <div className='design-overlay'>
                    <div className='position-absolute design-insta'>
                      <BsInstagram size={"40px"} />
                    </div>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};
