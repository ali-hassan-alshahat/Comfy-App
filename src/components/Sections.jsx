import React from 'react'
import "../styles/Sections.css"
import {Row} from "react-bootstrap"
import outdoor from "../assets/outdoor.jpg"
import ecoFriendly from "../assets/eco-friendly.jpg"
import chairs from "../assets/chairs.jpg"
import lighting from "../assets/lighting.jpg"
import decor from "../assets/decor.jpg"
import sofas from "../assets/sofas.jpg"
import tables from "../assets/tables.jpg"
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom'


export const Sections = () => {
  return (
    <div className='pt-5 pb-5 position-relative '>
      <div className="container-fluid ">
      <Row>
        <div className='col-12 col-md-6 section-box position-relative pb-5 '>
          <div className="overflow-hidden d-flex justify-content-start align-items-center position-relative  ">
            <img src={ecoFriendly} alt="No" style={{height : "100%", width : "100%",objectFit : "cover"}} className="h-100 w-100" />
            <div className='section-text position-absolute'>
              <h4>Mid-Season</h4>
              <h1>Eco-Friendly</h1>
              <Link to={"/shop"}>Shop Now <FaArrowRight /></Link>
            </div>
          </div>
        </div>
        <div className='col-12 col-md-6 section-box'>
          <div className="overflow-hidden d-flex justify-content-start align-items-center position-relative  ">
            <img src={outdoor} alt="No" style={{height : "100%", width : "100%",objectFit : "cover"}} className="h-100 w-100" />
            <div className='section-text position-absolute'>
              <h4>Top Trending</h4>
              <h1>Outdoor</h1>
              <Link to={"/shop"}>Shop Now <FaArrowRight /></Link>
            </div>
          </div>
        </div>
      </Row>
      </div>
      <div className="container-fluid px-md-5">
        <Row>
        <div className='col-12 col-md-4'>
          <div className='overflow-hidden position-relative d-flex justify-content-start second-section-box'>
            <img src={chairs} alt="No" style={{width : "100%", height : "100%", objectFit : "cover",}} />
            <div className="section-chairs-text position-absolute">
              <p>8 Products</p>
              <h3>Chairs</h3>
              <Link to={"/shop"} className=" px-0 py-0">Go Shopping <FaArrowRight /></Link>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8">
          <Row className="pb-3">
            <div className="col-12 col-md-5">
              <div className='overflow-hidden position-relative d-flex justify-content-start second-section-box'>
                <img src={lighting} alt="No" style={{width : "100%", height : "100%", objectFit : "cover",}} />
                <div className="section-chairs-text position-absolute">
                  <p>6 Products</p>
                  <h3>Lighting</h3>
                  <Link to={"/shop"} className=" px-0 py-0">Go Shopping <FaArrowRight /></Link>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-7'>
              <div className='overflow-hidden position-relative d-flex justify-content-start second-section-box'>
                <img src={decor} alt="No" style={{width : "100%", height : "100%", objectFit : "cover",}} />
                <div className="section-chairs-text position-absolute">
                  <p>3 Products</p>
                  <h3>Decor</h3>
                  <Link to={"/shop"} className=" px-0 py-0">Go Shopping <FaArrowRight /></Link>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            <div className='col-12 col-md-7'>
              <div className='overflow-hidden position-relative d-flex justify-content-start second-section-box'>
                <img src={sofas} alt="No" style={{width : "100%", height : "100%", objectFit : "cover",}} />
                <div className="section-chairs-text position-absolute">
                  <p>3 Products</p>
                  <h3>Sofas</h3>
                  <Link to={"/shop"} className=" px-0 py-0">Go Shopping <FaArrowRight /></Link>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-5'>
              <div className='overflow-hidden position-relative d-flex justify-content-start second-section-box'>
                <img src={tables} alt="No" style={{width : "100%", height : "100%", objectFit : "cover",}} />
                <div className="section-chairs-text position-absolute">
                  <p>3 Products</p>
                  <h3>Tables</h3>
                  <Link to={"/shop"} className="px-0 py-0">Go Shopping <FaArrowRight /></Link>
                </div>
              </div>
            </div>
          </Row>
        </div>
        </Row>
      </div>
    </div>
  )
}
