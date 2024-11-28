import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ProductPage from './pages/ProductPage';
import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductList from './pages/admin/AdminProductList';
import AdminUsers from './pages/admin/AdminUsers';
import About from './pages/About';
import './App.css';
import ScrollToTop from './components/ScrollToTop';
import CategoryBar from './components/CategoryBar';
import AdminPanel from './pages/admin/AdminPanel';
import AdminProductDetail from './pages/admin/AdminProductDetail';
import AdminProductAdd from './pages/admin/AdminProductAdd';
import AdminFeatureNameList from './pages/admin/AdminFeatureNameList';
import AdminFeatureNameAdd from './pages/admin/AdminFeatureNameAdd';
import AdminCategoryAdd from './pages/admin/AdminCategoryAdd';
import AdminCategoryList from './pages/admin/AdminCategoryList';
import AdminPhotoUpload from './pages/admin/AdminPhotoUpload';

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* CategoryBar sadece anasayfada gösterilecek */}
                <CategoryBar />
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/hakkimizda"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/urunler"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductList />
              </motion.div>
            }
          />
          <Route
            path="/urunler/:productId"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProductPage />
              </motion.div>
            }
          />
          <Route
            path="/iletisim"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Contact />
              </motion.div>
            }
          />
          <Route path="/admin/*" element={<AdminPanel />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductList />} />
            <Route path="products/:productId" element={<AdminProductDetail />} />
            <Route path="products/add" element={<AdminProductAdd />} />
            <Route path="features" element={<AdminFeatureNameList />} />
            <Route path="features/add" element={<AdminFeatureNameAdd />} />
            <Route path="categories" element={<AdminCategoryList />} />
            <Route path="categories/add" element={<AdminCategoryAdd />} />
            <Route path="photoUpload" element={<AdminPhotoUpload />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && (
  <a
    href="https://wa.me/905436256412"
    className="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      className="whatsapp-icon"
      style={{ marginRight: '8px' }}
    />
    <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
      Bize Ulaşın
    </span>
  </a>
)}
    </>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
