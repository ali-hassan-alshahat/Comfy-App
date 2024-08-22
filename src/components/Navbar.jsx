import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { FaUnlock } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import "../styles/Navbar.css";
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
} from "../rtk/slices/cartSlice";
import { setGetTotals } from "../rtk/slices/cartSlice";
import { IoMdExit } from "react-icons/io";
import { Row } from "react-bootstrap";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegMinusSquare } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const Navbar = () => {
  // open cart from side
  const [isOpen, setIsOpen] = useState(false);
  const handleOpening = (e) => {
    setIsOpen((cur) => !cur);
  };
  const totalAmount = useSelector(selectTotalAmount);
  const location = useLocation();
  const { pathname } = location;
  const totalQTY = useSelector(selectTotalQTY);
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);
  return (
    <header className='sticky-lg-top header bg-white header'>
      <div
        onClick={handleOpening}
        className={isOpen === true ? "cart-overlay modal-backdrop" : "d-none"}
      ></div>
      <div
        className={isOpen === true ? "modal cart-modal d-block " : "d-none "}
      >
        <div className='modal-lg h-100'>
          <div className='border-0 rounded-0 cart-modal-container'>
            <div className='bg-dark rounded-0 text-light modal-header'>
              <strong className='modal-title px-0'>Shopping Cart</strong>
              <span onClick={handleOpening} style={{ cursor: "pointer" }}>
                <IoMdExit size={"30px"} />
              </span>
            </div>
            <div className='modal-body'>
              <div className='w-100 container-fluid cart-container-opened'>
                {cartItems.map((el, i) => {
                  return (
                    <div key={i}>
                      <div className='py-2'>
                        <Row>
                          <div className='col-3 pt-2 d-flex justify-content-center align-items-center'>
                            <img src={el.img1} alt='No' className='w-100' />
                          </div>
                          <div className='col-9'>
                            <Link
                              to={`/${el.id}`}
                              className='text-dark cart-opened-title text-decoration-none '
                            >
                              <strong className='text-truncate'>
                                {el.title}
                              </strong>
                            </Link>
                            <Row>
                              <div className='col-6'>
                                <div className='d-flex fw-semibold '>
                                  Color :
                                  <div
                                    className='ms-2 mt-1 border-white border border-2 cart-color-span'
                                    style={{ backgroundColor: el.color1 }}
                                  ></div>
                                </div>
                                <span
                                  className={
                                    el.discountPrice
                                      ? "cart-discount-price fw-semibold "
                                      : "d-none"
                                  }
                                >
                                  {el.discountPrice}
                                </span>
                                <span
                                  className={
                                    !el.discountPrice
                                      ? "cart-without-price"
                                      : "cart-before-price"
                                  }
                                >
                                  {el.price}
                                </span>
                                <div
                                  className='pt-2 cart-delete d-flex'
                                  onClick={() => {
                                    Swal.fire({
                                      title: `You Want To Delete ${el.title}?`,
                                      icon: "question",
                                      showCancelButton: true,
                                      showConfirmButton: true,
                                      confirmButtonText: "Yes",
                                      heightAuto: false,
                                      backdrop: true,
                                      customClass: {
                                        confirmButton: "your-confirm-button",
                                        cancelButton: "your-cancel-button",
                                        title: "your-title-text",
                                      },
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
                              <div className='col-6'>
                                <div className='d-flex justify-content-center align-items-stretch w-100 position-relative'>
                                  <button
                                    type='button'
                                    onClick={() => {
                                      dispatch(decreaseAmount(el));
                                      if (el.quantity > 1) {
                                        toast.success("Decreased Successfully");
                                      }
                                    }}
                                    disabled={el.quantity <= 1}
                                    className='btn cart-btns rounded-0 border-0'
                                  >
                                    <FaRegMinusSquare size={"22px"} />
                                  </button>
                                  <p className='m-0 py-2 text-center fs-4 cart-qty'>
                                    {el.quantity}
                                  </p>
                                  <button
                                    type='button'
                                    onClick={() => {
                                      dispatch(increaseAmount(el));
                                      if (el.quantity < el.stock) {
                                        toast.success("Increased Successfully");
                                      }
                                    }}
                                    disabled={el.quantity >= el.stock}
                                    className='btn cart-btns rounded-0 border-0'
                                  >
                                    <FaRegPlusSquare size={"22px"} />
                                  </button>
                                </div>
                                <div className='d-flex justify-content-center '>
                                  <span className='fw-semibold '>Stock: </span>
                                  <span className='ps-1'>{el.stock}</span>
                                </div>
                              </div>
                            </Row>
                          </div>
                        </Row>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='container px-4 '>
              <div className='border-0 w-100'>
                <button
                  disabled={cart.cartTotalAmount === 0}
                  className='btn btn-danger text-white border-0 d-flex justify-content-center m-auto w-100 '
                  type='button'
                  onClick={() => {
                    Swal.fire({
                      title: `Are You Sure?`,
                      icon: "warning",
                      showCancelButton: true,
                      showConfirmButton: true,
                      confirmButtonText: "Yes",
                      heightAuto: false,
                      backdrop: true,
                      customClass: {
                        confirmButton: "your-confirm-button",
                        cancelButton: "your-cancel-button",
                        title: "your-title-text",
                      },
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
                <div className='d-flex justify-content-between fs-6 w-100 py-2'>
                  <strong>Total Price : </strong>
                  <strong>${totalAmount.toFixed(2)}</strong>
                </div>
                <div>
                  <button
                    className='btn rounded-0 border-0 fs-5 fw-semibold py-2 w-100 btn-light px-4 my-2'
                    type='button'
                  >
                    Checkout
                  </button>
                  <Link
                    to={"/cart"}
                    className='fs-6 text-dark text-center d-flex justify-content-center view-cart '
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className='navbar navbar-expand-lg align-items-center border-bottom bg-light '>
        <div className='container-fluid '>
          <Link to={"/"}>
            <img src={logo} alt='No' className='nav-img' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse '
            id='navbarSupportedContent'
          >
            <ul className='m-0 p-0 nav-ul navbar-nav mx-auto'>
              <li className='ps-2 nav-item'>
                <Link
                  to={"/"}
                  className={
                    pathname === "/"
                      ? "nav-li active fs-5 fw-medium nav-link "
                      : "nav-li fs-5 fw-medium nav-link "
                  }
                >
                  Home
                </Link>
              </li>
              <li className='ps-2 nav-item'>
                <Link
                  to={"/shop"}
                  className={
                    pathname === "/shop"
                      ? "nav-li active fs-5 fw-medium nav-link "
                      : "nav-li fs-5 fw-medium nav-link "
                  }
                >
                  Shop
                </Link>
              </li>
              <li className='ps-2 nav-item'>
                <Link
                  to={"/about"}
                  className={
                    pathname === "/about"
                      ? "nav-li active fs-5 fw-medium nav-link "
                      : "nav-li fs-5 fw-medium nav-link "
                  }
                >
                  About
                </Link>
              </li>
              <li className='ps-2 nav-item'>
                <Link
                  to={"/contact"}
                  className={
                    pathname === "/contact"
                      ? "nav-li active fs-5 fw-medium nav-link "
                      : "nav-li fs-5 fw-medium nav-link "
                  }
                >
                  Contact
                </Link>
              </li>
              <li className='ps-2 nav-item'>
                <Link
                  to={"/FAQ"}
                  className={
                    pathname === "/FAQ"
                      ? "nav-li active fs-5 fw-medium nav-link "
                      : "nav-li fs-5 fw-medium nav-link "
                  }
                >
                  FAQ
                </Link>
              </li>
            </ul>
            <div className='align-items-center gap-4 nav-right '>
              <button className='nav-login text-center p-0 '>
                <FaUnlock size={"18px"} style={{ verticalAlign: "-0.125em" }} />
                <span className='fw-semibold '>Login / Register</span>
              </button>
              <Link to={"/shop"} className='nav-search p-0'>
                <BiSearch size={"28px"} />
              </Link>
              <button onClick={handleOpening} className='nav-cart p-0'>
                <HiShoppingCart size={"28px"} />
                <div className='nav-number'>{totalQTY}</div>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
