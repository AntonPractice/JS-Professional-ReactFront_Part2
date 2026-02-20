import React, { useState } from 'react';
import {
  Container,
  Grid,
  CircularProgress,
  Alert,
  Pagination,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import { useAuth } from '../hooks/useAuth';
import { useGetProductsQuery } from '../store/api';
import type { Product } from '../types';

const ProductListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [inStock, setInStock] = useState('');
  const limit = 6;

  const { data, error, isLoading } = useGetProductsQuery({
    page,
    limit,
    category: category || undefined,
    brand: brand || undefined,
    inStock: inStock === 'inStock' ? true : inStock === 'outOfStock' ? false : undefined,
  });

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const clearFilters = () => {
    setCategory('');
    setBrand('');
    setInStock('');
    setPage(1);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Ошибка загрузки товаров</Alert>;

  return (
    <Container>
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Категория</InputLabel>
          <Select value={category} label="Категория" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="split">Сплит</MenuItem>
            <MenuItem value="window">Оконный</MenuItem>
            <MenuItem value="mobile">Мобильный</MenuItem>
            <MenuItem value="cassette">Кассетный</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Бренд</InputLabel>
          <Select value={brand} label="Бренд" onChange={(e) => setBrand(e.target.value)}>
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="daikin">Daikin</MenuItem>
            <MenuItem value="mitsubishi">Mitsubishi</MenuItem>
            <MenuItem value="lg">LG</MenuItem>
            <MenuItem value="samsung">Samsung</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Наличие</InputLabel>
          <Select value={inStock} label="Наличие" onChange={(e) => setInStock(e.target.value)}>
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="inStock">В наличии</MenuItem>
            <MenuItem value="outOfStock">Нет в наличии</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={clearFilters}>
          Сбросить
        </Button>
      </Box>

      <Grid container spacing={3}>
        {data?.data.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard
              product={product}
              isAdmin={isAdmin}
              onSave={(id, updated) => {
                // Здесь будет вызов мутации
                console.log('Save', id, updated);
              }}
              onDelete={isAdmin ? (id) => console.log('Delete', id) : undefined}
            />
          </Grid>
        ))}
      </Grid>

      {data && data.total > limit && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(data.total / limit)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default ProductListPage;