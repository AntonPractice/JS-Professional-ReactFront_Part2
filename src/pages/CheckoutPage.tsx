import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../store/api';

const CheckoutPage: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'online'>('card');
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({ shippingAddress, phone, paymentMethod }).unwrap();
      navigate('/orders');
    } catch (err) {
      console.error('Ошибка создания заказа', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Оформление заказа
        </Typography>
        {error && (
          <Alert severity="error">
            Ошибка при создании заказа. Попробуйте снова.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Адрес доставки"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Способ оплаты</InputLabel>
            <Select
              value={paymentMethod}
              label="Способ оплаты"
              onChange={(e) => setPaymentMethod(e.target.value as any)}
            >
              <MenuItem value="card">Картой онлайн</MenuItem>
              <MenuItem value="cash">Наличными при получении</MenuItem>
              <MenuItem value="online">Онлайн-оплата</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Подтвердить заказ'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;