import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Shop.css";
import { Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
  openCartModal, // ✅ Import openCartModal action
} from "../rtk/slices/cartSlice";
import toast from "react-hot-toast";
import { FaFilter } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoMdExit } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { getProducts, getCategories, getBrands } from "../utils/supabase";

export const Shop = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterItems, setFilterItems] = useState("All Categories");
  const [filterBrands, setFilterBrands] = useState("All Brands");
  const [sortItems, setSortItems] = useState("default");
  const [isSearch, setIsSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addingToCart, setAddingToCart] = useState({}); // Track loading state per product
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const getRemainingStock = (product) => {
    const stock =
      product.stock_status === "Out Of Stock"
        ? 0
        : parseInt(product.stock_status, 10) || 0;

    const inCart = cartItems.find((i) => i.id === product.id)?.quantity || 0;
    return stock - inCart;
  };

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, brandsData] = await Promise.all([
          getProducts(),
          getCategories(),
          getBrands(),
        ]);

        setItems(productsData);
        setCategories(categoriesData);
        setBrands(brandsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load products. Please try again later.",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort logic
  const filteredItems = items
    .filter((val) =>
      filterItems === "All Categories" ? val : val.category === filterItems,
    )
    .filter((el) => {
      return filterBrands === "All Brands" ? el : el.vendor === filterBrands;
    })
    .filter((val) => {
      if (isSearch === "") {
        return val;
      } else {
        return val.title.toLowerCase().includes(isSearch);
      }
    });

  const sortItemsList =
    sortItems === "low-to-high"
      ? filteredItems.sort((a, b) =>
          parseFloat(a.price) > parseFloat(b.price) ? 1 : -1,
        )
      : sortItems === "high-to-low"
      ? filteredItems.sort((a, b) =>
          parseFloat(a.price) < parseFloat(b.price) ? 1 : -1,
        )
      : filteredItems;

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortItemsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortItemsList.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Event handlers
  const handleChange = (e) => {
    setFilterItems(e.target.id);
    setCurrentPage(1);
  };

  const handleBrands = (e) => {
    setFilterBrands(e.target.value);
    setCurrentPage(1);
  };

  const handlePrice = (e) => {
    setSortItems(e.target.id);
    setCurrentPage(1);
  };

  const handleSearchbar = (e) => {
    e.preventDefault();
    const lowerCase = e.target.value.toLowerCase();
    setIsSearch(lowerCase);
    setCurrentPage(1);
  };

  const handleOpening = () => {
    setIsOpen((cur) => !cur);
  };

  // Handle add to cart with loading state
  const handleAddToCart = async (product) => {
    const itemsLeft = getRemainingStock(product);
    if (itemsLeft <= 0) {
      toast.error(`${product.title} is out of stock`);
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [product.id]: true }));
    await new Promise((resolve) => setTimeout(resolve, 800));

    // ✅ Shop page uses default color (color1)
    dispatch(
      addToCart({
        product: product,
        selectedColor: product.color1, // Default color for shop
      }),
    );

    toast.success(`${product.title} Added To Cart`);
    setAddingToCart((prev) => ({ ...prev, [product.id]: false }));
  };
  // Check if product is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
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
      <div className="shop-img d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-3 w-100 text-center text-capitalize">Shop</h1>
          <nav>
            <Link to={"/"}>Home</Link> / Shop
          </nav>
        </div>
      </div>
      <section className="py-5">
        <div className="container-fluid">
          <Row className="mx-0 mt-0">
            <div className="col-lg-9 col-md-8">
              <div className="mb-5">
                <div className="d-flex shop-flex mb-4">
                  <input
                    placeholder="Search Here"
                    type="search"
                    className="shop-search"
                    required
                    onChange={handleSearchbar}
                    value={isSearch}
                  />
                  <button
                    type="button"
                    onClick={handleOpening}
                    className="btn border mb-3 shop-filter"
                  >
                    <FaFilter /> Filter
                  </button>

                  <div
                    onClick={handleOpening}
                    className={
                      isOpen ? "cart-overlay modal-backdrop" : "d-none"
                    }
                  ></div>

                  <div
                    className={
                      isOpen ? "modal cart-modal fs-6 d-block" : "d-none"
                    }
                  >
                    <div className="modal-lg h-100">
                      <div className="border-0 rounded-0 cart-modal-container">
                        <div className="bg-dark rounded-0 text-light modal-header">
                          <strong className="modal-title px-0 fs-3">
                            Filter
                          </strong>
                          <span
                            onClick={handleOpening}
                            style={{ cursor: "pointer" }}
                          >
                            <IoMdExit size={"30px"} />
                          </span>
                        </div>
                        <div className="modal-body">
                          <div className="w-100">
                            <form className="pb-5 pt-4 px-3">
                              <div className="mb-5 shop-first-box">
                                <h2 className="h5 w-100 border-bottom mb-4">
                                  <span className="d-inline-block pb-3 position-relative text-capitalize">
                                    Categories
                                  </span>
                                </h2>
                                {categories.map((val, i) => (
                                  <div className="form-check mb-3" key={i}>
                                    <input
                                      onChange={handleChange}
                                      className="form-check-input shop-radio"
                                      name="filterCategories"
                                      checked={filterItems === val.name}
                                      type="radio"
                                      value={val.name}
                                      id={val.name}
                                    />
                                    <label
                                      className="form-check-label text-capitalize shop-label"
                                      htmlFor={val.name}
                                    >
                                      {val.name}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <div className="mb-5 shop-first-box">
                                <h2 className="h5 w-100 border-bottom mb-4">
                                  <span className="d-inline-block pb-3 position-relative text-capitalize">
                                    Brands
                                  </span>
                                </h2>
                                {brands.map((val, i) => (
                                  <div className="form-check mb-3" key={i}>
                                    <input
                                      onChange={handleBrands}
                                      className="form-check-input shop-radio-two"
                                      name="filterBrands"
                                      checked={val.name === filterBrands}
                                      type="radio"
                                      value={val.name}
                                      id={val.name}
                                    />
                                    <label
                                      className="form-check-label text-capitalize shop-label"
                                      htmlFor={val.name}
                                    >
                                      {val.name}
                                    </label>
                                  </div>
                                ))}
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
                      <Dropdown.Item onClick={handlePrice} id="default">
                        Default
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handlePrice} id="low-to-high">
                        Price, Low To High
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handlePrice} id="high-to-low">
                        Price, High To Low
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <Row className="row-gap-3">
                  {currentItems.map((val) => (
                    <div className="col-lg-4 col-sm-6" key={val.id}>
                      <div className="card position-relative rounded-0 border-0 shop-card">
                        <span
                          className={
                            val.stock_status === "Out Of Stock"
                              ? "shop-stock position-absolute d-block z-1 badge"
                              : "d-none"
                          }
                        >
                          Out Of Stock
                        </span>
                        <div className="holder position-relative overflow-hidden trend-box">
                          <Link
                            to={`/${val.id}`}
                            className="d-block position-relative"
                          >
                            <img
                              src={val.img1_url}
                              alt={val.title}
                              className="img-fluid card-img-top rounded-0"
                            />
                            <img
                              src={val.img2_url}
                              alt={val.title}
                              className="img-fluid rounded-0 trending-hover w-100 h-100 position-absolute top-0 start-0"
                            />
                          </Link>

                          {/* Add to Cart / In Cart Button */}
                          {!isInCart(val.id) ? (
                            <button
                              onClick={() => handleAddToCart(val)}
                              disabled={
                                val.stock_status === "Out Of Stock" ||
                                addingToCart[val.id]
                              }
                              className={
                                val.stock_status !== "Out Of Stock"
                                  ? "position-absolute z-1 trend-cart text-center"
                                  : "d-none"
                              }
                            >
                              {addingToCart[val.id] ? (
                                <>
                                  <div
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                  Adding...
                                </>
                              ) : (
                                <>
                                  <AiOutlinePlus size={"18px"} /> Add To Cart
                                </>
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => dispatch(openCartModal())} // ✅ Opens navbar cart modal
                              className="position-absolute z-1 trend-cart text-center text-white border-0"
                              style={{
                                cursor: "pointer",
                                backgroundColor: "var(--main-gold)",
                              }}
                            >
                              ✓ In Your Cart
                            </button>
                          )}
                        </div>
                        <div className="pt-4 pb-3 text-center">
                          <Link to={`/${val.id}`} className="shop-title">
                            {val.title}
                          </Link>
                          <div className="d-flex gap-2 align-items-center justify-content-center">
                            <span
                              className={
                                val.discount_price
                                  ? "cart-discount-price fw-semibold"
                                  : "d-none"
                              }
                            >
                              ${val.discount_price}
                            </span>
                            <span
                              className={
                                !val.discount_price
                                  ? "cart-without-price"
                                  : "cart-before-price"
                              }
                            >
                              ${val.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Row>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          <MdKeyboardDoubleArrowLeft />
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li
                          key={i + 1}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          <MdKeyboardDoubleArrowRight />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 pb-md-5">
              <aside className="pb-md-0 pb-4 bg-white cart-aside">
                <form className="pb-5 pt-4 px-3 p-md-0">
                  <div className="mb-5 shop-first-box">
                    <h2 className="h5 w-100 border-bottom mb-4">
                      <span className="d-inline-block pb-3 position-relative text-capitalize">
                        Categories
                      </span>
                    </h2>
                    {categories.map((val, i) => (
                      <div className="form-check mb-3" key={i}>
                        <input
                          onChange={handleChange}
                          className="form-check-input shop-radio"
                          name="filterCategories"
                          checked={filterItems === val.name}
                          type="radio"
                          value={val.name}
                          id={val.name}
                        />
                        <label
                          className="form-check-label text-capitalize shop-label"
                          htmlFor={val.name}
                        >
                          {val.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mb-5 shop-first-box">
                    <h2 className="h5 w-100 border-bottom mb-4">
                      <span className="d-inline-block pb-3 position-relative text-capitalize">
                        Brands
                      </span>
                    </h2>
                    {brands.map((val, i) => (
                      <div className="form-check mb-3" key={i}>
                        <input
                          onChange={handleBrands}
                          className="form-check-input shop-radio-two"
                          name="filterBrands"
                          checked={val.name === filterBrands}
                          type="radio"
                          value={val.name}
                          id={val.name}
                        />
                        <label
                          className="form-check-label text-capitalize shop-label"
                          htmlFor={val.name}
                        >
                          {val.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </form>
              </aside>
            </div>
          </Row>
        </div>
      </section>
    </div>
  );
};
