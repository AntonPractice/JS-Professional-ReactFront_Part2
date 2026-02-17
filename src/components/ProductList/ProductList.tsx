import React, { useState } from 'react';
import {
  Grid,
  Box,
  Pagination,
  Typography,
  CircularProgress,
} from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import type { Product } from '../../types';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  isAdmin: boolean;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onUpdateProduct: (id: string, updated: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct?: (newProduct: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void; // новый опциональный проп
  pageSize?: number;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading = false,
  isAdmin,
  total = 0,
  page = 1,
  onPageChange,
  onUpdateProduct,
  onDeleteProduct,
  pageSize = 6,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (onPageChange) onPageChange(value);
  };

  if (isLoading) {
    return (
      <Box className={styles.loader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.productList}>
      {products.length > 0 ? (
        <>
          <Grid container spacing={3} className={styles.grid}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  product={product}
                  isAdmin={isAdmin}
                  onSave={onUpdateProduct}
                  onDelete={onDeleteProduct}
                />
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box className={styles.pagination}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="body1" className={styles.noProducts}>
          Товары не найдены
        </Typography>
      )}
    </div>
  );
};

export default ProductList;