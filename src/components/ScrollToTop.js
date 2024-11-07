import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Sayfa her değiştiğinde en üste kaydırır
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Sayfanın yumuşakça kaymasını sağlar
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;