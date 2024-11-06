import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/urunler" element={<ProductList />} />
        <Route path="/urunler/:productId" element={<ProductPage />} />
        <Route path="/iletisim" element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
