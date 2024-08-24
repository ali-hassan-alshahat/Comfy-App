import React from "react";
import "../styles/TopTrending.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/cartSlice";
import toast from "react-hot-toast";
export const TopTrending = ({ topTrending: { items } }) => {
  const splideOptions = {
    perPage: 4,
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
  const dispatch = useDispatch();
  return (
    <div className='pt-5 pb-5'>
      <Container>
        <div className='fw-medium text-center fs-3 pb-5'>Top Trending</div>
        <Splide options={splideOptions}>
          {items.map((val, i) => {
            return (
              <SplideSlide key={i}>
                <div className='card position-relative rounded-0 border-0 trending-card'>
                  <span
                    className={
                      val.stock === "Out Of Stock"
                        ? "trend-stock position-absolute d-block z-1 badge "
                        : "d-none "
                    }
                  >
                    Out Of Stock
                  </span>
                  <div className='holder position-relative overflow-hidden trend-box'>
                    <Link
                      to={`/${val.id}`}
                      className='d-block position-relative'
                    >
                      <img
                        width={300}
                        height={300}
                        src={val.img1}
                        alt='No'
                        className='img-fluid card-img-top rounded-0'
                      />
                      <img
                        width={300}
                        height={300}
                        src={val.img2}
                        alt='No'
                        className='img-fluid rounded-0 trending-hover w-100 h-100 position-absolute top-0 start-0'
                      />
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(addToCart(val));
                        toast.success(`${val.title} Added To Cart`);
                      }}
                      className={
                        val.stock !== "Out Of Stock"
                          ? "position-absolute z-1 trend-cart text-center"
                          : "d-none"
                      }
                    >
                      <AiOutlinePlus size={"18px"} /> {val.cart}
                    </button>
                  </div>
                  <div className='pt-4 text-center'>
                    <Link to={`/${val.id}`} className='trend-title'>
                      {val.title}
                    </Link>
                    <span className='trend-price d-flex justify-content-center '>
                      {val.price}
                    </span>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </Container>
    </div>
  );
};
