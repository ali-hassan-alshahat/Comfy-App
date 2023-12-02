import React from 'react'
import { Navbar } from './Navbar'
import "../styles/Contact.css"
import { Link } from 'react-router-dom'
import {Row} from "react-bootstrap"
import { useState } from 'react'
import { MdErrorOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import {ScrollToTop} from "./ScrollToTop"
import {Footer} from "./Footer"
import { BottomNav } from './BottomNav'
export const Contact = () => {
  const [isName, setIsName] = useState(true)
  const nameRegex = /^[a-z ,.'-]+$/i
  const handleChangeName = e => {
    const name = e.target.value
    if(nameRegex.test(name)) {
      setIsName(true)
    }else {
      setIsName(false)
    }
  }
  const [isValid, setIsValid] = useState(true)
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const handleChangeEmail = e => {
    const email = e.target.value
    if(emailRegex.test(email)) {
      setIsValid(true)
    }else {
      setIsValid(false)
    }
  }
  const [isMessage, setIsMessage] = useState(true)
  const messageRegex = /^[a-z ,.'-]+$/i
  const handleChangeMessage = e => {
    const name = e.target.value
    if(messageRegex.test(name)) {
      setIsMessage(true)
    }else {
      setIsMessage(false)
    }
  }
  return (
    <div>
      <Navbar />
      <div className='contact-img d-flex justify-content-center align-items-center '>
        <div className='d-flex flex-column align-items-center justify-content-center '>
          <h1 className='mb-3 w-100 text-center text-capitalize '>Contact</h1>
          <nav><Link to={"/"}>Home</Link> / Contact</nav>
        </div>
      </div>
      <div className='pt-4 pb-4'>
        <div className='container-fluid container-lg'>
          <Row className="mx-0">
            <div className='col-xs-12 col-sm-12 col-md-8 col-lg-8 contact-form'>
              <h2 className='py-3 position-relative'>Get In Touch</h2>
              <form action="#">
                <div className="mb-3 pt-3">
                  <input onBlur={handleChangeName} name="name" type="text" className={isName === true ?'form-control border-light rounded-0 contact-bg' :'form-control border-danger contact-invalid-form rounded-0 contact-bg'} placeholder="Name" />
                  <div className={isName === true ? "d-none": "d-block text-danger about-invalid-email"}>Name Is Requird<MdErrorOutline size={"18px"} /></div>
                </div>
                <div className="mb-3">
                <input onBlur={handleChangeEmail} name="email" type="text" className={isValid === true ? 'form-control border-light rounded-0 contact-bg ':'form-control border-danger contact-invalid-form rounded-0 contact-bg '} placeholder="Email" />
                <div className={isValid === true ? "d-none": "d-block text-danger about-invalid-email"}>Invalid Email Address<MdErrorOutline size={"18px"} /></div>
                </div>
                <div className="mb-3">
                  <textarea onBlur={handleChangeMessage} name="message" rows="4" type="textarea" className={isMessage === true ? 'form-control border-light rounded-0 contact-bg': 'form-control border-danger contact-invalid-form rounded-0 contact-bg'} placeholder="Message" />
                  <div className={isMessage === true ? "d-none": " d-block text-danger about-invalid-email"}>Message Is Requird<span><MdErrorOutline size={"18px"} /></span></div>
                </div>
              </form>
              <button type="submit" className='btn bg-dark p-2 submit-btn border-0 rounded-0 text-light d-block w-100'>Send Message</button>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 px-4 contact-form">
              <div className="py-5 py-md-0">
                <h2 className='py-3 position-relative'>Contact Info</h2>
                <div className="pt-3">
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2">
                      <FaLocationDot size={"36px"}/>
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <h3 className="d-block fs-5">Address</h3>
                      <p>Cairo Festival City, New Cairo, Egypt</p>
                    </div>
                  </Row>
                  <hr />
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2">
                      <FaHeadphones size={"36px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                    <h3 className="d-block fs-5">Phone</h3>
                      <p>+20 1003533427</p>
                    </div>
                  </Row>
                  <hr />
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2 ">
                      <FaRegEnvelope size={"36px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                    <h3 className="d-block fs-5">Email</h3>
                      <p>comfyproject20@gmail.com</p>
                    </div>
                  </Row>
                  <hr />
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2 ">
                      <FaRegClock size={"36px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                    <h3 className="d-block fs-5">Opening Hours</h3>
                      <p>Sun-Sat: 8.00am - 9.00.pm</p>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
      <BottomNav />
    </div>
  )
}
