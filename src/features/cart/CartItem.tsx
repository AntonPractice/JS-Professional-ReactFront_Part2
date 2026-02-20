import React from 'react';
import { Box, Typography, IconButton, TextField, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './Cart.module.scss';
import { useRemoveFromCartMutation, useUpdateCartItemMutation } from '../../store/api';
import type { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
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

  const product = item.product || {};
  const price = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
  const image = product.images?.[0] || '/placeholder.png';
  const productName = product.name || 'Товар';
  const totalPrice = price * (item.quantity || 1);

  return (
    <Box className={styles.cartItem}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <img
            src={image}
            alt={productName}
            style={{ width: '100%', borderRadius: 4 }}
          />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1">{productName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {price.toLocaleString()} ₽
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
            {totalPrice.toLocaleString()} ₽
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