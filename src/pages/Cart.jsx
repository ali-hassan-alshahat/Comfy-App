import React, { useEffect } from 'react'
import { BottomNav } from '../components/BottomNav'
import { Navbar } from '../components/Navbar'
import {  Footer } from '../components/Footer'
import { ScrollToTop } from '../components/ScrollToTop'
import { Link } from 'react-router-dom'
import "../styles/Cart.css"
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseAmount, deleteItem, increaseAmount, selectCartItems, selectTotalAmount, setGetTotals } from '../rtk/slices/cartSlice'
import { FaTimes } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { Row } from 'react-bootstrap';
import { FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2'
import { MdOutlineDelete } from "react-icons/md";

export const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const totalAmount = useSelector(selectTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setGetTotals())
  }, [cartItems, dispatch]);
  return (
    <div>
      <Navbar />
      <div className='shop-img d-flex justify-content-center align-items-center '>
        <div className='d-flex flex-column align-items-center justify-content-center '>
          <h1 className='mb-3 w-100 text-center text-capitalize '>Cart</h1>
          <nav><Link to={"/"}>Home</Link> / Cart</nav>
        </div>
      </div>
      <div className='container-fluid table-responsive cart-table'>
        {totalAmount > 1 ?
        <table className='table text-center'>
          <thead>
            <tr>
              <th scope='col'>Product</th>
              <th scope='col'>Price</th>
              <th scope='col'>Stock</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
          {cartItems.map((val,i) => {
                return (
                <tr className='w-100' key={i}>
                  <td className='w-25'>
                    <table className='text-center m-0 ms-4'>
                      <tbody>
                        <tr>
                          <td colSpan={"2"} onClick={() => {
                            Swal.fire({
                              title : `You Want To Delete ${val.title}?`,
                              icon : "question",
                              showCancelButton : true,
                              showConfirmButton : true,
                              confirmButtonText : "Yes",
                              heightAuto: false,
                              backdrop: true,
                              customClass : {
                                confirmButton : "your-confirm-button",
                                cancelButton : "your-cancel-button",
                                title : "your-title-text",
                              }
                            }).then((result => {
                              if(result.isConfirmed) {
                                dispatch(deleteItem(val))
                              }
                            }))
                          }} className="pe-3 cart-remove"><FaTimes /></td>
                          <td>
                            <img src={val.img1} alt="No" className='cart-img-details'/>
                          </td>
                          <td className='ps-3'>
                            <Link to={`/${val.id}`} className="text-decoration-none text-truncate text-dark fw-semibold cart-title-hover">
                              {val.title}
                            </Link>
                            <div className='d-flex fw-semibold align-items-center '>
                              Color : <div className="ms-2 mt-1" style={{backgroundColor : val.color1, width: "1rem", height : "1rem", outline : "1.5px solid #eee", cursor : "pointer", borderRadius : "50%"}}></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <span className={val.discountPrice ?"cart-discount-price fw-semibold justify-content-center " : "d-none"}>${val.discountPrice}</span>
                    <span className={!val.discountPrice ? 'cart-without-price justify-content-center': 'cart-before-price'}>${val.price}</span>
                  </td>
                  <td>
                    <span>{val.stock}</span>
                  </td>
                  <td>
                    <div className='input-group justify-content-center text-align-center align-items-center '>
                      <button type="button" className="btn rounded-0 border-0 cart-qty-btn" onClick={() => {
                        dispatch(decreaseAmount(val))
                        if(val.quantity > 1) {
                          toast.success("Decreased Successfully")
                        }
                      }} disabled={val.quantity <= 1}><FaMinusSquare size={"22px"} /></button>
                      <p className='m-0 px-1'>{val.quantity}</p>
                      <button type="button" className="btn rounded-0 border-0 cart-qty-btn" onClick={() => {
                        dispatch(increaseAmount(val))
                        toast.success("Increased Successfully")
                      }} disabled={val.quantity >= val.stock}><FaPlusSquare size={"22px"} /></button>
                    </div>
                  </td>
                  <td>
                    <strong>
                      ${val.discountPrice ?(val.discountPrice * val.quantity).toFixed(2) : (val.price * val.quantity).toFixed(2)}
                    </strong>
                    </td>
                </tr>
                  )
              })}
              <tr>
                <td colSpan={"7"}>
                  <Row className="justify-content-between mx-0 py-2">
                    <div className="col-4">
                      <button type="button" className='btn rounded-0 border-0'>
                      <Link to={"/shop"} className="text-decoration-none rounded-2 cart-continue p-2 text-white bg-dark fw-semibold ">
                      <FaArrowLeft size={"12px"} /><strong>Continue Shopping</strong>
                      </Link>
                      </button>
                    </div>
                    <div className="col-5">
                    <button type="button" onClick={() => {
                        Swal.fire({
                          title : `Are You Sure?`,
                          icon : "warning",
                          showCancelButton : true,
                          showConfirmButton : true,
                          confirmButtonText : "Yes",
                          heightAuto: false,
                          backdrop: true,
                          customClass : {
                              confirmButton : "your-confirm-button",
                              cancelButton : "your-cancel-button",
                              title : "your-title-text",
                            }
                          }).then((result => {
                            if(result.isConfirmed) {
                              dispatch(clearCart(cart))
                            }
                        }))
                    }} className='btn rounded-2 border-0 text-white bg-dark cart-continue'>
                      <MdOutlineDelete size={"22px"} /><strong>Empty Shopping Cart</strong>
                      </button>
                    </div>
                    <div className="col-3 text-uppercase">
                      Total Price : <span className='fw-semibold cart-total-amount'>${totalAmount.toFixed(2)}</span>
                    </div>
                  </Row>
                </td>
              </tr>
              <tr>
                <td className='border-0 pt-4' colSpan={5}>
                    <button type="button" className='btn rounded-1 border-0 text-light bg-dark w-50 py-2 px-4 my-3 fs-6 cart-continue'>
                      <strong>Checkout</strong>
                    </button>
                </td>
              </tr>
          </tbody>
        </table> :
        <table className="table text-center">
          <tbody>
            <tr>
              <td colSpan={4} className="text-center pt-4 border-0">
                <span className="d-block py-3 fw-semibold ">Your Cart Is Empty</span>
                  <Link className="text-decoration-none text-white bg-dark btn rounded-1 border-0 cart-continue" to={"/shop"}>
                  Continue Shopping
                  </Link>
              </td>
            </tr>
          </tbody>
        </table>}
      </div>
      <ScrollToTop />
      <Footer />
      <BottomNav />
    </div>
  )
}
