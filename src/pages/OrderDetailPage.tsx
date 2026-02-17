import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { useGetOrderByIdQuery } from '../store/api';
import OrderDetails from '../features/orders/OrderDetails';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(id!);

  if (isLoading) return <CircularProgress />;
  if (error || !order) return <Alert severity="error">Заказ не найден</Alert>;

  return (
    <Container>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Назад
      </Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Заказ #{order.id.slice(0, 8)}
        </Typography>
        <Chip
          label={order.status}
          color={
            order.status === 'delivered'
              ? 'success'
              : order.status === 'cancelled'
              ? 'error'
              : 'warning'
          }
          sx={{ mb: 2 }}
        />
        <OrderDetails order={order} />
      </Paper>
    </Container>
  );
};

export default OrderDetailPage;