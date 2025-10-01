import React, { useState } from "react";
import "../styles/TopTrending.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Container } from "react-bootstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
  openCartModal,
} from "../rtk/slices/cartSlice";
import toast from "react-hot-toast";

export const TopTrending = ({ items }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [addingToCart, setAddingToCart] = useState({}); // Track loading state per product

  const getRemainingStock = (item) => {
    const stock =
      item.stock_status === "Out Of Stock"
        ? 0
        : parseInt(item.stock_status, 10) || 0;
    const inCart = cartItems.find((el) => el.id === item.id)?.quantity || 0;
    return stock - inCart;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Handle add to cart with loading state
  const handleAddToCart = async (product) => {
    const itemsLeft = getRemainingStock(product);
    if (itemsLeft <= 0) {
      toast.error(`${product.title} is out of stock`);
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    await new Promise((resolve) => setTimeout(resolve, 800));

    // ✅ Use default color (color1) same as shop page
    dispatch(
      addToCart({
        product: product,
        selectedColor: product.color1, // Default color for top trending
      }),
    );

    toast.success(`${product.title} Added To Cart`);
    setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
  };

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

  return (
    <div className="pt-5 pb-5">
      <Container>
        <div className="fw-medium text-center fs-3 pb-5">Top Trending</div>
        <Splide options={splideOptions}>
          {items.map((val) => (
            <SplideSlide key={val.id}>
              <div className="card position-relative rounded-0 border-0 trending-card">
                <span
                  className={
                    val.stock_status === "Out Of Stock"
                      ? "trend-stock position-absolute d-block z-1 badge"
                      : "d-none"
                  }
                >
                  Out Of Stock
                </span>
                <div className="holder position-relative overflow-hidden trend-box">
                  <Link to={`/${val.id}`} className="d-block position-relative">
                    <img
                      width={300}
                      height={300}
                      src={val.img1_url}
                      alt={val.title}
                      className="img-fluid card-img-top rounded-0"
                    />
                    <img
                      width={300}
                      height={300}
                      src={val.img2_url}
                      alt={val.title}
                      className="img-fluid rounded-0 trending-hover w-100 h-100 position-absolute top-0 start-0"
                    />
                  </Link>

                  {/* Add to Cart / In Cart Button */}
                  {!isInCart(val.id) ? (
                    <button
                      onClick={() => handleAddToCart(val)}
                      disabled={
                        val.stock_status === "Out Of Stock" ||
                        addingToCart[val.id]
                      }
                      className={
                        val.stock_status !== "Out Of Stock"
                          ? "position-absolute z-1 trend-cart text-center"
                          : "d-none"
                      }
                    >
                      {addingToCart[val.id] ? (
                        <>
                          <div
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Adding...
                        </>
                      ) : (
                        <>
                          <AiOutlinePlus size={"18px"} /> Add To Cart
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(openCartModal())} // Opens navbar cart modal
                      className="position-absolute z-1 trend-cart text-center text-white border-0"
                      style={{
                        cursor: "pointer",
                        backgroundColor: "var(--main-gold)",
                      }}
                    >
                      ✓ In Your Cart
                    </button>
                  )}
                </div>
                <div className="pt-4 text-center">
                  <Link to={`/${val.id}`} className="trend-title">
                    {val.title}
                  </Link>
                  <div className="d-flex gap-2 align-items-center justify-content-center">
                    <span
                      className={
                        val.discount_price
                          ? "cart-discount-price fw-semibold"
                          : "d-none"
                      }
                    >
                      ${val.discount_price}
                    </span>
                    <span
                      className={
                        !val.discount_price
                          ? "cart-without-price"
                          : "cart-before-price"
                      }
                    >
                      ${val.price}
                    </span>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </Container>
    </div>
  );
};

export default TopTrending;
