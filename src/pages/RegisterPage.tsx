import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './LoginPage.module.scss';
import { useRegisterMutation } from '../store/api';
import { setCredentials } from '../store/authSlice';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register({ username, email, password }).unwrap();
      console.log('Register response:', response);
      dispatch(setCredentials(response));
      navigate('/');
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err?.data?.message || 'Ошибка регистрации');
    }
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper className={styles.paper}>
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Уже есть аккаунт? <a href="/login">Войдите</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;