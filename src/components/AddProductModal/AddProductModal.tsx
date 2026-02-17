import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import styles from './AddProductModal.module.scss';
import type { CreateProductDto, ProductBrand, ProductCategory, ProductPower } from '../../types';
import { useCreateProductMutation } from '../../store/api';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onAdd?: (product: CreateProductDto) => void;
}

const categoryOptions: ProductCategory[] = ['split', 'window', 'mobile', 'cassette'];
const brandOptions: ProductBrand[] = ['daikin', 'mitsubishi', 'lg', 'samsung'];
const powerOptions: ProductPower[] = [7000, 9000, 12000, 18000];

const AddProductModal: React.FC<AddProductModalProps> = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState<CreateProductDto>({
    name: '',
    description: '',
    price: 0,
    category: 'split',
    brand: 'daikin',
    power: 7000,
    inStock: true,
    images: [],
  });
  const [createProduct, { isLoading, error }] = useCreateProductMutation();

  const handleChange = (field: keyof CreateProductDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createProduct(formData).unwrap();
      if (onAdd) onAdd(formData);
      onClose();
      // Сброс формы
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'split',
        brand: 'daikin',
        power: 7000,
        inStock: true,
        images: [],
      });
    } catch (err) {
      console.error('Ошибка создания товара', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Добавление нового товара</DialogTitle>
      <DialogContent className={styles.content}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Ошибка при создании товара
          </Alert>
        )}
        <TextField
          label="Название"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          fullWidth
          margin="normal"
          required
          disabled={isLoading}
        />
        <TextField
          label="Описание"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          disabled={isLoading}
        />
        <TextField
          label="Цена"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange('price', Number(e.target.value))}
          fullWidth
          margin="normal"
          required
          disabled={isLoading}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              select
              label="Категория"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              fullWidth
              margin="normal"
              disabled={isLoading}
            >
              {categoryOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Бренд"
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              fullWidth
              margin="normal"
              disabled={isLoading}
            >
              {brandOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Мощность"
              value={formData.power}
              onChange={(e) => handleChange('power', Number(e.target.value))}
              fullWidth
              margin="normal"
              disabled={isLoading}
            >
              {powerOptions.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt} BTU
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.inStock}
                  onChange={(e) => handleChange('inStock', e.target.checked)}
                  disabled={isLoading}
                />
              }
              label="В наличии"
              style={{ marginTop: 16 }}
            />
          </Grid>
        </Grid>
        <TextField
          label="Изображения (ссылки через запятую)"
          value={formData.images?.join(', ') || ''}
          onChange={(e) =>
            handleChange(
              'images',
              e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
            )
          }
          fullWidth
          margin="normal"
          disabled={isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Отмена
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? 'Добавление...' : 'Добавить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;