import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { Container, Typography, List, ListItem, ListItemText, Paper, CircularProgress, Grid, CardMedia } from '@mui/material';
import '../styles/ProductPage.css';

const ProductPage = () => {
    const { productId } = useParams(); // URL'deki productId'yi alır
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const productData = await fetchProductById(productId);
                setProduct(productData);
            } catch (error) {
                setError('Ürün bilgileri alınırken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            getProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={{ marginTop: '20px' }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        product && (
            <Container className="product-container">
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <CardMedia
                                component="img"
                                image={product.photo || 'default-placeholder.jpg'} // Default görsel eklenebilir
                                alt={product.name}
                                style={{ borderRadius: '8px' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h4" component="h1" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {product.description || 'Ürün açıklaması mevcut değil.'}
                            </Typography>

                            <List>
                                {product.features.map((feature) => (
                                    <ListItem key={feature.productFeatureId}>
                                        <ListItemText
                                            primary={feature.featureName.name}
                                            secondary={feature.value}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
            </Container>
        )
    );
};

export default ProductPage;
