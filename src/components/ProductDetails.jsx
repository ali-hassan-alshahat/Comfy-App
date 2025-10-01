import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import { Softwares } from "./Softwares";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "../styles/ProductDetails.css";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { softwares } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseAmount,
  decreaseAmount,
  deleteItem,
  selectCartItems,
} from "../rtk/slices/cartSlice";
import toast from "react-hot-toast";
import { supabase } from "../utils/supabase";

export const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [pic, setPic] = useState("");
  const [spanActive, setSpanActive] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const [selectedColor, setSelectedColor] = useState(""); // ✅ Track selected color

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleCheck = () => setIsChecked((current) => !current);

  const navigate = useNavigate();

  const splideOptions = {
    perPage: 3,
    perMove: 1,
    type: "loop",
    gap: "2rem",
    rewind: true,
    arrows: 2,
    pagination: false,
    breakpoints: {
      1200: { perPage: 3 },
      991: { perPage: 2.3 },
      768: { perPage: 2 },
      500: { perPage: 1.8, arrows: false },
      425: { perPage: 1, arrows: false },
    },
    classes: {
      arrows: "splide__arrows your-class-arrows",
      arrow: "splide__arrow your-class-arrow",
      prev: "splide__arrow--prev your-class-prev",
      next: "splide__arrow--next your-class-next",
    },
  };

  // Fetch product + related products
  useEffect(() => {
    const fetchProduct = async () => {
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        return;
      }

      setProduct(productData);
      setPic(productData.img1_url);
      setSpanActive(productData.color1);
      setSelectedColor(productData.color1); // ✅ Set default selected color

      // Fetch related products
      const { data: relatedData, error: relatedError } = await supabase
        .from("products")
        .select("*")
        .eq("category", productData.category)
        .neq("id", productId);

      if (!relatedError) {
        setRelated(relatedData);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const {
    img1_url,
    img2_url,
    img3_url,
    title,
    price,
    stock_status,
    color1,
    color2,
    color3,
    vendor,
    sku,
    category,
    description,
    discount,
    discount_price,
  } = product;

  // ✅ Find existing item with the SAME COLOR
  const existingItem = cartItems.find(
    (item) => item.id === product.id && item.selectedColor === selectedColor,
  );

  const stock =
    stock_status === "Out Of Stock" ? 0 : parseInt(stock_status, 10);
  const showQuantityControls = existingItem && existingItem.quantity > 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: product,
        selectedColor: selectedColor, // ✅ Pass the selected color
      }),
    );
    toast.success(`${title} (${getColorName(selectedColor)}) Added To Cart`);
  };

  const handleIncrease = async () => {
    if (existingItem.quantity >= stock) {
      toast.error("Maximum stock reached");
      return;
    }

    setLoadingQuantity(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    dispatch(
      increaseAmount({
        id: product.id,
        selectedColor: selectedColor, // ✅ Pass color for identification
      }),
    );
    setLoadingQuantity(false);
  };

  const handleDecrease = async () => {
    setLoadingQuantity(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (existingItem.quantity > 1) {
      dispatch(
        decreaseAmount({
          id: product.id,
          selectedColor: selectedColor, // ✅ Pass color for identification
        }),
      );
    } else {
      dispatch(
        deleteItem({
          id: product.id,
          selectedColor: selectedColor, // ✅ Pass color for identification
        }),
      );
      toast.success(
        `${title} (${getColorName(selectedColor)}) removed from cart`,
      );
    }
    setLoadingQuantity(false);
  };

  // ✅ Helper function to get color name
  const getColorName = (color) => {
    if (color === color1) return "Color 1";
    if (color === color2) return "Color 2";
    if (color === color3) return "Color 3";
    return "Selected Color";
  };

  // ✅ Handle color selection
  const handleColorSelect = (color, imageUrl) => {
    setSpanActive(color);
    setPic(imageUrl);
    setSelectedColor(color); // ✅ Update selected color
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <Row>
          {/* Left Side Images */}
          <div className="col-lg-6 col-md-6">
            <div className="position-sticky">
              <Row className="m-0">
                <div className="col-md-2 px-0 pe-md-3">
                  <div className="d-flex flex-md-column gap-2 mb-md-0 mb-3">
                    {img1_url && (
                      <button
                        type="button"
                        onClick={() => handleColorSelect(color1, img1_url)}
                        className={
                          pic === img1_url
                            ? "p-0 details-btn btn details-active"
                            : "p-0 details-btn btn"
                        }
                      >
                        <img src={img1_url} alt={title} className="img-fluid" />
                      </button>
                    )}
                    {img2_url && (
                      <button
                        type="button"
                        onClick={() => handleColorSelect(color2, img2_url)}
                        className={
                          pic === img2_url
                            ? "p-0 details-btn btn details-active"
                            : "p-0 details-btn btn"
                        }
                      >
                        <img src={img2_url} alt={title} className="img-fluid" />
                      </button>
                    )}
                    {img3_url && (
                      <button
                        type="button"
                        onClick={() => handleColorSelect(color3, img3_url)}
                        className={
                          pic === img3_url
                            ? "p-0 details-btn btn details-active"
                            : "p-0 details-btn btn"
                        }
                      >
                        <img src={img3_url} alt={title} className="img-fluid" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-md-10 px-0 position-relative">
                  <img src={pic} alt={title} className="w-100 h-100" />
                </div>
              </Row>
            </div>
          </div>

          {/* Right Side Info */}
          <div className="col-lg-6 col-md-6">
            <nav className="detail-nav">
              <Link to={"/"}>Home</Link> / {title}
            </nav>
            <h2 className="mb-3 mt-4">{title}</h2>
            <span className={discount ? "details-span" : "d-none"}>
              {discount}
            </span>
            <div className="d-flex gap-2 align-items-center">
              {discount_price && (
                <span className="details-discount-price fw-semibold">
                  ${parseFloat(discount_price).toFixed(2)}
                </span>
              )}
              <span
                className={
                  !discount_price
                    ? "details-without-price"
                    : "details-before-price"
                }
              >
                ${parseFloat(price).toFixed(2)}
              </span>
            </div>
            <p className="details-text mb-4 mt-3">{description}</p>

            {/* Stock & Colors */}
            <div className="border-top border-bottom py-4">
              <div className="d-flex gap-2 mb-4">
                <span className="fw-semibold">Stock : </span>
                <span
                  className={
                    stock_status === "Out Of Stock"
                      ? "text-danger"
                      : "text-black"
                  }
                >
                  {stock_status}
                </span>
              </div>
              <div className="d-flex gap-3 mb-4">
                <h6 className="fw-semibold mb-0">Colors : </h6>
                <div className="d-flex gap-2">
                  {color1 && (
                    <span
                      onClick={() => handleColorSelect(color1, img1_url)}
                      className={
                        selectedColor === color1
                          ? "border-white border border-2 details-span-active"
                          : "border-white border border-2"
                      }
                      style={{
                        backgroundColor: color1,
                        width: "1.5rem",
                        height: "1.5rem",
                        outline: "1.5px solid #eee",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                    ></span>
                  )}
                  {color2 && (
                    <span
                      onClick={() => handleColorSelect(color2, img2_url)}
                      className={
                        selectedColor === color2
                          ? "border-white border border-2 details-span-active"
                          : "border-white border border-2"
                      }
                      style={{
                        backgroundColor: color2,
                        width: "1.5rem",
                        height: "1.5rem",
                        outline: "1.5px solid #eee",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                    ></span>
                  )}
                  {color3 && (
                    <span
                      onClick={() => handleColorSelect(color3, img3_url)}
                      className={
                        selectedColor === color3
                          ? "border-white border border-2 details-span-active"
                          : "border-white border border-2"
                      }
                      style={{
                        backgroundColor: color3,
                        width: "1.5rem",
                        height: "1.5rem",
                        outline: "1.5px solid #eee",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                    ></span>
                  )}
                </div>
              </div>

              {/* Selected Color Display */}
              <div className="mb-3">
                <small className="text-muted">
                  Selected: <strong>{getColorName(selectedColor)}</strong>
                </small>
              </div>

              {/* Add to Cart / Quantity Controls */}
              {!showQuantityControls ? (
                <button
                  disabled={stock === 0}
                  onClick={handleAddToCart}
                  className="btn text-white d-block bg-dark text-center px-5 mx-auto rounded-2 text-capitalize details-add-cart"
                >
                  Add to cart
                </button>
              ) : (
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    onClick={handleDecrease}
                    disabled={loadingQuantity}
                  >
                    <FaMinus />
                  </button>

                  <div style={{ minWidth: "30px", textAlign: "center" }}>
                    {loadingQuantity ? (
                      <div
                        className="spinner-border spinner-border-sm text-dark"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <span className="fw-bold fs-5">
                        {existingItem.quantity}
                      </span>
                    )}
                  </div>

                  <button
                    className="btn btn-outline-dark rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                    disabled={existingItem.quantity >= stock || loadingQuantity}
                    onClick={handleIncrease}
                  >
                    <FaPlus />
                  </button>
                </div>
              )}
            </div>

            {/* Terms & Buy Now */}
            <div className="py-4">
              <form>
                <div className="form-check">
                  <input
                    onChange={handleCheck}
                    checked={isChecked}
                    type="checkbox"
                    id="flexCheckDefault"
                    className="form-check-input details-checkbox"
                  />
                  <label className="details-label" htmlFor="flexCheckDefault">
                    I Agree With The{" "}
                    <a href="/" className="text-dark">
                      Terms And Conditions
                    </a>
                  </label>
                </div>
              </form>
              <button
                type="button"
                disabled={stock_status === "Out Of Stock" || !isChecked}
                className="btn text-white bg-dark py-2 my-3 w-100 d-block text-capitalize details-buy"
                onClick={() => navigate("/checkout")}
              >
                Buy It Now
              </button>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="details-vendor d-inline-block">
                    Vendor :{" "}
                  </span>
                  <span className="details-vendor-name">{vendor}</span>
                </li>
                <li className="mb-2">
                  <span className="details-vendor d-inline-block">SKU : </span>
                  <span className="details-vendor-name">{sku}</span>
                </li>
                <li className="mb-2">
                  <span className="details-vendor d-inline-block">
                    Category :{" "}
                  </span>
                  <span className="details-vendor-name">{category}</span>
                </li>
              </ul>
            </div>
          </div>
        </Row>

        {/* Description */}
        <div>
          <h2 className="h5 border-top border-bottom text-center">
            <span className="details-description d-inline-block position-relative py-3 h-100">
              Description
            </span>
          </h2>
          <p className="details-description-text px-lg-0 px-md-5 px-sm-4 px-3 pt-4 text-center lh-lg mx-auto">
            {description}
          </p>
        </div>

        {/* Related Products */}
        <h2 className="text-center my-4">Related Products</h2>
        <Splide className="py-5" options={splideOptions}>
          {related.map((val) => (
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
                      src={val.img1_url}
                      alt={val.title}
                      className="img-fluid card-img-top rounded-0"
                    />
                    <img
                      src={val.img2_url}
                      alt={val.title}
                      className="img-fluid rounded-0 trending-hover w-100 h-100 position-absolute top-0 start-0"
                    />
                  </Link>
                  <button
                    disabled={val.stock_status === "Out Of Stock"}
                    onClick={() => {
                      // ✅ Shop page adds with default color (color1)
                      dispatch(
                        addToCart({
                          product: val,
                          selectedColor: val.color1, // Default color for shop
                        }),
                      );
                      toast.success(`${val.title} Added To Cart`);
                    }}
                    className={
                      val.stock_status !== "Out Of Stock"
                        ? "position-absolute z-1 trend-cart text-center"
                        : "d-none"
                    }
                  >
                    <AiOutlinePlus size={"18px"} /> {val.cart}
                  </button>
                </div>
                <div className="pt-4 text-center">
                  <Link to={`/${val.id}`} className="trend-title">
                    {val.title}
                  </Link>
                  <span className="trend-price d-flex justify-content-center">
                    ${parseFloat(val.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <Softwares softwares={softwares} />
    </div>
  );
};
