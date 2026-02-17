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

const CartPage: React.FC = () => {
  const { data: cart, error, isLoading, refetch } = useGetCartQuery();
  const [clearCart] = useClearCartMutation();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка загрузки корзины</Alert>;
  if (!cart || cart.items.length === 0) {
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
      refetch();
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
            {/* {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))} */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" color="error" onClick={handleClearCart}>
                Очистить корзину
              </Button>
              <Button variant="contained" onClick={() => navigate('/orders')}>
                Перейти к оформлению
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartSummary cart={cart} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;