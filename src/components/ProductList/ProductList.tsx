import React, { useState } from 'react';
import {
  Grid,
  Box,
  Pagination,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProductCard from '../ProductCard/ProductCard';
import AddProductModal from '../AddProductModal/AddProductModal'; // <-- импорт модалки
import styles from './ProductList.module.scss';
import type { Product, CreateProductDto } from '../../types';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  isAdmin: boolean;
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onUpdateProduct: (id: string, updated: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct?: (newProduct: CreateProductDto) => void; // <-- добавлен проп
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
  onAddProduct, // <-- деструктуризация
  pageSize = 6,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (onPageChange) onPageChange(value);
  };

  const handleAddProduct = (newProduct: CreateProductDto) => {
    if (onAddProduct) {
      onAddProduct(newProduct);
    }
    setModalOpen(false);
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
      {isAdmin && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          >
            Добавить товар
          </Button>
        </Box>
      )}

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

      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddProduct}
      />
    </div>
  );
};

export default ProductList;