import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import type { Order } from '../../types';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Адрес доставки: {order.address}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Телефон: {order.phone}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Способ оплаты: {order.paymentMethod}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Товар</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Количество</TableCell>
              <TableCell align="right">Сумма</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell align="right">{item.price.toLocaleString()} ₽</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  {(item.price * item.quantity).toLocaleString()} ₽
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Typography variant="h6">
          Итого: {order.total.toLocaleString()} ₽
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderDetails;