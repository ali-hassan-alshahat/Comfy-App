import React, { useEffect, useState } from "react";
import "../styles/Contact.css";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import { MdErrorOutline } from "react-icons/md";
import { FaLocationDot, FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope, FaRegClock } from "react-icons/fa6";
import { useForm } from "react-hook-form";

export const Contact = () => {
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // validate on blur
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Message sent successfully!");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="contact-img d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-3 w-100 text-center text-capitalize">Contact</h1>
          <nav>
            <Link to={"/"}>Home</Link> / Contact
          </nav>
        </div>
      </div>
      <div className="pt-4 pb-4">
        <div className="container-fluid container-lg">
          <Row className="mx-0">
            {/* Contact Form */}
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 contact-form">
              <h2 className="py-3 position-relative">Get In Touch</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="mb-3 pt-3">
                  <input
                    type="text"
                    className={`form-control rounded-0 contact-bg ${
                      errors.name
                        ? "border-danger contact-invalid-form"
                        : "border-light"
                    }`}
                    placeholder="Name"
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[a-z ,.'-]+$/i,
                        message: "Invalid name format",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="text-danger mt-1 about-invalid-email">
                      {errors.name.message} <MdErrorOutline size={"18px"} />
                    </div>
                  )}
                </div>
                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control rounded-0 contact-bg ${
                      errors.email
                        ? "border-danger contact-invalid-form"
                        : "border-light"
                    }`}
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-danger mt-1 about-invalid-email">
                      {errors.email.message} <MdErrorOutline size={"18px"} />
                    </div>
                  )}
                </div>
                {/* Message */}
                <div className="mb-3">
                  <textarea
                    rows="4"
                    className={`form-control rounded-0 contact-bg ${
                      errors.message
                        ? "border-danger contact-invalid-form"
                        : "border-light"
                    }`}
                    placeholder="Message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 5,
                        message: "Message must be at least 5 characters",
                      },
                    })}
                  />
                  {errors.message && (
                    <div className="text-danger mt-1 about-invalid-email">
                      {errors.message.message} <MdErrorOutline size={"18px"} />
                    </div>
                  )}
                </div>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn bg-dark p-2 submit-btn border-0 rounded-0 text-light d-block w-100"
                >
                  Send Message
                </button>
              </form>
            </div>
            {/* Contact Info */}
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 px-4 contact-form">
              <div className="py-5 py-md-0">
                <h2 className="py-3 position-relative">Contact Info</h2>
                <div className="pt-3">
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2">
                      <FaLocationDot size={"32px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <h3 className="d-block fs-5 pt-2 pt-md-0">Address</h3>
                      <p>Cairo Festival City, New Cairo, Egypt</p>
                    </div>
                  </Row>
                  <hr />
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2">
                      <FaHeadphones size={"32px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <h3 className="d-block fs-5 pt-2 pt-md-0">Phone</h3>
                      <p>+20 1003533427</p>
                    </div>
                  </Row>
                  <hr />
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2">
                      <FaRegEnvelope size={"32px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <h3 className="d-block fs-5 pt-2 pt-md-0">Email</h3>
                      <p>comfyproject20@gmail.com</p>
                    </div>
                  </Row>
                  <hr />
                  <Row className="mx-0">
                    <div className="col-md-3 col-lg-2">
                      <FaRegClock size={"32px"} />
                    </div>
                    <div className="col-md-9 col-lg-10">
                      <h3 className="d-block fs-5 pt-1">Opening Hours</h3>
                      <p>Sun-Sat: 8.00am - 9.00pm</p>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};
