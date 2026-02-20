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
  onAdd?: (product: CreateProductDto) => void; // теперь только для оповещения
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CreateProductDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price),
      };
      await createProduct(dataToSend).unwrap();
      // Оповещаем родителя (не для повторного создания, а для возможного обновления)
      if (onAdd) onAdd(formData);
      onClose();
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Добавление нового товара</DialogTitle>
        <DialogContent className={styles.content}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Ошибка при создании товара
            </Alert>
          )}
          {/* поля формы без изменений */}
          <TextField
            label="Название"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            fullWidth
            margin="normal"
            required
            disabled={isLoading || isSubmitting}
          />
          <TextField
            label="Описание"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            disabled={isLoading || isSubmitting}
          />
          <TextField
            label="Цена"
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            fullWidth
            margin="normal"
            required
            disabled={isLoading || isSubmitting}
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
                disabled={isLoading || isSubmitting}
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
                disabled={isLoading || isSubmitting}
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
                disabled={isLoading || isSubmitting}
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
                    disabled={isLoading || isSubmitting}
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
            disabled={isLoading || isSubmitting}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading || isSubmitting}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? 'Добавление...' : 'Добавить'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddProductModal;