import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate eklendi
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/urunler/${product.productId}`);
  };

  const handleWhatsAppClick = () => {
    const message = `Merhaba, ${product.name} hakkında bilgi almak istiyorum.`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Card className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="200"
        image="https://via.placeholder.com/400x200" // Ürün resmi URL'si burada ayarlanabilir
      />
      <CardContent>
        <Typography variant="h5" component="div" className="product-title">
          {product.name}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          size="small"
          component={Link}
          to={`/urunler/${product.productId}`}
          className="details-button"
          onClick={(e) => e.stopPropagation()} // Kartın tıklanma işlevini durdurur
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
