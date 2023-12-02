import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import {Row} from "react-bootstrap"
import { Softwares } from './Softwares'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "../styles/ProductDetails.css"
import { AiOutlinePlus } from 'react-icons/ai'
import { softwares } from '../data/data'
import { useDispatch } from 'react-redux'
import { addToCart } from '../rtk/slices/cartSlice'
import toast from 'react-hot-toast'
export const ProductDetails = ({topTrending : {items, categories}}) => {
  const {productId} = useParams()
  const products = categories.find((prod) => prod.id === productId)
  const { img1, img2, img3, title, price, cart, stock, color1, color2, color3, vendor, SKU , category ,text, discount, discountPrice} = products
  const [pic, setPic] = useState(img1)
  const [spanActive, setSpanActive] = useState(color1)
  const [isChecked, setIsChecked] = useState(false);
  const handleCheck = () => {
    setIsChecked(current => !current)
  }
  const splideOptions = {
    perPage: 3,
    perMove: 1,
    type: 'loop',
    gap: "2rem",
    rewind: true,
    arrows : 2,
    pagination: false,
    breakpoints: {
      1200: { perPage: 3},
      991: { perPage: 2.3},
      768: { perPage: 2},
      500: { perPage: 1.8, arrows : false},
      425: { perPage: 1, arrows : false},
    },
    classes: {
      arrows: 'splide__arrows your-class-arrows',
      arrow : 'splide__arrow your-class-arrow',
      prev  : 'splide__arrow--prev your-class-prev',
      next  : 'splide__arrow--next your-class-next',
    },
  }
  const dispatch = useDispatch()
  return (
    <div>
    <Navbar />
      <div className='container-fluid py-5'>
      <Row>
        <div className="col-lg-6 col-md-6">
          <div className='position-sticky '>
            <Row className="m-0">
              <div className='col-md-2 px-0 pe-md-3'>
                <div className="d-flex flex-md-column gap-2 mb-md-0 mb-3">
                  <button type="button" onClick={() => {
                    setPic(img1);
                    setSpanActive(color1);
                  }} className={pic === img1 ? 'p-0 details-btn btn details-active': "p-0 details-btn btn"}>
                    <img src={img1} alt="No" className="img-fluid" />
                  </button>
                  <button type="button" onClick={() => {
                    setPic(img2);
                    setSpanActive(color2);
                  }} className={pic === img2 ? 'p-0 details-btn btn details-active': 'p-0 details-btn btn'}>
                    <img src={img2} alt="No" className="img-fluid" />
                  </button>
                  <button type="button" onClick={() => {
                    setPic(img3);
                    setSpanActive(color3);
                  }} className={pic === img3 ? 'p-0 details-btn btn details-active': 'p-0 details-btn btn' && img3 ? "" :"d-none"}>
                    <img src={img3} alt="No" className="img-fluid" />
                  </button>
                </div>
              </div>
              <div className='col-md-10 px-0 position-relative'>
                <img src={pic} alt="No" className="w-100 h-100"/>
              </div>
            </Row>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <nav className="detail-nav"><Link to={"/"}>Home</Link> / {title}</nav>
          <h2 className='mb-3 mt-4'>{title}</h2>
          <span className={discount ? "details-span":"d-none"}>{discount}</span>
          <div className="d-flex gap-2 align-items-center ">
            <span className={discountPrice ?"details-discount-price fw-semibold " : "d-none"}>${discountPrice}</span>
            <span className={!discountPrice ? 'details-without-price': 'details-before-price'}>${price}</span>
          </div>
          <p className='details-text mb-4 mt-3'>{text}</p>
          <div className="border-top border-bottom py-4">
            <div className='d-flex gap-2 mb-4'>
              <span className='fw-semibold'>Stock : </span>
              <span className={stock === "Out Of Stock" ? "text-danger" : "text-black"}>{stock}</span>
            </div>
            <div className='d-flex gap-3 mb-4'>
              <h6 className='fw-semibold mb-0'>Colors : </h6>
              <div className='d-flex gap-2'>
                  <span onClick={() => {
                    setSpanActive(color1);
                    setPic(img1);
                  }} className={spanActive === color1 ?"border-white border border-2 details-span-active" : "border-white border border-2"} style={{backgroundColor : color1, width: "1.5rem", height : "1.5rem", outline : "1.5px solid #eee", cursor : "pointer", borderRadius : "50%"}}></span>
                  <span onClick={() => {
                    setSpanActive(color2);
                    setPic(img2);
                  }} className={spanActive === color2 ?"border-white border border-2 details-span-active" : "border-white border border-2" && color2 ?"" : "d-none"} style={{backgroundColor : color2, width: "1.5rem", height : "1.5rem", outline : "1.5px solid #eee", cursor : "pointer", borderRadius : "50%"}}></span>
                  <span onClick={() => {
                      setSpanActive(color3);
                      setPic(img3);
                  }} className={spanActive === color3 ?"border-white border border-2 details-span-active" : "border-white border border-2" && color3 ?"" : "d-none"} style={{backgroundColor : color3, width: "1.5rem", height : "1.5rem", outline : "1.5px solid #eee", cursor : "pointer", borderRadius : "50%"}}></span>
              </div>
            </div>
            <button disabled={stock ==="Out Of Stock"} onClick={() => {
              dispatch(addToCart(products))
              toast.success(`${title} Added To Cart`)
            }} className="btn text-white d-block bg-dark text-center px-5 mx-auto rounded-2 text-capitalize details-add-cart">
              {cart}
            </button>
          </div>
          <div className='py-4'>
            <form action="#">
              <div className="form-check ">
                <input onChange={handleCheck} value={isChecked} type="checkbox" id='flexCheckDefault' className='form-check-input details-checkbox'></input>
                <label className="details-label" htmlFor="flexCheckDefault">
                  I Agree With The <a href="/" className='text-dark'>Terms And Conditions</a>
                </label>
              </div>
            </form>
            <button type="button" disabled={stock === "Out Of Stock" || !isChecked} className='btn text-white bg-dark py-2 my-3 w-100 d-block text-capitalize details-buy'>
              Buy It Now
            </button>
            <ul className="list-unstyled ">
              <li className="mb-2">
                <span className="details-vendor d-inline-block ">Vendor : </span>
                <span className='details-vendor-name'>{vendor}</span>
              </li>
              <li className="mb-2">
                <span className="details-vendor d-inline-block ">SKU : </span>
                <span className='details-vendor-name'>{SKU}</span>
              </li>
              <li className="mb-2">
                <span className="details-vendor d-inline-block ">Category : </span>
                <span className='details-vendor-name'>{category}</span>
              </li>
            </ul>
          </div>
        </div>
      </Row>
      <div>
        <h2 className="h5 border-top border-bottom text-center">
          <span className='details-description d-inline-block position-relative py-3 h-100'>Description</span>
        </h2>
        <p className='details-description-text px-lg-0 px-md-5 px-sm-4 px-3 pt-4 text-center lh-lg mx-auto'>{text}</p>
      </div>
        <h2 className="text-center my-4">Related Products</h2>
      <Splide className="py-5" options={splideOptions}>
          {categories.map((val,i) => {
            if(val.category === category) {
              return (
                <SplideSlide key={i}>
                <div className="card position-relative rounded-0 border-0 trending-card">
                  <span className={val.stock === "Out Of Stock" ? "trend-stock position-absolute d-block z-1 badge " : "d-none "}>Out Of Stock</span>
                  <div className="holder position-relative overflow-hidden trend-box">
                <Link to={`/${val.id}`} className="d-block position-relative">
                  <img src={val.img1} alt="No" className='img-fluid card-img-top rounded-0'/>
                  <img src={val.img2} alt="No" className='img-fluid rounded-0 trending-hover w-100 h-100 position-absolute top-0 start-0'/>
                </Link>
                  <button onClick={() => {
                    dispatch(addToCart(val))
                    toast.success(`${val.title} Added To Cart`)
                  }} className={val.stock !== "Out Of Stock" ? "position-absolute z-1 trend-cart text-center": "d-none"}><AiOutlinePlus size={"18px"} /> {val.cart}</button>
                </div>
                <div className="pt-4 text-center">
                    <Link onClick={ () => this.setPic(img1)} to={`/${val.id}`} className="trend-title">{val.title}</Link>
                    <span className='trend-price d-flex justify-content-center '>{val.price}</span>
                  </div>
              </div>
                </SplideSlide>
              )
            }
          })}
        </Splide>
      </div>
      <Softwares softwares={softwares}/>
      <Footer />
      <BottomNav />
    </div>
  )
}
