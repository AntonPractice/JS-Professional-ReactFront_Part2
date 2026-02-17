import React from 'react';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Cart } from '../../types';

interface CartSummaryProps {
  cart: Cart;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart }) => {
  const navigate = useNavigate();
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Итого
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Товары ({cart.items.length})</Typography>
        <Typography>{total.toLocaleString()} ₽</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="subtitle1">Общая сумма</Typography>
        <Typography variant="subtitle1" color="primary">
          {total.toLocaleString()} ₽
        </Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigate('/checkout')} // страница оформления
      >
        Оформить заказ
      </Button>
    </Paper>
  );
};

export default CartSummary;