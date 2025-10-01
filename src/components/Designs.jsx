import React, { useEffect, useState } from "react";
import "../styles/Designs.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { BsInstagram } from "react-icons/bs";
import { getDesigns } from "../utils/supabase";
import Swal from "sweetalert2";

export const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const splideOptions = {
    perPage: 5,
    perMove: 1,
    type: "loop",
    gap: "1rem",
    rewind: true,
    arrows: true,
    pagination: false,
    breakpoints: {
      1200: { perPage: 4 },
      991: { perPage: 3 },
      768: { perPage: 2 },
      500: { perPage: 1 },
      425: { perPage: 1 },
    },
  };

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const data = await getDesigns();
        setDesigns(data || []);
      } catch (error) {
        console.error("Error fetching designs:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load designs from Supabase!",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-5">
      <div className="container-fluid">
        <div className="pb-4">
          <h2 className="text-center fw-bold">
            @comfy! Follow Us On Instagram
          </h2>
        </div>
        <Splide options={splideOptions}>
          {designs.map((val) => (
            <SplideSlide key={val.id}>
              <div className="overflow-hidden designs-imgs position-relative">
                <img
                  width={500}
                  height={500}
                  src={val.img_url} // 👈 now from Supabase
                  alt={`Design ${val.id}`}
                  className="d-block img-fluid"
                />
                <div className="design-overlay">
                  <div className="position-absolute design-insta">
                    <BsInstagram size={40} />
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};
