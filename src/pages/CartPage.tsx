import React from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useClearCartMutation, useGetCartQuery } from '../store/api';
import CartSummary from '../features/cart/CartSummary';
import CartItemComponent from '../features/cart/CartItem';

const CartPage: React.FC = () => {
  const { data: cartItems, error, isLoading } = useGetCartQuery(); // теперь массив
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка загрузки корзины</Alert>;

  const items = cartItems || [];
  const cartExists = items.length > 0;

  if (!cartExists) {
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          Корзина пуста
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
          Перейти к покупкам
        </Button>
      </Container>
    );
  }

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
    } catch (err) {
      console.error('Ошибка очистки корзины', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="error" onClick={handleClearCart}>
                Очистить корзину
              </Button>
              <Button variant="contained" onClick={() => navigate('/checkout')}>
                Перейти к оформлению
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary items={items} /> {/* передаём массив */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;