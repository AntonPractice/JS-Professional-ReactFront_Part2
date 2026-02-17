import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

interface FiltersProps {
  category: string;
  brand: string;
  inStock: string;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onInStockChange: (value: string) => void;
  onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  category,
  brand,
  inStock,
  onCategoryChange,
  onBrandChange,
  onInStockChange,
  onClear,
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={category}
          label="Категория"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="split">Сплит</MenuItem>
          <MenuItem value="window">Оконный</MenuItem>
          <MenuItem value="mobile">Мобильный</MenuItem>
          <MenuItem value="cassette">Кассетный</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Бренд</InputLabel>
        <Select
          value={brand}
          label="Бренд"
          onChange={(e) => onBrandChange(e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="daikin">Daikin</MenuItem>
          <MenuItem value="mitsubishi">Mitsubishi</MenuItem>
          <MenuItem value="lg">LG</MenuItem>
          <MenuItem value="samsung">Samsung</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Наличие</InputLabel>
        <Select
          value={inStock}
          label="Наличие"
          onChange={(e) => onInStockChange(e.target.value)}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="inStock">В наличии</MenuItem>
          <MenuItem value="outOfStock">Нет в наличии</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={onClear}>
        Сбросить
      </Button>
    </Box>
  );
};

export default Filters;