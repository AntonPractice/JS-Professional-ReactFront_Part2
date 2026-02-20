import React from 'react';
import { Paper, Typography, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../../types';

interface CartSummaryProps {
  items: CartItem[]; // теперь массив, а не объект Cart
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => {
    const price = typeof item.product.price === 'number' ? item.product.price : parseFloat(item.product.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Итого
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Товары ({items.length})</Typography>
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
        onClick={() => navigate('/checkout')}
      >
        Оформить заказ
      </Button>
    </Paper>
  );
};

export default CartSummary;