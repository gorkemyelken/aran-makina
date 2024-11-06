import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import './App.css';

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
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </a>
    </Router>
  );
}

export default App;
