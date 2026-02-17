import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  Alert,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useUpdateUserMutation } from '../store/api';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [success, setSuccess] = useState(false);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({ id: user.id, body: formData }).unwrap();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Ошибка обновления профиля', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
            {user.username[0].toUpperCase()}
          </Avatar>
          <Typography variant="h5">{user.username}</Typography>
          <Typography variant="body2" color="text.secondary">
            Роль: {user.role}
          </Typography>
        </Box>

        {success && <Alert severity="success">Профиль обновлён</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;