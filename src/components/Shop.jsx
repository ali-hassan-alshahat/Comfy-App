import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Shop.css"
import { Navbar } from './Navbar'
import {Footer} from "./Footer"
import { Row } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlinePlus } from 'react-icons/ai'
import { BottomNav } from './BottomNav'
import {ScrollToTop} from "./ScrollToTop"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartItems } from '../rtk/slices/cartSlice'
import toast from 'react-hot-toast'
import { FaFilter } from "react-icons/fa";
import Swal from 'sweetalert2'
import { IoMdExit } from 'react-icons/io'

export const Shop = ({allItems : {items} , allCategories : {categories, brands}}) => {
  const [filterItems, setFilterItems] = useState("All Categories")
  const [filterBrands, setFilterBrands] = useState("All Brands")
  const [sortItems, setSortItems] = useState("default")
  // for searchbar
  const [isSearch, setIsSearch] = useState("")
  const filteredItems = items.filter((val) => 
  filterItems === "All Categories"
  ? val
  : filterItems === "Decor"
  ? val.isDecor === true
  : filterItems === "Chairs"
  ? val.isChairs === true
  :filterItems === "Sofas"
  ? val.isSofas === true
  : filterItems === "Tables"
  ? val.isTables === true
  : filterItems === "Lighting"
  ? val.isLighting === true
  :val
  ).filter((el) => {
  return filterBrands === "All Brands"
  ? el
  : filterBrands === "Tidy"
  ? el.isTidy === true
  : filterBrands === "Git Lab"
  ? el.isGitLab === true
  :filterBrands === "Dark Universe"
  ? el.isDarkUniverse === true
  : filterBrands === "Leo"
  ? el.isLeo === true
  : filterBrands === "Ra"
  ? el.isRa === true
  :filterBrands === "Axios"
  ? el.isAxios === true
  : el
  }).filter((val => {
    if(isSearch === "") {
      return val
    }else {
      return val.title.toLowerCase().includes(isSearch)
    }
  }))
  const sortItemsList = 
  sortItems === "low-to-high"
  ? filteredItems.sort((a,b) => (a.price > b.price ? 1: -1))
  :sortItems === "high-to-low"
  ? filteredItems.sort((a,b) => (a.price < b.price ? 1: -1))
  : filteredItems
  // handle items
  const handleChange = e => {
    setFilterItems(e.target.id)
  }
  // handle brands
  const handleBrands = e => {
    setFilterBrands(e.target.value)
  }
  // handle price
  const handlePrice = e => {
    setSortItems(e.target.id)
  }
  // handle searchbar
  const handleSearchbar = e => {
    e.preventDefault()
    const lowerCase = e.target.value.toLowerCase()
    setIsSearch(lowerCase)
  }
  const [isOpen, setIsOpen] = useState(false)
  const handleOpening = (e) => {
    setIsOpen(cur => !cur)
  }
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch()
  return (
    <div>
      <Navbar />
      <div className='shop-img d-flex justify-content-center align-items-center '>
        <div className='d-flex flex-column align-items-center justify-content-center '>
          <h1 className='mb-3 w-100 text-center text-capitalize '>Shop</h1>
          <nav><Link to={"/"}>Home</Link> / Shop</nav>
        </div>
      </div>
      <section className='py-5'>
        <div className='container-fluid'>
          <Row className="mx-0 mt-0">
            <div className="col-lg-9 col-md-8">
              <div className="mb-5">
                <div className="d-flex shop-flex mb-4">
                  <input placeholder='Search Here' type="search" autoFocus className='shop-search' required onChange={handleSearchbar} value={isSearch} />
                  <button type="button" onClick={handleOpening} className='btn border mb-3 shop-filter'><FaFilter />Filter</button>
                  <div onClick={handleOpening} className={isOpen === true ? "cart-overlay modal-backdrop":"d-none"}></div>
                  <div className={isOpen === true ? 'modal cart-modal fs-6 d-block ':"d-none "}>
              <div className="modal-lg h-100">
                <div className='border-0 rounded-0 cart-modal-container'>
                  <div className="bg-dark rounded-0 text-light modal-header">
                    <strong className='modal-title px-0 fs-3'>Filter</strong>
                    <span onClick={handleOpening} style={{cursor : "pointer"}}><IoMdExit size={"30px"}/></span>
                  </div>
                  <div className='modal-body'>
                    <div className='w-100'>
                      <form className='pb-5 pt-4 px-3'>
                      <div className='mb-5 shop-first-box'>
                    <h2 className='h5 w-100 border-bottom mb-4'>
                      <span className='d-inline-block pb-3 position-relative text-capitalize'>Categories</span>
                    </h2>
                    {categories.map((val, i) => {
                      return(
                        <div className="form-check mb-3" key={i}>
                          <input onChange={handleChange} className="form-check-input shop-radio" name="filterCategories" checked={filterItems === val.category} type="radio" value={val.category} id={val.category} />
                          <label className="form-check-label text-capitalize shop-label" htmlFor={val.category}>{val.category}</label>
                        </div>
                      )
                    })}
                  </div>
                  <div className='mb-5 shop-first-box'>
                    <h2 className='h5 w-100 border-bottom mb-4'>
                      <span className='d-inline-block pb-3 position-relative text-capitalize'>Brands</span>
                    </h2>
                    {brands.map((val,i) => {
                      return(
                        <div className="form-check mb-3" key={i}>
                          <input onChange={handleBrands} className="form-check-input shop-radio-two" name="filterBrands" checked={val.brand === filterBrands} type="radio" value={val.brand} id={val.brand} />
                          <label className="form-check-label text-capitalize shop-label" htmlFor={val.brand}>{val.brand}</label>
                        </div>
                      )
                    })}
                  </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="default">
                      Sort By : {sortItems}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item value={sortItems} onClick={handlePrice} id="default" href="#" role="button">Default</Dropdown.Item>
                      <Dropdown.Item value={sortItems} onClick={handlePrice} id="low-to-high" href="#" role="button">Price,Low To High</Dropdown.Item>
                      <Dropdown.Item value={sortItems} onClick={handlePrice} id="high-to-low" href="#" role="button">Price, High To Low</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <Row className="row-gap-3">
                  {sortItemsList.map((val) => {
                    return (
                      <div className='col-lg-4 col-sm-6' key={val.id}>
                        <div className="card position-relative rounded-0 border-0 shop-card">
                          <span className={val.stock === "Out Of Stock" ? "shop-stock position-absolute d-block z-1 badge " : "d-none " }>Out Of Stock</span>
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
                          <div className="pt-4 pb-3 text-center">
                        <Link to={`/${val.id}`} className="shop-title">{val.title}</Link>
                        <div className="d-flex gap-2 align-items-center justify-content-center">
                          <span className={val.discountPrice ?"cart-discount-price fw-semibold":"d-none"}>${val.discountPrice}</span>
                          <span className={!val.discountPrice ? 'cart-without-price':'cart-before-price'}>${val.price}</span>
                        </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </Row>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 pb-md-5">
              <aside className='pb-md-0 pb-4 bg-white cart-aside'>
                <form className="pb-5 pt-4 px-3 p-md-0 ">
                  <div className='mb-5 shop-first-box'>
                    <h2 className='h5 w-100 border-bottom mb-4'>
                      <span className='d-inline-block pb-3 position-relative text-capitalize'>Categories</span>
                    </h2>
                    {categories.map((val, i) => {
                      return(
                        <div className="form-check mb-3" key={i}>
                          <input onChange={handleChange} className="form-check-input shop-radio" name="filterCategories" checked={filterItems === val.category} type="radio" value={val.category} id={val.category} />
                          <label className="form-check-label text-capitalize shop-label" htmlFor={val.category}>{val.category}</label>
                        </div>
                      )
                    })}
                  </div>
                  <div className='mb-5 shop-first-box'>
                    <h2 className='h5 w-100 border-bottom mb-4'>
                      <span className='d-inline-block pb-3 position-relative text-capitalize'>Brands</span>
                    </h2>
                    {brands.map((val,i) => {
                      return(
                        <div className="form-check mb-3" key={i}>
                          <input onChange={handleBrands} className="form-check-input shop-radio-two" name="filterBrands" checked={val.brand === filterBrands} type="radio" value={val.brand} id={val.brand} />
                          <label className="form-check-label text-capitalize shop-label" htmlFor={val.brand}>{val.brand}</label>
                        </div>
                      )
                    })}
                  </div>
                </form>
              </aside>
            </div>
          </Row>
        </div>
      </section>
      <ScrollToTop />
      <Footer />
      <BottomNav />
    </div>
  )
}
