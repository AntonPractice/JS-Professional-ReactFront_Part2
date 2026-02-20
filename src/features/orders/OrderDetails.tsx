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
  const shippingAddress = order.shippingAddress || 'Не указан';
  const phone = order.phone || 'Не указан';
  const paymentMethod = order.paymentMethod || 'Не указан';
  const items = order.items || [];
  const total = order.totalAmount ? parseFloat(order.totalAmount as string) : 0;

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        Адрес доставки: {shippingAddress}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Телефон: {phone}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Способ оплаты: {paymentMethod}
      </Typography>

      {items.length > 0 ? (
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
              {items.map((item) => {
                const productName = item.product?.name || 'Товар';
                const price = item.price ? parseFloat(item.price as unknown as string) : 0;
                const quantity = item.quantity || 0;
                return (
                  <TableRow key={item.id}>
                    <TableCell>{productName}</TableCell>
                    <TableCell align="right">{price.toLocaleString()} ₽</TableCell>
                    <TableCell align="right">{quantity}</TableCell>
                    <TableCell align="right">
                      {(price * quantity).toLocaleString()} ₽
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Нет товаров в заказе
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Typography variant="h6">
          Итого: {total.toLocaleString()} ₽
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderDetails;