import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { FaUnlock, FaUser } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
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
  setUserId,
  openCartModal,
  closeCartModal,
  toggleCartModal,
  selectIsCartModalOpen,
} from "../rtk/slices/cartSlice";
import { IoMdExit } from "react-icons/io";
import { Row } from "react-bootstrap";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { supabase } from "../utils/supabase";
import AuthModal from "../auth/AuthModal";

export const Navbar = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const { pathname } = location;

  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector(selectCartItems);
  const isOpen = useSelector(selectIsCartModalOpen);
  const dispatch = useDispatch();

  // ✅ Listen for Supabase auth state changes
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      dispatch(setUserId(user?.id || "guest"));
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" || event === "SIGNED_UP") {
          setUser(session?.user || null);
          dispatch(setUserId(session?.user?.id || "guest"));
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          dispatch(setUserId("guest"));
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

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
              color2: updated.color2,
              color3: updated.color3,
            }
          : item;
      });

      dispatch(setCartItems(updatedCart));
      dispatch(setGetTotals());
    }
  };

  const handleOpening = () => {
    if (!isOpen) {
      fetchUpdatedCart();
    }
    dispatch(toggleCartModal());
  };

  const handleCloseModal = () => {
    dispatch(closeCartModal());
  };

  useEffect(() => {
    fetchUpdatedCart();
  }, []);

  // ✅ Helper function to get color name
  const getColorName = (item) => {
    if (item.selectedColor === item.color1) return "Color 1";
    if (item.selectedColor === item.color2) return "Color 2";
    if (item.selectedColor === item.color3) return "Color 3";
    return "Selected Color";
  };

  return (
    <header className="sticky-lg-top header bg-white header">
      {/* Overlay */}
      <div
        onClick={handleCloseModal}
        className={isOpen ? "cart-overlay modal-backdrop" : "d-none"}
      ></div>

      {/* Cart Modal */}
      <div className={isOpen ? "modal cart-modal d-block" : "d-none"}>
        <div className="modal-lg h-100">
          <div className="border-0 rounded-0 cart-modal-container">
            <div className="bg-dark rounded-0 text-light modal-header d-flex justify-content-between">
              <strong className="modal-title px-0">Shopping Cart</strong>
              <span onClick={handleCloseModal} style={{ cursor: "pointer" }}>
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
                              <div className="d-flex fw-semibold align-items-center">
                                Color :
                                <div
                                  className="ms-2 border-white border border-2 cart-color-span"
                                  style={{
                                    backgroundColor:
                                      el.selectedColor || el.color1, // ✅ Use selected color
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                  }}
                                ></div>
                              </div>

                              {/* Price Display */}
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
                                      dispatch(
                                        deleteItem({
                                          id: el.id,
                                          selectedColor: el.selectedColor, // ✅ Pass selected color for deletion
                                        }),
                                      );
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
                                    dispatch(
                                      decreaseAmount({
                                        id: el.id,
                                        selectedColor: el.selectedColor, // ✅ Pass selected color
                                      }),
                                    );
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
                                    dispatch(
                                      increaseAmount({
                                        id: el.id,
                                        selectedColor: el.selectedColor, // ✅ Pass selected color
                                      }),
                                    );
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

            {/* Cart Footer */}
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
                    onClick={handleCloseModal}
                    type="button"
                  >
                    Checkout
                  </Link>
                  <Link
                    to={"/cart"}
                    className="fs-6 text-dark text-center d-flex justify-content-center view-cart"
                    onClick={handleCloseModal}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg align-items-center border-bottom bg-light">
        <div className="container-fluid">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="nav-img" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="m-0 p-0 nav-ul navbar-nav mx-auto">
              {["Home", "Shop", "About", "Contact", "FAQ"].map((item) => (
                <li key={item} className="ps-2 nav-item">
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={
                      pathname ===
                      (item === "Home" ? "/" : `/${item.toLowerCase()}`)
                        ? "nav-li active fs-5 fw-medium nav-link"
                        : "nav-li fs-5 fw-medium nav-link"
                    }
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Side */}
            <div className="align-items-center gap-4 nav-right">
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="nav-account p-0 ms-2 text-black"
                  >
                    <FaUser size={"22px"} />
                  </Link>
                </>
              ) : (
                <button
                  className="nav-login text-center p-0"
                  onClick={() => {
                    localStorage.setItem("redirectPath", pathname);
                    setShowAuthModal(true);
                  }}
                >
                  <FaUnlock size={"18px"} />
                  <span className="fw-semibold">Login / Register</span>
                </button>
              )}

              <Link to={"/shop"} className="nav-search p-0">
                <BiSearch size={"28px"} />
              </Link>
              <button onClick={handleOpening} className="nav-cart p-0">
                <HiShoppingCart size={"28px"} />
                <div className="nav-number">{totalQTY}</div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </header>
  );
};
