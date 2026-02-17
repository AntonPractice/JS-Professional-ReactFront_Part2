import React from 'react';
import { Box, Typography, IconButton, TextField, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Cart.module.scss';
import { useRemoveFromCartMutation, useUpdateCartItemMutation } from '../../store/api';
import type { CartItem } from '../../types';

interface CartItemProps {
  item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const [updateItem] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveFromCartMutation();

  const handleQuantityChange = async (quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateItem({ itemId: item.id, quantity }).unwrap();
    } catch (err) {
      console.error('Ошибка обновления количества', err);
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(item.id).unwrap();
    } catch (err) {
      console.error('Ошибка удаления товара', err);
    }
  };

  return (
    <Box className={styles.cartItem}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <img
            src={item.product.images[0] || '/placeholder.png'}
            alt={item.product.name}
            style={{ width: '100%', borderRadius: 4 }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{item.product.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {item.product.price.toLocaleString()} ₽
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            type="number"
            size="small"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            inputProps={{ min: 1 }}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1">
            {(item.product.price * item.quantity).toLocaleString()} ₽
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton color="error" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;