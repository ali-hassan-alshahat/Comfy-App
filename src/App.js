import React from 'react';
import './App.css';
import "./App.css"
import { Main } from './components/Main';
import { Route, Routes } from 'react-router-dom';
import { Shop } from './components/Shop';
import { allCategories, allItems, mainSlider} from './data/data';
import { BottomNav } from './components/BottomNav';
import { designs, softwares, topTrending } from './data/data';
import { Navbar } from './components/Navbar';
import { TopTrending } from './components/TopTrending';
import { Sections } from './components/Sections';
import { Info } from './components/Info';
import { Softwares } from './components/Softwares';
import { Designs } from './components/Designs';
import { Footer } from './components/Footer';
import { ProductDetails } from './components/ProductDetails';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Cart } from './pages/Cart';
import { Toaster } from 'react-hot-toast';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
          <Navbar />
          <Main mainSlider={mainSlider}/>
          <TopTrending topTrending={topTrending}/>
      <Sections />
      <Info />
      <Softwares softwares={softwares} />
      <Designs designs={designs} />
      <Footer />
      <BottomNav />
          </>
        } />
        <Route path="shop" element={<Shop allItems={allItems} allCategories={allCategories}/>} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="cart" element={<Cart />} />
        <Route path='/:productId' element={<ProductDetails topTrending={topTrending} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
