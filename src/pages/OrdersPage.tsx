import React from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useGetOrdersQuery } from '../store/api';
import OrdersList from '../features/orders/OrdersList';

const OrdersPage: React.FC = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка загрузки заказов</Alert>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Мои заказы
      </Typography>
      <OrdersList orders={orders || []} />
    </Container>
  );
};

export default OrdersPage;