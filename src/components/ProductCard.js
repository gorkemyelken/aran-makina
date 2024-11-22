import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../styles/ProductCard.css';

// Slugify fonksiyonu Türkçe karakterleri uygun şekilde dönüştürür.
const slugify = (text) => {
  const turkishToEnglish = {
    'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
    'Ç': 'C', 'Ğ': 'G', 'İ': 'I', 'Ö': 'O', 'Ş': 'S', 'Ü': 'U'
  };

  const replacedText = text.split('').map(char => turkishToEnglish[char] || char).join('');

  return replacedText
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Boşlukları '-' ile değiştir
    .replace(/[^\w\-]+/g, '') // Özel karakterleri sil
    .replace(/\-\-+/g, '-') // Birden fazla '-' ile olanları tek '-' ile değiştir
    .trim(); // Başındaki ve sonundaki '-' karakterlerini sil
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const slug = slugify(product.name);
    navigate(`/urunler/${slug}`, { state: { productId: product.productId } });
  };

  const handleWhatsAppClick = () => {
    const message = `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDetailsClick = (e) => {
    // Butona tıklayınca, state ile yönlendirme yap
    const slug = slugify(product.name);
    navigate(`/urunler/${slug}`, { state: { productId: product.productId } });
    e.stopPropagation(); // Kartın tıklanmasını durdurur
  };

  return (
    <Card className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        alt={product.name}
        image={product.photos && product.photos[0] ? product.photos[0].url : '/default-image.jpg'}
        style={{ objectFit: 'contain' }} // Resim kutuya sığacak şekilde ayarlanacak
      />
      <CardContent>
        <Typography variant="h6" component="div" className="product-title">
          {product.name}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          size="small"
          className="details-button"
          onClick={handleDetailsClick} // Buton tıklama fonksiyonu
        >
          Detayları Gör
        </Button>
        <IconButton onClick={handleWhatsAppClick} className="whatsapp-button">
          <WhatsAppIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
