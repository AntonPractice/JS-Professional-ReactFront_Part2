import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Chip,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useAddToCartMutation, useGetProductByIdQuery } from '../store/api';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id!);
  const { user } = useAuth();
  const [addToCart] = useAddToCartMutation();

  if (isLoading) return <CircularProgress />;
  if (error || !product) return <Alert severity="error">Товар не найден</Alert>;

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: product.id }).unwrap();
      navigate('/cart');
    } catch (err) {
      console.error('Ошибка добавления в корзину', err);
    }
  };

  return (
    <Container>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Назад
      </Button>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={product.images[0] || '/placeholder.png'}
              alt={product.name}
              style={{ width: '100%', borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip label={product.category} sx={{ mr: 1 }} />
              <Chip label={product.brand} sx={{ mr: 1 }} />
              <Chip label={`${product.power} BTU`} sx={{ mr: 1 }} />
              <Chip
                label={product.inStock ? 'В наличии' : 'Нет в наличии'}
                color={product.inStock ? 'success' : 'default'}
              />
            </Box>
            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              {product.price.toLocaleString()} ₽
            </Typography>
            {user && (
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Добавить в корзину
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;