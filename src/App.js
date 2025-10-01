import React, { useEffect, useState } from "react";
import "./App.css";
import { Main } from "./components/Main";
import { Route, Routes, useLocation } from "react-router-dom";
import { Shop } from "./pages/Shop";
import { BottomNav } from "./components/BottomNav";
import { Navbar } from "./components/Navbar";
import { TopTrending } from "./components/TopTrending";
import { Sections } from "./components/Sections";
import { Info } from "./components/Info";
import { Softwares } from "./components/Softwares";
import { Designs } from "./components/Designs";
import { Footer } from "./components/Footer";
import { ProductDetails } from "./components/ProductDetails";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Cart } from "./pages/Cart";
import { Toaster } from "react-hot-toast";
import AccountDetails from "./pages/AccountDetails";
import Checkout from "./pages/Checkout";
import { getMainSliders, getProducts } from "./utils/supabase";
import { ScrollToTop } from "./components/ScrollToTop";

export function ScrollToTopPage() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  const [slides, setSlides] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [slidesData, productsData] = await Promise.all([
          getMainSliders(),
          getProducts(),
        ]);
        setSlides(slidesData || []);
        setProducts(productsData || []);
      } catch (error) {
        console.error("Error loading homepage data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Main slides={slides} />
      <TopTrending items={products} />
      <Sections />
      <Info />
      <Softwares />
      <Designs />
    </>
  );
}

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === "/checkout";

  return (
    <div className="App">
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/:productId" element={<ProductDetails />} />
        <Route path="account" element={<AccountDetails />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
      <Toaster />
      {!hideLayout && <Footer />}
      {!hideLayout && <BottomNav />}
      <ScrollToTop />
    </div>
  );
}

export default App;
