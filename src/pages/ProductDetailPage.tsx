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
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  if (isLoading) return <CircularProgress />;
  if (error || !product) return <Alert severity="error">Товар не найден</Alert>;

  const handleAddToCart = async () => {
    console.log('Добавление в корзину, товар ID:', product.id);
    try {
      const result = await addToCart({ productId: product.id }).unwrap();
      console.log('Успешно добавлено, результат:', result);
      navigate('/cart');
    } catch (err: any) {
      console.error('Ошибка добавления в корзину', err);
      if (err.status === 401) {
        alert('Необходимо авторизоваться');
      } else {
        alert('Ошибка при добавлении в корзину');
      }
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
            {user ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
              >
                {isAdding ? 'Добавление...' : 'Добавить в корзину'}
              </Button>
            ) : (
              <Button variant="outlined" size="large" onClick={() => navigate('/login')}>
                Войдите, чтобы купить
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetailPage;