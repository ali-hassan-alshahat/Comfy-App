import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "../styles/FAQ.css"
import { BottomNav } from './BottomNav'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { ScrollToTop } from './ScrollToTop'
export const FAQ = () => {
  return (
    <div>
      <Navbar />
      <div className='faq-img d-flex justify-content-center align-items-center '>
        <div className='d-flex flex-column align-items-center justify-content-center '>
          <h1 className='mb-3 w-100 text-center text-capitalize '>FAQ</h1>
          <nav><Link to={"/"}>Home</Link> / FAQ</nav>
        </div>
      </div>
      <Container className='my-5'>
        <Row className="my-5 m-s-5 w-100">
          <div className='col-sm-12 col-md-6 col-lg-4 faq-first-box'>
            <h1>FREQUENTLY ASKED QUESTIONS</h1>
            <p>FAQ pages continue to be a priority area for SEO and digital marketing professionals. An FAQ page is one of the simplest ways to improve your site and help site visitors and users. Your FAQ section should be seen as a constantly expanding source of value provided to your audience.</p>
            <div className="faq-links">
              <a href="#faq1">large items</a>
              <a href="#faq2">assembled</a>
              <a href="#faq3">limitation</a>
              <a href="#faq4">priority</a>
              <a href="#faq5">idea</a>
              <a href="#faq6">environmental issues</a>
              </div>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-8 faq-second-box'>
            <div id="faq1">
              <h2 className='text-uppercase h6 pt-3'>1- WHY AN FAQ RESOURCE?</h2>
              <p className="mb-0">Firstly, FAQ pages can bring new visitors to your website via organic search and drive them quickly to related pages – most typically deeper blog pages and service pages closely related to the questions being resolved. Next, one of the most significant opportunities for impactful brand visibility within the search engine result pages (in-SERP) is targeting audience questions, wants, needs, and pain points.</p>
            </div>
            <div className='pt-5' id="faq2">
              <h2 className='text-uppercase h6 pt-3'>2- WAS THERE ANY LIMITATION ON THE QUANTITY OR AMOUNT OF ONLINE PURCHASE?</h2>
              <p className="mb-0">No, there is no limit. The quantity that you can buy is depending on the available stock of the online purchase.</p>
            </div>
            <div className='pt-5' id="faq2">
              <h2 className='text-uppercase h6 pt-3'>3- HOW CAN I GET LARGE ITEMS HOME?</h2>
              <p className="mb-0">Most Comfy products are flat-packed, making them easy to transport. The Comfy store offers (or will refer you to) a home delivery service if you prefer. Home delivery is not included in the product price.</p>
            </div>
            <div className='pt-5' id="faq3">
              <h2 className='text-uppercase h6 pt-3'>4- WHY ARE ITEMS SOMETIMES OUT OF STOCK?</h2>
              <p className="mb-0">Every effort is made to maintain the availability of items shown in the catalogue, but due to popularity and supply issues, some products may not always be available. Generally, Comfy can estimate when a product should be back in stock. Because Comfy products are manufactured throughout the world, there are sometimes circumstances which can cause delivery delays</p>
            </div>
            <div className='pt-5' id="faq3">
              <h2 className='text-uppercase h6 pt-3'>5- WHAT IF I WANT TO HAVE THE PRODUCTS ASSEMBLED?</h2>
              <p className="mb-0">Comfy products are generally easy to assemble and require no special tools. If you prefer, most Comfy stores can refer you to a reputable, reasonably priced assembly company that can come to your home to assemble and install our products.</p>
            </div>
            <div className='pt-5' id="faq5">
              <h2 className='text-uppercase h6 pt-3'>6- IS THERE ANY LIMITATION ON THE QUANTITY OR AMOUNT OF ONLINE PURCHASE?</h2>
              <p className="mb-0">No, there is no limit. The quantity that you can buy is depending on the available stock of the online purchase.</p>
            </div>
            <div className='pt-5' id="faq5">
              <h2 className='text-uppercase h6 pt-3'>7- WHY FAQ PAGES ARE A PRIORITY</h2>
              <p className="mb-0">FAQ pages continue to be a priority area for SEO and digital marketing professionals. An FAQ page is one of the simplest ways to improve your site and help site visitors and users. Your FAQ section should be seen as a constantly expanding source of value provided to your audience. It is a place where their ever-changing and growing requirements are not only met but anticipated and exceeded frequently.</p>
            </div>
            <div className='pt-5' id="faq6">
              <h2 className='text-uppercase h6 pt-3'>8- WHAT IS THE COMFY BUSINESS IDEA?</h2>
              <p className="mb-0">The Comfy business idea is: "We shall offer a wide range of well-designed, functional home furnishing products at prices so low that as many people as possible will be able to afford them."</p>
            </div>
            <div className='pt-5' id="faq6">
              <h2 className='text-uppercase h6 pt-3'>9- HOW DOES COMFY APPROACH ENVIRONMENTAL ISSUES?</h2>
              <p className="mb-0">We're working to create a better environment outdoors as well as indoors.</p>
            </div>
          </div>
        </Row>
      </Container>
      <ScrollToTop />
      <Footer />
      <BottomNav />
    </div>
  )
}
