import React, { useEffect, useState } from "react";
import "../styles/Softwares.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from "react-bootstrap";
import { getSoftwares } from "../utils/supabase";

export const Softwares = () => {
  const [softwares, setSoftwares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSoftwares();
        setSoftwares(data);
      } catch (err) {
        console.error("Error fetching softwares:", err);
      }
    };
    fetchData();
  }, []);

  const splideOptions = {
    perPage: 5,
    perMove: 1,
    type: "loop",
    gap: "2rem",
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
    <div className="pt-5 pb-5 border-bottom border-top">
      <Container>
        <Splide options={splideOptions}>
          {softwares.map((val) => (
            <SplideSlide key={val.id}>
              <div className="overflow-hidden softwares-imgs px-3 py-2 text-center">
                <img
                  width={200}
                  height={200}
                  src={val.img_url}
                  alt={val.title || "software"}
                  className="img-fluid"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </Container>
    </div>
  );
};
