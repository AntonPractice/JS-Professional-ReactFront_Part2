import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Order } from '../../types';

interface OrdersListProps {
  orders: Order[];
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const navigate = useNavigate();

  if (!Array.isArray(orders) || orders.length === 0) {
    return <Typography>У вас пока нет заказов</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№ заказа</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            const total = order.totalAmount ? parseFloat(order.totalAmount as string) : 0;
            const date = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—';
            const status = order.status || 'pending';

            return (
              <TableRow key={order.id}>
                <TableCell>{order.id?.slice(0, 8) || '—'}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{total.toLocaleString()} ₽</TableCell>
                <TableCell>
                  <Chip
                    label={status}
                    color={
                      status === 'delivered'
                        ? 'success'
                        : status === 'cancelled'
                        ? 'error'
                        : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    Детали
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersList;