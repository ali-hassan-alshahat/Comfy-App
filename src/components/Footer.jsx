import React from 'react'
import { Container, Row } from 'react-bootstrap'
import "../styles/Footer.css"
import logo from "../assets/logo-footer.png"
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="pt-5">
      <div className='footer-background pt-5'>
        <Container>
          <Row className="pb-5">
            <div className="col-12 col-md-6 col-lg-4 mb-4 px-5">
              <div className='footer-first-box'>
                <div className='footer-imgbox pb-4'>
                  <img src={logo} alt="No" style={{width : "9rem"}} />
                </div>
                <div className='footer-text pt-2'>
                  <p>Since 2013 we’ve been creating industrial design, residential architecture, commercial interiors. Chase mice attack feet but rub face on everything cepteur sint occaecat cupidatat proident.</p>
                  <h6>Follow Us</h6>
                </div>
                <div className='footer-icons'>
                  <a href="/" className="me-3"><FaInstagram size={"26px"} /></a>
                  <a href="/" className="me-3"><FaFacebook size={"26px"} /></a>
                  <a href="/" className="me-3"><FaLinkedin size={"26px"} /></a>
                  <a href="/" className="me-3"><FaGithub size={"26px"} /></a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4 px-5">
              <div className="footer-second-box">
                <div className="pb-3">
                  <h6 className='text-white pb-3'>Here To Help</h6>
                  <p>Have a question? You may find an answer in our FAQs. But you can also contact us:</p>
                </div>
                <div className="pb-3">
                  <FaPhone style={{color : "white"}} size={"24px"}/>
                  <h6 className='text-white pt-2'>Order By Phone</h6>
                  <p>Available everyday</p>
                  <a href="/">(+20) 1003533427</a>
                </div>
                <div>
                  <AiOutlineMail style={{color : "white"}} size={"24px"} />
                  <h6 className='text-white'>Email Us</h6>
                  <p>Get In Touch By Email</p>
                  <a href="/">comfyproject20@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-4 px-5">
              <div className="footer-third-box">
                <h6 className="text-white pb-3">Costumer Service</h6>
                <Link className="text-decoration-none" to={"/contact"}><p>Contact Us</p></Link>
                <Link className="text-decoration-none" to={"/FAQ"}><p>FAQs</p></Link>
              </div>
            </div>
          </Row>
        </Container>
          <div className="border-top pt-4 pb-4 footer-copyright text-center">&copy; Copyright 2023 Comfy Store. All Rights Reserved. Design By Team3-ITI</div>
      </div>
    </div>
  )
}
