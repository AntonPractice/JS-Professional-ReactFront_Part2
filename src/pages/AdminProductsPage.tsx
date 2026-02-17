import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductList from '../components/ProductList/ProductList';
import { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } from '../store/api';
import { useAuth } from '../hooks/useAuth';
import type { CreateProductDto, UpdateProductDto } from '../types';

const AdminProductsPage: React.FC = () => {
  const { data, refetch } = useGetProductsQuery({});
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Указываем типы параметров
  const handleAddProduct = async (newProduct: CreateProductDto) => {
    try {
      await createProduct(newProduct).unwrap();
      refetch();
    } catch (err) {
      console.error('Ошибка добавления товара', err);
    }
  };

  const handleUpdateProduct = async (id: string, updated: UpdateProductDto) => {
    try {
      await updateProduct({ id, body: updated }).unwrap();
      refetch();
    } catch (err) {
      console.error('Ошибка обновления товара', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      refetch();
    } catch (err) {
      console.error('Ошибка удаления товара', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Управление товарами
      </Typography>
      <ProductList
        products={data?.data || []}
        isAdmin={isAdmin}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct} // теперь тип совпадает
      />
    </Container>
  );
};

export default AdminProductsPage;