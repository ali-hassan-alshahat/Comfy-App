import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import "../styles/About.css"
import { Row } from 'react-bootstrap'
import about from "../assets/about.jpg"
import { useState } from 'react'
import { BottomNav } from '../components/BottomNav'
import { Footer } from '../components/Footer'
import { ScrollToTop } from '../components/ScrollToTop'
export const About = () => {
  const [isActive, setIsActive] = useState("item1")
  const handleActive = val => {
    if(val !== isActive) {
      setIsActive(val)
    }else {
      setIsActive("item1")
    }
  }
  return (
    <div>
      <Navbar />
      <div className='about-img d-flex justify-content-center align-items-center '>
        <div className='d-flex flex-column align-items-center justify-content-center '>
          <h1 className='mb-3 w-100 text-center text-capitalize '>About</h1>
          <nav><Link to={"/"}>Home</Link> / About</nav>
        </div>
      </div>
      <div className='container-fluid mb-5 py-5 px-lg-5 px-2'>
        <Row className="mx-0 mb-0">
          <div className='col-lg-6 col-sm-12 mb-5 mb-lg-0'>
            <img src={about} alt="No" className="mx-auto img-fluid d-block" />
          </div>
          <div className='col-lg-6 col-sm-12'>
            <div>
              <ul className="mb-4 nav nav-tabs nav-fill about-ul">
                <li role="presentation" className="nav-item">
                  <button onClick={() => handleActive("item1")} type="button" id='for-history' className={isActive === "item1" ? 'nav-link active': 'nav-link'} role="tab">
                    History
                  </button>
                </li>
                <li role="presentation" className="nav-item">
                  <button onClick={() => handleActive("item2")} type="button" id='for-mission' className={isActive === "item2" ? 'nav-link active': 'nav-link'} role="tab">
                    Mission
                  </button>
                </li>
                <li role="presentation" className="nav-item">
                  <button onClick={() => handleActive("item3")} type="button" id='for-design' className={isActive === "item3" ? 'nav-link active': 'nav-link'} role="tab">
                    Design
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content" >
              <div role="tabpanel" className={isActive === "item1" ? "tab-pane fade show active":"tab-pane fade"}>
                <p className="mb-3">Our company was founded <b>in 2019</b> by a group of young designers who were passionate about creating modern, affordable furniture. They started out with a small line of minimalist furniture, including tables, chairs, and sofas, that quickly gained popularity among design enthusiasts.</p>
                <p className="mb-3"><b>In 2020</b>, we launched an online store and began shipping our furniture all over the world. We also expanded our product line to include home decor items, such as wall art and lighting, which helped to attract a wider audience.</p>
                <p className="mb-0"><b>Today</b>, our company continues to grow and thrive, thanks to our commitment to innovation, affordability, and sustainability. We remain dedicated to providing our customers with beautiful, functional furniture that enhances their homes and lives, while also making a positive impact on the environment.</p>
              </div>
              <div role="tabpanel" className={isActive === "item2" ? "tab-pane fade show active":"tab-pane fade"}>
                <p className="mb-3">Our mission is to combine beautiful design with high-quality craftsmanship, while also minimizing our impact on the environment. To achieve this, we embrace the following core values:</p>
                <p className="mb-3"><b>Innovation</b>: We are constantly pushing the boundaries of design and manufacturing, using technology and creativity to create furniture that is both functional and beautiful.</p>
                <p className="mb-3"><b>Affordability</b>: We believe that high-quality, stylish furniture should be accessible to everyone. That's why we strive to keep our prices affordable, without compromising on quality or design.</p>
                <p className="mb-0"><b>Customer Focus</b>: We prioritize the needs and preferences of our customers, and strive to create furniture that is tailored to their unique style and needs.</p>
              </div>
              <div role="tabpanel" className={isActive === "item3" ? "tab-pane fade show active":"tab-pane fade"}>
                <p className="mb-3">At our company, we believe that great design should be both beautiful and functional. Our approach to furniture design is centered around the following principles:</p>
                <p className="mb-3"><b>Simplicity</b>: We believe that furniture should be simple and uncluttered, with clean lines and minimal ornamentation. We strive to create furniture that is both timeless and contemporary, so that it can fit seamlessly into any home or office environment.</p>
                <p className="mb-3"><b>Functionality</b>: We design furniture with the user in mind, prioritizing functionality and comfort. We believe that furniture should not only look great, but also serve a purpose and make people's lives easier and more comfortable.</p>
                <p className="mb-0"><b>Customization</b>: We understand that every person's taste and style is unique, and we offer customization options to allow our customers to create furniture that truly reflects their individual preferences and needs.</p>
              </div>
            </div>
          </div>
        </Row>
      </div>
      <div className="d-flex justify-content-center py-5 about-text">
        <div className='container about-container'>
          <h1 className="pt-5"> what they're saying</h1>
          <p className='pb-3 pt-5'>"I recently purchased a sectional sofa from Comfy, and I couldn't be happier with my experience. The process of ordering online was so easy and stress-free, and the customer service team was incredibly helpful when I had some questions about delivery. When the sofa arrived, I was blown away by how comfortable it was. The cushions were so plush and cozy, and the fabric was soft to the touch. It's now become my favorite spot to relax and unwind at the end of the day. I highly recommend Comfy to anyone looking for stylish and comfortable furniture"</p>
          <h5>Mohamed Ali</h5>
          <h6 className="mb-4">Analyst</h6>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
      <BottomNav />
    </div>
  )
}
