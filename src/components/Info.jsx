import React from 'react'
import { Row, Container } from 'react-bootstrap'
import { FaCube } from "react-icons/fa6";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaArrowsRotate } from "react-icons/fa6";
import "../styles/Info.css"

export const Info = () => {
  return (
    <div className='pt-5 pb-5 text-center'>
      <Container>
        <Row>
          <div className="col-md-4 col-lg-4 col-12 col-sm-4 mb-4">
            <div className="info-box">
            <FaCube size={"50px"} />
            <h3 className="pt-4">Free Worldwide Shipping</h3>
            <p>On all orders over $75.00</p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-12 col-sm-4 mb-4">
            <div className="info-box">
            <FaRegCreditCard size={"50px"} />
            <h3 className="pt-4">100% Payment Secure</h3>
            <p>We ensure secure payment with PEV</p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-12 col-sm-4">
            <div className="info-box">
            <FaArrowsRotate size={"50px"} />
            <h3 className="pt-4">30 Days Return</h3>
            <p>Return it within 20 day for an exchange</p>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  )
}
