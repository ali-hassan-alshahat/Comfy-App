import React,  { useEffect, useState } from 'react'
import { BsPersonFill } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { Row } from 'react-bootstrap'
import { clearCart, decreaseAmount, deleteItem, increaseAmount, selectCartItems, selectTotalAmount, selectTotalQTY } from '../rtk/slices/cartSlice';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setGetTotals} from "../rtk/slices/cartSlice"
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import { MdOutlineDelete } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import { FaRegMinusSquare, FaRegPlusSquare } from 'react-icons/fa';
import "../styles/Navbar.css"
export const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpening = (e) => {
    setIsOpen(cur => !cur)
  }
  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY)
  const cart = useSelector((state) => state.cart)
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setGetTotals())
  }, [cartItems, dispatch]);
  return (
    <nav className=' sticky-bottom bg-white nav-sticky-bottom text-center'>
            <div onClick={handleOpening} className={isOpen === true ? "cart-overlay modal-backdrop":"d-none"}></div>
            <div className={isOpen === true ? 'modal cart-modal d-block ':"d-none "}>
              <div className="modal-lg h-100">
                <div className='border-0 rounded-0 cart-modal-container'>
                  <div className="bg-dark rounded-0 text-light modal-header">
                    <strong className='modal-title px-0'>Shoping Cart</strong>
                    <span onClick={handleOpening} style={{cursor : "pointer"}}><IoMdExit size={"30px"}/></span>
                  </div>
                  <div className='modal-body'>
                    <div className='w-100 container-fluid cart-container-opened'>
                      {cartItems.map((el,i) => {
                        return (
                          <div key={i}>
                            <div className='py-2'>
                              <Row>
                                <div className="col-3 pt-2 d-flex justify-content-center align-items-center">
                                  <img src={el.img1} alt="No" className="w-100" />
                                </div>
                                <div className="col-9">
                                  <Link to={`/${el.id}`} className="text-dark cart-opened-title text-decoration-none ">
                                  <strong className="text-truncate">{el.title}</strong>
                                  </Link>
                                  <Row>
                                    <div className="col-6">
                                      <div className='d-flex fw-semibold '>
                                        Color : 
                                        <div className= "ms-2 mt-1 border-white border border-2 cart-color-span" style={{backgroundColor : el.color1,}}></div>
                                      </div>
                                      <span className={el.discountPrice ?"cart-discount-price fw-semibold " : "d-none"}>{el.discountPrice}</span>
                                      <span className={!el.discountPrice ? 'cart-without-price': 'cart-before-price'}>{el.price}</span>
                                      <div className="pt-2 cart-delete d-flex" onClick={() => {
                                        Swal.fire({
                                          title : `You Want To Delete ${el.title}?`,
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
                                            dispatch(deleteItem(el))
                                          }
                                        }))
                                      }}><MdOutlineDelete size={"28px"}/></div>
                                    </div>
                                    <div className="col-6">
                                      <div className='d-flex justify-content-center align-items-stretch w-100 position-relative'>
                                        <button type="button" onClick={() => {
                                          dispatch(decreaseAmount(el))
                                          if(el.quantity > 1) {
                                            toast.success("Decreased Successfully")
                                          }
                                        }} disabled={el.quantity <= 1} className="btn cart-btns rounded-0 border-0"><FaRegMinusSquare size={"22px"} /></button>
                                        <Toaster />
                                        <p className='m-0 py-2 text-center fs-4 cart-qty'>{el.quantity}</p>
                                        <button type="button" onClick={() => {
                                          dispatch(increaseAmount(el))
                                          if(el.quantity < el.stock) {
                                            toast.success("Increased Successfully")
                                          }
                                        }} disabled={el.quantity >= el.stock} className="btn cart-btns rounded-0 border-0"><FaRegPlusSquare size={"22px"} /></button>
                                      </div>
                                      <div className='d-flex justify-content-center '>
                                        <span className="fw-semibold ">Stock: </span>
                                        <span className="ps-1">{el.stock}</span>
                                      </div>
                                    </div>
                                  </Row>
                                </div>
                              </Row>
                            </div>
                            <hr />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="container px-4 ">
                      <div className='border-0 w-100'>
                        <button disabled={cart.cartTotalAmount === 0} className='btn btn-danger text-white border-0 d-flex justify-content-center m-auto w-100 ' type="button" onClick={() =>{
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
                        }
                          }>Clear Cart</button>
                        <div className="d-flex justify-content-between fs-6 w-100 py-2">
                          <strong>Total Price : </strong>
                          <strong>${totalAmount.toFixed(2)}</strong>
                        </div>
                        <div>
                          <button className="btn rounded-0 border-0 fs-5 fw-semibold py-2 w-100 btn-light px-4 my-2" type="button">Checkout</button>
                          <Link to={"/cart"} className="fs-6 text-dark text-center d-flex justify-content-center view-cart ">View Cart</Link>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
    <Row className="list-unstyled py-3 m-0">
      <div className='col-3 col-md-3 '>
        <div>
        <a href='/'>
          <button>
            <BsPersonFill size={"28px"}/>
          </button>
        </a>
        </div>
      </div>
      <div className='col-3 col-md-3 '>
        <div>
        <Link to={"/shop"}>
          <button>
            <BsShop size={"28px"}/>
          </button>
        </Link>
        </div>
      </div>
      <div className='col-3 col-md-3 '>
        <div>
        <Link to={"/shop"}>
          <button>
            <BiSearch size={"28px"}/>
          </button>
        </Link>
        </div>
      </div>
      <div className='col-3 col-md-3 '>
        <div className="position-relative ">
        <button className="nav-cart" onClick={handleOpening}>
        <HiShoppingCart size={"28px"} />
        <div className='nav-bottom-number'>{totalQTY}</div>
      </button>
        </div>
      </div>
    </Row>
  </nav>
  )
}