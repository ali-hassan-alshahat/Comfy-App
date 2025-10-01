import React, { useEffect, useState } from "react";
import "../styles/Sections.css";
import { Row } from "react-bootstrap";
import outdoor from "../assets/outdoor.webp";
import ecoFriendly from "../assets/eco-friendly.webp";
import chairs from "../assets/chairs.webp";
import lighting from "../assets/lighting.webp";
import decor from "../assets/decor.webp";
import sofas from "../assets/sofas.webp";
import tables from "../assets/tables.webp";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getSections } from "../utils/supabase";

export const Sections = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSections();
        setSections(data || []);
      } catch (e) {
        console.error("Failed to load sections:", e);
        // silently fallback to local images
      }
    })();
  }, []);

  // Find img_url by slot; if missing, use the local asset so design stays intact
  const imgBy = (slot, fallback) =>
    sections.find((s) => s.slot === slot)?.img_url || fallback;

  return (
    <div className="pt-5 pb-5 position-relative ">
      <div className="container-fluid ">
        <Row>
          <div className="col-12 col-md-6 section-box position-relative pb-5 ">
            <div className="overflow-hidden d-flex justify-content-start align-items-center position-relative  ">
              <img
                src={imgBy("hero_left", ecoFriendly)}
                alt="No"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="h-100 w-100"
              />
              <div className="section-text position-absolute">
                <h4>Mid-Season</h4>
                <h1>Eco-Friendly</h1>
                <Link to={"/shop"}>
                  Shop Now <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 section-box">
            <div className="overflow-hidden d-flex justify-content-start align-items-center position-relative  ">
              <img
                src={imgBy("hero_right", outdoor)}
                alt="No"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="h-100 w-100"
              />
              <div className="section-text position-absolute">
                <h4>Top Trending</h4>
                <h1>Outdoor</h1>
                <Link to={"/shop"}>
                  Shop Now <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </div>

      <div className="container-fluid px-md-5">
        <Row>
          <div className="col-12 col-md-4">
            <div className="overflow-hidden position-relative d-flex justify-content-start second-section-box">
              <img
                src={imgBy("chairs", chairs)}
                alt="No"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="section-chairs-text position-absolute">
                <p>8 Products</p>
                <h3>Chairs</h3>
                <Link to={"/shop"} className=" px-0 py-0">
                  Go Shopping <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-8">
            <Row className="pb-3">
              <div className="col-12 col-md-5">
                <div className="overflow-hidden position-relative d-flex justify-content-start second-section-box">
                  <img
                    src={imgBy("lighting", lighting)}
                    alt="No"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="section-chairs-text position-absolute">
                    <p>6 Products</p>
                    <h3>Lighting</h3>
                    <Link to={"/shop"} className=" px-0 py-0">
                      Go Shopping <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-7">
                <div className="overflow-hidden position-relative d-flex justify-content-start second-section-box">
                  <img
                    src={imgBy("decor", decor)}
                    alt="No"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="section-chairs-text position-absolute">
                    <p>3 Products</p>
                    <h3>Decor</h3>
                    <Link to={"/shop"} className=" px-0 py-0">
                      Go Shopping <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </Row>

            <Row>
              <div className="col-12 col-md-7">
                <div className="overflow-hidden position-relative d-flex justify-content-start second-section-box">
                  <img
                    src={imgBy("sofas", sofas)}
                    alt="No"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="section-chairs-text position-absolute">
                    <p>3 Products</p>
                    <h3>Sofas</h3>
                    <Link to={"/shop"} className=" px-0 py-0">
                      Go Shopping <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5">
                <div className="overflow-hidden position-relative d-flex justify-content-start second-section-box">
                  <img
                    src={imgBy("tables", tables)}
                    alt="No"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="section-chairs-text position-absolute">
                    <p>3 Products</p>
                    <h3>Tables</h3>
                    <Link to={"/shop"} className="px-0 py-0">
                      Go Shopping <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Row>
      </div>
    </div>
  );
};
