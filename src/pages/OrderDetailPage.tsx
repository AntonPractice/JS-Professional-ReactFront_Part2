import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useGetOrderByIdQuery, useUpdateOrderStatusMutation } from '../store/api';
import OrderDetails from '../features/orders/OrderDetails';
import type { OrderStatus } from '../types';

const statusOptions: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { data: order, error, isLoading } = useGetOrderByIdQuery(id!, { skip: !id });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');

  if (isLoading) return <CircularProgress />;
  if (error || !order) {
    return (
      <Container>
        <Alert severity="error">Заказ не найден или ошибка загрузки</Alert>
        <Button onClick={() => navigate('/orders')} sx={{ mt: 2 }}>
          Вернуться к заказам
        </Button>
      </Container>
    );
  }

  const handleStatusChange = async () => {
    if (!selectedStatus) return;
    try {
      await updateStatus({ id: order.id, body: { status: selectedStatus } }).unwrap();
      setSelectedStatus('');
    } catch (err) {
      console.error('Ошибка обновления статуса', err);
    }
  };

  return (
    <Container>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Назад
      </Button>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            Заказ #{order.id?.slice(0, 8) || '—'}
          </Typography>
          <Chip
            label={order.status || 'pending'}
            color={
              order.status === 'delivered'
                ? 'success'
                : order.status === 'cancelled'
                ? 'error'
                : 'warning'
            }
          />
        </Box>

        {isAdmin && (
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Изменить статус</InputLabel>
              <Select
                value={selectedStatus}
                label="Изменить статус"
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              >
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleStatusChange}
              disabled={!selectedStatus || isUpdating}
            >
              {isUpdating ? 'Обновление...' : 'Обновить статус'}
            </Button>
          </Box>
        )}

        <OrderDetails order={order} />
      </Paper>
    </Container>
  );
};

export default OrderDetailPage;