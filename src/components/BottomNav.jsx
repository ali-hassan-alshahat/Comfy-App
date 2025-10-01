import React, { useEffect, useState } from "react";
import { BsPersonFill, BsShop } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  decreaseAmount,
  deleteItem,
  increaseAmount,
  selectCartItems,
  selectTotalAmount,
  selectTotalQTY,
  setCartItems,
  setGetTotals,
} from "../rtk/slices/cartSlice";
import { IoMdExit } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { supabase } from "../utils/supabase";
import "../styles/Navbar.css";
import { use } from "react";

export const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // ✅ Fetch updated stock from Supabase
  const fetchUpdatedCart = async () => {
    if (cartItems.length === 0) return;

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .in(
        "id",
        cartItems.map((item) => item.id),
      );

    if (!error && data) {
      const updatedCart = cartItems.map((item) => {
        const updated = data.find((p) => p.id === item.id);
        return updated
          ? {
              ...item,
              title: updated.title,
              img1_url: updated.img1_url,
              price: parseFloat(updated.price),
              discountPrice: updated.discount_price
                ? parseFloat(updated.discount_price)
                : null,
              stock:
                updated.stock_status === "Out Of Stock"
                  ? 0
                  : parseInt(updated.stock_status, 10),
              color1: updated.color1,
            }
          : item;
      });

      dispatch(setCartItems(updatedCart));
      dispatch(setGetTotals());
    }
  };

  // ✅ Update stock when cart is opened
  const handleOpening = () => {
    if (!isOpen) {
      fetchUpdatedCart();
    }
    setIsOpen((cur) => !cur);
  };

  useEffect(() => {
    fetchUpdatedCart();
  }, []);

  return (
    <nav className="sticky-bottom bg-white nav-sticky-bottom text-center">
      {/* Overlay */}
      <div
        onClick={handleOpening}
        className={isOpen ? "cart-overlay modal-backdrop" : "d-none"}
      ></div>

      {/* Cart Modal */}
      <div className={isOpen ? "modal cart-modal d-block" : "d-none"}>
        <div className="modal-lg h-100">
          <div className="border-0 rounded-0 cart-modal-container">
            <div className="bg-dark rounded-0 text-light modal-header">
              <strong className="modal-title px-0">Shopping Cart</strong>
              <span onClick={handleOpening} style={{ cursor: "pointer" }}>
                <IoMdExit size={"30px"} />
              </span>
            </div>

            <div className="modal-body">
              <div className="w-100 container-fluid cart-container-opened">
                {cartItems.map((el, i) => (
                  <div key={i}>
                    <div className="py-2">
                      <Row>
                        {/* Product Image */}
                        <div className="col-3 pt-2 d-flex justify-content-center align-items-center">
                          <img
                            src={el.img1_url}
                            alt={el.title}
                            className="w-100"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="col-9">
                          <Link
                            to={`/${el.id}`}
                            className="text-dark cart-opened-title text-decoration-none"
                          >
                            <strong className="text-truncate">
                              {el.title}
                            </strong>
                          </Link>
                          <Row>
                            <div className="col-6">
                              <div className="d-flex fw-semibold">
                                Color :
                                <div
                                  className="ms-2 mt-1 border-white border border-2 cart-color-span"
                                  style={{ backgroundColor: el.color1 }}
                                ></div>
                              </div>

                              {/* Price */}
                              <span
                                className={
                                  el.discountPrice
                                    ? "cart-discount-price fw-semibold"
                                    : "d-none"
                                }
                              >
                                ${parseFloat(el.discountPrice).toFixed(2)}
                              </span>
                              <span
                                className={
                                  !el.discountPrice
                                    ? "cart-without-price"
                                    : "cart-before-price"
                                }
                              >
                                ${parseFloat(el.price).toFixed(2)}
                              </span>

                              {/* Delete Button */}
                              <div
                                className="pt-2 cart-delete d-flex"
                                onClick={() => {
                                  Swal.fire({
                                    title: `You Want To Delete ${el.title}?`,
                                    icon: "question",
                                    showCancelButton: true,
                                    confirmButtonText: "Yes",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      dispatch(deleteItem(el));
                                      toast.success(`${el.title} Deleted`);
                                    }
                                  });
                                }}
                              >
                                <MdOutlineDelete size={"28px"} />
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="col-6">
                              <div className="d-flex justify-content-center align-items-stretch w-100">
                                <button
                                  type="button"
                                  onClick={() => {
                                    dispatch(decreaseAmount(el));
                                    if (el.quantity > 1) {
                                      toast.success("Decreased Successfully");
                                    }
                                  }}
                                  disabled={el.quantity <= 1}
                                  className="btn cart-btns rounded-0 border-0"
                                >
                                  <FaRegMinusSquare size={"22px"} />
                                </button>
                                <p className="m-0 py-2 text-center fs-4 cart-qty">
                                  {el.quantity}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    dispatch(increaseAmount(el));
                                    if (el.quantity < el.stock) {
                                      toast.success("Increased Successfully");
                                    }
                                  }}
                                  disabled={el.quantity >= el.stock}
                                  className="btn cart-btns rounded-0 border-0"
                                >
                                  <FaRegPlusSquare size={"22px"} />
                                </button>
                              </div>
                              <div className="d-flex justify-content-center">
                                <span className="fw-semibold">Stock: </span>
                                <span className="ps-1">{el.stock}</span>
                              </div>
                            </div>
                          </Row>
                        </div>
                      </Row>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="container px-4">
              <div className="border-0 w-100">
                <button
                  disabled={cart.cartTotalAmount === 0}
                  className="btn btn-danger text-white border-0 d-flex justify-content-center m-auto w-100"
                  type="button"
                  onClick={() => {
                    Swal.fire({
                      title: `Are You Sure?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        dispatch(clearCart(cart));
                        toast.success("Cart Cleared");
                      }
                    });
                  }}
                >
                  Clear Cart
                </button>
                <div className="d-flex justify-content-between fs-6 w-100 py-2">
                  <strong>Total Price : </strong>
                  <strong>${totalAmount.toFixed(2)}</strong>
                </div>
                <div>
                  <Link
                    to={"/checkout"}
                    className="btn rounded-0 border-0 fs-5 fw-semibold py-2 w-100 btn-light px-4 my-2"
                    type="button"
                  >
                    Checkout
                  </Link>
                  <Link
                    to={"/cart"}
                    className="fs-6 text-dark text-center d-flex justify-content-center view-cart"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Row className="list-unstyled py-3 m-0">
        <div className="col-3">
          <Link aria-label="person" to={"/account"} style={{ color: "black" }}>
            <BsPersonFill size={"28px"} />
          </Link>
        </div>
        <div className="col-3">
          <Link aria-label="shop" to={"/shop"} style={{ color: "black" }}>
            <BsShop size={"28px"} />
          </Link>
        </div>
        <div className="col-3">
          <Link aria-label="search" to={"/shop"} style={{ color: "black" }}>
            <BiSearch size={"28px"} />
          </Link>
        </div>
        <div className="col-3 position-relative">
          <button className="nav-cart" onClick={handleOpening}>
            <HiShoppingCart size={"28px"} />
            <div className="nav-bottom-number">{totalQTY}</div>
          </button>
        </div>
      </Row>
    </nav>
  );
};
